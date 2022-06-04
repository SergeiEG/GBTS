import { Place } from "./place.js";
import { SortListСhoice } from "./search-sort-enum.js";
import { renderSortListBlock } from "./render-sort-list.js";

export function sortResult(arr: Place[], select) {
  if (select === SortListСhoice.cheaper)
    return renderSortListBlock(sortCheperFirstList(arr));
  if (select === SortListСhoice.expensive)
    return renderSortListBlock(sortExpensiveFirstList(arr));
  if (select === SortListСhoice.remote)
    return renderSortListBlock(sortRemoteFirstList(arr));
}

function sortCheperFirstList(arr: Place[]): Place[] {
  const items = [...arr];
  items.sort((a, b) => {
    return a.priceForOneDay - b.priceForOneDay;
  });
  console.log(items);
  return items;
}

function sortExpensiveFirstList(arr: Place[]): Place[] {
  const items = [...arr];
  items.sort((a, b) => {
    return b.priceForOneDay - a.priceForOneDay;
  });
  return items;
}

function sortRemoteFirstList(arr: Place[]): Place[] {
  const items = [...arr];
  items.sort((a, b) => {
    if (typeof a.remoteness === "string") return 1;
    if (typeof b.remoteness === "string") return -1;
    return a.remoteness - b.remoteness;
  });
  return items;
}
