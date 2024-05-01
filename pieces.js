const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();
const sectionFiches = document.querySelector('.fiches');

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

    const pieceElement = document.createElement('article');
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);
    sectionFiches.appendChild(pieceElement);
}

const boutonTrier = document.querySelector('.btn-trier');
boutonTrier.addEventListener('click', () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a, b) => {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector('.btn-filtrer');
boutonFiltrer.addEventListener('click', () => {
    const piecesFiltrees = pieces.filter((piece) => {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
});

const boutonDecroissant = document.querySelector('.btn-decroissant');
boutonDecroissant.addEventListener('click', () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a, b) => {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
});

const boutonNodesc = document.querySelector('.btn-nodesc');
boutonNodesc.addEventListener('click', () => {
    const piecesFiltrees = pieces.filter((piece) => {
        return piece.description;
    });
    console.log(piecesFiltrees);
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
