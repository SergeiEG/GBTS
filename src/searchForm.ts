export interface SearchFormData {
  arrivalDate: Date;
  departureDate: Date;
  maxPrise?: number;
}

export function searchResult(data) {
  console.log(data);
}
