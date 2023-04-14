const bingoEl = document.querySelector('#bingo-table');
const spinBtn = document.querySelector('#spin-btn');
const bingoArr = ['B', 'I', 'N', 'G', 'O'];
const bingoNum = [];

function displayBingoTable() {
  let lastNum = 0;
  let lastNumSecondArr = 0;
  for (let i = 1; i <= 5; i++) {
    const bingoItem = document.createElement('div');
    const text = document.createTextNode(bingoArr[i - 1]);
    bingoItem.classList.add(`letter-${bingoArr[i - 1]}`);
    bingoItem.appendChild(text);

    const bingoRow = document.createElement('div');
    bingoRow.classList.add('bingo-row');

    bingoRow.appendChild(bingoItem);
    bingoEl.appendChild(bingoRow);
    for (let j = 1; j <= 15; j++) {
      const bingoItem = document.createElement('div');
      const text = document.createTextNode(lastNum + j);
      bingoItem.classList.add('num');
      bingoItem.setAttribute('data-id', lastNum + j);
      bingoItem.appendChild(text);

      bingoRow.appendChild(bingoItem);
      bingoEl.appendChild(bingoRow);
      lastNumSecondArr = j;
      bingoNum.push(lastNum + j);
    }
    lastNum = i * lastNumSecondArr;
  }
}

function clickItem() {
  const results = [12, 43, 12, 54];
  console.log(bingoNum);

  for (let r of results) {
    for (let num of bingoNum) {
      if (r === num) {
        document.querySelector('.num').classList.add('active');
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', displayBingoTable);
spinBtn.addEventListener('click', clickItem);
