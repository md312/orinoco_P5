/*Récupération des paramètres de l'URL*/
let params = (new URL(document.location)).searchParams;
let name = params.get("orderId");

/*Récupération des informations de confirmation dans le sessionStorage*/
/*ID DE LA COMMANDE*/
let orderDetails = JSON.parse(sessionStorage.getItem("orderNum"));
document.getElementById("order").innerText = orderDetails.orderId;

/*PRIX PAYE PAR LE CONSOMMATEUR*/
let orderPrice = 0;
for (element in orderDetails.products){
orderPrice = orderPrice + orderDetails.products[element].price/100;
document.getElementById("totalPrice").innerText = orderPrice;
}

/*Supprime les données stockées dans le sessionStorage*/
function clearStorage(){
    sessionStorage.clear();
}