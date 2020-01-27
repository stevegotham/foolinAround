var app = new Vue({
    delimiters: ['[[', ']]'],
    el: '#foolinAround',
    data: {
        articles: []
    },
    mounted() {
        const baseURI = '127.0.0.1/api';
        fetch(baseURI+'/articles')
            .then(response => response.json())
            .then(data => {
                data.results.map(function(item) {
                    let endPoint = item.body.indexOf('<p>{%sfr%}</p>');
                    item.body = item.body.slice(0,endPoint);
                    return item;
                });
                this.articles = data.results;
            });
    }
});
