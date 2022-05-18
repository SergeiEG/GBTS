/* eslint-disable no-undef */
/* eslint-disable prefer-const */
import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';

window.addEventListener('DOMContentLoaded', () => {
  let entryDef = new Date;
  entryDef.setDate(entryDef.getDate() + 1);
  let depDef = new Date;
  depDef.setDate(depDef.getDate() + 3);

  renderUserBlock(5, 'Wade KApss', '/img/avatar.png');
  renderSearchFormBlock(entryDef, depDef);
  renderSearchStubBlock();
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
