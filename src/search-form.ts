import { renderBlock } from "./lib.js";
import { maxDate } from "./availableDates.js";
import { SearchFormData, searchResult } from "./searchForm.js";

export function renderSearchFormBlock(entry: string, dep: string) {
  renderBlock(
    "search-form-block",
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${entry}" min="${entry}" max="${maxDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${dep}" min="${dep}" max="${maxDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="search-btn">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
  const btn = <HTMLElement>document.getElementById("search-btn");
  btn.onclick = (event) => {
    event.preventDefault();
    const ArrivalDateString = (<HTMLInputElement>(
      document.getElementById("check-in-date")
    )).value;
    const DepartureDateString = (<HTMLInputElement>(
      document.getElementById("check-out-date")
    )).value;
    const maxPriseString = (<HTMLInputElement>(
      document.getElementById("max-price")
    )).value;

    const userArrivalDate: Date = new Date(ArrivalDateString);
    const userDepartureDate: Date = new Date(DepartureDateString);
    const userMaxPrise: number = +maxPriseString;

    const userSearchForm: SearchFormData = {
      arrivalDate: userArrivalDate,
      departureDate: userDepartureDate,
      maxPrise: userMaxPrise,
    };
    searchResult(userSearchForm);
  };
}
