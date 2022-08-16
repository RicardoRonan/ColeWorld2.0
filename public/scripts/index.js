// Getting All Albums

let albums = [];
const uContainer = document.querySelector(".albums_div");
fetch("http://localhost:2121/albums")
  .then((res) => res.json())
  .then((data) => {
    albums = data;
    console.log(data);
    showalbums(albums);
  });
function showalbums(albums) {
  uContainer.innerHTML = "";
  albums.forEach((album) => {
    id = album.album_id;
    uContainer.innerHTML += `
<div>
        <div class="card_albums">
          <img src="${album.image}"/>
          <div class="descriptions">
            <h2>${album.album_name}</h2>
            <p>R${album.price}</p>
            <button onclick="getOneAlbum(${id})">
              Show Details
            </button>
            <button id="add-btn" onclick="addtoCart(${id})" >
              Add to cart
            </button>
          </div>
        </div>
      </div>
          `;
  });
}

// Getting One Album

function getOneAlbum(id) {
  fetch(`http://localhost:2121/albums/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      albums = data;
      console.log(data);
      html = `
      <div class="container" style="margin: 100px;">
        <h1>${albums[0].album_name}</h1>
        <div class="row" style="display: flex; gap: 20px;">
          <div class="col">
            <img src="${albums[0].image}" style="width: 500px">
          </div>
          <div class="col">
            <h2>${albums[0].artists}<h2/>
            <h3>Description:</h3>
            <p>${albums[0].descriptions}</p>
            <p>Tracklist: ${albums[0].tracklist} tracks</p>
            <p>Release Date: ${albums[0].release_date}</p>
            <h4 style="font-size: 1.5rem">R ${albums[0].price}</h4>
            <a href="http://localhost:2121/albums.html">
            <button style="padding: 0.6rem;
            outline: none;
            border: none;
            border-radius: 3px;
            background: white;
            color: black;
            font-weight: bold;
            cursor: pointer;
            transition: 0.4s ease; width: fit-content;
            height: 40px;
            border-style: none;
            background-color: #ff3838;
            color: #fff;
            font-size: 15px;
            outline: none;
            box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);" 
            onmouseover="transform: scale(0.95) translateX(-5px);
            transition: all 0.5s ease-in-out;">Go Back</button>
            </a>
          </div>
        </div>
      </div>
      `;
      // window.location.replace("http://localhost:2121/oneAlbum.html");
      document.write(html);
    });
  console.log(id);
}
// cart

function getAlbum(id) {
  fetch(`http://localhost:2121/albums/${id}`)
    .then((res) => res.json())
    .then((data) => data);
}
getAlbum(1);

function addtoCart(id) {
  fetch(`http://localhost:2121/users/${id}/cart/`, {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      albums = data;
      console.log(data);
    });
  console.log("added to cart successfully");
}

const cartContainer = document.querySelector("#cartItems");
function showcartItem(id) {
  fetch(`http://localhost:2121/users/${id}/cart`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      cartContainer.innerHTML = "";
      albums.forEach((album) => {
        cartContainer.innerHTML += `
      <div class="card">
      <h1>${album.album_name}</h1>
      </div>
    `;
      });
    });
}
