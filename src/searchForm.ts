import { renderSearchResultsBlock } from "./search-results.js";
import { ApiProvider } from "./api-provider.js";
import { SdkProvider } from "./sdk-provider.js";
import { Place } from "./place.js";
import { BookData } from "./responseAPI.js";

export interface SearchFormData {
  city: string;
  arrivalDate: Date;
  departureDate: Date;
  maxPrice?: number;
}
export async function searchResult(data: SearchFormData) {
  Promise.all([ApiProvider.find(data), SdkProvider.find(data)]).then(
    (results) => {
      const allResults: Place[] = [].concat(results[0], results[1]);
      console.log(allResults);
      renderSearchResultsBlock(allResults);
    }
  );
}
export function book(placeId, provider, data: SearchFormData) {
  const bookData: BookData = {
    id: placeId,
    arrivalDate: data.arrivalDate,
    departureDate: data.departureDate,
  };
  if (provider === "api") ApiProvider.book(bookData);
  else SdkProvider.book(bookData);
}
