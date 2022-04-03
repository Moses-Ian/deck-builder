//variables
//==================================






//functions
//====================================
async function addCard(event) {
	const multiverseId = event.target.dataset.multiverseid;
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




//listeners
//=====================================
document.querySelector('#card-view').addEventListener('click', addCard);
document.querySelector('#card-list').addEventListener('click', removeCard);








//body
//=====================================






