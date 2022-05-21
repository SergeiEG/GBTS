/* eslint-disable no-undef */
/* eslint-disable prefer-const */

import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
import {getUserData, getFavoritesAmount, User} from './userData.js'

window.addEventListener('DOMContentLoaded', () => {
  localStorage.user = JSON.stringify({username: 'Ward', avatarUrl: '/img/avatar.png'})

  localStorage.favoritesAmount = JSON.stringify(6);

  const userData = getUserData();
  const favoritesAmountItem = getFavoritesAmount();

  if(userData instanceof Object && favoritesAmountItem instanceof Number){
    const user: User = Object.assign(userData)
    user.favoritesAmount = Number(favoritesAmountItem)

    console.log(user)

    renderUserBlock(user.username, user.avatarUrl, user.favoritesAmount);
  }
  renderToast(
    {
      text: 'Это пример уведомления. Используйте его при необходимости',
      type: 'success',
    },
    {
      name: 'Понял',
      handler: () => {
        console.log('Уведомление закрыто');
      },
    }
  );
});
