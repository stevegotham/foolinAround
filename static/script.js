var app = new Vue({
    delimiters: ['[[', ']]'],
    el: '#foolinAround',
    data: {
        articles: [],
        bureauOptions: [],
        instrumentOptions: [],
        displayList: true,
        limit: 5
    },
    methods: {
        checkRadios: function(button) {
            if (button.selected) {
                button.selected = !button.selected;
            } else {
                for (let i=0; i<this.bureauOptions.length; i++) {
                    if (this.bureauOptions[i].id != button.id) {
                        this.bureauOptions[i].selected = false;
                    }
                }
            }
        }
    },
    computed: {
        filteredArticles: function() {
            let filteredList = this.articles;
            this.bureauOptions.forEach(option => {
              if (option.selected) {
                filteredList = filteredList.filter(item => item.bureau.name === option.value);
              }
            })
            return filteredList;
        }
    },
    created: function() {
        const baseURI = '127.0.0.1/api';
        fetch(baseURI+'/articles')
        .then(response => response.json())
        .then(data => {
            data.results.map(function(item) {
                let endPoint = item.body.indexOf('<p>{%sfr%}</p>');
                item.body = item.body.slice(0,endPoint);
                return item;
            });
            app.articles = data.results;
            for (let i=0; i<app.articles.length; i++) {
                let found = false;
                if (app.bureauOptions.length == 0) {
                    app.bureauOptions.push({
                        id: app.articles[i].bureau.name,
                        text: app.articles[i].bureau.name,
                        value: app.articles[i].bureau.name,
                        selected: false
                    });
                }
                for (let ii=0; ii<app.bureauOptions.length; ii++) {
                    if (app.bureauOptions[ii]['id'] == app.articles[i].bureau.name) {
                        found = true;
                    }
                }
                if (!found) {
                    app.bureauOptions.push({
                        id: app.articles[i].bureau.name,
                        text: app.articles[i].bureau.name,
                        value: app.articles[i].bureau.name,
                        selected: false
                    });
                }
            }
        });
    }
});
