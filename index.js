const ajoute=document.querySelector("#btn")
const modal=document.querySelector("#popup-joueur")
const annuler=document.querySelector(".btn-annuler")
 const ajoutej=document.querySelector("#ajouterj")
 const form=document.querySelector("#form")
const nombrejoueur= document.querySelector('.nbrjoueur')

ajoute.addEventListener('click' , () =>  {
modal.classList.add('formpop')
})
annuler.addEventListener('click' , () =>  {
modal.classList.remove('formpop')
})
 
 const nom= document.querySelector('.nom')
 const num = document.querySelector('.num')
 const post= document.querySelector('.post')
 const formj= document.querySelector('.formj')
 const listj=[];
 let compter= 0;

 form.addEventListener('submit', (event) => {
    event.preventDefault();

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
const hd=document.querySelector('.haid')

 