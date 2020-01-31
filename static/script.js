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
        createBureauFilters: function(sourceArr, filtersArr, targetValue) {
            for (let i=0; i<sourceArr.length; i++) {
                let found = false,
                    target = sourceArr[i][targetValue[0]][targetValue[1]];
                if (filtersArr.length === 0) {
                    filtersArr.push({
                        text: target,
                        value: target
                    });
                }
                for (let ii=0; ii<filtersArr.length; ii++) {
                    if (filtersArr[ii]['value'] === target) {
                        found = true;
                    }
                }
                if (!found) {
                    filtersArr.push({
                        text: target,
                        value: target
                    });
                }
            }
            return filtersArr;
        },
        createInstrumentFilters: function(sourceArr, filtersArr, targetValue) {
            for (let i=0; i<sourceArr.length; i++) {
                let found = false,
                    target = sourceArr[i][targetValue];
                for (let j=0; j<target.length; j++) {
                    targetVal = target[j].company_name;
                    if (filtersArr.length === 0) {
                        filtersArr.push({
                            text: targetVal,
                            value: targetVal
                        });
                    }
                    for (let k=0; k<filtersArr.length; k++) {
                        if (filtersArr[k]['value'] === targetVal) {
                            found = true;
                        }
                    }
                    if (!found) {
                        filtersArr.push({
                            text: targetVal,
                            value: targetVal
                        });
                    }
                }
            }
            return filtersArr;
        }
    },
    computed: {
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
            this.createBureauFilters(this.articles, this.bureauOptions, ['bureau', 'name']);
            this.createInstrumentFilters(this.articles, this.instrumentOptions, 'instruments');
        });
    }
});
