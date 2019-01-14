// Konsumsi JSON  dengan Fetch

//jika const akan mengalami 
//Uncaught SyntaxError: Identifier 'kode_liga' has already been declared
var api_token = '031cb13ff0274b41bf48afd7b3513c90'
var kode_liga = 2021 //id liga inggris
var base_url = "https://api.football-data.org/v2/";
var endpoint_tim = `${base_url}teams/`
var endpoint_pemain = `${base_url}players/`
var endpoint_klasemen = `${base_url}competitions/${kode_liga}/standings?standingType=TOTAL`
var endpoint_pertandingan_upcoming = `${base_url}competitions/${kode_liga}/matches?status=SCHEDULED`
var endpoint_pertandingan_detail = `${base_url}matches/`

var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getKlasemenLiga() {
  if ('caches' in window) {
    caches.match(endpoint_klasemen).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          resultKlasemenJSON(data);
          console.dir("getKlasemenLiga " + data);
        });
      }
    });
  }

  fetchApi(endpoint_klasemen)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data)
      console.log(data)
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      resultKlasemenJSON(data)
    })
    .catch(error);
}

// fungsi untuk mengunduh detail tim
function getDetailKlubById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    var dataSquadHTML = ''
    var tabelSquadHTML = ''
    if ("caches" in window) {
      caches.match(endpoint_tim + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            // Objek JavaScript dari response.json() masuk lewat variabel data.
            //console.log(data);
            // Menyusun komponen card artikel secara dinamis
            resultDetailTimJSON(data)
            data.squad.forEach(function (squad, index) {
              dataSquadJSON = squad;
              //console.log("cek squad name: " + squad.name);
              //console.log("cek squad position: " + squad.position);
              dataSquadHTML += `
<tr>
<td >
<a href="./detailplayer.html?id=${squad.id}"> ${squad.name}</a>
</td>
<td >${squad.position}</td>
</tr>
`
            });
            tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`

            document.getElementById("squad").innerHTML = tabelSquadHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_tim + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        resultDetailTimJSON(data)
        dataTeamJSON = data;
        data.squad.forEach(function (squad, index) {
          dataSquadJSON = squad;
          console.log("cek squad name: " + squad.name);
          console.log("cek squad position: " + squad.position);
          dataSquadHTML += `
      <tr>
        <td >
        <a href="./detailplayer.html?id=${squad.id}"> ${squad.name}</a>
        </td>
        <td >${squad.position}</td>
      </tr>
     `
        });
        tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`

        document.getElementById("squad").innerHTML = tabelSquadHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      })
      .catch(error);
  });
}

// fungsi untuk mengunduh detail pemain
function getDetailPlayerById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    var dataSquadHTML = ''
    var tabelSquadHTML = ''
    if ('caches' in window) {
      caches.match(endpoint_pemain + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultDetailPemainJSON(data);
            resolve(data)
          });
        }
      });
    }
    fetchApi(endpoint_pemain + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        resultDetailPemainJSON(data);
        resolve(data);
      })
      .catch(error);
  });
}


function getMatchByIdLeague() {
  return new Promise(function (resolve, reject) {

    if ('caches' in window) {
      caches.match(endpoint_pertandingan_upcoming).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultMatchJSON(data);
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_pertandingan_upcoming)
      .then(status)
      .then(json)
      .then(function (data) {
        resultMatchJSON(data);
        resolve(data);
      })
      .catch(error);
  });
}

function getDetailMatchById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    var dataSquadHTML = ''
    var tabelSquadHTML = ''
    if ('caches' in window) {
      caches.match(endpoint_pertandingan_detail + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultDetailMatchJSON(data);
            resolve(data)
          });
        }
      });
    }
    fetchApi(endpoint_pertandingan_detail + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        resultDetailMatchJSON(data);
        resolve(data);
      })
      .catch(error);
  });
}

function getSavedMatchById() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = Number(urlParams.get("id"));

  getMatchesById(idParam).then(function (match) {
    resultDetailMatchJSON(match);
  });
}