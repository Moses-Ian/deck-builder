const mtg = require('mtgsdk');

mtg.card.where({ text: 'lifelink'})
.then(result => {
    console.log(result)
})