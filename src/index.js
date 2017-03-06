// Dependencies
const NutritionCard = require('./nutritionCard');
const Core = require('./core');

const SDK = {
    Core: Core,
    NutritionCard: NutritionCard
}

window.Foodberry = window.Foodberry || {};
window.Foodberry.SDK = SDK;

module.exports = SDK;