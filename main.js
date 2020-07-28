$container = document.createElement('div');
$container.setAttribute('class', 'inner-container');
const tableHeader = ['name', 'username', 'email', 'website'];

const $table = document.createElement('table');

const $overlay = document.createElement('div');
$overlay.setAttribute('class', 'overlay hidden');

const $modal = document.createElement('div');
$modal.setAttribute('class', 'modal hidden');

const $btnCloseModal = document.createElement('button');
$btnCloseModal.setAttribute('class', 'btn__close');

document.body.appendChild($container);
document.body.appendChild($overlay);
document.body.appendChild($modal);

let createTable = async () => {
  let users = await (
    await fetch('https://jsonplaceholder.typicode.com/users')
  ).json();

  let $header = createTableHeader();
  let $content = createTableContent(users);

  $table.appendChild($header);
  $content.forEach((row) => {
    $table.appendChild(row);
  });
  $container.appendChild($table);
};

let createTableHeader = () => {
  let $row = document.createElement('tr');

  tableHeader.forEach((header) => {
    $row.appendChild(createTableCell(header.toUpperCase(), 'th'));
  });
  return $row;
};

let createTableCell = (text, element = 'td') => {
  let $cell = document.createElement(element);
  $cell.textContent = text;
  return $cell;
};

let createTableContent = (users) => {
  let $content = [];
  users.forEach((user) => {
    let $row = document.createElement('tr');
    $row.setAttribute('class', `${user.id}`);
    $row.addEventListener('click', () => {
      $modal.appendChild($btnCloseModal);
      $btnCloseModal.textContent = 'close';
      $modal.appendChild(getModalContent(user));
      $overlay.classList.remove('hidden');
      $modal.classList.remove('hidden');
      // loadAdditionalInfo($row.getAttribute('class'));
    });
    tableHeader.forEach((key) => {
      $row.appendChild(createTableCell(user[key]));
    });
    $content.push($row);
  });

  return $content;
};

let getModalContent = (user, nestingLevel = 0) => {
  let $content = document.createDocumentFragment();
  for (const key in user) {
    let $line = document.createElement('p');
    if (typeof user[key] === 'object') {
      $line.textContent = `${key}: `;
      $content.appendChild($line);
      $line.style.paddingLeft = nestingLevel * 15 + 'px';
      let newNestingLevel = 1 + nestingLevel;
      $content.appendChild(getModalContent(user[key], newNestingLevel));
    } else {
      $line.style.paddingLeft = nestingLevel * 15 + 'px';
      $line.textContent = `${key}: ${user[key]}`;
      $content.appendChild($line);
    }
  }
  return $content;
};

createTable();

document.body.addEventListener('keyup', (event) => {
  if ((event.code = 'Escape')) {
    $overlay.classList.add('hidden');
    $modal.classList.add('hidden');
    $modal.textContent = '';
  }
});

$btnCloseModal.addEventListener('click', () => {
  $overlay.classList.add('hidden');
  $modal.classList.add('hidden');
  $modal.textContent = '';
});

$overlay.addEventListener('click', (event) => {
  const target = event.target;
  if (target == $overlay) {
    $overlay.classList.add('hidden');
    $modal.classList.add('hidden');
    $modal.textContent = '';
  }
});
