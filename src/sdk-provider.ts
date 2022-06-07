import { SearchFormData } from "./searchForm.js";
import { Place } from "./place.js";
import { FlatRentSdk, Database } from "./flat-rent-sdk.js";
import { BookData } from "./responseAPI.js";
import { renderToast } from "./lib.js";
import { renderSearchStubBlock } from "./search-results.js";

export class SdkProvider {
  public static provider = "sdk";
  private static sdk = new FlatRentSdk();
  private static differenceInDays = 0;

  public static find(filter: SearchFormData) {
    this.differenceInDays = this._calculateDifferenceInDays(
      filter.arrivalDate,
      filter.departureDate
    );
    return SdkProvider.sdk
      .search({
        city: filter.city,
        checkInDate: filter.arrivalDate,
        checkOutDate: filter.departureDate,
        priceLimit: filter.maxPrice,
      })
      .then((result: Database[]) => {
        return this.convertPlaceListResponse(result);
      });
  }

  public static book(data: BookData) {
    SdkProvider.sdk
      .book(data.id, data.arrivalDate, data.departureDate)
      .then((result: string) => {
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
              renderSearchStubBlock();
            },
          }
        );
      });
  }

  private static convertPlaceListResponse(response: Database[]): Place[] {
    return response.map((item) => {
      return this.convertPlaceResponse(item);
    });
  }

  private static convertPlaceResponse(item: Database): Place {
    let itemPhoto = "string";
    if (typeof item.photos[0] !== "undefined") {
      itemPhoto = item.photos[0];
    }

    return new Place(
      SdkProvider.provider,
      String(item.id),
      item.title,
      itemPhoto,
      "N/A",
      item.details,
      this._calcPriceForOneDay(item.totalPrice, this.differenceInDays),
      item.totalPrice
    );
  }

  private static _calculateDifferenceInDays(
    startDate: Date,
    endDate: Date
  ): number {
    const difference = endDate.getTime() - startDate.getTime();

    return Math.floor(difference / (1000 * 60 * 60 * 24));
  }

  private static _calcPriceForOneDay(
    totalPrice: number,
    differenceInDays: number
  ) {
    if (differenceInDays != null) {
      return totalPrice / differenceInDays;
    }
    return;
  }
}
