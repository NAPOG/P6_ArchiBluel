//Création variable
const listFiltres = document.querySelector(".categorieslist");
const gallery = document.querySelector(".gallery");
const galleryModal = document.querySelector(".galleryModal");

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
        
        const figCapt = document.createElement("figcaption");       
        figCapt.innerHTML = pWorks[i].title;
        
       
        fig.appendChild(img);
        fig.appendChild(figCapt);       
        gallery.appendChild(fig);

    }

}
function displayGalleryModal(pWorks){  

    //SUPPRIMER LES ÉLÉMENTS
        const deleteBoutonRouge = document.getElementById('deleteBoutonRouge');
        const galleryModal = document.getElementById('galleryModal');
        deleteBoutonRouge.addEventListener('click', function() {
            while (galleryModal.firstChild) {
                galleryModal.removeChild(galleryModal.firstChild);
            }
        });

        
    //AFFICHER LES IMAGES DANS LA GALERIE
    galleryModal.innerHTML = "";
    for(let i = 0; pWorks.length > i; i++){
        const img = document.createElement("img");
        img.src = pWorks[i].imageUrl;
        const imgDelete = document.createElement("i");
        
        imgDelete.id = pWorks[i].id;
        imgDelete.classList.add("garbage");
        
        //GARBAGE: SUPPRESSION DES IMAGES
        imgDelete.addEventListener('click', function(e) {
         
            fetch('http://localhost:5678/api/works/'+ e.target.id,{
                method:'DELETE',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+JSON.parse(window.localStorage.getItem("Local")).token
                }

            }).then((response)=>{
                imgDelete.remove(); 
                img.remove();
                figCapt.remove();
                //TODO recharger les éléments côté serveur.
                //return response.json();
            })
           
        });
        
        const fig = document.createElement("figure");
        fig.appendChild(imgDelete);
        fig.appendChild(img);
        
        const figCapt = document.createElement("figcaption");
        figCapt.innerHTML = "Editer"
       
       
        fig.appendChild(figCapt);       
        galleryModal.appendChild(fig);

        // //AJOUT PHOTO
        // const boutonVert = document.getElementById('boutonvert');
        // const ajouterPhotosModal = document.getElementById('ajouterPhotosModal');
        // const uploadForm = document.getElementById('uploadForm');
        // //const imageUpload = document.getElementById('imageUpload');

        // // Ajouter un événement de clic au bouton vert pour ouvrir la fenêtre modale d'ajout de photos
        // boutonVert.addEventListener('click', function() {
        //     ajouterPhotosModal.style.display = 'block'; // Afficher la fenêtre modale
        // });

        // // Ajouter un événement de soumission au formulaire d'upload
        // uploadForm.addEventListener('submit', function(event) {
        //     event.preventDefault(); 

        //     const newImage = document.createElement('img');
        //     newImage.src = /Users/solennguillon/Desktop/OPENCLASSROOM/P6/P6_ArchiWebos-main/FrontEnd/assets/images2/kam-idris-_HqHX3LBN18-unsplash.jpg;
        //     galleryModal.appendChild(newImage);

        //     // Fermer la fenêtre modale d'ajout de photos après l'upload
        //     ajouterPhotosModal.style.display = 'none';

        //     // Réinitialiser le formulaire d'upload pour que l'utilisateur puisse choisir une autre image s'il le souhaite
        //     uploadForm.reset();
        // });

        
}}

 genererList(categories);
 displayGallery(Works);
 displayGalleryModal(Works)
