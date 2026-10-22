const ajoute=document.querySelector("#btn")
const modal=document.querySelector("#popup-joueur")
const annuler=document.querySelector(".btn-annuler")
 const ajoutej=document.querySelector(".ajoutejj")

ajoute.addEventListener('click' , () =>  {
modal.classList.add('formpop')
})
annuler.addEventListener('click' , () =>  {
modal.classList.remove('formpop')
})

