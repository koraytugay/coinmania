import {getMostRecentPasteContent, updateDatabase,} from './pasteService.js';

const getCurrentUsername = () => localStorage.getItem('coinmania');

const logUserIn = () => {
  const name = document.getElementById('new-user-username').value;
  if (name) {
    const user = {name, usd: 100000, bitcoin: 0};
    getMostRecentPasteContent()
        .then(data => {
          data.push(user);
          return data;
        })
        .then(data => JSON.stringify(data))
        .then((data) => updateDatabase(data))
        .then(() => {
          localStorage.setItem('coinmania', user.name);
          window.location = window.location;
        });
  }
};

export {
  getCurrentUsername,
  logUserIn
}