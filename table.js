// Dummy data
const dummyData = [];
for (let i = 1; i <= 50; i++) {
  dummyData.push({
    name: `Name ${i}`,
    maths: Math.floor(Math.random() * 101),
    science: Math.floor(Math.random() * 101),
    english: Math.floor(Math.random() * 101),
    biology: Math.floor(Math.random() * 101)
  });
}

// Variables
const tableBody = document.getElementById('tableBody');
const pagination = document.getElementById('pagination');
const recordsPerPage = 5;
let currentPage = 1;

// Function to display data in the table
function displayData(data) {
  const start = (currentPage - 1) * recordsPerPage;
  const end = start + recordsPerPage;
  const paginatedData = data.slice(start, end);

  tableBody.innerHTML = '';
  paginatedData.forEach(item => {
    const row = `<tr>
                  <td>${item.name}</td>
                  <td>${item.maths}</td>
                  <td>${item.science}</td>
                  <td>${item.english}</td>
                  <td>${item.biology}</td>
                </tr>`;
    tableBody.innerHTML += row;
  });
}

// Function to generate pagination links
function generatePagination(data) {
  const pageCount = Math.ceil(data.length / recordsPerPage);
  let html = '';
  for (let i = 1; i <= pageCount; i++) {
    html += `<span class="page-link ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</span>`;
  }
  pagination.innerHTML = html;
}

// Function to change page
function changePage(page) {
  currentPage = page;
  displayData(dummyData);
  generatePagination(dummyData);
}

// Function to sort table
function sortTable(columnIndex) {
  const header = document.getElementsByTagName('th')[columnIndex];
  const sortOrder = header.dataset.order ? header.dataset.order : 'asc';

  dummyData.sort((a, b) => {
    const valA = a[header.innerText.toLowerCase()];
    const valB = b[header.innerText.toLowerCase()];
    if (sortOrder === 'asc') {
      return valA - valB;
    } else {
      return valB - valA;
    }
  });

  if (sortOrder === 'asc') {
    header.dataset.order = 'desc';
  } else {
    header.dataset.order = 'asc';
  }

  displayData(dummyData);
}

// Initial display
displayData(dummyData);
generatePagination(dummyData);
