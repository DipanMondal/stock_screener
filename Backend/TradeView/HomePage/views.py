from django.shortcuts import render,HttpResponse
import finnhub
from django.http import JsonResponse
from django.conf import settings

finnhub_client = finnhub.Client(api_key=settings.FINNHUB_API_KEY)

# Create your views here.


def home(request):
    return render(request,"home.html")
    
def get_stock_data(request):
    symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA']
    stock_data = {}

    for symbol in symbols:
        quote = finnhub_client.quote(symbol)
        stock_data[symbol] = quote['c']  # Current price

    return JsonResponse(stock_data)
    
def get_stock_news(request):
    news = finnhub_client.company_news('AAPL', _from="2023-01-01", to="2023-12-31")
    # Limiting to 6 news articles for simplicity
    news_data = news[:12]
    return JsonResponse(news_data, safe=False)

