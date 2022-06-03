/* eslint-disable no-undef */
/* eslint-disable prefer-const */

import { renderToast } from "./lib.js";
import { userBlock } from "./userData.js";
import { entryMin, depMin } from "./availableDates.js";
import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";

window.addEventListener("DOMContentLoaded", () => {
  window.localStorage.setItem(
    "user",
    JSON.stringify({
      username: "Ward",
      avatarUrl: "/img/avatar.png",
    })
  );

  userBlock();
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
