export interface PlaceApi {
  id: number;
  name: string;
  price: number;
  image: string;
  remoteness: number;
  description: string;
  bookedDates: [];
}

export interface BookData {
  id: string;
  arrivalDate: Date;
  departureDate: Date;
}
