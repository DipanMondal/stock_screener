async function fetchNewsFeeds() {
	try {
		const response = await fetch('/api/stock-news/');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const newsData = await response.json();

		const newsContainer = document.getElementById('news-feeds');
		newsContainer.innerHTML = '';

		newsData.forEach(news => {
			const newsItem = document.createElement('div');
			newsItem.className = 'news-item';
			newsItem.innerHTML = `
				<img src="${news.image}" alt="${news.headline}">
				<h4>${news.headline}</h4>
				<p>${news.summary}</p>
				<a href="${news.url}" target="_blank">Read more</a>
			`;
			newsContainer.appendChild(newsItem);
		});
	} catch (error) {
		console.error('Error fetching news feeds:', error);
	}
}

// Fetch news feeds on initial load
document.addEventListener('DOMContentLoaded', () => {
	fetchNewsFeeds();
});