// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookForm");
    const table = document.getElementById("dataTable");
    const submitButton = document.getElementById("submitBtn");
  
    submitButton.addEventListener("click", handleSubmit);
    
    function handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const rowData = Object.fromEntries(formData.entries());
  
        const newRow = createRow(rowData);
        table.appendChild(newRow);
  
        form.reset();
    }
  
    function createRow(data) {
      const row = document.createElement("tr");
      const cells = ["bookname", "author", "publisher", "date"];
  
      cells.map(cellName => {
          const cell = document.createElement("td");
          cell.textContent = data[cellName];
          row.appendChild(cell);
      });
  
      const actionsCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteRow(row));
      
      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.addEventListener("click", () => updateRow(row, data));
      
      actionsCell.appendChild(deleteButton);
      actionsCell.appendChild(updateButton);
      row.appendChild(actionsCell);
  
      return row;
  }
  
  function deleteRow(row) {
    const table = row.parentNode;
    table.removeChild(row);
  }
  
  function updateRow(row, data) {
    const form = document.getElementById("bookForm");
    const cells = row.getElementsByTagName("td");
    
    form.bookname.value = data.bookname;
    form.author.value = data.author;
    form.publisher.value = data.publisher;
    form.date.value = data.date;
  
    form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        for (let i = 0; i < cells.length - 1; i++) {
            cells[i].textContent = form.elements[i].value;
        }
        form.removeEventListener("submit", event.preventDefault());
    });
  }
  
  
  
  });
  
  