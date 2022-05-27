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
  if (userData instanceof Object) {
    return userData;
  }

  return userData.toString();
}

export function getFavoritesAmount() {
  const FavoritesAmount: unknown = JSON.parse(
    localStorage.getItem("favoritesAmount")
  );
  if (FavoritesAmount === null) {
    return 0;
  }
  if (FavoritesAmount === undefined) {
    return 0;
  }
  if (FavoritesAmount instanceof Array) {
    return FavoritesAmount.length;
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
