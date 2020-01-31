var app = new Vue({
    delimiters: ['[[', ']]'],
    el: '#foolinAround',
    data: {
        articles: [],
        bureauOptions: [],
        instrumentOptions: [],
        selectedBureau: '-- No filter --',
        selectedInstrument: '-- No filter --',
        displayList: true,
        limit: 5
    },
    methods: {
        swapView: function() {
            this.limit == 5 ? this.limit = 10 : this.limit = 5;
        },
        // iterate over filter arrays and only add unique values
        addToFiltersList: function (array, value) {
            let found = false;
            if (array.length === 0) {
                array.push({
                    text: value,
                    value: value
                });
            }
            for (let k=0; k<array.length; k++) {
                if (array[k]['value'] === value) {
                    found = true;
                }
            }
            if (!found) {
                array.push({
                    text: value,
                    value: value
                });
            }
        },
        // populate the filter arrays by parsing lit of articles (sourceArr)
        populateFilters: function(sourceArr, filtersArr, targetValue) {
            for (let i=0; i<sourceArr.length; i++) {
                let target,
                    targetVal;
                if (typeof targetValue === 'string') {
                    target = sourceArr[i][targetValue];
                    for (let j=0; j<target.length; j++) {
                        targetVal = target[j].company_name;
                        this.addToFiltersList(filtersArr, targetVal);
                    }
                } else {
                    targetVal = sourceArr[i][targetValue[0]][targetValue[1]];
                    this.addToFiltersList(filtersArr, targetVal);
                }
            }
            return filtersArr.sort((a,b) => {
                let aValue = a.text.toLowerCase();
                let bValue = b.text.toLowerCase();
                if (aValue < bValue) {
                    return -1;
                }
                if (aValue > bValue) {
                    return 1;
                }
                return 0;
            });
        }
    },
    computed: {
        // apply selected filters to list of articles
        filteredArticles: function() {
            let selectedBureau = this.selectedBureau,
                selectedInstrument = this.selectedInstrument,
                filteredList = this.articles;
            if (selectedBureau && selectedBureau != "-- No filter --") {
                filteredList = filteredList.filter(item => item.bureau.name == selectedBureau);
            }
            if (selectedInstrument && selectedInstrument != "-- No filter --") {
                filteredList =  filteredList.filter(item => {
                    for (let i=0; i<item.instruments.length; i++) {
                        if (item.instruments[i].company_name === selectedInstrument) return item;
                    }
                });
            }
            return filteredList;
        }
    },
    // initial call to retrieve articles, mimicking a search of database
    created: function() {
        const baseURI = '127.0.0.1/api';
        fetch(baseURI+'/articles')
        .then(response => response.json())
        .then(data => {
            this.articles = data.results.map(function(item) {
                let endPoint = item.body.indexOf('<p>{%sfr%}</p>');
                item.body = item.body.slice(0,endPoint);
                return item;
            });
            // populate filter arrays
            this.populateFilters(this.articles, this.bureauOptions, ['bureau', 'name']);
            this.populateFilters(this.articles, this.instrumentOptions, 'instruments');
        });
    }
});
