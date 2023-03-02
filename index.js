const dataContainer = document.querySelector('.data-container');
const addButton = document.querySelector('.add-btn');
const dateEl = document.querySelector('#date');
const typeEl = document.querySelector('#type');
const numberEl = document.querySelector('#number');
const dacwotoEl = document.querySelector('#dacwoto');
const dacwaysaneEl = document.querySelector('#dacwaysan');
const garsEl = document.querySelector('#garsore');
const kalEl = document.querySelector('#kaliye');
let listCases = JSON.parse(localStorage.getItem('listCases')) || [];
let editIDList = -1;

function displayData() {
  dataContainer.innerHTML = '';
  listCases.forEach((cases, index) => {
    dataContainer.innerHTML += `
            <tr class="data" id=${index}>
                <td>${cases.date}</td>
                <td >${cases.nooca}</td>
                <td >${cases.DNo}</td>
                <td>${cases.Dacwoto}</td>
                <td> ${cases.Dacwaysane}</td>
                <td> ${cases.Garsoore}</td>
                <td> ${cases.kaaliye}</td>
                <td><button type="button" class="edit btn">edit</button></td>
                <td><button type="button" class="delete btn">remove</button></td>
            </tr>
    `;
  });
}

function saveData() {
  const formattedDate = new Date(dateEl.value).toISOString().slice(0, 10);
  if (editIDList >= 0) {
    const editedCase = listCases[editIDList];
    editedCase.date = formattedDate;
    editedCase.nooca = typeEl.value;
    editedCase.DNo = numberEl.value;
    editedCase.Dacwoto = dacwotoEl.value;
    editedCase.Dacwaysane = dacwaysaneEl.value;
    editedCase.Garsoore = garsEl.value;
    editedCase.kaaliye = kalEl.value;
    editIDList = -1;
  } else {
    listCases.push({
      date: formattedDate,
      nooca: typeEl.value,
      DNo: numberEl.value,
      Dacwoto: dacwotoEl.value,
      Dacwaysane: dacwaysaneEl.value,
      Garsoore: garsEl.value,
      kaaliye: kalEl.value,
    });
  }

  dateEl.value = '';
  typeEl.value = '';
  numberEl.value = '';
  dacwotoEl.value = '';
  dacwaysaneEl.value = '';
  garsEl.value = '';
  kalEl.value = '';
  displayData();
  localStorage.setItem('listCases', JSON.stringify(listCases));
}

addButton.addEventListener('click', () => {
  // e.preventDefault();
  saveData();
  displayData();
  localStorage.setItem('listCases', JSON.stringify(listCases));
});

dataContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit')) {
    const row = e.target.parentElement.parentElement;
    const ID = Number(row.id);
    editIDList = ID;
    const date = row.children[0].textContent;
    const nooca = row.children[1].textContent;
    const DNo = row.children[2].textContent;
    const Dacwoto = row.children[3].textContent;
    const Dacwaysane = row.children[4].textContent;
    const Garsoore = row.children[5].textContent;
    const kaaliye = row.children[6].textContent;

    dateEl.value = new Date(date).toISOString().substr(0, 10);
    typeEl.value = nooca;
    numberEl.value = DNo;
    dacwotoEl.value = Dacwoto;
    dacwaysaneEl.value = Dacwaysane;
    garsEl.value = Garsoore;
    kalEl.value = kaaliye;

    dataContainer.removeChild(row);
    displayData();
    localStorage.setItem('listCases', JSON.stringify(listCases));
  }
  if (e.target.classList.contains('delete')) {
    const row = e.target.parentElement.parentElement;
    if (row) {
      const { id } = row;
      listCases.splice(id, 1);
      displayData();
      localStorage.setItem('listCases', JSON.stringify(listCases));
    }
  }
});

/* eslint-disable max-len */
const originalLists = listCases.slice();
const searchInput = document.querySelector('.search');
searchInput.addEventListener('input', () => {
  const searchEl = searchInput.value.trim().toLowerCase();
  const filteredElements = originalLists.filter((cases) => cases.Garsoore.toLowerCase().includes(searchEl)
  || cases.Dacwoto.toLowerCase().includes(searchEl)
  || cases.Dacwaysane.toLowerCase().includes(searchEl));
  listCases = filteredElements;
  displayData(filteredElements);
  if (searchInput.value !== originalLists || listCases) {
    const par = document.querySelector('.error');
    par.innerHTML = 'Sorry! there is no matching element please try again';
    setTimeout(() => {
      par.style.display = 'none';
    }, 5000);
  }
});

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') { // check if escape key is pressed
    searchInput.value = '';
    listCases = originalLists;
    displayData(originalLists);
  }
});

document.addEventListener('DOMContentLoaded', displayData);