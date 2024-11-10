const apiKey = "e5qsx1xdfcdupr6kuer53nudohph9yf1zqpcb3vf"; // Remplace par ta clé API RSS2JSON
const rssUrl = "https://www.lemonde.fr/climat/rss_full.xml";
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&api_key=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const rssFeedContainer = document.getElementById('rss-feed');
    data.items.slice(0, 3).forEach(item => { // Limite aux 5 premiers articles
      const article = document.createElement('div');
      article.classList.add('mb-3');
      article.innerHTML = `
        <h6><a href="${item.link}" target="_blank" class="text-dark">${item.title}</a></h6>
        <p>${item.description}</p>
        <hr>`;
      rssFeedContainer.appendChild(article);
    });
  })
  .catch(error => console.error('Erreur lors du chargement du flux RSS:', error));

  //https://api.rss2json.com/v1/api.json?rss_url=https://www.lemonde.fr/climat/rss_full.xml&api_key=e5qsx1xdfcdupr6kuer53nudohph9yf1zqpcb3vf