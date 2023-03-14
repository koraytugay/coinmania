import {deletePaste, getAllPastes, getPaste, postPaste} from './pasteClient.js';

async function getMostRecentPasteContent() {
  const data = await getAllPastes()
      .then(response => response.json())
      .then(value => value.data[0].id)
      .then(pasteId => getPaste(pasteId))
      .then(response => response.json());
  return JSON.parse(data.paste.sections[0].contents);
}

async function updateDatabase(data) {
  await postPaste(data)
      .then(response => response.json())

  const pasteId = await getAllPastes()
      .then(response => response.json())
      .then(value => value.data[1].id);

  console.log('Deleting paste with id:', pasteId);
  await deletePaste(pasteId);
}

async function getCurrentUserData() {
  const username = localStorage.getItem('coinmania');
  const data = await getMostRecentPasteContent();
  return data.filter(value => value.name === username)[0];
}

getMostRecentPasteContent();

export {
  getMostRecentPasteContent,
  updateDatabase,
  getCurrentUserData
}
