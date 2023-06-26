//Récupérer les données du localStorage
const checkusers = window.localStorage.getItem("Local");

// if(checkusers === null) {
//     //Récupération des pièces depuis l'API
//     const reponseL = await fetch("http://localhost:5678/api/users/login");
//     let Local = await reponseL.json();

//     //Transformation des pièces en JSON
//     // const stockLocal = JSON.stringify(Local);

//     //Stockage des informations dans le localStorage
//     window.localStorage.setItem("Local", stockLocal);
//     }else {
//         checkusers = JSON.parse(checkusers);
//     }

    //Stock de la réponse avant traitement
    //const id = event.target.dataset.id;
    //const reponse = await fetch("http://localhost:5678/api/users" + id + "/login");

//Création variables
// const listLogin = document.querySelector(".liLogin");


const formE = document.querySelector('form');
formE.addEventListener('submit',(event)=>{
    event.preventDefault();

    //console.log(event.target.entries())
    const login = document.querySelector(".login").value;
    
    const mdp = document.querySelector(".mdp").value;
    let token = '';

    fetch("http://localhost:5678/api/users/login",{
        method : "POST",
        body: JSON.stringify({email:login,password:mdp}),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((response)=>{
        response.json()
    }).then((data)=>{
        token = data.token;
        //TODO enregistrer le token dans le localstorage
        //faire la redirection faire la page
        window.location.href='index.html'
    }
    ).catch((error)=>{
        console.log(error)
    });
    
})

//let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";

//Fonction pour s'identifier
// function checkuser(login, mdp, token){
//    if(login != token && mdp != token){
//        alert("identifiants corrects");
//    } else{
//        alert("mauvais identifiants")
//    }
//    console.log("je passe là");
// }

//listLogin.onclick(checkuser(token));