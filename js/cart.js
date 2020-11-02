/* -------------- Récupération des identifiants et création du panier dynamique -------------------*/

/*Récupération des identifiants dans le LocalStorage*/
let cartProducts = document.getElementById("cart-tablebody");
for (var i = 0; i < localStorage.length; i++) {
  var products = localStorage.key("identifiants");
  var listOfProducts = JSON.parse(localStorage.getItem(products));
};

/*Supprimer formulaire de commande si pas de produits*/
function removeForm() {
  if (listOfProducts === undefined || localStorage.getItem("identifiants") == "[]" || localStorage.getItem("orderNum") !== null) {
    let orderForm = document.getElementById("order-form");
    orderForm.remove();
  }
}
removeForm();

/*Récupération des informations du tableau compris dans identifiants via des promesses asynchrones*/
const promises = listOfProducts.map(item => {
  return fetch('http://localhost:3000/api/teddies/' + item.id).then(response => {
    return response.json()
  });
});

/* -------------- Création du panier dynamique -------------------*/
var html = "";

/*Récupération des résultats de chaque promesse */
Promise.all(promises).then(data => {
  let totalPrice = 0;
  let totalCart = document.getElementById("total");
  /*INSERTION DE CHAQUE DONNEE RECUPEREE DANS UNE BALISE HTML*/
  for (element in data) {
    /*Si la quantité du produit est supérieure à un, afficher la flèche*/
    if (listOfProducts[element].quantity > 1) {
      html = html + '<tr><th>' + data[element].name + '</th><th>' + data[element].price / 100 + ' € </th>' + "<th>" + "<svg width='1em' height='1em' viewBox='0 0 16 16' data-id='" + data[element]._id + "' class='less-quantity bi bi-caret-left mb-1' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z'/></svg>" + listOfProducts[element].quantity + "<svg width='1em' height='1em' viewBox='0 0 16 16' data-id='" + data[element]._id + "' class='more-quantity bi bi-caret-right mb-1' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z'/></svg></th><th><div data-id='" + data[element]._id + "' class='delete-article btn btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg> </div></th></tr>";
    }
    /*Si elle est égale à 1, ne pas afficher la flèche*/
    else { html = html + '<tr><th>' + data[element].name + '</th><th>' + data[element].price / 100 + ' € </th></th>' + "<th><div></div>" + listOfProducts[element].quantity + "<svg width='1em' height='1em' viewBox='0 0 16 16' data-id='" + data[element]._id + "' class='more-quantity bi bi-caret-right mb-1' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z'/></svg></th><th><div data-id='" + data[element]._id + "' class='delete-article btn btn-danger'><svg width='1em' height='1em' viewBox='0 0 16 16' class='delete-article bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></div></th></tr>"; }

    /*CALCUL DU PRIX TOTAL DU PANIER*/
    totalPrice = totalPrice + data[element].price / 100 * listOfProducts[element].quantity;
    totalCart.innerText = totalPrice;
  }
  cartProducts.innerHTML = html;
}).catch(function (err) {
  window.alert("Impossible d'afficher les fichiers !")
});;


/* -------------- Actions sur le panier dynamique -------------------*/

/*BOUTON POUR VIDER LE PANIER*/
document.getElementById("clear-cart").onclick = function clearCart() {
  localStorage.clear();
  window.location.reload();
}

/*SUPPRESION D'UN ARTICLE DU PANIER*/

/*Détection du clic sur le bouton*/
document.addEventListener("click", e => {
  if (!e.target.classList.contains("delete-article")) {
    return;
  }
  /*Compare l'id du bouton à celui du tableau de produits et suprime l'élément correspondant*/
  for (element in listOfProducts) {
    if (listOfProducts[element].id == e.target.dataset.id) {
      listOfProducts.splice(element, 1);
      window.location.reload();
    }
  }
  localStorage.setItem("identifiants", JSON.stringify(listOfProducts));
});


/* -------------- Modification des quantités -------------------*/

/*Au clic de la flèche, baisse la quantité de l'article désiré*/
document.addEventListener("click", e => {
  if (!e.target.classList.contains("less-quantity")) {
    return;
  }
  /*Compare l'id du bouton à celui du tableau de produits et suprime l'élément correspondant*/
  for (element in listOfProducts) {
    if (listOfProducts[element].id == e.target.dataset.id & listOfProducts[element].quantity > 1) {
      listOfProducts[element].quantity--;
      window.location.reload();
    }
  }
  localStorage.setItem("identifiants", JSON.stringify(listOfProducts));
});

/*Au clic de la flèche, augmente la quantité de l'article désiré*/
document.addEventListener("click", e => {
  if (!e.target.classList.contains("more-quantity")) {
    return;
  }
  /*Compare l'id du bouton à celui du tableau de produits et suprime l'élément correspondant*/
  for (element in listOfProducts) {
    if (listOfProducts[element].id == e.target.dataset.id) {
      listOfProducts[element].quantity++;
      window.location.reload();
    }
  }
  localStorage.setItem("identifiants", JSON.stringify(listOfProducts));
});


/*Créé le tableau d'identifiants à envoyer à l'API une fois le formulaire validé*/
let productList = [];
for (element in listOfProducts) {
  productList.push(listOfProducts[element].id);
}


/* -------------- Actions sur le formulaire de confirmation -------------------*/

/* Fonction qui vérifie les imput des formulaires*/

/*VALIDATION DU FORMULAIRE*/

function checkInput() {
  /*Toutes les Regex de contrôle à utiliser sur les formulaires*/
  let checkNumber = /[0-9]/;
  let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
  let checkSpecialCharacter = /[§!@#$%^&*(),;.?":{}|<>]/;
  let checkZipCode = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;
  let checkCardNum = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  let checkPhone = /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]*\d{2}){4}$/;
  /*Message lorsque le contrôle est terminé*/
  let checkMessage = "";

  /*Récupération des inputs*/
  let formLastName = document.getElementById("lastName").value;
  let formFirstName = document.getElementById("firstName").value;
  let formEmail = document.getElementById("email").value;
  let formPhone = document.getElementById("phone").value;
  let formAddress = document.getElementById("address").value;
  let formCity = document.getElementById("city").value;
  let formZipCode = document.getElementById("zipCode").value;
  let formCardNum = document.getElementById("cardNumber").value;

  /*TEST DES INPUTS DU FORMULAIRE*/
  /*Test du nom => aucun chiffre ou charactère spécial permis*/
  if (checkNumber.test(formLastName) == true || checkSpecialCharacter.test(formLastName) == true || formLastName == "") {
    checkMessage = "Vérifier/renseigner votre nom";
  };
  /*Test du prénom => aucun chiffre ou charactère spécial permis*/
  if (checkNumber.test(formFirstName) == true || checkSpecialCharacter.test(formFirstName) == true || formFirstName == "") {
    checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre prénom";
  };
  /*Test du mail selon le regex Email*/
  if (checkMail.test(formEmail) == false || formEmail == "") {
    checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre email";
  };
  /*Test du téléphone selon le regex Phone*/
  if (checkPhone.test(formPhone) == false || formPhone == "") {
    checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre téléphone";
  };
  /*Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux*/
  if (checkSpecialCharacter.test(formAddress) == true || formAddress == "") {
    checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre adresse : pas de caractères spéciaux";
  };
  /*Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux*/
  if (checkNumber.test(formCity) == true || checkSpecialCharacter.test(formCity) == true || formCity == "") {
    checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre ville"
  };
  /*Test du codep postal selon le regex Phone*/
  if (checkZipCode.test(formZipCode) == false || formZipCode == "") {
    checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre code postal";
  };
  /*Test du numéro de carte bleue selon le regex Phone*/
  if (checkCardNum.test(formCardNum) == false || formCardNum == "") {
    checkMessage = checkMessage + "\n" + "Vérifier/renseigner un numéro correct";
  };
  /*Si un des champs n'est pas bon => message d'alert avec la raison*/
  if (checkMessage != "") {
    alert("Il est nécessaire de :" + "\n" + checkMessage);
    return false;
  }
  return true;
};

/* -------------- Fonction pour confirmer la commande et envoyer le formulaire et les infos des produits à l'API -------------------*/

function confirmOrder() {
  /*Si le formulaire a passé la fonction de Check*/
  if (checkInput() == true) {
    let order = {
      /*Récupère le tableau d'id des produits*/
      products: productList,
      /*Créé l'objet contact avec les informations récupérées dans le formulaire*/
      contact: {
        lastName: document.getElementById("lastName").value,
        firstName: document.getElementById("firstName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      },
    };
    let headers = {
      "Content-Type": "application/json"
    };
    /*Envoie les informations à l'API dans le bon format*/
    fetch('http://localhost:3000/api/teddies/order', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(order),

      /*Récupère la réponse envoyée par l'API*/
    }).then(function (response) {
      if (response.status == 201) {
        response.json().then(function (data) {
          /*Vide le localStorage*/
          localStorage.clear();
          /*Envoie les informations renvoyées par l'API dans le sessionStorage*/
          sessionStorage.setItem("orderNum", JSON.stringify(data));
          /*Ouvre une fenêtre avec un Query Param basé sur l'id de commande*/
          window.open("\confirmation.html?orderId=" + data.orderId);
        });
      }
    }).catch(function (err) {
      window.alert("Impossible d'afficher les fichiers !")
    });
  };
}
