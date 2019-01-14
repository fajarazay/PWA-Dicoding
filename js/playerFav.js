function resultPlayerFav(data) {
    var dataPlayerFavHtml = ''
    data.forEach(function (player) {
        //console.dir("cek nama pemain: " + player.name);

        dataPlayerFavHtml += `
    <div class="col s12 m6 l6">
      <div class="card">
      <div class="card-content">
      <div center-align>
          <h5 class="center-align">
           <span class="blue-text text-darken-2"> 
           <a href="./detailplayer.html?id=${player.id}">${player.name}</a>
            </span>
          </h5>
      </div>
      </div>
      </div>
    </div>
        `
    });

    // Sisipkan komponen card ke dalam elemen dengan id divFavorit
    document.getElementById("divFavorit").innerHTML = dataPlayerFavHtml;
}