//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', fetchPokemon);
let pokemonImage = document.querySelector('img');

function fetchPokemon() {
	const userInput = document.querySelector('input').value;
	const fetchPokemonURL = `https://pokeapi.co/api/v2/pokemon/${userInput}`;

	/**
	 * TODO: Fetch abilities
	 */
	fetch(fetchPokemonURL)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			buildPage(data);
			// console.log(data);
			// console.log(data.types); // get types
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

function buildPage(data) {
	let pokemonNameDisplay = document.querySelector('.pokemon-name');
	let pokemonName = data.name;
	let pokemonID = data.id;
	let pokemonAbilities = data.abilities;
	let pokemonTypes = data.types;
	let pokemonSprite = data.sprites['front_default'];

	// console.log(data);
	// console.log(pokemonAbilities);

	renderPokemonID(pokemonID);
	renderPokemonTypes(pokemonTypes);
	renderPokemonAbilities(pokemonAbilities);

	pokemonNameDisplay.innerText = pokemonName;
	document.querySelector('.pokemon-sprite').srcset = pokemonSprite;
	// get necessary info
	// add the text to the appropriate element
	// append it to .card
}

// preference: function which changes the id to the format 001, 010, 100 like in the pokedex
function renderPokemonID(pokemonID) {
	let pokemonIdDisplay = document.querySelector('.pokemon-id');

	if (pokemonID < 10) {
		pokemonIdDisplay.innerText = `00${pokemonID}`;
	} else if (pokemonID >= 10 && pokemonID < 100) {
		pokemonIdDisplay.innerText = `0${pokemonID}`;
	} else {
		pokemonIdDisplay.innerText = pokemonID;
	}
}

// renders the type found for the pokemon the user searched
function renderPokemonTypes(pokemonTypes) {
	let pokemonTypesDisplay = document.querySelector('.pokemon-types');

	pokemonTypes.forEach((el) => {
		let typeListItem = document.createElement('li');
		let type = el.type['name'];

		typeListItem.innerText = type;
		pokemonTypesDisplay.appendChild(typeListItem);
	});
}

// TODO: Eventually add what the ability does. ex: https://pokeapi.co/api/v2/ability/50/
function renderPokemonAbilities(pokemonAbilities) {
	let pokemonAbilitiesDisplay = document.querySelector('.pokemon-abilities');

	// show all abilities available for pokemon
	pokemonAbilities.forEach((el) => {
		let abilityListItem = document.createElement('li');
		let ability = el.ability['name'];

		// get the description of the ability
		let abilityDescription = fetchDescription(ability);

		// set ability name and description text
		abilityListItem.innerText =
			'' + ability.replace('-', ' ') + ': ' + abilityDescription;

		// append to DOM
		pokemonAbilitiesDisplay.append(abilityListItem); // append that ability to the list of abilities
	});
}

function fetchDescription(ability) {
	const fetchAbilityURL = `https://pokeapi.co/api/v2/ability/${ability}`;

	fetch(fetchAbilityURL)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			// console.log(data);
			let description = data['effect_entries'][1].effect;
			console.log('description: ' + description);
			return description;
		})
		.catch((err) => {
			console.log(`Error: ${err}`);
			console.log(`There was an error or the ${ability} does not exist.`);
		});
}
