/* eslint-disable no-unused-vars */
import { getFavoritesAmount } from "./userData.js";
import { FavoritesItem } from "./favoriteItem.js";

export class Place {
  constructor(
    private readonly provider: string,
    public readonly originalId: string,
    public readonly title: string,
    public readonly photo: string,
    public readonly remoteness: number | "N/A",
    public readonly details: string,
    public readonly priceForOneDay: number | undefined,
    public readonly totalPrice: number | undefined
  ) {}

  get id() {
    return this.provider + "-" + this.originalId;
  }

  public renderPlacesListBlock() {
    let items = [];
    if (getFavoritesAmount() !== 0) {
      const storage = localStorage.getItem("favoritesAmount");
      if (typeof storage === "string") {
        items = JSON.parse(storage);
      }
    }
    const findedItem = items.find((item: FavoritesItem) => item.id === this.id);
    const hasFavoriteItem = findedItem === undefined ? false : true;

    return `
    <div class="result-container">
      <div class="result-img-container">
        <div data-id ='${this.id}' class="favorites${
      hasFavoriteItem ? " active" : ""
    }"></div>
        <img class="result-img" src="${this.photo}" alt="">
      </div>	
      <div class="result-info">
        <div class="result-info--header">
          <p>${this.title}</p>
          <div>
            <p class="price">Цена за ночь${this.priceForOneDay}&#8381;</p>
            <p class="price">Полная стоимость${this.totalPrice}&#8381;</p>
          </div>
        </div>
        <div class="result-info--map"><i class="map-icon"></i> ${
          this.remoteness
        } км от вас</div>
        <div class="result-info--descr">${this.details}</div>
        <div class="result-info--footer">
          <div>
            <button data-provider ='${this.provider}' data-id ='${
      this.originalId
    }'>Забронировать</button>
          </div>
        </div>
      </div>
    </div>
  `;
  }
}
