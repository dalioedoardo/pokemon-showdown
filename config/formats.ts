// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: FormatList = [

	// POWERUP BATTLE - Harzen 29/19/2022
	
	{
		section: "POWERUP BATTLE",
	},
	{
		name: "[Gen 8] National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Standard NatDex', 'Dynamax Clause', 'OHKO Clause', 'Powerup Clause'],
	},
	
	/*
	{
		section: "SANTA'S CHALLENGE",
	},
	{
		name: "[Gen 8] National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Standard NatDex', 'Dynamax Clause', 'OHKO Clause', 'Powerup Clause', 'CHRISTMAS TIME!'],
	},
	*/
	
	
	{
		section: "GYM CHALLENGES - RUSH MODE",
	},
	{
		name: "[Gen 8] ROCK TYPE GYM [RUSH MODE] - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', 'Stubborn Will', 'Ancient Sand'],
	},
	
	
	{
		name: "[Gen 8] GRASS TYPE GYM [RUSH MODE] - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', 'Boundless Growth', 'Wrath of the Forest'],
	},
	
	
	{
		name: "[Gen 8] PSYCHIC TYPE GYM [RUSH MODE] - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', 'Revered Mantra', 'Fresh Mind'],
	},
	
	
	
	{
		name: "[Gen 8] STEEL TYPE GYM [RUSH MODE] - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', 'Legendary Strength', 'Training Hall'],
	},
	
	
	{
		name: "[Gen 8] GHOST TYPE GYM [RUSH MODE] - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', "Warlock's Survey", 'Quantum Festival'],
	},
	
	
	
	
	
	// GYM CHALLENGES - Harzen 04/09/2022
	///////////////////////////////////////////////////////////////////

	//---ROCK!
	{
		section: "ROCK TYPE GYM CHALLENGES",
	},
	{
		name: "[Gen 8] 1.1 ROCK TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Scorching Dryness', 'Ancient Sand'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 1.2 ROCK TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Unexpected Comfort', 'Ancient Sand'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 1.3 ROCK TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Solar Mirage', 'Ancient Sand'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 1.4 ROCK TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Prehistoric Sirocco', 'Ancient Sand'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 1.5 ROCK TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Endless Litostream', 'Ancient Sand'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 1.6 ROCK TYPE BOSS CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		gameType: 'triples',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', 'Boss Challenge', 'Relentless Aura', 'Rising Energy', 'Ancient Sand'],
		banlist: ['Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	
	
	
	
	//---GRASS!
	{
		section: "GRASS TYPE GYM CHALLENGES",
	},
	{
		name: "[Gen 8] 2.1 GRASS TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', "Tengu's Trick", 'Wrath of the Forest'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 2.2 GRASS TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', "Green Curse", 'Wrath of the Forest'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 2.3 GRASS TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', "Royal Influence", 'Wrath of the Forest'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 2.4 GRASS TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Wrath of the Snowy Forest'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 2.5 GRASS TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', "Ambusher's Playground", 'Wrath of the Forest'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 2.6 GRASS TYPE BOSS CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		gameType: 'triples',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', 'Boss Challenge', 'Voracious Aura', 'Rising Energy', 'Wrath of the Forest'],
		banlist: ['Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	
	
	
	
	//---PSYCHIC!
	{
		section: "PSYCHIC TYPE GYM CHALLENGES",
	},
	{
		name: "[Gen 8] 3.1 PSYCHIC TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Natural Abundance', 'Fresh Mind'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 3.2 PSYCHIC TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Wu Wei', 'Fresh Mind'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 3.3 PSYCHIC TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Silent Insight', 'Fresh Mind'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 3.4 PSYCHIC TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Ancestral Ruins', 'Fresh Mind'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 3.5 PSYCHIC TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Neat Wisdom', 'Fresh Mind'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 3.6 PSYCHIC TYPE BOSS CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		gameType: 'triples',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', 'Boss Challenge', 'Mindful Aura', 'Rising Energy', 'Fresh Mind'],
		banlist: ['Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	
	
	//---STEEL!
	{
		section: "STEEL TYPE GYM CHALLENGES",
	},
	{
		name: "[Gen 8] 4.1 STEEL TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Explosive Expertise', 'Training Hall'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 4.2 STEEL TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Knife Rain', 'Training Hall'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 4.3 STEEL TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Bulletproof Sky Patroller', 'Training Hall'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 4.4 STEEL TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Haunted Training Hall'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 4.5 STEEL TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Ultimate Armor', 'Training Hall'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 4.6 STEEL TYPE BOSS CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		gameType: 'triples',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', 'Boss Challenge', 'Mighty Aura', 'Rising Energy', 'Training Hall'],
		banlist: ['Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	
	
	//---GHOST!
	{
		section: "GHOST TYPE GYM CHALLENGES",
	},
	{
		name: "[Gen 8] 5.1 GHOST TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'The Spicy Taste of Hell', 'Quantum Festival'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 5.2 GHOST TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', "It's Adleiavde!", 'Quantum Festival'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 5.3 GHOST TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Vacuum Lab', 'Quantum Festival'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	
	{
		name: "[Gen 8] 5.4 GHOST TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Fancy Mask', 'Quantum Breath'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	
	{
		name: "[Gen 8] 5.5 GHOST TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Requiem Labanderoule', 'Whim of the Sith Lord'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	
	{
		name: "[Gen 8] 5.6 GHOST TYPE BOSS CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		gameType: 'triples',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', 'Boss Challenge', 'Entropic Aura', 'Rising Energy', 'Whim of the Sith Lord'],
		banlist: ['Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	
	
	
	//---WATER!
	{
		section: "WATER TYPE GYM CHALLENGES",
	},
	{
		name: "[Gen 8] 6.1 WATER TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Enchanted Waterworks', 'Marine Optimization'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 6.2 WATER TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Eternal Waterfall Ninjutsu', 'Marine Optimization'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 6.3 WATER TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', 'Oceanification', 'Marine Optimization'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 6.4 WATER TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', "Neptune's Wrath", 'Marine Optimization'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},	
	{
		name: "[Gen 8] 6.5 WATER TYPE GYM CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Cancel Mod', 'Max Team Size = 1', 'Dynamax Clause', 'OHKO Clause', "Frozen Panthalassa", 'Marine Optimization'],
		banlist: ['all items', 'Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	{
		name: "[Gen 8] 6.6 WATER TYPE BOSS CHALLENGE - National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666135/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667921/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666572/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		gameType: 'triples',
		ruleset: ['Cancel Mod', 'Dynamax Clause', 'OHKO Clause', 'Boss Challenge', 'Overflowing Aura', 'Rising Energy', 'Marine Optimization'],
		banlist: ['Endeavor', 'Destiny Bond', 'Counter', 'Mirror Coat', 'Metal Burst', 'Super Fang', "Nature's Madness"],
	},
	
	
	
];
