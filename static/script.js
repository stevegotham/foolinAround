var app = new Vue({
    delimiters: ['[[', ']]'],
    el: '#foolinAround',
    data: {
        articles: [],
        bureauOptions: [],
        instrumentOptions: [],
        selectedBureau: '- No filter -',
        selectedInstrument: '- No filter -',
        selectedArticle: {},
        displayList: true,
        displayArticle: false,
        limit: 5
    },
    methods: {
        checkRadios: function(button, array) {
            if (button.selected) {
                button.selected = false;
            } else {
                for (let i=0; i<array.length; i++) {
                    if (array[i].value != button.value) {
                        array[i].selected = false;
                    }
                }
            }
        },
        viewMore: function() {
            this.limit = Infinity;
        },
        swapView: function() {
            this.displayList = true;
            this.displayArticle = false;
            this.selectedArticle = {};
        },
        // iterate over filter arrays and only add unique values
        addToFiltersList: function (array, value) {
            let found = false;
            if (array.length === 0) {
                array.push({
                    text: value,
                    value: value,
                    selected: false
                });
            }
            for (let i=0; i<array.length; i++) {
                if (array[i]['value'] === value) {
                    found = true;
                }
            }
            if (!found) {
                array.push({
                    text: value,
                    value: value,
                    selected: false
                });
            }
        },
        // populate the filter arrays by parsing lit of articles (sourceArr)
        populateFiltersArray: function(sourceArr, filtersArr, targetValue) {
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
        },
        selectArticle: function(article) {
            this.displayList = false;
            this.displayArticle = true;
            this.selectedArticle = article;
        }
    },
    computed: {
        // apply selected filters to list of articles
        // filteredArticles: function() {
        //     let selectedBureau = this.selectedBureau,
        //         selectedInstrument = this.selectedInstrument,
        //         filteredList = this.articles;
        //     if (selectedBureau && selectedBureau != "- No filter -") {
        //         filteredList = filteredList.filter(item => item.bureau.name == selectedBureau);
        //     }
        //     if (selectedInstrument && selectedInstrument != "- No filter -") {
        //         filteredList =  filteredList.filter(item => {
        //             for (let i=0; i<item.instruments.length; i++) {
        //                 if (item.instruments[i].company_name === selectedInstrument) return item;
        //             }
        //         });
        //     }
        //     return filteredList;
        // },
        filteredArticles: function() {
            let filteredList = this.articles;
            this.bureauOptions.forEach(option => {
                if (option.selected) {
                    filteredList = filteredList.filter(item => item.bureau.name === option.value);
                }
            })
            this.instrumentOptions.forEach(option => {
                if (option.selected) {
                    filteredList = filteredList.filter(item => {
                        for (let i=0; i<item.instruments.length; i++) {
                            if (item.instruments[i].company_name === option.value) return item;
                        }
                    })
                }
            })
            return filteredList;
        },
        pageheadText: function() {
            return this.selectedArticle.headline ? this.selectedArticle.headline : 'Latest Headlines';
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
            this.populateFiltersArray(this.articles, this.bureauOptions, ['bureau', 'name']);
            this.populateFiltersArray(this.articles, this.instrumentOptions, 'instruments');
        });
    }
});
