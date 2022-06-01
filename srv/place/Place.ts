export interface Place {
  availableDates: number[];
  id: number;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}
