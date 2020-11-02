
/* -------------- Création de la page d'Accueil en récupérant les éléments de l'API -------------------*/

function getNames() {
  /*Va chercher l'adresse de l'API*/
  fetch("http://localhost:3000/api/teddies")
    .then(
      function (response) {
        /*Réponse si fonctionne correctement*/
        response.json().then(function (data) {
          let html = "";
          /*Boucle for pour itérer les éléments*/
          for (element in data) {
            /*Liste des produits avec balises html*/
            html = html + '<div class = "produit d-flex flex-column flex-lg-row align-items-center text-center row-12 row-lg-1 col-lg-12 shadow-sm mb-4"><div class = "name col-lg-2 m-1">' + data[element].name + "</div>" +
              '<img class="image img-fluid mb-1 col-lg-4" src="' + data[element].imageUrl + '" alt = ours en peluche>'
              + '<div class = "price col-lg-2 mb-1">' + data[element].price / 100 + " €" + "</div>"
              /*Mise en place des paramètres de requête de l'URl en cliquant sur le bouton "Détails"*/
              + "<div class = 'button-details col-lg-3 mb-1'><a href='http://127.0.0.1:5500/details.html?id=" + data[element]._id + "' class='btn btn-pink'> Détails </a></div></div>";
            document.getElementById("productList").innerHTML = html;
          }
        });
      }
    )

    /*Message d'alerte si ne fonctionne pas*/
    .catch(function (err) {
      alert("Impossible d'afficher les fichiers !");
    });
}

getNames();