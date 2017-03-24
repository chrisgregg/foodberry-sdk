const config = require('./config');
const Card = require('./card');

module.exports = class NutritionCard extends Card {

    /**
     * Constructor
     * target: queryexpression
     * url: recipeUrl || current url (default)
     * data: calories || details
     * @param url
     */
    constructor(target, options = {}) {

        super();

        const recipeUrl = options.url || location.href;
        const dataPromise = this.getNutritionSummary({
            url: recipeUrl
        });

        this.renderCardShell(target, dataPromise);

    }


    getNutritionSummary(options) {
        return this.api('nutrition/summary', options);
    }

    /**
     * Get Calories Count Data
     * @returns {Promise}
     */
    getCalorieCount(options) {
        return this.api('nutrition/calories', options);
    }

    /**
     * API Request
     * @returns {Promise}
     */
    api(edge, options) {

        const baseUrl = config.API_BASE_URL;
        const queryString = this.convertDictionaryToQueryString(options);
        const url = baseUrl + "/" + edge + queryString

        return new Promise((resolve, reject) => {

            let req = new XMLHttpRequest();
            req.open('GET', url);
            req.setRequestHeader("Content-Type", "application/json");

            req.onload = function() {
                if (req.status === 200) {
                    // Resolve the promise with the response text
                    resolve(JSON.parse(req.response).data);
                }
                else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = function() {
                reject(Error("Network Error"));
            };

            req.send();

        });

    }


    convertDictionaryToQueryString(params) {
        return "?" + Object
                .keys(params)
                .map(function(key){
                    return key+"="+params[key]
                })
                .join("&")
    }


}

