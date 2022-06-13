import { SearchFormData } from "./searchForm.js";
import { Place } from "./place.js";
import { PlaceApi, BookData } from "./responseAPI.js";
import { renderToast } from "./lib.js";
import { renderSearchStubBlock } from "./search-results.js";

export abstract class ApiProvider {
  public static provider = "api";
  private static apiUrl = "http://localhost:3030/places?";
  private static differenceInDays = 0;

  private static _dateToUnixStamp(date: Date) {
    return date.getTime() / 1000;
  }

  private static _responseToJson(
    requestPromise: Promise<Response>
  ): Promise<Place[]> {
    return requestPromise
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        return this.convertPlaceListResponse(JSON.parse(response));
      });
  }

  public static find(filter: SearchFormData) {
    this.differenceInDays = this._calculateDifferenceInDays(
      filter.arrivalDate,
      filter.departureDate
    );
    let url =
      ApiProvider.apiUrl +
      `checkInDate=${this._dateToUnixStamp(filter.arrivalDate)}&` +
      `checkOutDate=${this._dateToUnixStamp(filter.departureDate)}&` +
      "coordinates=59.9386,30.3141";
    if (filter.maxPrice != null) {
      url += `&maxPrice=${filter.maxPrice}`;
    }
    return this._responseToJson(fetch(url));
  }

  public static book(data: BookData) {
    fetch(
      `http://localhost:3030/places/${data.id}?` +
        `checkInDate=${this._dateToUnixStamp(data.arrivalDate)}&` +
        `checkOutDate=${this._dateToUnixStamp(data.departureDate)}&`,
      { method: "PATCH" }
    )
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        const place = JSON.parse(response);
        const msg = `${place.name} забронирован.`;
        renderToast(
          {
            text: msg,
            type: "book",
          },
          {
            name: "Ok",
            handler: () => {
              renderSearchStubBlock();
            },
          }
        );
      });
  }

  private static convertPlaceListResponse(response: PlaceApi[]): Place[] {
    return response.map((item) => {
      return this.convertPlaceResponse(item);
    });
  }

  private static convertPlaceResponse(item: PlaceApi): Place {
    return new Place(
      ApiProvider.provider,
      String(item.id),
      item.name,
      item.image,
      item.remoteness,
      item.description,
      item.price,
      this._calcTotalPrice(item.price, this.differenceInDays)
    );
  }

  private static _calculateDifferenceInDays(
    startDate: Date,
    endDate: Date
  ): number {
    const difference = endDate.getTime() - startDate.getTime();

    return Math.floor(difference / (1000 * 60 * 60 * 24));
  }

  private static _calcTotalPrice(price: number, differenceInDays: number) {
    if (differenceInDays != null) {
      return differenceInDays * price;
    }
    return;
  }
}
