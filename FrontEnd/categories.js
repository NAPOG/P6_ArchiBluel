//Création variable
const listFiltres = document.querySelector(".categorieslist");
const gallery = document.querySelector(".gallery");

//Récupération des pièces depuis l'API
const reponse = await fetch ("http://localhost:5678/api/categories");
let categories = await reponse.json();

const reponseW = await fetch ("http://localhost:5678/api/works");
let Works = await reponseW.json();


//POUR LE TRI DES PROJETS PAR CATÉGORIES//
function genererList (liste) {
    const btnFiltre = document.createElement("p")
    btnFiltre.innerText = "Tous";
    btnFiltre.classList.add("btn-trier");
    btnFiltre.id = 0;
    listFiltres.appendChild(btnFiltre);
    for (let i = 0; i < liste.length; i++) {
        //Création des conteneurs de la liste catégories
        const btnFiltre = document.createElement("p")
        btnFiltre.innerText = liste[i].name;
        btnFiltre.classList.add("btn-trier");
        btnFiltre.id = liste[i].id;
        listFiltres.appendChild(btnFiltre);
        }
        let lstBtn = Array.from(document.querySelectorAll(".btn-trier"));
        for (let i = 0; i < lstBtn.length; i++) {
            lstBtn[i].addEventListener("click", function(e){
                //Boucle if pour afficher le 'Tous' de façon dynamique + else pour les catégories de tri
               if(e.target.id == 0){
                displayGallery(Works);
               }else{
                let lstFiltered = Works.filter(element => element.categoryId == e.target.id);
                displayGallery(lstFiltered);
            }

            });
        }

}

//Création des éléments images de façon dynamique pour permettre à la fonction d'au-dessus de faire le tri avec les éléments ci-dessous
function displayGallery(pWorks){
    gallery.innerHTML = "";
    for(let i = 0; pWorks.length > i; i++){
        const img = document.createElement("img");
        img.src = pWorks[i].imageUrl;
        const fig = document.createElement("figure");
        fig.innerHTML = pWorks[i].title;
        
        const figCapt = document.createElement("figcaption");

        fig.appendChild(img);
        fig.appendChild(figCapt)
        gallery.appendChild(fig);

    }
}

 genererList(categories);
 displayGallery(Works);
