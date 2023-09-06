//PAGE CONNECTÉE
//Récupération des pièces depuis l'API
const reponse = await fetch ("http://localhost:5678/api/works");
let logworks = await reponse.json();


//MODALE
var bouton = document.getElementById("bouton");
var fenetreModale = document.getElementById("fenetreModale");
var superposition = document.getElementById("superposition");
var fermer = document.getElementById("fermer");


fenetreModale.style.display = "none";
  superposition.style.display = "none";

bouton.addEventListener("click", function() {
  fenetreModale.style.display = "block";
  superposition.style.display = "block";
});

fermer.addEventListener("click", function() {
  fenetreModale.style.display = "none";
  superposition.style.display = "none";
});