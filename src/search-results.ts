import { renderBlock } from "./lib.js";
import { FavoritesItem, toggleFavoriteItem } from "./favoriteItem.js";
import { getUserData } from "./search-form.js";
import { book } from "./searchForm.js";
import { renderToast } from "./lib.js";
import { SortListСhoice } from "./search-sort-enum.js";
import { sortResult } from "./sort-result.js";
import { renderSortListBlock } from "./render-sort-list.js";

export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export function renderSearchResultsBlock(result) {
  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select id="select-id">
                <option value="${SortListСhoice.cheaper}" selected="">Сначала дешёвые</option>
                <option value="${SortListСhoice.expensive}">Сначала дорогие</option>
                <option value="${SortListСhoice.remote}">Сначала ближе</option>
            </select>
        </div>
    </div>
    <div class="list-result-block">

    </div>
    `
  );
  let timer = true;
  const dalay = 300000;
  setTimeout(() => {
    renderToast(
      {
        text: "5 мин прошло, обнови поиск",
        type: "success",
      },
      {
        name: "Понял",
        handler: () => {
          renderSearchStubBlock();
        },
      }
    );
    timer = false;
  }, dalay);
  const liList = <HTMLElement>document.querySelector(".list-result-block");
  liList.appendChild(renderSortListBlock(result));

  const selectSortList = <HTMLSelectElement>(
    document.querySelector("#select-id")
  );
  selectSortList.addEventListener("change", () => {
    liList.removeChild(liList.lastChild);
    liList.appendChild(sortResult(result, selectSortList.value));
    eventForPlace();
  });

  const eventForPlace = () => {
    const resultsList = <HTMLElement>document.querySelector(".results-list");
    resultsList.addEventListener("click", (event) => {
      const element = event.target as HTMLElement;
      if (element.classList.contains("favorites")) {
        const item = result.find((el) => el.id === element.dataset.id);
        const favoriteItem: FavoritesItem = {
          id: item.id,
          name: item.name,
          imgItem: item.image,
        };
        toggleFavoriteItem(favoriteItem, element);
      } else if (element.tagName !== "BUTTON") return;
      else {
        if (timer) {
          book(element.dataset.id, element.dataset.provider, getUserData());
        }
      }
    });
  };
  eventForPlace();
}
