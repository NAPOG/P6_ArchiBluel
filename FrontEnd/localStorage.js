//Récupérer les données du localStorage
const checkuser = window.localStorage.getItem("Local");

if(checkuser === null) {
    //Récupération des pièces depuis l'API
    const reponseL = await fetch("http://localhost:5678/api/users/login");
    let Local = await reponseL.json();

    //Transformation des pièces en JSON
    // const stockLocal = JSON.stringify(Local);

    //Stockage des informations dans le localStorage
    window.localStorage.setItem("Local", stockLocal);
    }else {
        checkuser = JSON.parse(checkuser);
    }

//Création variables
const listLogin = document.querySelector(".liLogin");
const login = document.querySelector(".login");
const mdp = document.querySelector(".mdp");

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";

//Fonction pour s'identifier
function checkuser(login, mdp, token){
    if(login != token && mdp != token){
        alert("identifiants corrects");
    } else{
        alert("mauvais identifiants")
    }
    console.log("je passe là");
};

listLogin.onclick(checkuser(token));