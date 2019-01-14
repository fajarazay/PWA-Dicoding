function resultTeamFav(data) {

    var dataTeamFavHtml = ''
    data.forEach(function (team) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.dir("setupTeamFavHtml: " + team.name);

        dataTeamFavHtml += `
    <div class="col s12 m6 l6">
      <div class="card">
    
      <div class="card-content">
      <div center-align>
          <h5 class="center-align">
           <span class="blue-text text-darken-2">  
           <a href="./detailtim.html?id=${team.id}">${team.name}</a>
           </span>
          </h5>          
      </div>
      </div>
      </div>
    </div>
        `
    });

    // Sisipkan komponen card ke dalam elemen dengan id divFavorit
    document.getElementById("divFavorit").innerHTML = dataTeamFavHtml;
}