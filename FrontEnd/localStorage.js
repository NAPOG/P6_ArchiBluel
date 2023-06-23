//Création variable
const listLogin = document.querySelector(".liLogin");

//Récupérer les données du localStorage
const identifiants = window.localStorage.getItem("Local");
if(identifiants === null) {
    //Récupération des pièces depuis l'API
    const reponseL = await fetch("http://localhost:5678/api/users/login");
    let Local = await reponseL.json();

    //Transformation des pièces en JSON
    const stockLocal = JSON.stringify(Local);

    //Stockage des informations dans le localStorage
    window.localStorage.setItem("Local", stockLocal);
    }else {
        identifiants = JSON.parse(identifiants);
    }

//Fonction pour s'identifier
function (signin){
    if ()
}