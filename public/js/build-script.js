//variables
//==================================
const deckViewEl = document.querySelector('#deck-view');





//functions
//====================================
function getId() {
	let loc = document.location.href.split('/');
	loc = loc[loc.length-1].split('?');
	console.log(loc[0]);
	return loc[0];
}

async function addCard(event) {
	const multiverseId = event.target.dataset.multiverseid;
	const imageUrl = event.target.dataset.imageurl;
	if (!multiverseId)
		return;
	
	// console.log(loc[loc.length-1]);
	const response = await fetch('/api/decks/add-card', {
		method: 'POST',
		body: JSON.stringify({
			multiverseId,
			imageUrl,
			deck_id: getId()
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
	const response = await fetch('/api/decks/remove-card', {
		method: 'POST',
		body: JSON.stringify({
			multiverseId,
			deck_id: getId()
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
	const name = event.target.textContent;
	
	const textInput = document.createElement('input');
	textInput.setAttribute('type', 'text');
	textInput.setAttribute('placeholder', name);
	textInput.addEventListener('blur', updateName);
	
	nameH3.remove();
	deckViewEl.prepend(textInput);
	textInput.focus();
}

function updateName(event) {
	const nameInput = event.target;
	const newName = nameInput.value.trim() || nameInput.placeholder;
	
	const nameH3 = document.createElement('h3');
	nameH3.textContent = newName;
	nameH3.addEventListener('click', editName);
	nameInput.remove();
	deckViewEl.prepend(nameH3);
	
	fetch(`/api/decks/${getId()}`, {
		method: 'PUT',
		body: JSON.stringify({
			name: newName
		}),
		headers: {
      'Content-Type': 'application/json'
		}
	})
}

function search(event) {
	event.preventDefault();
	const query = document.querySelector('#search-card-input').value.trim();
	window.location.href = `/build/${getId()}?search=${query}`;
}





//listeners
//=====================================
document.querySelector('#card-view').addEventListener('click', addCard);
document.querySelector('#card-list').addEventListener('click', removeCard);
document.querySelector('#deck-name').addEventListener('click', editName);
document.querySelector('#search-card-form').addEventListener('submit', search);






//body
//=====================================






