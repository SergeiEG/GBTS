/* eslint-disable no-undef */
/* eslint-disable prefer-const */

import { renderUserBlock } from "./user.js";
import { renderToast } from "./lib.js";
import { getUserData, getFavoritesAmount, User } from "./userData.js";
import { entryMin, depMin } from "./availableDates.js";
import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";

window.addEventListener("DOMContentLoaded", () => {
  localStorage.user = JSON.stringify({
    username: "Ward",
    avatarUrl: "/img/avatar.png",
  });

  localStorage.favoritesAmount = JSON.stringify(6);

  const userData = getUserData();
  const favoritesAmountItem = getFavoritesAmount();

  if (userData instanceof Object) {
    const user: User = Object.assign(userData);
    user.favoritesAmount = Number(favoritesAmountItem);

    renderUserBlock(user.username, user.avatarUrl, user.favoritesAmount);
  }
  renderSearchFormBlock(entryMin, depMin);
  renderSearchStubBlock();
  renderToast(
    {
      text: "Это пример уведомления. Используйте его при необходимости",
      type: "success",
    },
    {
      name: "Понял",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  );
});
