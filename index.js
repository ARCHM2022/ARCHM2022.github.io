const PASSWORD = "pass1";
let tableData = [
  ["Товар 1", "Опис товару 1"],
  ["Товар 2", "Опис товару 2"],
];

// Отримання доступу до елементів на сторінці
const passwordInput = document.getElementById("password-input");
const okButton = document.getElementById("ok-button");
const tableWrapper = document.getElementById("table-wrapper");
const editButton = document.getElementById("edit-button");
const saveButton = document.getElementById("save-button");
const table = document.getElementById("my-table");

// Set the default state
tableWrapper.style.display = "none";
editButton.style.display = "none";

// Handle the OK button click
okButton.addEventListener("click", () => {
  if (passwordInput.value === "pass1") {
    tableWrapper.style.display = "block";
    okButton.disabled = true;
    passwordInput.disabled = true;
    editButton.style.display = "inline-block";
  }
});

// Handle the Edit button click
editButton.addEventListener("click", () => {
  table.contentEditable = "true";
  table.focus();
  editButton.style.display = "none";
  saveButton.style.display = "inline-block";
});

// Handle the Save button click
saveButton.addEventListener("click", () => {
  table.contentEditable = "false";
  saveButton.style.display = "none";
  editButton.style.display = "inline-block";
  const tableHtml = table.outerHTML;
  const url = "https://api.github.com/repos/ARCHM2022/ARCHM2022.github.io/contents/table.html";
  const message = "Updated table";
  const branch = "mmaster";
  const accessToken = "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"; // Replace with your personal access token
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      const sha = data.sha;
      const content = btoa(unescape(encodeURIComponent(tableHtml)));
      const body = {
        message: message,
        branch: branch,
        content: content,
        sha: sha,
      };

      return fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
});
