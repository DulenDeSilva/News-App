let currentPage = 1;

document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    currentPage = 1;
    await fetchNews();
});

document.getElementById('prevPage').addEventListener('click', async () => {
    if (currentPage > 1) {
        currentPage--;
        await fetchNews();
    }
});

document.getElementById('nextPage').addEventListener('click', async () => {
    currentPage++;
    await fetchNews();
});

async function fetchNews() {
    const query = document.getElementById('query').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const language = document.getElementById('language').value;

    const loader = document.getElementById('loader');
    const newsResults = document.getElementById('newsResults');
    const pagination = document.getElementById('pagination');

    loader.classList.remove('hidden');
    newsResults.innerHTML = '';
    pagination.classList.add('hidden');

    const url = `http://localhost:3000/news?query=${query}&from=${from}&to=${to}&language=${language}&page=${currentPage}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        loader.classList.add('hidden');

        if (data.articles && data.articles.length > 0) {
            data.articles.forEach(article => {
                const div = document.createElement('div');
                div.classList.add('news-item');
                div.innerHTML = `
                    <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Thumbnail">
                    <div>
                        <h3>${article.title}</h3>
                        <p>${article.description || 'No description available.'}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    </div>
                `;
                newsResults.appendChild(div);
            });

            pagination.classList.remove('hidden');
        } else {
            newsResults.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        loader.classList.add('hidden');
        console.error('Error fetching news:', error);
        newsResults.innerHTML = '<p>Failed to load news. Please try again.</p>';
    }
}
