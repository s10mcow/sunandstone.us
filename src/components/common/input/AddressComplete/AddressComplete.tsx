import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import {
  Autocomplete,
  Box,
  Grid,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { styled } from "@mui/material/styles";
import { Place } from "@mui/icons-material";
import {
  Address,
  getAddressAndGeocodeFromResults,
} from "../../../../services/Google";

const TextField = styled(MuiTextField)({
  width: "100%",
  "& .MuiFormLabel-root": {
    fontWeight: "bold",
  },
});

const autocompleteService: {
  current: null | google.maps.places.AutocompleteService;
} = { current: null };

const geocoderService: { current: null | google.maps.Geocoder } = {
  current: null,
};

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

export interface PlaceType {
  place_id?: string;
  description?: string;
  structured_formatting?: StructuredFormatting;
  geocode?: {
    lat?: number;
    lng?: number;
  };
  address?: Address;
}

type AddressCompleteProps = {
  error?: boolean;
  name: string;
  onChange: (location: PlaceType) => void;
  defaultValue?: PlaceType;
  variant?: "standard" | "outlined" | "filled";
  placeholder?: string;
  InputProps?: TextFieldProps["InputProps"];
};

export const AddressComplete = ({
  error,
  name,
  onChange,
  defaultValue,
  placeholder,
  InputProps,
}: AddressCompleteProps) => {
  const [value, setValue] = useState<PlaceType | string | null>(
    defaultValue?.description || null,
  );
  const [inputValue, setInputValue] = useState(defaultValue?.description || "");
  const [options, setOptions] = useState<(string | PlaceType)[]>(
    [] as PlaceType[],
  );

  useEffect(() => {
    setValue(defaultValue?.description || "");
    setInputValue(defaultValue?.description || "");
  }, [defaultValue]);

  const getLocationItems = throttle(async (request, callback) => {
    const results = await Promise.all(
      request.types.map(
        (type: string[]) =>
          new Promise(
            (resolve) =>
              autocompleteService?.current?.getPlacePredictions(
                { ...request, types: [type] },
                resolve,
              ),
          ),
      ),
    );
    const allAddress = results.reduce(
      (acc, cur) => (cur !== null ? [...acc, ...cur] : acc),
      [],
    );

    // filter the duplicated address
    const filtered = allAddress.filter(
      (a: PlaceType, index: number, self: PlaceType[]) =>
        index === self.findIndex((t: PlaceType) => t.place_id === a.place_id),
    );
    callback(filtered);
  }, 500);

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      geocoderService.current = new window.google.maps.Geocoder();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    getLocationItems(
      { input: inputValue, types: ["(cities)", "(regions)"] },
      (results: PlaceType[]) => {
        if (active) {
          let newOptions: (string | PlaceType)[] = [];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      },
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      fullWidth
      id="google-map-demo"
      getOptionLabel={(option: string | PlaceType): string => {
        if (typeof option === "string") {
          return option;
        }
        return option?.description || "";
      }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value as PlaceType | null}
      noOptionsText="No locations"
      onChange={(_, newValue: PlaceType | null | string) => {
        if (typeof newValue === "string") return;
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue as PlaceType);

        const location: PlaceType = {
          description: newValue?.description,
          geocode: {},
          address: undefined,
        };

        if (newValue?.place_id) {
          geocoderService?.current?.geocode(
            { placeId: newValue.place_id },
            (results, status) => {
              const hasResults =
                status === "OK" && Array.isArray(results) && results.length > 0;

              if (hasResults) {
                const addressAndGeocode = getAddressAndGeocodeFromResults(
                  results[0],
                );

                location.address = addressAndGeocode.address;
                location.geocode = addressAndGeocode.geocode;
                onChange(location);
              }
            },
          );
        } else if (!newValue) {
          onChange({ description: "", geocode: {} });
        }
      }}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder || "City or zip code"}
          InputLabelProps={{
            sx: { fontWeight: "bold", maxWidth: "unset" },
            ...params.InputLabelProps,
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Place sx={{ color: "green.primary" }} />
              </InputAdornment>
            ),
            ...InputProps,
          }}
          sx={{ "input::placeholder": { fontStyle: "italic" } }}
          error={error}
          name={name}
          fullWidth
        />
      )}
      renderOption={(props, option: string | PlaceType) => {
        if (typeof option === "string") return null;
        const matches =
          option?.structured_formatting?.main_text_matched_substrings || [];
        const parts = parse(
          option?.structured_formatting?.main_text || "",
          matches?.map((match: { length: number; offset: number }) => [
            match.offset,
            match.offset + match.length,
          ]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid sx={{ display: "flex", width: 44 }}>
                <LocationOnOutlinedIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option?.structured_formatting?.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};
