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



