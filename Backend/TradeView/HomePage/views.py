from django.shortcuts import render,HttpResponse
import finnhub
from django.http import JsonResponse
from django.conf import settings
import threading
import websocket
import json

finnhub_client = finnhub.Client(api_key=settings.FINNHUB_API_KEY)

# Create your views here.

DATA={}
value=True;





"""
    ### FOR WEB-SOCKET ###
"""

def on_message(ws, message):
    global DATA
    #msg = message.decode('utf-8')
    msg = json.loads(message)
    if(len(msg)):
        data = msg['data']
        for each in data:
            DATA[each["s"]] = each["p"]  
    #ws.close()

def on_error(ws, error):
    print("Error:", error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    ws.send('{"type":"subscribe","symbol":"AAPL"}')
    ws.send('{"type":"subscribe","symbol":"AMZN"}')
    ws.send('{"type":"subscribe","symbol":"MSFT"}')
    ws.send('{"type":"subscribe","symbol":"GOOGL"}')
    ws.send('{"type":"subscribe","symbol":"TSLA"}')
    ws.send('{"type":"subscribe","symbol":"NVDA"}')

def background_task():
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("wss://ws.finnhub.io?token=" + settings.FINNHUB_API_KEY,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open
    try:
        ws.run_forever()
    except Exception as e:
        print("Error in background_task:", e)
        ws.close() 
    
def get_stock_data(request):
    global DATA
    return JsonResponse(DATA)
    
    
"""
    ### WEB-SOCKET END ###
"""
    
    
    
    
    
    
def home(request):
    global value
    if value:
        value=False
        thread = threading.Thread(target=background_task, daemon=True)
        thread.start()
    return render(request,"home.html")
    
    
def get_stock_news(request):
    news = finnhub_client.company_news('AAPL', _from="2023-01-01", to="2023-12-31")
    # Limiting to 12 news articles for simplicity
    news_data = news[1:12]
    return JsonResponse(news_data, safe=False)
    


