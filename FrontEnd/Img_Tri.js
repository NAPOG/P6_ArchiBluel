//CONTENU DU MODAL 1

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





//GESTION DES IMAGES DANS LE MODAL

    function displayGalleryModal(pWorks){ 
        //SUPPRIMER LES ÉLÉMENTS
            const deleteBoutonRouge = document.getElementById('deleteBoutonRouge');
            if(deleteBoutonRouge != null){
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

                    }).then((responseAdd)=>{
                        if (responseAdd.ok) {
                            // Suppression réussie, maintenant mettons à jour la galerie
                            fetch('http://localhost:5678/api/works')
                                .then(responseAdd => responseAdd.json())
                                .then(updatedWorks => {
                                    displayGalleryModal(updatedWorks);
                                    displayGallery(updatedWorks);
                                });
                        } else {
                            console.error('Échec de la suppression de l\'image.');
                        }
                    
                    })
                });

                const fig = document.createElement("figure");
                fig.appendChild(imgDelete);
                fig.appendChild(img);
                
                const figCapt = document.createElement("figcaption");
                figCapt.innerHTML = "Editer"       
            
                fig.appendChild(figCapt);       
                galleryModal.appendChild(fig);
            }
        }
    }






//CONTENU DU FORMULAIRE POUR AJOUTER UNE IMAGE

    function displayFormulaire(projet){
        const contenteurModal = document.querySelector(".contenuFenetreModale");
        contenteurModal.innerHTML ='';

        // Créer l'élément img pour afficher la photo téléchargée (optionnel)
        const img = document.createElement('img');
        img.style.width = '420px'; 
        img.style.height = '169px'; 
        img.style.objectFit = 'cover';
        contenteurModal.appendChild(img);

        
        //Titre du sélecteur 'titre'
        const titreTitre = document.createElement('p');
        titreTitre.textContent = 'Titre';
        // titreTitre.style.alignContent = flex-end;
        contenteurModal.appendChild(titreTitre);

        //Création du sélecteur 'titre'
        const inputTitre = document.createElement('input');
        inputTitre.type = 'text';
        inputTitre.placeholder = 'Titre';
        contenteurModal.appendChild(inputTitre);

        // AJOUTER UN SELECTEUR A LA FENETRE CATEGORIE
            //Titre du sélecteur 'categorie'
            const titreCategorie = document.createElement('p');
            titreCategorie.textContent = 'Catégorie';
            contenteurModal.appendChild(titreCategorie);

            // Créer l'élément select
            const selectCategorie = document.createElement('select');

            // Ajouter une option par défaut (option vide ou texte explicatif)
            const defaultOption = document.createElement('option');
            defaultOption.text = 'Sélectionner une catégorie';
            selectCategorie.appendChild(defaultOption);

            // Ajouter les options avec les ID associés
            const categories = [
                { id: 1, name: 'Objets' },
                { id: 2, name: 'Appartements' },
                { id: 3, name: 'Hôtels & restaurants' },
            ];

            categories.forEach((category) => {
                const option = document.createElement('option');
                option.text = category.name;
                option.value = category.id;
                selectCategorie.appendChild(option);
            });

            // Ajouter un événement pour capturer la sélection de l'utilisateur
            selectCategorie.addEventListener('change', (event) => {
                const selectedCategoryId = event.target.value;
                saveToAPI(selectedCategoryId);
            });

            // Fonction pour enregistrer les données dans l'API
            function saveToAPI(categoryId) {
                const apiUrl = 'http://localhost:5678/api-docs/#/default/post_works';
            
                // Les données à enregistrer dans l'API (vous pouvez ajouter plus de données selon vos besoins)
                const data = {
                    title: 'titre',
                    image: 'file',
                    category: categoryId,
                };
            
                // Configuration de la requête POST
                const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem("Local")).token
                },
                body: JSON.stringify(data),
                };
            
                // Effectuer la requête POST vers l'API
                fetch(apiUrl, requestOptions)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log('Réponse de l\'API :', responseData);
                })
                .catch((error) => {
                    console.error('Erreur lors de la requête vers l\'API :', error);
                });
            }
    
            
            // Ajouter le sélecteur au conteneurModal
            contenteurModal.appendChild(selectCategorie);


        // Créer l'élément input de type 'file' pour télécharger une photo
        const inputPhoto = document.createElement('input');
        inputPhoto.type = 'file';
        contenteurModal.appendChild(inputPhoto);

        // Gérer l'événement de changement de fichier pour afficher l'image sélectionnée
        inputPhoto.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                img.src = e.target.result;

                img.style.display = 'block'; // Afficher l'image une fois qu'elle est chargée

                // Créer le bouton "Valider" lorsque l'image est chargée
                const boutonValider = document.createElement('button');
                boutonValider.innerText = 'Valider';
                boutonValider.addEventListener('click', function() {
                    // Récupérer les valeurs des champs inputTitre et selectCategorie
                    const titre = inputTitre.value;
                    const categorie = selectCategorie.value;

                    //Ajout au projet la nouvelle image
                        const form = new FormData();
                        form.append('title',titre);
                        form.append('category',categorie);
                        form.append('image',file);                   
            
                        fetch('http://localhost:5678/api/works', {
                            method: 'POST',
                            headers: {                            
                                'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem("Local")).token
                            },
                            body: form
                        })
                        .then(response => response.json())
                        .then(newProjet => {
                            // Afficher le résultat du serveur ou mettre à jour la galerie en conséquence
                            console.log('Nouveau projet ajouté:', newProjet);
                            // Mettre à jour la galerie
                            fetch('http://localhost:5678/api/works')
                                .then(response => response.json())
                                .then(updatedWorks => {
                                    displayGallery(updatedWorks);
                                    displayGalleryModal(updatedWorks);
                                });
                            // Fermer la fenêtre modale après validation (vous pouvez ajouter une fonction pour cela)
                            fermerFenetreModale();
                        })
                        .catch(error => {
                            console.error('Erreur lors de l\'ajout du nouveau projet:', error);
                        });
                    
                });
                contenteurModal.appendChild(boutonValider);
                
            }
            reader.readAsDataURL(file);
        });
    }

    const Addboutonvert = document.querySelector(".boutonvert");
    if(Addboutonvert != null){
    Addboutonvert.addEventListener('click', function() {
        displayFormulaire();
    
    });
    }




//APPEL DES FONCTIONS
displayGalleryModal(Works);
genererList(categories);
displayGallery(Works);