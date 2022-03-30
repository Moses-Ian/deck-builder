const User = require("./User");
const Deck_Components = require("./Deck_Components");
const Deck = require('./Deck');

Deck.hasMany(Deck_Components);
Deck_Components.belongsTo(Deck);
User.hasMany(Deck);
Deck.belongsTo(User);

module.exports = { User, Deck_Components, Deck };