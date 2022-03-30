const User = require("./User");
const Deck_Components = require("./Deck_Components");
const Deck = require('./Deck');

Deck.hasMany(Deck_Components);
Deck_Components.belongsTo(Deck);
User.hasMany(Deck, {
    foreignKey: 'user_id'
});
Deck.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Deck_Components, Deck };