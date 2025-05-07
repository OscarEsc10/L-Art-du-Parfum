from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

def fine_fragrances(request):
    return render(request, 'fine-fragrances.html')

def home_creations(request):
    return render(request, 'home-creations.html')

def body(request):
    return render(request, 'body.html')

def generalShop(request):
    return render(request, 'generalShop.html')  # También faltaba ".html"

def oddities(request):
    return render(request, 'oddities.html')

def gifts(request):
    return render(request, 'gifts.html')

def about(request):
    return render(request, 'about.html')
