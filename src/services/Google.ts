import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect } from "react";
import { Library } from "@googlemaps/js-api-loader";
import { appConfig } from "./AppConfig";
import { logger } from "./Logger";

export type Address = {
  city: string;
  latitude: number;
  longitude: number;
  region: string;
};

const libraries: Library[] = ["places", "geometry"];
export function useGoogleJsApiLoader() {
  const { isLoaded, loadError: loadError } = useJsApiLoader({
    googleMapsApiKey: appConfig.googleApiKey,
    libraries: libraries,
  });

  useEffect(() => {
    if (loadError) {
      logger.error({
        message: "Google jsApiLoader failed to load",
        error: loadError,
      });
    }
  }, [loadError]);
  return isLoaded;
}

export function getAddressAndGeocodeFromResults(
  result: google.maps.GeocoderResult,
): {
  address: Address;
  geocode: { lat: number; lng: number };
} {
  const address = result.address_components.reduce((acc, addressComponent) => {
    if (addressComponent.types.includes("locality")) {
      acc.city = addressComponent.long_name;
    } else if (addressComponent.types.includes("administrative_area_level_1")) {
      acc.region = addressComponent.long_name;
    }
    return acc;
  }, {} as Address);

  const geocode = {
    lat: result.geometry.location.lat(),
    lng: result.geometry.location.lng(),
  };

  return { address, geocode };
}
