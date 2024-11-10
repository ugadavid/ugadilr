// URL du flux RSS
const rssUrl = 'https://eco.sapo.pt/ambiente/feed/';

// Mots-clés pour filtrer les articles
const keywords = ['mudança climática', 'aquecimento global', 'emissões de carbono'];

// Fonction pour récupérer et analyser le flux RSS
async function fetchAndParseRSS() {
  try {
    const response = await fetch(rssUrl);
    const rssText = await response.text();
    const parser = new DOMParser();
    const rssDoc = parser.parseFromString(rssText, 'application/xml');
    return rssDoc;
  } catch (error) {
    console.error('Erreur lors de la récupération du flux RSS :', error);
  }
}

// Fonction pour filtrer les articles en fonction des mots-clés
function filterArticles(rssDoc) {
  const items = rssDoc.querySelectorAll('item');
  const filteredArticles = [];

  items.forEach(item => {
    const title = item.querySelector('title').textContent.toLowerCase();
    const description = item.querySelector('description').textContent.toLowerCase();

    // Vérifier si le titre ou la description contient l'un des mots-clés
    const isRelevant = keywords.some(keyword => title.includes(keyword) || description.includes(keyword));

    if (isRelevant) {
      filteredArticles.push({
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent
      });
    }
  });

  return filteredArticles;
}

// Fonction pour afficher les articles filtrés
function displayArticles(articles) {
  const container = document.getElementById('articles-container');
  container.innerHTML = '';

  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');

    const titleElement = document.createElement('h2');
    const linkElement = document.createElement('a');
    linkElement.href = article.link;
    linkElement.textContent = article.title;
    linkElement.target = '_blank';
    titleElement.appendChild(linkElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = article.description.substring(0, 200) + '...';

    articleElement.appendChild(titleElement);
    articleElement.appendChild(descriptionElement);
    container.appendChild(articleElement);
  });
}

// Fonction principale pour exécuter le processus
async function main() {
  const rssDoc = await fetchAndParseRSS();
  if (rssDoc) {
    const filteredArticles = filterArticles(rssDoc);
    displayArticles(filteredArticles);
  }
}

// Appeler la fonction principale
main();
