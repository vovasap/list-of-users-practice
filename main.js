const btnTest = document.querySelector('.btn-create-table');

const createTable = function () {
  const tableHeader = ['name', 'username', 'email', 'website'];

  const table = document.createElement('table');
  table.setAttribute('class', 'users');

  const btnLoadJsonData = document.querySelector('.btn');

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

  let loadJsonData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        createTableContent(jsonData);
      });
  };

  createTableHeader();
  loadJsonData();

  return table;
};

let addTable = () => {
  let container = document.querySelector('.container');
  let users = container.children;
  let table = document.querySelector('.users');
  if (users[users.length - 1] == table) {
    container.removeChild(table);
    container.appendChild(createTable());
  } else {
    container.appendChild(createTable());
  }
};

btnTest.addEventListener('click', addTable);
