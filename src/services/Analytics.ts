import { logEvent as logFirebaseEvent } from "firebase/analytics";
import { EventParams } from "@firebase/analytics";
import { getFirebaseAnalytics } from "./Firebase";

type AnalyticsEventParams = EventParams;

export function logEvent(
  eventName: string,
  eventParams?: AnalyticsEventParams,
) {
  const analytics = getFirebaseAnalytics();
  logFirebaseEvent(analytics, eventName, eventParams);
}

export function logClickEvent({
  label,
  category,
}: {
  label: string;
  category: "navigation" | "call-to-action" | "support" | "share";
}) {
  logEvent("click", {
    event_label: label,
    event_category: category,
  });
}
