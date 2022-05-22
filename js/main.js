document.querySelector('button').addEventListener('click', fetchData);
let pokemonImage = document.querySelector('img');

// TODO: By default, when the page loads, all pokemon from id: 1 to whatever is current.
// pagination: https://pagination.js.org/ or https://pokeapi.co/docs/v2#resource-listspagination-section

// TODO: EVENTUALLY: Add filtering by type (e.g. grass, poison, ground, etc.)

// TODO: Think of a way to add all fetching into a global object.
function fetchData(e) {
	e.preventDefault(); // prevent the page from refreshing every search

	const searchInput = document.querySelector('input').value;
	const fetchPokemonURL = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;

	fetch(fetchPokemonURL)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			createPokemon(data);
		})
		.catch((err) => {
			// if the pokemon searched doesn't exist in the DB
			console.log(`Error: ${err}`);
			console.log(`There was an error or the ${pokemon} does not exist.`);
		});
}

function createPokemon(data) {
	let pokemon = {
		name: data.name,
		id: data.id,
		sprite: data.sprites['other']['official-artwork']['front_default'],
		types() {
			console.log(data.types);
			console.log(data.types[0]);
			console.log(data.types[0].type);
		},
	};

	// let pokemonName = data.name;
	// let pokemonID = data.id;
	// let pokemonSprite =
	// 	data.sprites['other']['official-artwork']['front_default'];
	// let pokemonTypes = data.types;

	/* TODO: Add strengths and weaknesses (check /type/ in API docs) */
	console.log(data); // all data returned in the fetch
	console.log(pokemon.name); // pokemon name
	console.log(pokemon.id); // pokemon id
	console.log(pokemon.sprite); // image
	console.log(pokemon.types()); // types

	class Pokemon {
		constructor(name, id, sprite, type, stats, abilities, evolutions) {
			this.name = data.name;
			this.id = data.id;
			this.sprite =
				data.sprites['other']['official-artwork']['front_default'];
			this.type = data.types.map((type) => console.log(type));
		}
	}
}

// function buildPage(data) {
// 	let pokemonNameDisplay = document.querySelector('.pokemon-name');
// 	let pokemonName = data.name;
// 	let pokemonID = data.id;
// 	let pokemonAbilities = data.abilities;
// 	let pokemonTypes = data.types;
// 	let pokemonSprite = data.sprites['front_default'];

// 	// console.log(data);
// 	// console.log(pokemonAbilities);

// 	renderPokemonID(pokemonID);
// 	renderPokemonTypes(pokemonTypes);
// 	renderPokemonAbilities(pokemonAbilities);

// 	pokemonNameDisplay.innerText = pokemonName;
// 	document.querySelector('.pokemon-sprite').srcset = pokemonSprite;
// 	// get necessary info
// 	// add the text to the appropriate element
// 	// append it to .card
// }

// preference: function which changes the id to the format 001, 010, 100 like in the pokedex
// function renderPokemonID(pokemonID) {
// 	let pokemonIdDisplay = document.querySelector('.pokemon-id');

// 	if (pokemonID < 10) {
// 		pokemonIdDisplay.innerText = `00${pokemonID}`;
// 	} else if (pokemonID >= 10 && pokemonID < 100) {
// 		pokemonIdDisplay.innerText = `0${pokemonID}`;
// 	} else {
// 		pokemonIdDisplay.innerText = pokemonID;
// 	}
// }

// renders the type found for the pokemon the user searched
// function renderPokemonTypes(pokemonTypes) {
// 	let pokemonTypesDisplay = document.querySelector('.pokemon-types');

// 	pokemonTypes.forEach((el) => {
// 		let typeListItem = document.createElement('li');
// 		let type = el.type['name'];

// 		typeListItem.innerText = type;
// 		pokemonTypesDisplay.appendChild(typeListItem);
// 	});
// }

// TODO: Eventually add what the ability does. ex: https://pokeapi.co/api/v2/ability/50/
// function renderPokemonAbilities(pokemonAbilities) {
// 	let pokemonAbilitiesDisplay = document.querySelector('.pokemon-abilities');

// 	// show all abilities available for pokemon
// 	pokemonAbilities.forEach((el) => {
// 		let abilityListItem = document.createElement('li');
// 		let ability = el.ability['name'];

// 		// get the description of the ability
// 		let abilityDescription = fetchDescription(ability);

// 		// set ability name and description text
// 		abilityListItem.innerText =
// 			'' + ability.replace('-', ' ') + ': ' + abilityDescription;

// 		// append to DOM
// 		pokemonAbilitiesDisplay.append(abilityListItem); // append that ability to the list of abilities
// 	});
// }

// function fetchDescription(ability) {
// 	const fetchAbilityURL = `https://pokeapi.co/api/v2/ability/${ability}`;

// 	fetch(fetchAbilityURL)
// 		.then((res) => res.json()) // parse response as JSON
// 		.then((data) => {
// 			console.log(data);
// 			let description = data['effect_entries'][1].effect;
// 			console.log('description: ' + description);
// 			return description;
// 		})
// 		.catch((err) => {
// 			console.log(`Error: ${err}`);
// 			console.log(`There was an error or the ${ability} does not exist.`);
// 		});
// }
