function resultKlasemenJSON(data) {
  var tabelKlasemenHtml = ''
  data.standings.forEach(function (klasemen) {
    var dataTabelKlasemen = ''
    //console.log("cek panjang klasemen table: " + klasemen.table.length)

    klasemen.table.forEach(function (club) {
      club = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));

      console.log("cek url logo club: " + club.team.crestUrl)

      dataTabelKlasemen += `<tr>
        <td class="center-align">${club.position}</td>
        <td>
        <a href="./detailtim.html?id=${club.team.id}">
        <p class="hide-on-small-only">
        <img class = "show-on-medium-and-up show-on-medium-and-down" src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
        ${club.team.name}
        </p>
        <p class="hide-on-med-and-up">
        <img src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
        </p>

        </a>
        </td>
        <td class="center-align">${club.playedGames}</td>
        <td class="center-align">${club.won}</td>
        <td class="center-align">${club.draw}</td>
        <td class="center-align">${club.lost}</td>
        <td class="center-align">${club.goalsFor}</td>
        <td class="center-align">${club.goalsAgainst}</td>
        <td class="center-align">${club.goalDifference}</td>
        <td class="center-align">${club.points}</td>
      </tr>`

    })

    tabelKlasemenHtml += `
  
      <div class="card">
      <div class="card-content">
      <h5 class="header">Last Updated: ${convertUTCDate(new Date(data.competition.lastUpdated))}</h5> 
      
      
      <table class="responsive-table striped " >
      <thead>
        <tr>
          <th class="center-align">Position</th>
          <th>Team</th>
          <th class="center-align">Played</th>
          <th class="center-align">Won</th>
          <th class="center-align">Draw</th>
          <th class="center-align">Lost</th>
          <th class="center-align">GF</th>
          <th class="center-align">GA</th>
          <th class="center-align">GD</th>
          <th class="center-align">Points</th>
        </tr>
      </thead>
      <tbody>` + dataTabelKlasemen + `</tbody>
      </table>
    
      </div>
      </div>
    `

  });

  // Sisipkan komponen card ke dalam elemen dengan id tabelKlasemen
  document.getElementById("tabelKlasemen").innerHTML = tabelKlasemenHtml;
}