const ajoute=document.querySelector("#btn")
const modal=document.querySelector("#popup-joueur")
const annuler=document.querySelector(".btn-annuler")
 const ajoutej=document.querySelector("#ajouterj")
 const form=document.querySelector("#form")
const nombrejoueur= document.querySelector('.nbrjoueur')
const hd=document.querySelector('.haid')
const invalidnbr=document.querySelector('.invalidnumbr')
const invalidnom=document.querySelector('.mesageinvalidN')
//button ajoute et annuler 
ajoute.addEventListener('click' , () =>  {
modal.classList.add('formpop')
})
annuler.addEventListener('click' , () =>  {
modal.classList.remove('formpop')
})
 // aficherles joueurs 
 const nom= document.querySelector('.nom')
 const num = document.querySelector('.num')
 const post= document.querySelector('.post')
 const formj= document.querySelector('.formj')
 const listj=[];
 let compter= 0;
 let indexmodification = -1;
 let cartemodification = null;

 form.addEventListener('submit', (event) => {
   event.preventDefault()
   let valid = true 
   if (!regexnumbrejoueur.test(num.value.trim())){
       invalidnbr.textContent=" entre le nom corect ";
        valid= false
    }
     if (!regexnom.test(nom.value.trim())){
        invalidnom.textContent="entre le nombre corect";
        valid= false
    }
    if (!valid){
        return;
    };


    const jou = {
        nom: nom.value,
        num: num.value,
        post: post.value
    };

   if (indexmodification === -1) {
    listj.push(jou);

} else {
   
    const joueurActuel = listj[indexmodification];

    joueurActuel.nom = jou.nom;
    joueurActuel.num = jou.num;
    joueurActuel.post = jou.post;

    cartemodification.querySelector(".numero-joueur").textContent = jou.num;
    cartemodification.querySelector(".nom-joueur").textContent = jou.nom;
    cartemodification.querySelector(".poste-joueur").textContent = jou.post;
}
    //compter les joueur
   compter = listj.length 
nombrejoueur.textContent =compter +"joueur(s)";

    const parent = document.createElement("div");
    parent.classList.add(
        "flex",  "justify-between",
    "items-center","bg-slate-800", "p-4",
        "rounded-xl", "border", "border-slate-700", "gap-3"
    );

    const para = document.createElement("p");
    para.classList.add(
        "w-9", "h-9", "rounded-full",
        "border-2", "border-orange-500",
        "flex", "justify-center", "items-center"
    );

    const span = document.createElement("span");
    span.classList.add("numero-joueur");
    span.textContent = jou.num;
    para.append(span);

    const divchild = document.createElement("div");

    const titre = document.createElement("h1");
    titre.classList.add("font-bold", "text-white" ,"nom-joueur");
    titre.textContent = jou.nom;

    const parachild = document.createElement("p");
    parachild.textContent = jou.post;
    parachild.classList.add("text-sm", "text-orange-400" ,"poste-joueur");
    divchild.append(titre, parachild);
    parent.append(para, divchild);
    formj.append(parent);
    const divicon= document.createElement("div");
    divicon.classList.add("flex","gap-4")
    const sup=document.createElement("i");
    sup.classList.add("fa-solid", "fa-trash","cursor-pointer");
    
    sup.addEventListener('click' , function(){
     parent.remove();
     const index = listj.findIndex(j => j === jou);
     listj.splice(index,1 )
  nombrejoueur.textContent = listj.length + " joueur(s)";
 });
 // edit
    const edit=document.createElement("i");
    edit.classList.add("fa-solid", "fa-pen","cursor-pointer");
    
 edit.addEventListener('click', function() {
    cartemodification= parent;
      indexmodification = listj.findIndex(j => j === jou);
    nom.value= jou.nom;
    num.value= jou.num;
    post.value= jou.post;
    modal.classList.add('formpop');
    
 })
    divicon.append(sup,edit);
     parent.append(divicon);
     const select= document.createElement('select')
     select.classList.add("bg-slate-800", "rounded-xl", "border", "border-slate-700")
      select.id= 'selectj'
        select.name=' selectJ'

         const choix= [
            { text: " GB- gardien", value: "1" },
            { text: " DG-défenseur gauche", value: "2" },
            { text: "DC-défenseur central 1", value: "3" },
            { text: "DC-défenseur central 2", value: "4" },
            { text: "DD-défenseur droit", value: "4" },
            { text: "MG-Milieu gauche", value: "5" },
            { text: "MC-Milieu central 1", value: "6" },
            { text: "MC-Milieu central 2", value: "7" },
            { text: "MD-Milieu driot ", value: "8" },
            { text: "BU-Buteur 1 ", value: "9" },
            { text: "BU-Buteur 2 ", value: "10" }
            
         ];
         choix.forEach(function(item) {
    const option = document.createElement('option');


    option.textContent = item.text;
    option.value = item.value;

    select.append(option);
});

formj.append(select);
      formj.append(select)
     form.reset();
    modal.classList.remove('formpop');
     hd.remove()
    
});
// ragex
const regexnom=/^[a-zA-ZÀ-ÿ\s]{2,20}$/;
const regexnumbrejoueur=/^([1-9]|10)$/;
invalidnbr.classList.add('invalidnbr');
invalidnom.classList.add('invalidnom');

nom.addEventListener("input", function () {
    if (nom.value.trim() === "") {
        invalidnom.textContent = "";
    } 
    else if (!regexnom.test(nom.value.trim())) {
        invalidnom.textContent = "Le nom est invalide";
    } 
    else {
        invalidnom.textContent = "";
    }
});
num.addEventListener("input", function(){
    if (num.value.trim()===""){
        invalidnbr.textContent="invalid nombre";
    } else if (!regexnumbrejoueur.test(num.value.trim())){
        num.textContent="entre le nombre entre 1-10";
    } else { invalidnbr.textContent="";}

});

 







 