export type CleaningMode = "maximum" | "custom";

export interface CleaningSelection {
  removeExifGps: boolean;
  removeXmp: boolean;
  removeIptc: boolean;
  removeIcc: boolean;
}

export const MAXIMUM_PRIVACY_SELECTION: CleaningSelection = {
  removeExifGps: true,
  removeXmp: true,
  removeIptc: true,
  removeIcc: true,
};

export const DEFAULT_CUSTOM_SELECTION: CleaningSelection = {
  removeExifGps: true,
  removeXmp: false,
  removeIptc: false,
  removeIcc: false,
};
