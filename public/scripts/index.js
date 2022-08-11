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
            <button>
              <i class="fab fa-youtube"></i>
              Play trailer on YouTube
            </button>
          </div>
        </div>
      </div>
          `;
  });
}
