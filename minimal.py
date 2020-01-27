import sys
from time import sleep
from uuid import uuid4

from django.conf import settings
from django.conf.urls import url
from django.core.management import execute_from_command_line
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.conf.urls.static import static

import os
import json

PROJECT_PATH = os.path.realpath(os.path.dirname(__file__))

settings.configure(
    DEBUG=True,
    ROOT_URLCONF=sys.modules[__name__],
    TEMPLATES=[
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [
                    PROJECT_PATH + '/templates/',
                ],
        }
    ],
    MEDIA_URL='/media/',
    MEDIA_ROOT=PROJECT_PATH + '/media/',
    STATIC_ROOT=PROJECT_PATH + '/static/',
    STATIC_URL='/static/',
)


def stock_market_news(request):
    return render(request, 'news_hub.html')


def get_articles(request):
    articles_api_file = os.path.join(PROJECT_PATH + '/api_data/', 'articles.json')
    with open(articles_api_file, "r") as f:
        articles = json.load(f)
    sleep(1.75)
    return JsonResponse(data=articles)


def get_instruments(request):
    instruments_api_file = os.path.join(PROJECT_PATH + '/api_data/', 'instruments.json')
    with open(instruments_api_file, "r") as f:
        instruments = json.load(f)
    sleep(1.75)
    return JsonResponse(data=instruments, safe=False)


urlpatterns = [
    url(r'stock-market-news$', stock_market_news),
    url(r'api/articles', get_articles),
    url(r'api/instruments', get_instruments),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
              + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if __name__ == '__main__':
    execute_from_command_line(sys.argv)
