// Збереження змінених даних в таблиці
function saveChanges() {
    const data = [];
    const rows = document.querySelectorAll("table tr");
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll("td");
      const row = [];
      for (let j = 0; j < cells.length; j++) {
        row.push(cells[j].textContent);
      }
      data.push(row);
    }
    const owner = "ARCHM2022";
    const repoName = "ARCHM2022.github.io";
    const fileName = "index.html";
    const accessToken = "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";
    const jsonData = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://api.github.com/repos/" + owner + "/" + repoName + "/contents/" + fileName, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          alert("Changes saved successfully");
        } else {
          alert("Error: " + xhr.responseText);
        }
      }
    };
    const requestData = {
      message: "Updated data file",
      content: btoa(jsonData),
      sha: dataSha
    };
    xhr.send(JSON.stringify(requestData));
  }
  
  // Додавання кнопок редагування та збереження даних до таблиці
  function addTableButtons() {
    const table = document.querySelector("table");
    const rows = table.querySelectorAll("tr");
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.querySelectorAll("td");
      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        const editor = document.createElement("input");
        editor.type = "text";
        editor.value = cell.textContent;
        editor.style.display = "none";
        cell.appendChild(editor);
        cell.addEventListener("click", function () {
          editor.style.display = "block";
          cell.style.display = "none";
        });
        editor.addEventListener("blur", function () {
          cell.textContent = editor.value;
          editor.style.display = "none";
          cell.style.display = "table-cell";
        });
      }
    }
    const saveButton = document.createElement("button");
    saveButton.textContent = "Зберегти зміни";
    saveButton.addEventListener("click", saveChanges);
    const container = document.createElement("div");
    container.appendChild(saveButton);
    table.parentNode.insertBefore(container, table);
  }
  
  // Перевірка правильності введеного пароля
  function checkPassword() {
    const password = prompt("Введіть пароль:");
    if (password === "pass1") {
      document.getElementById("password-form").style.display = "none";
      loadTableData();
    } else {
      alert("Неправильний пароль");
    }
  }
  
  // Запуск перевірки пароля при завантаженні сторінки
  window.addEventListener("load", checkPassword);
  