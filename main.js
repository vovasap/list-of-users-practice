const btnCreateTable = document.querySelector('.btn__create-table');
const id = document.querySelector('.id');
const postAddress = document.querySelector('.post-address');
const geo = document.querySelector('.geo');
const phone = document.querySelector('.phone');
const company = document.querySelector('.company');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.btn__close');

const createTable = function () {
  const tableHeader = ['name', 'username', 'email', 'website'];

  const table = document.createElement('table');
  table.setAttribute('class', 'users');

  let createTableHeader = () => {
    let row = table.appendChild(createTableRow());
    tableHeader.forEach((header) => {
      row.appendChild(createTableCell(header.toUpperCase(), 'th'));
    });
    return row;
  };

  let createTableContent = (jsonData) => {
    jsonData.forEach((obj) => {
      let row = table.appendChild(createTableRow());
      row.setAttribute('class', `${obj.id}`);
      row.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        loadAdditionalInfo(row.getAttribute('class'));
      });
      tableHeader.forEach((key) => {
        row.appendChild(createTableCell(obj[key]));
      });
    });
  };

  let createTableRow = () => {
    return document.createElement('tr');
  };

  let createTableCell = (data, element = 'td') => {
    let cell = document.createElement(element);
    cell.textContent = data;
    return cell;
  };

  let fillModalWindow = (obj) => {
    id.textContent = `ID: ${obj.id}`;
    postAddress.textContent = `Address: ${obj.address.street} street, ${obj.address.suite}, ${obj.address.city} city, ${obj.address.zipcode}`;
    geo.textContent = `Geographical coordinates: ${obj.address.geo.lat}, ${obj.address.geo.lng}`;
    phone.textContent = `Phone number: ${obj.phone}`;
    company.textContent = `Company: ${obj.company.name}`;
  };

  let loadTableContent = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        createTableContent(jsonData);
      });
  };

  let loadAdditionalInfo = (id) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        fillModalWindow(jsonData[id - 1]);
      });
  };

  createTableHeader();
  loadTableContent();

  return table;
};

let addTable = () => {
  let innerContainer = document.querySelector('.inner-container');
  let users = innerContainer.children;
  let table = document.querySelector('.users');
  if (users[users.length - 1] == table) {
    innerContainer.removeChild(table);
    innerContainer.appendChild(createTable());
  } else {
    innerContainer.appendChild(createTable());
  }
};

overlay.addEventListener('click', (event) => {
  const target = event.target;
  if (target == overlay) {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
  }
});

document.body.addEventListener('keyup', (event) => {
  if ((event.code = 'Escape')) {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
  }
});

btnCreateTable.addEventListener('click', addTable);
btnCloseModal.addEventListener('click', () => {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
});
