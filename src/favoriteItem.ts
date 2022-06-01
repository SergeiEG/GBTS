import { getFavoritesAmount } from "./userData.js";
import { userBlock } from "./userData.js";

export interface FavoritesItem {
  id: number;
  name: string;
  imgItem: string;
}

export function toggleFavoriteItem(item: FavoritesItem, element: HTMLElement) {
  let items = [];
  if (getFavoritesAmount() !== 0) {
    items = JSON.parse(localStorage.getItem("favoritesAmount"));
  }
  const findedItem = items.find((el) => el.id == item.id);
  if (findedItem !== undefined) {
    const indexItem = items.indexOf(findedItem);
    items.splice(indexItem, 1);
    localStorage.favoritesAmount = JSON.stringify(items);
    element.classList.remove("active");
    userBlock();
  } else {
    items.push(item);
    localStorage.favoritesAmount = JSON.stringify(items);
    element.classList.add("active");
    userBlock();
  }
}
