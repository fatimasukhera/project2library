// Function to initialize the publisher table with existing data
function initializePublisherTable() {
    const dataTable = document.getElementById('dataTable');
    const data = JSON.parse(localStorage.getItem('libraryData'));
  
    // Create a map to count the number of books for each publisher
    const publisherCountMap = new Map();
  
    if (data) {
      data.forEach((item) => {
        const publisher = item.publisher;
  
        // Update the count for each publisher
        if (publisherCountMap.has(publisher)) {
          publisherCountMap.set(publisher, publisherCountMap.get(publisher) + 1);
        } else {
          publisherCountMap.set(publisher, 1);
        }
      });
  
      // Display publisher names and book counts in the publisher table
      publisherCountMap.forEach((count, publisher) => {
        const newRow = dataTable.insertRow();
        newRow.innerHTML = `
          <td>${publisher}</td>
          <td>${count}</td>
          <td>
            <button onclick="deletePublisher(this)">Delete</button>
          </td>
        `;
      });
    }
  }
  
  // Function to delete a publisher and their books
  function deletePublisher(button) {
    const dataTable = document.getElementById('dataTable');
    const row = button.parentNode.parentNode;
    const publisher = row.cells[0].textContent;
  
    // Delete the publisher and their books from the library data
    let libraryData = JSON.parse(localStorage.getItem('libraryData')) || [];
    libraryData = libraryData.filter((item) => item.publisher !== publisher);
    localStorage.setItem('libraryData', JSON.stringify(libraryData));
  
    // Remove the row from the publisher table
    dataTable.deleteRow(row.rowIndex);
  }
  
  // Call the initializePublisherTable function when the page loads
  window.addEventListener('load', initializePublisherTable);
  