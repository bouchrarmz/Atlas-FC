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

    listj.push(jou);
    //compter les joueur
   compter = listj.length 
nombrejoueur.textContent =compter +"joueur(s)";

    const parent = document.createElement("div");
    parent.classList.add(
        "flex", "bg-slate-800", "p-4",
        "rounded-xl", "border", "border-slate-700", "gap-3"
    );

    const para = document.createElement("p");
    para.classList.add(
        "w-9", "h-9", "rounded-full",
        "border-2", "border-orange-500",
        "flex", "justify-center", "items-center"
    );

    const span = document.createElement("span");
    span.textContent = jou.num;
    para.append(span);

    const divchild = document.createElement("div");

    const titre = document.createElement("h1");
    titre.classList.add("font-bold", "text-white");
    titre.textContent = jou.nom;

    const parachild = document.createElement("p");
    parachild.textContent = jou.post;
    parachild.classList.add("text-sm", "text-orange-400");
    divchild.append(titre, parachild);
    parent.append(para, divchild);
    formj.append(parent);
    const divicon= document
    


     form.reset();
    modal.classList.remove('formpop');
     hd.remove()
    
});
// ragex
const regexnom=/^[a-zA-ZÀ-ÿ\s]{2,20}$/;
const regexnumbrejoueur=/^([1-9]|10)$/;

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






 