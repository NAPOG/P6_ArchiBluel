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
        console.log("reponse serveur",response)
        if(response.status == 404){
           throw new Error('Les identifiants sont incorrects')
        }else if(response.status == 200){
            return response.json();
        }else if(response.status == 401){
            throw new Error('Les identifiants sont incorrects')
        }      
       
    }).then((data)=>{
        token = data;
        //console.log("reponse serveur",data)
        //Enregistrer le token dans le localstorage
        window.localStorage.setItem("Local", JSON.stringify(token));
        //Récupérer token depuis le localStorage
        window.location.href='indexlog.html';
       
    })
    .catch((error)=>{
        
        alert("mauvais identifiants");
        //TODO afficher les message d'erreur sur le formulaire
        //window.location.href='login.html'
    });
    
    // checkuser(login);
})