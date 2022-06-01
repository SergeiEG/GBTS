import { renderBlock } from "./lib.js";

export function renderUserBlock(
  login: string,
  avatar: string,
  favoriteItemsAmount?: number
) {
  const favoritesCaption =
    favoriteItemsAmount == 0 ? "ничего нет" : favoriteItemsAmount;
  const hasFavoriteItems = favoriteItemsAmount > 0 ? true : false;

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src="${avatar}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${login}</p>
          <p class="fav">
            <i class="heart-icon${
              hasFavoriteItems ? " active" : ""
            }"></i>${favoritesCaption} 
          </p>
      </div>
    </div>
    `
  );
}
