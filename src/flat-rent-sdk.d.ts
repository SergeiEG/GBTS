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
  price: number;
}

declare class FlatRentSdk {
  database: Database;
  constructor(database?: Database);

  // eslint-disable-next-line @typescript-eslint/ban-types
  get(id: string): Promise<Object | null>;

  search(parameters: Parameters): any;
  book(flatId: string, checkInDate: Date, checkOutDate: Date): any;
  _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void;
  _resetTime(date: Date): void;
  _calculateDifferenceInDays(startDate: Date, endDate: Date): number;
  _generateDateRange(from: Date, to: Date): Date;
  _generateTransactionId(): number;
  _areAllDatesAvailable(flat: object, dateRange: any): any;
  _formatFlatObject(flat: object, nightNumber: number): object;

  _readDatabase(): Database;

  _writeDatabase(database: Database): void;

  _syncDatabase(database: Database): void;
}
