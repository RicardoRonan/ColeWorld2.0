let user = null;
let password = document.getElementById("password").value;
let email = document.getElementById("email").value;
async function Login(e) {
  e.preventDefault();
  fetch("https://coleworld.herokuapp.com/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const token = data.token;

      //  Verify Route needs to run
      // To decode the token

      fetch("https://coleworld.herokuapp.com/users/users/verify", {
        method: "GET",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": data.token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          user = json.user;
          console.log(user);
        });
    });
  // localStorage.setItem("user-details", JSON.stringify(users));

  // document.getElementById("submit-btn").innerHTML =
  //   "welcome" +
  //   window.location.replace(
  //     "https://coleworld.herokuapp.com/albums.html"
  //   );
}
const id = user.user_id;

fetch("https://coleworld.herokuapp.com/users/" + id, {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
