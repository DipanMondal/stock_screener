async function fetchStockData() {
	try {
		const response = await fetch('/api/stock-data/');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();

		document.getElementById('AAPL-container-price').innerText = data['AAPL'];
		document.getElementById('GOOGL-container-price').innerText = data['GOOGL'];
		document.getElementById('MSFT-container-price').innerText = data['MSFT'];
		document.getElementById('AMZN-container-price').innerText = data['AMZN'];
		document.getElementById('TSLA-container-price').innerText = data['TSLA'];
		document.getElementById('NVDA-container-price').innerText = data['NVDA'];
	} catch (error) {
		console.error('Error fetching stock data:', error);
	}
}

function startFetchingData() {
	fetchStockData();
	setInterval(fetchStockData, 10000); // Fetch data every 10 seconds
}

// Retry connection with exponential backoff
function retryFetchingData(attempt = 1) {
	fetchStockData()
		.then(() => {
			// Reset interval and continue fetching data
			startFetchingData();
		})
		.catch(() => {
			console.error(`Retry attempt ${attempt} failed. Retrying...`);
			const delay = Math.min(30000, 1000 * Math.pow(2, attempt)); // Max delay 30 seconds
			setTimeout(() => retryFetchingData(attempt + 1), delay);
		});
}

// Fetch data on initial load
document.addEventListener('DOMContentLoaded', () => {
	retryFetchingData();
});


