import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as syncedFolder from "@pulumi/synced-folder";
import { resolve } from "path";

const stackName = pulumi.getStack();
const programName = pulumi.getProject();

const rootDomainName = "example.com";
const appDomainName = `app.${rootDomainName}`;
const appSubdomainName = stackName === "prod" ? "" : stackName;
const appFullDomainName = appSubdomainName.length
  ? `${appSubdomainName}.${appDomainName}`
  : appDomainName;
const appSubdomainRecordName = appFullDomainName.replace(
  `.${rootDomainName}`,
  "",
);
const buildDir = resolve(process.cwd(), "../build");

const region = new aws.Provider(
  `${programName}-${stackName}-aws-region-default`,
  {
    region: "us-east-2",
  },
);
const globalRegion = new aws.Provider(
  `${programName}-${stackName}-aws-region-global`,
  {
    region: "us-east-1",
  },
);

const bucket = new aws.s3.Bucket(
  `${programName}-${stackName}-s3-bucket`,
  {},
  {
    provider: region,
  },
);

new syncedFolder.S3BucketFolder(
  `${programName}-${stackName}-s3-bucket-sync`,
  {
    path: buildDir,
    bucketName: bucket.bucket,
    acl: aws.s3.PrivateAcl,
    includeHiddenFiles: true,
  },
  {
    provider: region,
  },
);

const certificate = new aws.acm.Certificate(
  `${programName}-${stackName}`,
  {
    domainName: appFullDomainName,
    validationMethod: "DNS",
  },
  {
    provider: globalRegion,
  },
);
const hostedZoneId = aws.route53
  .getZone(
    {
      name: rootDomainName,
    },
    {
      async: true,
      provider: globalRegion,
    },
  )
  .then((zone) => zone.zoneId);
const certificateValidationDomain = new aws.route53.Record(
  `${stackName}-${programName}-cert-dns-validation`,
  {
    allowOverwrite: true,
    name: certificate.domainValidationOptions[0].resourceRecordName,
    zoneId: hostedZoneId,
    type: certificate.domainValidationOptions[0].resourceRecordType,
    records: [certificate.domainValidationOptions[0].resourceRecordValue],
    ttl: 300,
  },
  {
    provider: globalRegion,
  },
);
const certificateValidation = new aws.acm.CertificateValidation(
  `${stackName}-${programName}-cert-validation`,
  {
    certificateArn: certificate.arn,
    validationRecordFqdns: [certificateValidationDomain.fqdn],
  },
  { provider: globalRegion },
);
const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(
  `${stackName}-${programName}-cf-oai`,
  {
    comment: `${stackName}-${programName}`,
  },
  {
    provider: globalRegion,
  },
);
const cdn = new aws.cloudfront.Distribution(
  `${stackName}-${programName}-cdn`,
  {
    enabled: true,
    aliases: [appFullDomainName],
    origins: [
      {
        originId: bucket.arn,
        domainName: bucket.bucketRegionalDomainName,
        s3OriginConfig: {
          originAccessIdentity:
            originAccessIdentity.cloudfrontAccessIdentityPath,
        },
      },
    ],
    defaultRootObject: "index.html",
    defaultCacheBehavior: {
      targetOriginId: bucket.arn,
      viewerProtocolPolicy: "redirect-to-https",
      allowedMethods: ["GET", "HEAD", "OPTIONS"],
      cachedMethods: ["GET", "HEAD", "OPTIONS"],
      cachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6",
      originRequestPolicyId: "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf",
    },
    priceClass: "PriceClass_100",
    customErrorResponses: [400, 403, 404, 405, 414].map((errorCode) => ({
      errorCode,
      responseCode: 200,
      responsePagePath: "/index.html",
      errorCachingMinTtl: 300,
    })),
    restrictions: {
      geoRestriction: {
        restrictionType: "none",
      },
    },
    viewerCertificate: {
      acmCertificateArn: certificateValidation.certificateArn,
      sslSupportMethod: "sni-only",
    },
  },
  {
    provider: globalRegion,
  },
);

new aws.s3.BucketPolicy(
  `${stackName}-${programName}-bucket-policy`,
  {
    bucket: bucket.id,
    policy: pulumi.jsonStringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            AWS: originAccessIdentity.iamArn,
          },
          Action: ["s3:GetObject"],
          Resource: [pulumi.interpolate`${bucket.arn}/*`], // Give Cloudfront access to the entire bucket.
        },
      ],
    }),
  },
  {
    parent: bucket,
    provider: region,
  },
);

new aws.route53.Record(
  `${stackName}-${programName}-cdn-a-record`,
  {
    allowOverwrite: true,
    name: appSubdomainRecordName,
    zoneId: hostedZoneId,
    type: "A",
    aliases: [
      {
        name: cdn.domainName,
        zoneId: cdn.hostedZoneId,
        evaluateTargetHealth: true,
      },
    ],
  },
  {
    provider: globalRegion,
  },
);

export const cfDistributionId = cdn.id;
export const webUri = `https://${appFullDomainName}/`;
