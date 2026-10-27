
const ajoute = document.querySelector("#btn");
const modal = document.querySelector("#popup-joueur");
const annuler = document.querySelector(".btn-annuler");
const ajoutej = document.querySelector("#ajouterj");
const form = document.querySelector("#form");
const nombrejoueur = document.querySelector('.nbrjoueur');
const hd = document.querySelector('.haid');
const invalidnbr = document.querySelector('.invalidnumbr');
const invalidnom = document.querySelector('.mesageinvalidN');

// button ajoute et annuler
ajoute.addEventListener('click', () => {
    modal.classList.add('formpop');
});

annuler.addEventListener('click', () => {
    modal.classList.remove('formpop');

    form.reset();
    indexmodification = -1;
    cartemodification = null;
});
const nom = document.querySelector('.nom');
const num = document.querySelector('.num');
const post = document.querySelector('.post');
const formj = document.querySelector('.formj');

let listj = JSON.parse(localStorage.getItem("joueurs")) || [];

function sauvegarderJoueurs() {
    
    localStorage.setItem("joueurs", JSON.stringify(listj));
    
}
const positions = {
    GB: { poste: "GB", nom: "Gardien" },
    DG: { poste: "DEF", nom: "Défenseur gauche" },
    DC1: { poste: "DEF", nom: "Défenseur central 1" },
    DC2: { poste: "DEF", nom: "Défenseur central 2" },
    DD: { poste: "DEF", nom: "Défenseur droit" },
    MG: { poste: "MIL", nom: "Milieu gauche" },
    MC1: { poste: "MIL", nom: "Milieu central 1" },
    MC2: { poste: "MIL", nom: "Milieu central 2" },
    MD: { poste: "MIL", nom: "Milieu droit" },
    BU1: { poste: "ATT", nom: "Buteur 1" },
    BU2: { poste: "ATT", nom: "Buteur 2" }
};
let compter = 0;
let indexmodification = -1;
let cartemodification = null;
function assignerJoueur(joueur, positionId) {
    //  l'ancienne 
    document.querySelectorAll(".tiran").forEach(caseTerrain => {
        if (caseTerrain.dataset.joueur === joueur.num) {
            caseTerrain.innerHTML = caseTerrain.dataset.label || "";
            caseTerrain.classList.remove("occupee");
            delete caseTerrain.dataset.joueur;
        }
    });

    joueur.position = positionId;

    // Retour sur le banc
    if (!positionId) {
        sauvegarderJoueurs();
        return true;
    }

    const caseTerrain = document.getElementById(positionId);

    if (!caseTerrain) {
        joueur.position = "";
        sauvegarderJoueurs();
        return false;
    }

    
    if (positions[positionId].poste !== joueur.post) {
        alert("Ce joueur ne peut pas occuper cette position !");
        joueur.position = "";
        sauvegarderJoueurs();
        return false;
    }

    // Verifier si occupée
    const occupee = listj.some(j =>
        j !== joueur && j.position === positionId
    );

    if (occupee) {
        const message= document.querySelector("# message")
        message.textContent =
        "Cette position est déjà occupée !";

        joueur.position = "";
        sauvegarderJoueurs();
        return false;
    }

    caseTerrain.dataset.label = positions[positionId].nom;
    caseTerrain.dataset.joueur = joueur.num;
    caseTerrain.classList.add("occupee");
    caseTerrain.innerHTML = `
        <div class="carte-terrain">
            <span>${joueur.num}</span>
            <span>${joueur.nom}</span>
        </div>
    `;

    sauvegarderJoueurs();
    return true;
}
function actualiserCompteur() {
    nombrejoueur.textContent = listj.length + " joueur(s)";

    if (listj.length > 0) {
        hd.classList.add("hidden");
    } else {
        hd.classList.remove("hidden");
    }
}
function creerSelectPosition(joueur) {
    const select = document.createElement("select");

    select.classList.add(
        "w-full",
        "bg-slate-900",
        "text-white",
        "p-2",
        "rounded-lg",
        "mt-2"
    );

    const banc = document.createElement("option");
    banc.value = "";
    banc.textContent = "Sur le banc";
    select.append(banc);

    Object.keys(positions).forEach(function(positionId) {
        if (positions[positionId].poste === joueur.post) {
            const option = document.createElement("option");
            option.value = positionId;
            option.textContent = positions[positionId].nom;
            select.append(option);
        }
    });

    select.value = joueur.position || "";

    select.addEventListener("change", function() {
        const anciennePosition = joueur.position || "";

        if (!assignerJoueur(joueur, select.value)) {
            select.value = anciennePosition;
        }
    });

    return select;
}

function creercarte(jou) {
    const parent = document.createElement("div");

    parent.classList.add(
        "flex", "flex-col",
        "bg-slate-800", "p-4", "rounded-xl",
        "border", "border-slate-700", "gap-3"
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

    const titre = document.createElement("h1");
    titre.classList.add("font-bold", "text-white", "nom-joueur");
    titre.textContent = jou.nom;

    const parachild = document.createElement("p");
    parachild.classList.add("text-sm", "text-orange-400", "poste-joueur");
    parachild.textContent = jou.post;

    const divchild = document.createElement("div");
    divchild.append(titre, parachild);

    const ligneJoueur = document.createElement("div");
    ligneJoueur.classList.add(
        "flex", "justify-between", "items-center", "gap-3"
    );
    ligneJoueur.append(para, divchild);

    const divicon = document.createElement("div");
    divicon.classList.add("flex", "gap-4");

    const sup = document.createElement("i");
    sup.classList.add("fa-solid", "fa-trash", "cursor-pointer");

    sup.addEventListener("click", function() {
        if (jou.position) {
            const caseTerrain = document.getElementById(jou.position);

            if (caseTerrain) {
                caseTerrain.innerHTML = caseTerrain.dataset.label || "";
                caseTerrain.classList.remove("occupee");
                delete caseTerrain.dataset.joueur;
            }
        }

        const index = listj.indexOf(jou);

        if (index !== -1) {
            listj.splice(index, 1);
        }

        parent.remove();
        sauvegarderJoueurs();
        actualiserCompteur();
    });

    const edit = document.createElement("i");
    edit.classList.add("fa-solid", "fa-pen", "cursor-pointer");

    edit.addEventListener("click", function() {
        cartemodification = parent;
        indexmodification = listj.indexOf(jou);

        nom.value = jou.nom;
        num.value = jou.num;
        post.value = jou.post;

        modal.classList.add("formpop");
    });

    divicon.append(sup, edit);
    ligneJoueur.append(divicon);
    parent.append(ligneJoueur);

    const selectPosition = creerSelectPosition(jou);
    parent.append(selectPosition);

    return parent;
}

// regex
const regexnom = /^[a-zA-ZÀ-ÿ\s]{2,20}$/;
const regexnumbrejoueur = /^(?:[1-9]|1\d|20)$/;

invalidnbr.classList.add('invalidnbr');
invalidnom.classList.add('invalidnom');

// formulaire
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let valid = true;

    if (!regexnumbrejoueur.test(num.value.trim())) {
        invalidnbr.textContent = "Entre un numéro entre 1 et 10";
        valid = false;
    } else {
        invalidnbr.textContent = "";
    }

    if (!regexnom.test(nom.value.trim())) {
        invalidnom.textContent = "Le nom est invalide";
        valid = false;
    } else {
        invalidnom.textContent = "";
    }

    if (!valid) {
        return;
    }

    const jou = {
        nom: nom.value.trim(),
        num: num.value.trim(),
        post: post.value
    };

    if (indexmodification === -1) {
        const numeroExiste = listj.some(j => j.num === jou.num);

        if (numeroExiste) {
            invalidnbr.textContent = "Ce numero  déja utilise";
            return;
        }
        
        
       listj.push(jou);
        sauvegarderJoueurs();

    const parent = creercarte(jou);
          formj.append(parent);

       

    } else {
        const joueurActuel = listj[indexmodification];
        const numeroExiste = listj.some((j, index) =>
            j.num === jou.num && index !== indexmodification
        );
        if (numeroExiste) {
            invalidnbr.textContent = "Ce numéro est déjà utilisé";
            return;
        }

        joueurActuel.nom = jou.nom;
        joueurActuel.num = jou.num;
        joueurActuel.post = jou.post;
        sauvegarderJoueurs();

        
        cartemodification.querySelector(".numero-joueur").textContent = jou.num;
        cartemodification.querySelector(".nom-joueur").textContent = jou.nom;
        cartemodification.querySelector(".poste-joueur").textContent = jou.post;
    }

    compter = listj.length;
    nombrejoueur.textContent = compter + " joueur(s)";

    
    form.reset();
    modal.classList.remove('formpop');

    indexmodification = -1;
    cartemodification = null;

    if (hd) {
        hd.classList.add('hidden');
    }
});

nom.addEventListener("input", function() {
    if (nom.value.trim() === "") {
        invalidnom.textContent = "";
    } else if (!regexnom.test(nom.value.trim())) {
        invalidnom.textContent = "Le nom est invalide";
    } else {
        invalidnom.textContent = "";
    }
});

num.addEventListener("input", function() {
    if (num.value.trim() === "") {
        invalidnbr.textContent = "";
    } else if (!regexnumbrejoueur.test(num.value.trim())) {
        invalidnbr.textContent = "Entre un numéro entre 1 et 20";
    } else {
        invalidnbr.textContent = "";
    }
});

// AFFICHER J 
formj.innerHTML = "";

listj.forEach(function(jou) {
    const parent = creercarte(jou);
    formj.append(parent);
});

listj.forEach(function(jou) {
    if (jou.position) {
        assignerJoueur(jou, jou.position);
    }
});

actualiserCompteur();

//burger menu
const burgerBtn = document.getElementById('burger-btn');
const mobileNav = document.getElementById('mobile-nav');
burgerBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});
