document.addEventListener("DOMContentLoaded", function () {
    // Activate sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    var typeFavorit = '';

    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        //console.log("cek halaman yang dimuat: loadNav: " + page);

                        loadPage(setupPage(page));

                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    // Load page content
    var page = window.location.hash.substr(1);


    loadPage(setupPage(page));

    function setupPage(page) {
        if (page == "" || page == "#") {
            page = "home";
        } else if (page === "favorit" || page === "team-fav") {
            page = "favorit";
            typeFavorit = "tim";
        } else if (page === "player-fav") {
            page = "favorit";
            typeFavorit = "pemain";
        } else if (page === "match-fav") {
            page = "favorit";
            typeFavorit = "pertandingan";
        } else {
            typeFavorit = "";
        }
        return page;
    }

    function loadPage(page) {

        console.log("loadPage: page: " + page);
        console.log("loadPage: typeFavorit: " + typeFavorit);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var content = document.querySelector("#body-content");

            if (this.readyState == 4) {
                if (page === "home") {
                    getKlasemenLiga();
                } else if (page === "matches") {
                    getMatchByIdLeague();
                } else if (page === "favorit") {
                    setupDataFavHtml(typeFavorit);
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };

        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

});