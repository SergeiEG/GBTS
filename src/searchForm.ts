import { renderSearchResultsBlock } from "./search-results.js";
import { renderToast } from "./lib.js";

export interface SearchFormData {
  arrivalDate: Date;
  departureDate: Date;
  maxPrise?: number;
}

function responseToJson(requestPromise) {
  return requestPromise
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      renderSearchResultsBlock(JSON.parse(response));
    });
}
function dateToUnixStamp(date) {
  return date.getTime() / 1000;
}

export async function searchResult(data) {
  let url =
    "http://localhost:3030/places?" +
    `checkInDate=${dateToUnixStamp(data.arrivalDate)}&` +
    `checkOutDate=${dateToUnixStamp(data.departureDate)}&` +
    "coordinates=59.9386,30.3141";

  if (data.maxPrice != null) {
    url += `&maxPrice=${data.maxPrice}`;
  }

  return responseToJson(fetch(url));
}

export function book(placeId, data) {
  fetch(
    `http://localhost:3030/places/${placeId}?` +
      `checkInDate=${dateToUnixStamp(data.arrivalDate)}&` +
      `checkOutDate=${dateToUnixStamp(data.departureDate)}&`,
    { method: "PATCH" }
  )
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      const place = JSON.parse(response);
      console.log(place);
      const msg = `${place.name} забронирован.`;
      renderToast(
        {
          text: msg,
          type: "book",
        },
        {
          name: "Ok",
          handler: () => {
            console.log("Уведомление закрыто");
          },
        }
      );
    });
}
