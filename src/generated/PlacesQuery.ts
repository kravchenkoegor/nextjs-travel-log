/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlacesQuery
// ====================================================

export interface PlacesQuery_places_coordinates {
  __typename: "Coordinates";
  latitude: number;
  longitude: number;
}

export interface PlacesQuery_places {
  __typename: "Place";
  _id: string;
  address: string;
  coordinates: PlacesQuery_places_coordinates;
  image: string;
  userId: string;
}

export interface PlacesQuery {
  places: PlacesQuery_places[];
}
