// Function to handle form submission
function submitForm() {
  const bookName = document.getElementById('bookName').value;
  const author = document.getElementById('author').value;
  const publisher = document.getElementById('publisher').value; // Added publisher input
  const date = document.getElementById('date').value;

  // Retrieve existing data from localStorage or initialize it as an empty array
  const existingData = JSON.parse(localStorage.getItem('libraryData')) || [];

  // Create a new object for the submitted data
  const newData = {
    bookName: bookName,
    author: author,
    publisher: publisher, // Store the publisher information
    date: date,
  };

  // Add the new data to the existing array
  existingData.push(newData);

  // Store the updated data back in localStorage
  localStorage.setItem('libraryData', JSON.stringify(existingData));

  // Create a new table row
  const table = document.getElementById('dataTable');
  const newRow = table.insertRow();

  // Populate the new row with data
  newRow.innerHTML = `
    <td>${bookName}</td>
    <td>${author}</td>
    <td>${publisher}</td> <!-- Display publisher in the table -->
    <td>${date}</td>
    <td>
      <button onclick="deleteRow(this)">Delete</button>
      <button onclick="updateRow(this)">Update</button>
    </td>
  `;

  // Clear the form fields after submission
  document.getElementById('bookName').value = '';
  document.getElementById('author').value = '';
  document.getElementById('publisher').value = '';
  document.getElementById('date').value = '';

  // Update local storage with the new data
  updateLocalStorage();
}

// Function to delete a row
function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.remove();

  // Update local storage after deleting a row
  updateLocalStorage();
}

// Function to update a row
function updateRow(button) {
  const row = button.parentNode.parentNode;
  const cells = row.cells;

  // Check if row is in edit mode
  if (cells[1].querySelector('input')) {
    const updatedData = {
      bookName: cells[1].querySelector('input').value,
      author: cells[2].querySelector('input').value,
      publisher: cells[3].querySelector('input').value,
      date: cells[4].querySelector('input').value,
    };

    cells[1].textContent = updatedData.bookName;
    cells[2].textContent = updatedData.author;
    cells[3].textContent = updatedData.publisher;
    cells[4].textContent = updatedData.date;

    // Update local storage with the new data
    updateLocalStorage();
  } else {
    // Replace the "Delete" and "Update" buttons with "Save" and "Cancel" buttons in the "Actions" field
    cells[5].innerHTML = `
      <button onclick="saveUpdate(this)">Save</button>
      <button onclick="cancelUpdate(this)">Cancel</button>
    `;

    // Create input fields for editing
    cells[1].innerHTML = `<input type="text" value="${cells[1].textContent}">`;
    cells[2].innerHTML = `<input type="text" value="${cells[2].textContent}">`;
    cells[3].innerHTML = `<input type="text" value="${cells[3].textContent}">`;
    cells[4].innerHTML = `<input type="date" value="${cells[4].textContent}">`;
  }
}

// Function to save an updated row
function saveUpdate(button) {
  const row = button.parentNode.parentNode;
  const cells = row.cells;

  // Update local storage with the new data
  updateLocalStorage();

  // Restore the "Delete" and "Update" buttons in the "Actions" field
  cells[5].innerHTML = `
    <button onclick="deleteRow(this)">Delete</button>
    <button onclick="updateRow(this)">Update</button>
  `;
}

// Function to cancel editing an updated row
function cancelUpdate(button) {
  const row = button.parentNode.parentNode;
  const cells = row.cells;

  // Restore original content
  cells[1].textContent = cells[1].querySelector('input').defaultValue;
  cells[2].textContent = cells[2].querySelector('input').defaultValue;
  cells[3].textContent = cells[3].querySelector('input').defaultValue;
  cells[4].textContent = cells[4].querySelector('input').defaultValue;

  // Restore the "Delete" and "Update" buttons in the "Actions" field
  cells[5].innerHTML = `
    <button onclick="deleteRow(this)">Delete</button>
    <button onclick="updateRow(this)">Update</button>
  `;

  // Update local storage with the restored data
  updateLocalStorage();
}

// Function to update local storage with the current table data
function updateLocalStorage() {
  const table = document.getElementById('dataTable');

  // Convert the HTMLCollection to an array and skip the header row
  const data = Array.from(table.rows).slice(1).map((row) => {
    const cells = row.cells;
    return {
      bookName: cells[1].textContent,
      author: cells[2].textContent,
      publisher: cells[3].textContent,
      date: cells[4].textContent,
    };
  });

  // Store the data in local storage
  localStorage.setItem('libraryData', JSON.stringify(data));
}

// Function to initialize the table with existing data
function initializeTable() {
  const table = document.getElementById('dataTable');

  // Retrieve existing data from localStorage
  const data = JSON.parse(localStorage.getItem('libraryData'));

  if (data) {
    data.forEach((item, index) => {
      const newRow = table.insertRow();
      newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.bookName}</td>
        <td>${item.author}</td>
        <td>${item.publisher}</td>
        <td>${item.date}</td>
        <td>
          <button onclick="deleteRow(this)">Delete</button>
          <button onclick="updateRow(this)">Update</button>
        </td>
      `;
    });
  }
}

// Call the initializeTable function when the page loads
window.addEventListener('load', initializeTable);
