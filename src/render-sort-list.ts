import { Place } from "./place.js";

export function renderSortListBlock(arr: Place[]) {
  const ulList = document.createElement("ul");
  ulList.classList.add("results-list");

  arr.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add("result");
    li.innerHTML = el.renderPlacesListBlock();
    ulList.appendChild(li);
  });
  return ulList;
}
