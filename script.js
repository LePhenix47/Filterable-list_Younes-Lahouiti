const form = document.querySelector(".main__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const urlRandomoUsersAPI = "https://randomuser.me/api/?nat=fr&results=50";

async function callRandomUsersAPI() {
  try {
    let response = await fetch(urlRandomoUsersAPI);
    let randomUsers = response.json();
    console.log(randomUsers);
  } catch (APIError) {
    console.error({ APIError });
  }
}

callRandomUsersAPI();
