export enum AppScreen {
  Home = 'HOME',
  RideRequest = 'RIDE_REQUEST',
  RideTracking = 'RIDE_TRACKING',
  Services = 'SERVICES',
  Activity = 'ACTIVITY',
  Profile = 'PROFILE',
}

export type Screen = AppScreen;

export interface RideDetails {
  pickup: string;
  dropoff: string;
}

export interface Driver {
  id: number;
  name: string;
  carModel: string;
  carColor: string;
  plateNumber: string;
  rating: number;
  reviews: number;
  eta: string; // e.g., "5 min"
  price: number;
  imageUrl: string;
}

export interface PastRide {
    id: number;
    date: string;
    pickup: string;
    dropoff: string;
    price: number;
    driverName: string;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  rating: number;
}