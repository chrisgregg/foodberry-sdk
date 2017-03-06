const NutritionCard = require('./nutritionCard');

class Core {

    constructor() {

        document.addEventListener("DOMContentLoaded", (event) => {
            this.init();
        });

    }

    init(key) {

        const cardElements = this.getCardElements();
        Array.from(cardElements).forEach(httpElement => {
            this.initCard(httpElement);
        });

    }

    // Return all recipe-card elements
    getCardElements() {
        const cards = document.getElementsByTagName('recipe-card');
        return cards;
    }

    initCard(httpElement) {

        const cardType = httpElement.getAttribute('data-type');
        const attributes = httpElement.dataset;

        switch (cardType) {
            case 'nutrition':
                httpElement._card = new NutritionCard(httpElement, attributes);
            default:
                return;
        }
    }

}

module.exports = new Core();