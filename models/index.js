const User = require("./User");
const Card = require("./Card");
const Deck = require('./Deck');

Deck.hasMany(Card);
Card.belongsTo(Deck);
User.hasMany(Deck);
Deck.belongsTo(User);

module.exports = { User, Card, Deck };
