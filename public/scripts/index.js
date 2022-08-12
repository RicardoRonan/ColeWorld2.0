// Getting All Albums

let albums = [];
const uContainer = document.querySelector(".albums_div");
fetch("https://coleworld.herokuapp.com/albums")
  .then((res) => res.json())
  .then((data) => {
    albums = data;
    console.log(data);
    showalbums(albums);
  });
function showalbums(albums) {
  uContainer.innerHTML = "";
  albums.forEach((album) => {
    uContainer.innerHTML += `
<div>
        <div class="card_albums">
          <img src="${album.image}"/>
          <div class="descriptions">
            <h2>${album.album_name}</h2>
            <p>R${album.price}</p>
            <button onclick="getOneAlbum(id)">
              Show Details
            </button>
            <button id="add-btn" onclick="addtoCart(event)" >
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
  id = albums.album_id;
  fetch(`https://coleworld.herokuapp.com/albums/?id=${albums.album_id}`)
    .then((res) => res.json())
    .then((data) => {
      albums = data;
      console.log(data);
      document.write(`<h1>${albums.album_name}</h1>`);
    });
  console.log(id);
  console.log(albums);
}
