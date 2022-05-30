import { renderSearchResultsBlock } from "./search-results.js";
import { renderToast } from "./lib.js";
import { FlatRentSdk, Database } from "./flat-rent-sdk.js";

const sdk = new FlatRentSdk();

export interface SearchFormData {
  city: string;
  arrivalDate: Date;
  departureDate: Date;
  maxPrise?: number;
}

function responseToJson(requestPromise, checked) {
  return requestPromise
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      renderSearchResultsBlock(JSON.parse(response), checked);
    });
}
function dateToUnixStamp(date) {
  return date.getTime() / 1000;
}

export async function searchResult(data: SearchFormData, checked: boolean) {
  if (checked) {
    sdk
      .search({
        city: data.city,
        checkInDate: data.arrivalDate,
        checkOutDate: data.departureDate,
        priceLimit: data.maxPrise,
      })
      .then((result: Database) => {
        renderSearchResultsBlock(result, checked);
      });
  } else {
    let url =
      "http://localhost:3030/places?" +
      `checkInDate=${dateToUnixStamp(data.arrivalDate)}&` +
      `checkOutDate=${dateToUnixStamp(data.departureDate)}&` +
      "coordinates=59.9386,30.3141";
    if (data.maxPrise != null) {
      url += `&maxPrice=${data.maxPrise}`;
    }
    return responseToJson(fetch(url), checked);
  }
}

export function book(placeId, data, check) {
  if (check) {
    sdk.book(placeId, data.arrivalDate, data.departureDate).then((result) => {
      console.log("book flat", result);
      const msg = "Номер забронирован.";
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
  } else {
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
}
