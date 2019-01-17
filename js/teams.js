function resultDetailTimJSON(data) {
  data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));

  console.log("cek logo detail tim : " + data.crestUrl)
  document.getElementById("namaKlub").innerHTML = data.name;
  document.getElementById("logoKlub").src = data.crestUrl;
  document.getElementById("name").innerHTML = data.name;
  document.getElementById("shortName").innerHTML = data.shortName;
  document.getElementById("tla").innerHTML = data.tla;
  document.getElementById("address").innerHTML = data.address;
  document.getElementById("phone").innerHTML = data.phone;
  document.getElementById("website").innerHTML = data.website;
  document.getElementById("email").innerHTML = data.email;
  document.getElementById("founded").innerHTML = data.founded;
  document.getElementById("clubColors").innerHTML = data.clubColors;
  document.getElementById("venue").innerHTML = data.venue;
  document.getElementById("preloader").innerHTML = '';
}

function resultDetailPemainJSON(data) {
  document.getElementById("name").innerHTML = data.name;
  document.getElementById("firstName").innerHTML = data.firstName;
  if (data.lastName == null) {
    data.lastName = "-"
  }
  document.getElementById("lastName").innerHTML = data.lastName;
  document.getElementById("dateOfBirth").innerHTML = data.dateOfBirth;
  document.getElementById("countryOfBirth").innerHTML = data.countryOfBirth;
  document.getElementById("nationality").innerHTML = data.nationality;
  document.getElementById("position").innerHTML = data.position;
  document.getElementById("preloader").innerHTML = '';
}