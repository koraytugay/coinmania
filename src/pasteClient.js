const pasteApiUrl = 'https://api.paste.ee/v1/pastes';

const headers = {
  'X-Auth-Token': '',
  'Content-Type': 'application/json'
}

function postPaste(data) {
  const body = {
    description: 'description-yyy',
    sections: [
      {
        name: 'section',
        syntax: 'json',
        contents: data,
      }
    ]
  }

  return fetch(pasteApiUrl, {
    headers,
    method: 'POST',
    body: JSON.stringify(body)
  });
}

const getAllPastes = () => fetch(pasteApiUrl, {headers});
const getPaste = id => fetch(`${pasteApiUrl}/${id}`, {headers});
const deletePaste = id => fetch(`${pasteApiUrl}/${id}`, {headers, method: 'DELETE'});

export {
  postPaste, getPaste, getAllPastes, deletePaste
}
