/* -------------- Création de la page article -------------------*/
/*Récupération des paramètres de l'URL*/
let params = (new URL(document.location)).searchParams;
let name = params.get("id");

/*Création de la page produit*/
function productPage() {
  fetch("http://localhost:3000/api/teddies/" + name)
    .then(
      function (response) {
        /*Réponse si fonctionne correctement*/
        response.json().then(function (data) {  
          /*Elements descriptifs du produit*/
          document.getElementById("productImg").innerHTML = "<img class='image-details img-fluid' src='" + data.imageUrl + "' alt='image ourson'></div>";
          document.getElementById("productText").innerHTML = "<div class='description'><div class='details'><h2>" + data.name + "</h2></div><div class='details'>" + data.description + "</div>";
          /*Choix des couleurs*/
          let option = "";
          for (element in data.colors) {
            option = option + "<option>" + data.colors[element] + "</option>"
            document.getElementById("select-color").innerHTML = option
          }
          document.getElementById("productPrice").innerHTML = "<div class='details-end'><h3>" + parseFloat(data.price / 100) + " €</h3></div></div>";
        }
        )
      }
    )
    /*Message d'alerte si ne fonctionne pas*/
    .catch(function (err) {
      window.alert("Impossible d'afficher les fichiers !")
    });
}
productPage();

/* -------------- Ajout d'un article au panier -------------------*/
/*Fonction qui vérifie si l'ID d'un article est déjà dans le panier*/
function canAddItem(items, name) {
  for (item in items) {
    if (items[item].id == name) {
      return false;
    }
  }
  return true
}

/*Fonction qui permet d'ajouter un article au local Storage */
function addToCart() {
  let productsInCart = JSON.parse(localStorage.getItem("identifiants"));
  /*Si le panier est vide*/
  if (productsInCart === null) {
    productsInCart = new Array();
    localStorage.setItem("identifiants", JSON.stringify(productsInCart));
  }
  /*Récupère la quantité de l'objet */
  let selectQuantity = document.getElementById("productQuantity");
  let selectedQuantity = selectQuantity.options[selectQuantity.selectedIndex].value;
  /*Créé un objet contenant la quantité et l'idée de l'objet*/
  let item = {
    "id": name,
    "quantity": selectedQuantity,
  };
  /*Permet de modifier la quantité d'un article donné sans ajouter le même identifiant*/
  if (canAddItem(productsInCart, name)) {
    productsInCart.push(item);
  } else {
    for (item in productsInCart) {
      if (productsInCart[item].id == name) {
        productsInCart[item].quantity = parseInt(productsInCart[item].quantity) + parseInt(selectedQuantity);
      }
    }
  }
  localStorage.setItem("identifiants", JSON.stringify(productsInCart));
}
/*Ajouter au panier via le clic sur le bouton*/
let indexCart = document.getElementById("button-cart");
indexCart.onclick = addToCart;