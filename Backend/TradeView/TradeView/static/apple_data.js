const socket = new WebSocket('wss://ws.finnhub.io?token=cqhl0n1r01qm46d7l3h0cqhl0n1r01qm46d7l3hg');

// Connection opened
socket.addEventListener('open', function (event) {
    // Subscribe to multiple symbols
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'GOOGL'}));
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'MSFT'}));
	socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AMZN'}));
	socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'TSLA'}));
	socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'NVDA'}));
});

// Listen for messages
socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    if (data.type === 'trade') {
        updateStockPrice(data.data);
    }
});

// Store the latest trade data
const latestTrades = {};

// Function to update the stock price on the HTML page
function updateStockPrice(trades) {
    trades.forEach(trade => {
        latestTrades[trade.s] = trade;
    });

    Object.keys(latestTrades).forEach(symbol => {
        const trade = latestTrades[symbol];
        /*const containerId1 = `${symbol}-container-name`;
        const container1 = document.getElementById(containerId1);*/
		const containerId = `${symbol}-container-price`;
        const container = document.getElementById(containerId);
        
        if (container) {
            container.innerHTML = ''; // Clear the container
			//container2.innerHTML = '';
            /*const tradeElement1 = document.createElement('div');
            //tradeElement1.textContent = `Symbol: ${trade.s} | Price: ${trade.p} | Volume: ${trade.v} | Time: ${new Date(trade.t).toLocaleTimeString()}`;
            tradeElement1.textContent = `${trade.s}`;
			container1.appendChild(tradeElement);*/
			const tradeElement = document.createElement('div');
			tradeElement.textContent = `${trade.p} $`;
			container.appendChild(tradeElement);
        }
    });
}

// Handle window unload event to close WebSocket safely
window.addEventListener('beforeunload', function () {
    socket.close();
});

// Connection closed
socket.addEventListener('close', function (event) {
    console.log('Disconnected from WebSocket');
});

// Handle errors
socket.addEventListener('error', function (event) {
    console.error('WebSocket error:', event);
});
