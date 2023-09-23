// Function to initialize the author table with existing data
function initializeAuthorTable() {
    const authorTable = document.getElementById('dataTable');
    const data = JSON.parse(localStorage.getItem('libraryData'));
  
    // Create a map to count the number of books for each author
    const authorCountMap = new Map();
  
    if (data) {
      data.forEach((item) => {
        const author = item.author;
  
        // Update the count for each author
        if (authorCountMap.has(author)) {
          authorCountMap.set(author, authorCountMap.get(author) + 1);
        } else {
          authorCountMap.set(author, 1);
        }
      });
  
      // Display author names and book counts in the author table
      authorCountMap.forEach((count, author) => {
        const newRow = authorTable.insertRow();
        newRow.innerHTML = `
          <td>${author}</td>
          <td>${count}</td>
          <td>
            <button onclick="deleteAuthor(this)">Delete</button>
          </td>
        `;
      });
    }
  }
  
  // Function to delete an author and their books
  function deleteAuthor(button) {
    const authorTable = document.getElementById('dataTable');
    const row = button.parentNode.parentNode;
    const author = row.cells[0].textContent;
  
    // Delete the author and their books from the library data
    let libraryData = JSON.parse(localStorage.getItem('libraryData')) || [];
    libraryData = libraryData.filter((item) => item.author !== author);
    localStorage.setItem('libraryData', JSON.stringify(libraryData));
  
    // Remove the row from the author table
    dataTable.deleteRow(row.rowIndex);
  }
  
  // Call the initializeAuthorTable function when the page loads
  window.addEventListener('load', initializeAuthorTable);
  