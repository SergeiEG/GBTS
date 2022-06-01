import { renderUserBlock } from "./user.js";

export interface User {
  username: string;
  avatarUrl: string;
  favoritesAmount?: number;
}

export function getUserData() {
  const userData: unknown = JSON.parse(localStorage.getItem("user"));

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

  return userData.toString();
}

export function getFavoritesAmount() {
  const favoritesAmount: unknown = JSON.parse(
    localStorage.getItem("favoritesAmount")
  );
  if (favoritesAmount === null) {
    return 0;
  }
  if (favoritesAmount === undefined) {
    return 0;
  }
  if (favoritesAmount instanceof Array) {
    return favoritesAmount.length;
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
