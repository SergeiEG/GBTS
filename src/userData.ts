import { renderUserBlock } from "./user.js";

export interface User {
  username: string;
  avatarUrl: string;
  favoritesAmount?: number;
}

export function getUserData(): unknown {
  const storage = localStorage.getItem("user");
  if (typeof storage === "string") {
    const userData: unknown = JSON.parse(storage);
    if (userData === null) {
      throw new Error("Elements in `overrides` cannot be null or undefined");
    }
    if (userData === undefined) {
      throw new Error("Elements in `overrides` cannot be null or undefined");
    }
    if (typeof userData === "object") {
      if ("username" in userData && "avatarUrl" in userData) {
        return userData;
      }
    }
  }
  return 0;
}

export function getFavoritesAmount(): unknown {
  const storage = localStorage.getItem("favoritesAmount");
  if (typeof storage === "string") {
    const favoritesAmount: unknown = JSON.parse(storage);
    if (favoritesAmount === null) {
      return 0;
    }
    if (favoritesAmount === undefined) {
      return 0;
    }
    if (favoritesAmount instanceof Array) {
      return favoritesAmount.length;
    }
  }
  return 0;
}

export function userBlock() {
  const userData = getUserData();
  const favoritesAmountItem = getFavoritesAmount();

  if (userData instanceof Object) {
    const user: User = Object.assign(userData);
    user.favoritesAmount = Number(favoritesAmountItem);

    renderUserBlock(user.username, user.avatarUrl, user.favoritesAmount);
  }
}
