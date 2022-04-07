//variables
//==================================
const cardListEl = document.querySelector('#card-list');





//functions
//====================================
function getId() {
	let loc = document.location.href.split('/');
	loc = loc[loc.length - 1].split('?');
	return loc[0];
}

async function addCard(event) {
	const multiverseId = event.target.dataset.multiverseid;
	const imageUrl = event.target.dataset.imageurl;
	if (!multiverseId)
		return;

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
	let target = event.target;
	if (event.target.tagName === 'P' )
		target = target.closest('LI');
	if (event.target.tagName === 'H3')
		return;
	const multiverseId = target.dataset.multiverseid;
	console.log(target.dataset);
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
	cardListEl.prepend(textInput);
	textInput.focus();
}

function updateName(event) {
	const nameInput = event.target;
	const newName = nameInput.value.trim() || nameInput.placeholder;

	const nameH3 = document.createElement('h3');
	nameH3.textContent = newName;
	nameH3.classList.add('list-group-item', 'mb-0');
	nameH3.addEventListener('click', editName);
	nameInput.remove();
	cardListEl.prepend(nameH3);

	const deck_id = getId();

	fetch(`/api/decks/${deck_id}`, {
		method: 'PUT',
		body: JSON.stringify({
			name: newName,
			deck_id
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

function search(event) {
	event.preventDefault();
	const name = document.querySelector('#card-name-input').value.trim();
	const type = document.querySelector('#card-type-input').value.trim();
	const text = document.querySelector('#card-text-input').value.trim();


	window.location.href = `/build/${getId()}?name=${name}&type=${type}&text=${text}`;
}






//listeners
//=====================================
document.querySelector('#card-view').addEventListener('click', addCard);
document.querySelector('#card-list').addEventListener('click', removeCard);
document.querySelector('#deck-name').addEventListener('click', editName);
document.querySelector('#search-button').addEventListener('click', search);






//body
//=====================================






