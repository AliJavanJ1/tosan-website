from . import views
from django.urls import path, include
from django.conf.urls.static import static

app_name = 'pages_data_api'
urlpatterns = [
    path('main_page/', views.get_main_page_data, name='main_page'),
]
