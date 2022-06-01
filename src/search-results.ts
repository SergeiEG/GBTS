import { renderBlock } from "./lib.js";
import { FavoritesItem, toggleFavoriteItem } from "./favoriteItem.js";
import { getFavoritesAmount } from "./userData.js";
import { getUserData } from "./search-form.js";
import { book } from "./searchForm.js";
import { renderToast } from "./lib.js";

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

function renderPlacesListBlock(el, checked) {
  let item = {
    id: null,
    img: "",
    title: "",
    remoteness: null,
    details: "",
    price: 0,
  };
  if (checked) {
    item = {
      id: el.id,
      img: el.photos[0],
      title: el.title,
      remoteness: "N/A",
      details: el.details,
      price: el.totalPrice,
    };
  } else {
    item = {
      id: el.id,
      img: el.image,
      title: el.name,
      remoteness: el.remoteness,
      details: el.description,
      price: el.price,
    };
  }
  console.log(item);
  let items = [];
  if (getFavoritesAmount() !== 0) {
    items = JSON.parse(localStorage.getItem("favoritesAmount"));
  }
  const findedItem = items.find((item) => item.id === el.id);
  const hasFavoriteItem = findedItem == undefined ? false : true;

  return `<li class="result">
    <div class="result-container">
      <div class="result-img-container">
        <div data-id ='${item.id}' class="favorites${
    hasFavoriteItem ? " active" : ""
  }"></div>
        <img class="result-img" src="${item.img}" alt="">
      </div>	
      <div class="result-info">
        <div class="result-info--header">
          <p>${item.title}</p>
          <p class="price">${item.price}&#8381;</p>
        </div>
        <div class="result-info--map"><i class="map-icon"></i> ${
          item.remoteness
        }км от вас</div>
        <div class="result-info--descr">${item.details}</div>
        <div class="result-info--footer">
          <div>
            <button data-id ='${item.id}'>Забронировать</button>
          </div>
        </div>
      </div>
    </div>
  </li>`;
}

export function renderSearchResultsBlock(result, checked: boolean) {
  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">

    </ul>
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
          console.log("Уведомление закрыто");
        },
      }
    );
    timer = false;
  }, dalay);
  const liList = <HTMLElement>document.querySelector(".results-list");
  result.forEach((el) => {
    liList.insertAdjacentHTML("beforeend", renderPlacesListBlock(el, checked));
  });

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
        book(element.dataset.id, getUserData(), checked);
      }
    }
  });
}
