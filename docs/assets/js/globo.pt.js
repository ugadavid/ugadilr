const proxyUrl = 'https://api.allorigins.win/raw?url=';
const rssUrl = encodeURIComponent("https://feeds.folha.uol.com.br/ambiente/rss091.xml");

fetch(`${proxyUrl}${rssUrl}`)
  .then(response => response.text())
  .then(str => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(str, "application/xml");
    const items = xml.querySelectorAll("item");
    const rssFeedContainer = document.getElementById('rss-feed');

    items.forEach((item, index) => {
      if (index < 3) { // Limite aux 3 premiers articles
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const description = item.querySelector("description").textContent;

        // Limiter l'extrait de description à 100 caractères environ
        const shortDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

        const article = document.createElement('div');
        article.classList.add('mb-3');
        article.innerHTML = `
          <h6><a href="${link}" target="_blank" class="text-dark">${title}</a></h6>
          <p>${shortDescription}</p>
          <hr>`;
        rssFeedContainer.appendChild(article);
      }
    });
  })
  .catch(error => console.error('Erreur lors du chargement du flux RSS:', error));
