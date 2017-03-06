const enums = require('./enums');

module.exports = class Card {

    constructor() {

    }

    /**
     * Render Card
     * @param type 'nutrition', 'calories', etc
     * @param target
     * @param dataPromise
     */
    renderCardShell(target, dataPromise) {

        let container = document.createElement('div');
        container.className = 'foodberry-card nutrition-card';
        let title = document.createElement('div');
        title.className = 'card-title'
        title.innerHTML = 'Nutritional Details';
        let credit = document.createElement('div');
        credit.className = 'credit';
        credit.innerHTML = 'Provided by <a href="http://foodberry.com">Foodberry.com</a>';
        target = typeof target === 'string' ? document.querySelector(target) : target;
        if (target) {

            target.appendChild(container);
            container.appendChild(title);

            dataPromise.then(data => {
                let list = document.createElement('ul');
                list.className = 'nutrients';
                for (let key in data) {
                    const nutritionInfo = data[key];
                    let listItem = document.createElement('li');
                    let displayName = enums.nutrientsEnum[key] ? enums.nutrientsEnum[key].displayName : key;
                    let unit = enums.nutrientsEnum[key] ? enums.nutrientsEnum[key].unitOfMeasure : '';
                    listItem.innerHTML = '<span class="nutrient-name">'+displayName+'</span><span class="nutrient-value">'+nutritionInfo+' ('+ unit +')</span>';
                    list.append(listItem);
                }
                container.appendChild(list);
                container.appendChild(credit);

                // for testing
                let testing = document.createElement('div');
                testing.className = 'testing';
                testing.innerHTML = '<a href="https://foodapis.azurewebsites.net/portal/recipe-cards/nutrition/'+data._id+'">edit</a>';

            });
        }


    }

}