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
