import {getMostRecentPasteContent, getCurrentUserData, updateDatabase} from './pasteService.js';
import {getCurrentUsername, logUserIn} from './registrationService.js';

document.getElementById('login-button').onclick = logUserIn;
document.getElementById('buy-bitcoin-button').onclick = buyBitcoinHandler;
document.getElementById('sell-bitcoin-button').onclick = sellBitcoinHandler;

const bitcoinAmountInput = document.getElementById('bitcoin-amount');

function drawLogin() {
  const username = getCurrentUsername();

  const currentUserDiv = document.getElementById('current-user-div');
  const loginForm = document.getElementById('login-form');

  if (username) {
    loginForm.hidden = true;
    getMostRecentPasteContent()
        .then(data => {
          const currentUser = data.filter(value => value.name === username)[0];
          document.getElementById('current-user-header').innerText = currentUser.name;
        });
  }
  else {
    currentUserDiv.hidden = true;
  }
}

function drawCurrentBitcoinPrice() {
  getBitcoinPrice().then(value => {
    document.getElementById('current-bitcoin-price').innerText = `Current Bitcoin Price: $${value.toFixed(2)}`;
  });
}

// https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/
// https://apipheny.io/free-api/

function getBitcoinPrice() {
  return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => response.json())
      .then(value => value.bpi.USD.rate)
      .then(value => parseFloat(value.replace(',', '')));
}

async function drawUsersTableBody() {
  const bitcoinPrice = await getBitcoinPrice();
  const usersTableBody = document.getElementById('users-table-body');
  getMostRecentPasteContent().then(entries => {
    for (const entry of entries) {
      const tableRow = document.createElement('tr');

      const name = document.createElement('td');
      name.innerText = entry.name;

      const usd = document.createElement('td');
      usd.innerText = entry.usd.toFixed(2);

      const bitcoin = document.createElement('td');
      bitcoin.innerText = entry.bitcoin.toFixed(2);

      const totalValue = document.createElement('td');
      totalValue.innerText = ((bitcoinPrice * entry.bitcoin) + entry.usd).toFixed(2)

      tableRow.append(name, usd, bitcoin, totalValue);
      usersTableBody.append(tableRow);
    }
  });
}

async function buyBitcoinHandler() {
  const bitcoinAmount = parseFloat(parseFloat(bitcoinAmountInput.value).toFixed(2));
  if (typeof bitcoinAmount === 'number') {
    const currentBitcoinPrice = await getBitcoinPrice();
    const currentUser = await getCurrentUserData();
    if (currentUser.usd <= currentBitcoinPrice * bitcoinAmount) {
      alert('Not enough funds! Stay SAFU.')
    }
    else {
      currentUser.usd = currentUser.usd - currentBitcoinPrice * bitcoinAmount;
      currentUser.bitcoin = currentUser.bitcoin + bitcoinAmount;

      let data = await getMostRecentPasteContent();
      data = data.filter(value => value.name !== currentUser.name);
      data.push(currentUser);
      await updateDatabase(JSON.stringify(data));
      window.location = window.location;
    }
  }
  else {
    alert('Not a valid number!');
  }
}

async function sellBitcoinHandler() {
  const bitcoinAmount = parseFloat(parseFloat(bitcoinAmountInput.value).toFixed(2));
  if (typeof bitcoinAmount === 'number') {
    const currentBitcoinPrice = await getBitcoinPrice();
    const currentUser = await getCurrentUserData();
    if (currentUser.bitcoin < bitcoinAmount) {
      alert('You do not have that many coins! Stay SAFU.')
    }
    else {
      currentUser.usd = currentUser.usd + currentBitcoinPrice * bitcoinAmount;
      currentUser.bitcoin = currentUser.bitcoin - bitcoinAmount;

      let data = await getMostRecentPasteContent();
      data = data.filter(value => value.name !== currentUser.name);
      data.push(currentUser);
      await updateDatabase(JSON.stringify(data));
      window.location = window.location;
    }
  }
  else {
    alert('Not a valid number!');
  }
}

drawUsersTableBody().then(() => Promise.resolve());
drawCurrentBitcoinPrice();
drawLogin();