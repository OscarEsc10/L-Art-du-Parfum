from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('fine-fragrances/', views.fine_fragrances, name='fine-fragrances'),
    path('home-creations/', views.home_creations, name='home-creations'),
    path('body/', views.body, name='body'),
    path('generalShop/', views.generalShop, name='generalShop'),
    path('oddities/', views.oddities, name='oddities'),
    path('gifts/', views.gifts, name='gifts'),
    path('about/', views.about, name='about'),
    path('cesta/', views.cesta, name = 'cesta.html'),
]