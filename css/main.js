//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getPokemon);
let pokemonImage = document.querySelector('img');

// TODO: Eventually add what the ability does. ex: https://pokeapi.co/api/v2/ability/50/
function getAbilities(abilities) {
	// let abilitiesList = document.querySelector('.abilities'); // get the UL that will hold the abilities
	// // get each ability in the object
	// abilities.forEach((el) => {
	// 	let abilityListItem = document.createElement('li');
	// 	let ability = el.ability['name']; // TODO: remove - if it exists in the ability name
	// 	abilityListItem.innerText = ability; // set the li to the ability
	// 	abilitiesList.append(abilityListItem); // append that ability to the list of abilities
	// });
}

function getPokemon() {
	const pokemon = document.querySelector('input').value.toLowerCase();
	const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

	fetch(url)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			console.log(data);
			console.log(data.types); // get types
			// getAbilities(data.abilities); // get abilites

			// pokemonImage.srcset =
			// 	data.sprites.other['official-artwork']['front_default']; // image
		})
		.catch((err) => {
			// if the pokemon searched doesn't exist in the DB
			console.log(`Error: ${err}`);
			console.log(`There was an error or the ${pokemon} does not exist.`);
		});
}
