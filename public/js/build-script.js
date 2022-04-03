//variables
//==================================
const deckViewEl = document.querySelector('#deck-view');





//functions
//====================================
async function addCard(event) {
	const multiverseId = event.target.dataset.multiverseid;
	if (!multiverseId)
		return;
	
	const loc = document.location.href.split('/')
	// console.log(loc[loc.length-1]);
	const response = await fetch('/api/decks/add-card', {
		method: 'POST',
		body: JSON.stringify({
			multiverseId,
			deck_id: loc[loc.length-1]
		}),
		headers: {
      'Content-Type': 'application/json'
		}
	});
	
	if (response.ok) {
		document.location.reload();
	} else {
		alert(response.statusText);
	}
};

async function removeCard(event) {
	const multiverseId = event.target.dataset.multiverseid;
	const loc = document.location.href.split('/')
	const response = await fetch('/api/decks/remove-card', {
		method: 'POST',
		body: JSON.stringify({
			multiverseId,
			deck_id: loc[loc.length-1]
		}),
		headers: {
      'Content-Type': 'application/json'
		}
	});
	
	if (response.ok) {
		document.location.reload();
	} else {
		alert(response.statusText);
	}
};

function editName(event) {
	const nameH3 = event.target;
	console.log(nameH3);
	const name = event.target.textContent;
	console.log(name);
	
	const textInput = document.createElement('input');
	textInput.setAttribute('type', 'text');
	textInput.setAttribute('placeholder', name);
	
	nameH3.remove();
	deckViewEl.prepend(textInput);
	textInput.focus();
	
}


//listeners
//=====================================
document.querySelector('#card-view').addEventListener('click', addCard);
document.querySelector('#card-list').addEventListener('click', removeCard);
document.querySelector('#deck-name').addEventListener('click', editName);







//body
//=====================================






