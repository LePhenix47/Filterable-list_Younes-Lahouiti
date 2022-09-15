const form = document.querySelector(".main__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const urlRandomUsersAPI = "https://jsonplaceholder.typicode.com/users/";

async function callRandomUsersAPI() {
  try {
    let response = await fetch(urlRandomUsersAPI);
    let randomUsers = await response.json();
    console.log(randomUsers);
    fillTableWithData(randomUsers);
  } catch (APIError) {
    console.error("API error: ", APIError);
  }
}

const urlRandomPhotosAPI = "https://jsonplaceholder.typicode.com/photos/";
callPhotosAPI();

callRandomUsersAPI();

let photosUrls = [];
photosUrls.length = 10;

async function callPhotosAPI() {
  try {
    let response = await fetch(urlRandomPhotosAPI);
    let photos = await response.json();
    console.log(photos);
    photosUrls = Array.from(photos);
  } catch (APIError) {
    console.error("API error: ", APIError);
  }
}

const tableBody = document.querySelector(".table__body");
let users = [];

function fillTableWithData(dataObjectsArray) {
  let template = "";
  for (let i = 0; i < dataObjectsArray.length; i++) {
    let dataObject = dataObjectsArray[i];
    const { name, email, phone } = dataObject;
    console.table(photosUrls[i]?.url); //Using optional chaining to avoid errors
    template = `<tr class="table__row" data-name="${name}">
                  <td class="table__data table__data-name">
                    <img src="${photosUrls?.[i]?.url}" alt="Image for ${name}"
                      class="table__data-image">
                    ${name}
                  </td>
                  <td class="table__data table__data-email">${email}</td>
                  <td class="table__data table__data-phone">${phone}</td>
                </tr>`;
    tableBody.innerHTML += template;
    users.push(dataObject);
  }
}

const input = document.querySelector(".main__input");
const tableCaption = document.querySelector(".table__caption");

input.addEventListener("input", changeTableRows);

const tablePreview = document.querySelector(".main__table-preview");
const tablePreviewHeading = document.querySelector(
  ".main__table-preview-heading"
);
const tableContainer = document.querySelector(".main__table-container");

function changeTableRows(e) {
  tablePreview.classList.add("hide");
  tableContainer.classList.remove("hide");
  let valueOfInput = e.target.value;
  console.log(valueOfInput);
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    const isUserVisible =
      user.name.toLowerCase().includes(valueOfInput.toLowerCase()) ||
      user.email.toLowerCase().includes(valueOfInput.toLowerCase()) ||
      user.phone.includes(valueOfInput);
    let tableRowToBeHidden = tableBody.querySelector(
      `.table__row[data-name="${user.name}"]`
    );

    tableRowToBeHidden.classList.toggle("hide", !isUserVisible);
    console.log(isUserVisible);
  }
  let amountOfHiddenRows =
    tableBody.querySelectorAll(".table__row.hide").length;

  let amountOfVisibleRows = users.length - amountOfHiddenRows;
  console.log(
    "Amount of hidden rows = ",
    amountOfHiddenRows,
    "Amount of rows visually shown = ",
    users.length - amountOfHiddenRows
  );
  if (valueOfInput && amountOfVisibleRows) {
    tableCaption.textContent = `Database results for "${valueOfInput}": ${
      amountOfVisibleRows < 0 ? "Negative value" : amountOfVisibleRows
    }`;
  } else if (!amountOfVisibleRows) {
    console.log("Removing table and adding the preview!");
    tableContainer.classList.add("hide");
    tablePreview.classList.remove("hide");
    tablePreviewHeading.textContent = `Oops! Couldn't find user with "${valueOfInput}"`;
  } else if (!valueOfInput) {
    tableCaption.textContent = "Enter the user's name, email or phone number";
  }
}
