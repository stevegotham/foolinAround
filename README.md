## A fun project with which to explore Vue.js

A small project using Vue to dynamically display mock data.

Given more time I'd make the following updates:

Break HTML into Vue components
Add dynamic SEO content
Add additonal data to single article display and style heavily
Continue to style, paying particluar attention to responsive and mobile design

## Setup
1. This is based on Django 2.x series, you'll need to be running python3
1. You'll need to get python/django running on your computer. If you do not already have an environment the Django website outlines how to get up and running.
    * If you're comfortable doing this yourself great! If not here are some guides.
    * Windows: https://docs.djangoproject.com/en/2.2/howto/windows/
    * Mac: https://gist.github.com/hakjoon/216be7abdb5746eb579656102b91d6e3 or https://medium.com/riow/how-to-setup-a-django-development-environment-on-mac-968d129bc661
1. Install Django 2.x packages via:

   ```pip install -r requirements.txt```

    (`pip` may be `pip3` depending on how you install everything)

Once that completes you can run:

```
python3 minimal.py runserver
```

Open the project via http://127.0.0.1:8000/stock-market-news in your web browser.
