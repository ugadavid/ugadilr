const proxyUrl = 'https://api.allorigins.win/raw?url=';
const rssUrl = encodeURIComponent("https://www.cartacapital.com.br/feed/");
const keywords = ["climate", "climatic", "COP", "Terremoto", "gases", "estufa", "réchauffement", "furacão", "température"]; // Mots-clés pour le filtre

fetch(`${proxyUrl}${rssUrl}`)
  .then(response => response.text())
  .then(str => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(str, "application/xml");
    const items = xml.querySelectorAll("item");
    const rssFeedContainer = document.getElementById('rss-feed');

    items.forEach((item, index) => {
      const title = item.querySelector("title").textContent.toLowerCase();
      const description = item.querySelector("description").textContent.toLowerCase();

      // Vérifie si un mot-clé est présent dans le titre ou la description
      const isClimateRelated = keywords.some(keyword => title.includes(keyword) || description.includes(keyword));
      
      if (isClimateRelated) { // N'affiche que les articles pertinents
        const link = item.querySelector("link").textContent;
        const imageUrl = item.querySelector("enclosure")?.getAttribute("url");

        const article = document.createElement('div');
        article.classList.add('mb-3');
        article.innerHTML = `
          <h6><a href="${link}" target="_blank" class="text-dark">${title}</a></h6>
          <p>${description}</p>
          ${imageUrl ? `<img src="${imageUrl}" alt="Image de l'article" style="max-width: 100%;">` : ''}
          <hr>`;
        rssFeedContainer.appendChild(article);
      }
    });
  })
  .catch(error => console.error('Erreur lors du chargement du flux RSS:', error));
