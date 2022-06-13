/* eslint-disable no-unused-vars */
export interface Parameters {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit?: number;
}
export interface Database {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: number[];
  bookedDates: any[];
  totalPrice: number;
}

declare class FlatRentSdk {
  database: Database;
  constructor(database?: Database);

  // eslint-disable-next-line @typescript-eslint/ban-types
  get(id: string): Promise<Object | null>;

  search(parameters: Parameters): Promise<Database[]>;
  book(flatId: string, checkInDate: Date, checkOutDate: Date): Promise<string>;
}
