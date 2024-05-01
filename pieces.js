import { ajoutListenersAvis } from './avis.js';

const pieces = await fetch('http://localhost:8081/pieces').then((pieces) =>
    pieces.json()
);
const sectionFiches = document.querySelector('.fiches');

function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i];

        const imageElement = document.createElement('img');
        imageElement.src = article.image;

        const nomElement = document.createElement('h2');
        nomElement.innerText = article.nom;

        const prixElement = document.createElement('p');
        prixElement.innerText = `Prix : ${article.prix} € (${
            article.prix < 35 ? '€' : '€€€'
        })`;

        const categorieElement = document.createElement('p');
        categorieElement.innerText = article.categorie ?? '(aucune catégorie)';

        const descriptionElement = document.createElement('p');
        descriptionElement.innerText =
            article.description ?? 'Pas de description pour le moment.';

        const stockElement = document.createElement('p');
        stockElement.innerText = article.disponibilite
            ? 'En stock'
            : 'Rupture de stock';

        const avisBouton = document.createElement('button');
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = 'Afficher les avis';

        const pieceElement = document.createElement('article');
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        pieceElement.appendChild(avisBouton);
        sectionFiches.appendChild(pieceElement);
    }

    ajoutListenersAvis();
}

genererPieces(pieces);

const boutonTrier = document.querySelector('.btn-trier');
boutonTrier.addEventListener('click', () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a, b) => {
        return a.prix - b.prix;
    });
    document.querySelector('.fiches').innerHTML = '';
    genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector('.btn-filtrer');
boutonFiltrer.addEventListener('click', () => {
    const piecesFiltrees = pieces.filter((piece) => {
        return piece.prix <= 35;
    });
    document.querySelector('.fiches').innerHTML = '';
    genererPieces(piecesFiltrees);
});

const boutonDecroissant = document.querySelector('.btn-decroissant');
boutonDecroissant.addEventListener('click', () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a, b) => {
        return b.prix - a.prix;
    });
    document.querySelector('.fiches').innerHTML = '';
    genererPieces(piecesOrdonnees);
});

const boutonNodesc = document.querySelector('.btn-nodesc');
boutonNodesc.addEventListener('click', () => {
    const piecesFiltrees = pieces.filter((piece) => {
        return piece.description;
    });
    document.querySelector('.fiches').innerHTML = '';
    genererPieces(piecesFiltrees);
});

const noms = pieces.map((piece) => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1);
    }
}

const abordablesElements = document.createElement('ul');
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}

document.querySelector('.abordables').appendChild(abordablesElements);

const nomsDisponibles = pieces.map((piece) => piece.nom);
const prixDisponibles = pieces.map((piece) => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].disponibilite === false) {
        nomsDisponibles.splice(i, 1);
        prixDisponibles.splice(i, 1);
    }
}

const disponiblesElement = document.createElement('ul');

for (let i = 0; i < nomsDisponibles.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElement.appendChild(nomElement);
}

document.querySelector('.disponibles').appendChild(disponiblesElement);

const inputPrixMax = document.querySelector('#prix-max');
inputPrixMax.addEventListener('input', () => {
    const piecesFiltrees = pieces.filter((piece) => {
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector('.fiches').innerHTML = '';
    genererPieces(piecesFiltrees);
});
