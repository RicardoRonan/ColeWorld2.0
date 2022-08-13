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

async function getOneAlbum(id) {
  const res = await fetch(`https://coleworld.herokuapp.com/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  albums = data;
  console.log(albums);
  showAlbum(albums);
}

async function showAlbum(albumArray) {
  console.log(albumArray);
  const show = await albumArray.forEach((album) => {
    document.querySelector(
      ".albums_div"
    ).innerHTML = `<h1>${album.album_name}</h1>`;
  });
}
