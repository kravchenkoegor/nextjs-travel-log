/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlace
// ====================================================

export interface GetPlace_place_coordinates {
  __typename: "Coordinates";
  latitude: number;
  longitude: number;
}

export interface GetPlace_place {
  __typename: "Place";
  address: string;
  coordinates: GetPlace_place_coordinates;
  image: string;
  userId: string;
}

export interface GetPlace {
  place: GetPlace_place;
}

export interface GetPlaceVariables {
  id: string;
}
