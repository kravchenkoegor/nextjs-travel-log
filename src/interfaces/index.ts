export interface FormInput {
  email: string;
  password: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bounds {
  ne: Coordinates;
  sw: Coordinates;
}

export interface Viewport {
  center: Coordinates;
  zoom: number;
}
