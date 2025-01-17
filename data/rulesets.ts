// Note: These are the rules that formats use

import {Utils} from "../lib";
import {Pokemon} from "../sim/pokemon";

// The list of formats is stored in config/formats.js
export const Rulesets: {[k: string]: FormatData} = {

	
	//--BASIC RULES PER LA GYM LEADER RUSH MODE CHALLENGE
	
	
	stubbornwill: {
		effectType: 'Rule',
		name: 'Stubborn Will',
		desc: "PILLARS MANAGEMENT + Any Rock type pokèmon receives ⅛ damage from the opponent’s attacks and any damage from a Rock type pokèmon is multiplied by 2",
		onBegin() {
			this.add('rule', 'Stubborn Will');
		},
		onModifyDamage(damage, source, target, move) {
			if(target.getTypes().includes('Rock')){
				return this.chainModify(0.125);
			}
			if(source.getTypes().includes('Rock')){
				return this.chainModify(2);
			}
		},
		onSwitchIn(mon) {	
			//only the GYM LEADER has special mons:
			const gymleaderTeam = ['Magcargo', 'Cradily', 'Solrock', 'Archeops', 'Kabutops', 'Tyranitar', 'Tyranitar-Mega'];
			const fullTeam = mon.side.pokemon;
			for (const ally of fullTeam){
				if(!gymleaderTeam.includes(ally.species.name))
					return; //not gym leader's team
			}
			
			let boosts : number = 0;
			
			if(mon.species.name==gymleaderTeam[3]){
				boosts = 2;
			}
			
			if(mon.species.name==gymleaderTeam[4]){
				boosts = 4;	
			}
			
			if(mon.species.name==gymleaderTeam[5] || mon.species.name==gymleaderTeam[6]){
				boosts = 6;
			}
			
			if(mon.ability == 'contrary'){
				boosts = -boosts;	
			}
			
			//applying the boosts
			if(boosts != 0){
				this.boost({atk: boosts}, mon);	
				this.boost({def: boosts}, mon);		
				this.boost({spe: boosts}, mon);	
			}
		},
	},
	
	
	boundlessgrowth: {
		effectType: 'Rule',
		name: 'Boundless Growth',
		desc: "At the end of each turn, any grass type pokèmon recovers N * x, where N starts at 1 and x is 1/8 of its maximum HP. If its current HP is equal to its maximum HP, all its stats are raised by 1 instead",
		onBegin() {
			this.add('rule', 'Boundless Growth');
		},
		onSwitchIn(mon) {
			if(mon.getTypes().includes('Grass')){
				mon.addVolatile('bondlessgrowth');
			}
			
			//only the GYM LEADER has special mons:
			const gymleaderTeam = ['Shiftry', 'Trevenant', 'Serperior', 'Abomasnow', 'Sceptile', 'Venusaur', 'Venusaur-Mega'];
			const fullTeam = mon.side.pokemon;
			for (const ally of fullTeam){
				if(!gymleaderTeam.includes(ally.species.name))
					return; //not gym leader's team
			}
			
			let boosts : number = 0;
			
			if(mon.species.name==gymleaderTeam[3]){
				boosts = 2;
			}
			
			if(mon.species.name==gymleaderTeam[4]){
				boosts = 4;	
			}
			
			if(mon.species.name==gymleaderTeam[5] || mon.species.name==gymleaderTeam[6]){
				boosts = 6;
			}
			
			if(mon.ability == 'contrary'){
				boosts = -boosts;	
			}
			
			
			//applying the boosts
			if(boosts != 0){
				this.boost({atk: boosts}, mon);	
				this.boost({spa: boosts}, mon);		
				this.boost({spe: boosts}, mon);	
			}
		},
	},
	
	
	
	reveredmantra: {
		effectType: 'Rule',
		name: 'Revered Mantra',
		desc: "SHRINES MANAGEMENT + Psychic type pokèmon are immune to the opponent’s status moves and their weaknesses become resistances",
		onBegin() {
			this.add('rule', 'Revered Mantra');
		},
		onTryHit(target, source, move) {
			if(target.getTypes().includes('Psychic')){
				if (move.category === 'Status' && target !== source) {
					this.add('-immune', target, '[from] ability: Revered Mantra');
					return null;
				}
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (target.getTypes().includes('Psychic') && typeMod == 1){
				return -1;
			}
		},
		onSwitchIn(mon) {	
			//only the GYM LEADER has special mons:
			//!!!CAMBIARE PER OGNI GYMLEADER!!!
			const gymleaderTeam = ['Exeggutor', 'Slowbro', 'Hatterene', 'Xatu', 'Oranguru', 'Medicham', 'Medicham-Mega'];
			const fullTeam = mon.side.pokemon;
			for (const ally of fullTeam){
				if(!gymleaderTeam.includes(ally.species.name))
					return; //not gym leader's team
			}
			
			let boosts : number = 0;
			
			if(mon.species.name==gymleaderTeam[3]){
				boosts = 2;
			}
			
			if(mon.species.name==gymleaderTeam[4]){
				boosts = 4;	
			}
			
			if(mon.species.name==gymleaderTeam[5] || mon.species.name==gymleaderTeam[6]){
				boosts = 6;
			}
			
			if(mon.ability == 'contrary'){
				boosts = -boosts;	
			}
			
			//applying the boosts
			//!!!CAMBIARE PER OGNI GYMLEADER!!!
			if(boosts != 0){
				this.boost({spa: boosts}, mon);	
				this.boost({def: boosts}, mon);		
				this.boost({spd: boosts}, mon);	
			}
		},
	},
	
	
	
	
	
	legendarystrength: {
		effectType: 'Rule',
		name: 'Legendary Strength',
		desc: "GEARS MANAGEMENT + Steel type moves become super effective on any other type if the user is a Steel type pokèmon and the target is not a Steel type pokèmon",
		onBegin() {
			this.add('rule', 'Legendary Strength');
		},
		onEffectiveness(typeMod, target, type, move) {
			//è un po' contorta: devo risalire a chi effettua la mossa attraverso il target... vale solo per le single battles!!!
			if (move.type == 'Steel' && !target.getTypes().includes('Steel') && target.adjacentFoes()[0].getTypes().includes('Steel')){
				return 1;
			}
		},
		onSwitchIn(mon) {
			//only the GYM LEADER has special mons:
			//!!!CAMBIARE PER OGNI GYMLEADER!!!
			const gymleaderTeam = ['Forretress', 'Empoleon', 'Corviknight', 'Aegislash', 'Aggron', 'Metagross', 'Metagross-Mega'];
			const fullTeam = mon.side.pokemon;
			for (const ally of fullTeam){
				if(!gymleaderTeam.includes(ally.species.name))
					return; //not gym leader's team
			}
			
			let boosts : number = 0;
			
			if(mon.species.name==gymleaderTeam[3]){
				boosts = 2;
			}
			
			if(mon.species.name==gymleaderTeam[4]){
				boosts = 4;	
			}
			
			if(mon.species.name==gymleaderTeam[5] || mon.species.name==gymleaderTeam[6]){
				boosts = 6;
			}
			
			if(mon.ability == 'contrary'){
				boosts = -boosts;	
			}
			
			//applying the boosts
			//!!!CAMBIARE PER OGNI GYMLEADER!!!
			if(boosts != 0){
				this.boost({atk: boosts}, mon);	
				this.boost({def: boosts}, mon);		
				this.boost({spd: boosts}, mon);	
			}
		},
	},
	
	
	
	warlockssurvey: {
		effectType: 'Rule',
		name: "Warlock's Survey",
		desc: "CLOAKS MANAGEMENT + Any non-Ghost type pokèmon has 50% chance to be affected by a random non-volatile status condition at the end of each turn",
		onBegin() {
			this.add('rule', "Warlock's Survey");
		},
		onResidual(pokemon) {
			if(!pokemon.getTypes().includes('Ghost')){
				const chances = this.random(120);
				//possibili stati: tox, psn, brn, slp, frz, par
				if(chances < 11)
					pokemon.trySetStatus('tox');
				else if(chances < 21)
					pokemon.trySetStatus('psn');
				else if(chances < 31)
					pokemon.trySetStatus('brn')
				else if(chances < 41)
					pokemon.trySetStatus('slp');
				else if(chances < 51)
					pokemon.trySetStatus('frz');
				else if(chances < 61)
					pokemon.trySetStatus('par');
			}
		},
		onSwitchIn(mon) {
			//only the GYM LEADER has special mons:
			//!!!CAMBIARE PER OGNI GYMLEADER!!!
			const gymleaderTeam = ['Chandelure', 'Shedinja', 'Dragapult', 'Mimikyu', 'Froslass', 'Gengar', 'Gengar-Mega'];
			const fullTeam = mon.side.pokemon;
			for (const ally of fullTeam){
				if(!gymleaderTeam.includes(ally.species.name))
					return; //not gym leader's team
			}
			
			let boosts : number = 0;
			
			if(mon.species.name==gymleaderTeam[3]){
				boosts = 2;
			}
			
			if(mon.species.name==gymleaderTeam[4]){
				boosts = 4;	
			}
			
			if(mon.species.name==gymleaderTeam[5] || mon.species.name==gymleaderTeam[6]){
				boosts = 6;
			}
			
			if(mon.ability == 'contrary'){
				boosts = -boosts;	
			}
			
			//applying the boosts
			//!!!CAMBIARE PER OGNI GYMLEADER!!!
			if(boosts != 0){
				this.boost({spa: boosts}, mon);	
				this.boost({evasion: boosts}, mon);		
				this.boost({accuracy: boosts}, mon);	
			}
		},
	},
	
	
	
	
	
	
	
	
	
	
	
	
	//---CHRISTMAS TIME!:
	christmastime: {
		effectType: 'Rule',
		name: 'CHRISTMAS TIME!',
		desc: "On switch in every SANTA's mon receives a +1 in all stats for each SANTA's defeated mon",
		onBegin() {
			this.add('rule', 'CHRISTMAS TIME!');
		},
		onSwitchIn(mon) {
			
			//only SANTA is affected:
			const santaTeam = ['Rudolph', 'Shooting Star', 'Elven Henchmon', 'Delivery Manager', "Anime's Tribute", 'CHRISTMAS TREE!'];
			const fullTeam = mon.side.pokemon;
			for (const ally of fullTeam){
				if(!santaTeam.includes(ally.name))
					return; //not Santa's team...
			}
			
			let numOfFaintedAllies : number = 0;
			
			for (const ally of fullTeam) {
				if (ally.fainted)
					numOfFaintedAllies++;
			}
			
			if(numOfFaintedAllies > 0){
				this.boost({atk: numOfFaintedAllies}, mon);	
				this.boost({spa: numOfFaintedAllies}, mon);
				this.boost({def: numOfFaintedAllies}, mon);	
				this.boost({spd: numOfFaintedAllies}, mon);	
				this.boost({spe: numOfFaintedAllies}, mon);
				this.boost({accuracy: numOfFaintedAllies}, mon);
				this.boost({evasion: numOfFaintedAllies}, mon);
			}
		},
	},
	
	
	
	//---POWERUP CLAUSE:
	powerupclause: {
		effectType: 'Rule',
		name: 'Powerup Clause',
		desc: "Introduces changes in some pokèmon stats, abilities, moves",
		onBegin() {
			this.add('rule', 'Powerup Clause');
		},
		onModifySpeciesPriority: 1,
		onModifySpecies(species) {
			
			//Edo's team modification
			if(species.name === 'Seedot'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 140, atk: 40, def: 150, spa: 30, spd: 130, spe: 30};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Chlorophyll', 1: 'Early Bird', H: 'Kingpin'};
				
				return newSpecies;
			}
			
			if(species.name === 'Jolteon'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 85, atk: 55, def: 80, spa: 130, spd: 95, spe: 147};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Volt Absorb', H: 'Dazzling'};
				
				return newSpecies;
			}
			
			if(species.name === 'Kabutops'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 100, atk: 130, def: 125, spa: 45, spd: 80, spe: 110};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Swift Swim', 1: 'Tough Claws', H: 'Weak Armor'};
				
				return newSpecies;
			}
			
			if(species.name === 'Tyranitar'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 110, atk: 144, def: 130, spa: 75, spd: 120, spe: 71};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Sand Stream', H: 'Guts'};
				
				return newSpecies;
			}
			
			if(species.name === 'Venusaur'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 85, atk: 92, def: 98, spa: 115, spd: 115, spe: 85};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Overgrow', 1: 'Thick Fat', H: 'Beast Boost'};
				
				return newSpecies;
			}
			
			if(species.name === 'Venusaur-Mega'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 92, atk: 82, def: 153, spa: 157, spd: 152, spe: 85};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Thick Fat'};
				
				return newSpecies;
			}
			
			if(species.name === 'Hypno'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 105, atk: 93, def: 115, spa: 93, spd: 130, spe: 47};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Insomnia', 1: 'Forewarn', H: 'Hypnotist'};
				
				//se faccio qua il cambio tipo il client lo evidenzia durante la battaglia.... pazienza!!
				newSpecies.types = ['Psychic', 'Fairy'];
				
				return newSpecies;
			}
			
			
			
			//Nilox' team modifications
			
			//venu già fatto
			
			if(species.name === 'Pidgeot'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 103, atk: 110, def: 85, spa: 91, spd: 84, spe: 127};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Keen Eye', 1: 'Tangled Feet', H: 'Initiative'};
				
				return newSpecies;
			}
			
			if(species.name === 'Typhlosion'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 94, atk: 74, def: 90, spa: 146, spd: 85, spe: 105};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Blaze', H: 'Berserk'};
				
				return newSpecies;
			}
			
			if(species.name === 'Gyarados'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 115, atk: 135, def: 96, spa: 91, spd: 110, spe: 103};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Intimidate', 1: 'Moxie', H: 'Mold Breaker'};
				newSpecies.types = ['Water', 'Dragon'];
				
				return newSpecies;
			}
			
			if(species.name === 'Nidoqueen'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 150, atk: 72, def: 102, spa: 100, spd: 95, spe: 76};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Poison Point', 1: 'Stamina', H: 'Sheer Force'};
				
				return newSpecies;
			}
			
			if(species.name === 'Sceptile'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 90, atk: 95, def: 75, spa: 115, spd: 85, spe: 120};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Overgrow', H: 'Shed Skin'};
				
				return newSpecies;
			}
			
			if(species.name === 'Sceptile-Mega'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 90, atk: 120, def: 80, spa: 172, spd: 90, spe: 172};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Protean'};
				
				return newSpecies;
			}
			
			
			
			
			//Leo's team modification
			if(species.name === 'Medicham'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 60, atk: 80, def: 85, spa: 80, spd: 85, spe: 100};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Pure Power', H: 'Telepathy'};
				
				return newSpecies;
			}
			
			if(species.name === 'Medicham-Mega'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 85, atk: 130, def: 105, spa: 80, spd: 105, spe: 130};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Pure Power'};
				
				return newSpecies;
			}
			
			if(species.name === 'Dusclops'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 60, atk: 80, def: 170, spa: 70, spd: 170, spe: 25};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Pressure', H: 'Regenerator'};
				
				return newSpecies;
			}
			
			if(species.name === 'Xatu'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 105, atk: 85, def: 90, spa: 110, spd: 90, spe: 110};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				return newSpecies;
			}
			
			if(species.name === 'Noctowl'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 130, atk: 46, def: 103, spa: 106, spd: 137, spe: 70};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Insomnia', 1: 'Fur Coat', H: 'Tinted Lens'};
				newSpecies.types = ['Dark', 'Flying'];
				
				return newSpecies;
			}
			
			if(species.name === 'Ariados'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 135, atk: 95, def: 140, spa: 60, spd: 140, spe: 35};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Swarm', 1: 'Sniper', H: 'Silky Shield'};
				
				return newSpecies;
			}
			
			if(species.name === 'Oranguru'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 145, atk: 40, def: 90, spa: 125, spd: 152, spe: 53};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Inner Focus', 1: 'Telepathy', H: 'Simple'};
				
				return newSpecies;
			}
			
			
			
			
			
			
			//Elia's team modification
			if(species.name === 'Aron'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 85, atk: 100, def: 240, spa: 40, spd: 75, spe: 30};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Sturdy', 1: 'Rock Head', H: 'Wonder Guard'};
				newSpecies.types = ['Steel'];
				
				return newSpecies;
			}
			
			if(species.name === 'Salamence'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 95, atk: 140, def: 95, spa: 110, spd: 100, spe: 110};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Intimidate', H: 'Moxie'};
				
				return newSpecies;
			}
			
			if(species.name === 'Metagross'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 80, atk: 145, def: 150, spa: 95, spd: 100, spe: 80};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Clear Body', H: 'Tough Claws'};
				
				return newSpecies;
			}
			
			if(species.name === 'Metagross-Mega'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 85, atk: 150, def: 155, spa: 105, spd: 110, spe: 115};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Tough Claws'};
				
				return newSpecies;
			}
			
			if(species.name === 'Charizard'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 80, atk: 121, def: 83, spa: 114, spd: 90, spe: 102};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Levitate'};
				newSpecies.types = ['Fire', 'Dragon'];
				
				return newSpecies;
			}
			
			if(species.name === 'Crobat'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 85, atk: 100, def: 80, spa: 100, spd: 80, spe: 153};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Libero', H: 'Infiltrator'};
				
				return newSpecies;
			}
			
			if(species.name === 'Scyther'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 75, atk: 125, def: 95, spa: 55, spd: 95, spe: 130};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Swarm', 1: 'Technician', H: 'Adaptability'};
				
				return newSpecies;
			}
			
			
			
					
			
		
			//Piccia's team modification
			if(species.name === 'Whimsicott'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 90, atk: 47, def: 115, spa: 117, spd: 95, spe: 141};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Prankster', 1: 'Infiltrator', H: 'Fluffy'};
				
				return newSpecies;
			}
			
			if(species.name === 'Vileplume'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 125, atk: 80, def: 85, spa: 135, spd: 90, spe: 70};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Soul-Heart', H: 'Effect Spore'};
				
				return newSpecies;
			}
			
			if(species.name === 'Gengar'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 60, atk: 95, def: 80, spa: 150, spd: 95, spe: 110};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Cursed Body'};
				
				return newSpecies;
			}
			
			if(species.name === 'Gengar-Mega'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 80, atk: 105, def: 95, spa: 201, spd: 100, spe: 140};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				newSpecies.types = ['Ghost', 'Dark'];
				
				return newSpecies;
			}
			
			if(species.name === 'Ampharos'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 95, atk: 75, def: 105, spa: 145, spd: 115, spe: 60};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Static', H: 'Unaware'};
				newSpecies.types = ['Electric', 'Dragon'];
				
				return newSpecies;
			}
			
			if(species.name === 'Shuckle'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 120, atk: 10, def: 230, spa: 10, spd: 230, spe: 5};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Sturdy', 1: 'Contrary', H: 'Huge Power'};
				
				return newSpecies;
			}
			
			if(species.name === 'Froslass'){
				const newSpecies = this.dex.deepClone(species);
				newSpecies.baseStats = {hp: 70, atk: 105, def: 95, spa: 105, spd: 95, spe: 120};
				newSpecies.bst = 0;
				for(const stat in newSpecies.baseStats){
					newSpecies.bst += stat; 	
				}
				
				newSpecies.abilities = {0: 'Snow Cloak', H: 'Glacial Care'};
				
				return newSpecies;
			}
			
			
			
			
			
		},
	},

	
	
	//----------------CUSTOM GYM LEADER RULES
	
	

	//---HARZEN'S REALM:
	
	ancientsand: {
		effectType: 'Rule',
		name: 'Ancient Sand',
		desc: "Rock type moves have STAB of 2 instead of 1.5 and any non-Rock type pokémon that is grounded has its ACCURACY lowered by 2 stages",
		onBegin() {
			this.add('rule', 'Ancient Sand');
		},
		onModifyAccuracy(accuracy, target, source, move) {
			if (!source.hasType('Rock') && !source.hasAbility('Levitate') && !source.hasType('Flying')) {
				return this.chainModify(0.5);
			}
		},
		onModifyMove(move) {
			if(move.type === 'Rock'){
				move.stab = 2;
			}
		},
	},
	
	
	scorchingdryness: {
		effectType: 'Rule',
		name: 'Scorching Dryness',
		desc: "Water-type moves deals no damage, any damage that a non-Fire/Rock type pkm receives from the opponent’s attacks is multiplied by 1.5, any Fire/Rock pmn receives 1/8 damage from the opponent’s attacks",
		onBegin() {
			this.add('rule', 'Scorching Dryness');
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				move.accuracy = true;
				this.hint("There is no water here!");
				this.add('-immune', target, '');
				return null;
			}
		},
		onModifyDamage(damage, source, target, move) {
			if(!(target.getTypes().includes('Fire') && target.getTypes().includes('Rock'))){
				return this.chainModify(1.5);
			}
			else{
				return this.chainModify(0.125);
			}
		},
	},

	unexpectedcomfort: {
		effectType: 'Rule',
		name: 'Unexpected Comfort',
		desc: "All non-Rock/Grass type pokémon have 50% chance to fall asleep at the end of each turn",
		onBegin() {
			this.add('rule', 'Unexpected Comfort');
		},
		onResidual(pokemon) {
			if (!(pokemon.getTypes().includes('Grass') && pokemon.getTypes().includes('Rock')) && pokemon.hp && !pokemon.status && this.randomChance(50, 100)) {
				//this.add('-activate', pokemon, '');
				this.hint(pokemon.name+' feels like taking a sweet nap .  .   .');
				pokemon.setStatus('slp', pokemon);
			}
		},
	},


	solarmirage: {
		effectType: 'Rule',
		name: 'Solar Mirage',
		desc: " All non-Rock/Psychic type pokémon are always confused and when any non-Rock/Psychic type pokémon hits itself in confusion deals double damage",
		onBegin() {
			this.add('rule', 'Solar Mirage');
		},
		onBeforeMove(pokemon, target, move) {
			if (!(pokemon.getTypes().includes('Psychic') && pokemon.getTypes().includes('Rock')) && pokemon.hp) {
				this.hint(pokemon.name+' feels like getting out of bed today was not a good idea!');
				pokemon.addVolatile('solarmiragerule');
			}
		},
	},
	
	
   prehistoricsirocco: {
		effectType: 'Rule',
		name: 'Prehistoric Sirocco',
		desc: "The ability of all Rock/Flying pokèmon changes to Speed Boost, priority moves deal no damage, and all Rock/Flying type pokémon take no recoil damage",
		onBegin() {
			this.add('rule', 'Prehistoric Sirocco');
		},
		onTryHit(target, source, move) {
			if (move && move.priority>=1 && target !== source) {
				this.hint('The Prehistoric Sirocco is too strong for that!');
				this.add('-immune', target, '');
				return null;
			}
		},
		onUpdate(pokemon) {
			if(pokemon.getTypes().includes('Rock') && pokemon.getTypes().includes('Flying')) {
				const oldAbility = pokemon.setAbility('speedboost', pokemon);
				if (oldAbility && this.dex.abilities.get(oldAbility).name !== 'Speed Boost') {
					this.add('-activate', pokemon, 'ability: Speed Boost', this.dex.abilities.get(oldAbility).name, '[of] ' + pokemon);
				}
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil' && source.getTypes().includes('Rock') && source.getTypes().includes('Flying')) {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
	},
	

	endlesslitostream: {
		effectType: 'Rule',
		name: 'Endless Litostream',
		desc: "All the moves of Rock/Water type pokèmon gain +2 priority and all Rock/Water type pokémon raise their EVASION and their ATK by 1 stage each time they deal damage to the opponent",
		onBegin() {
			this.add('rule', 'Endless Litostream');
		},
		onUpdate(pokemon) {
			if(pokemon.getTypes().includes('Rock') && pokemon.getTypes().includes('Water') && pokemon.getAbility().id !== 'moldbreaker') {
				const oldAbility = pokemon.setAbility('moldbreaker', pokemon);
				if (oldAbility && this.dex.abilities.get(oldAbility).name !== 'Mold Breaker') {
					//non serve questo, altrimenti appare troppe volte...
					//this.add('-activate', pokemon, 'ability: Mold Breaker', this.dex.abilities.get(oldAbility).name, '[of] ' + pokemon);
				}
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if(pokemon.getTypes().includes('Rock') && pokemon.getTypes().includes('Water')) return priority + 2;
		},
		onAfterMoveSecondary(target, source, move) {
			if(move.category !== 'Status' && source.getTypes().includes('Rock') && source.getTypes().includes('Water')){
				this.boost({atk: 1}, source);
				this.boost({evasion: 1}, source);
			}
		},
	},


	bosschallenge: {
		effectType: 'Rule',
		name: 'Boss Challenge',
		desc: "allows to enforce the use of a single megastone and to make KO the first turn all lvl<100 pkm",
		onBegin() {
			this.add('rule', 'Boss Challenge');
		},
		onValidateTeam(team) {
			
			const restrictedItems = [];
			
			const isBossTeam = [];
			
			const possibleBoss = [];
			const twoHenchmen = []; //henchmen of the BOSS must be lvl 1 pkms
			
			const alreadyAMegastone = [];
			
			for (const set of team) {
				if (set.level === 1) {
					twoHenchmen.push(set);
				}
				else{
					if(set.level === 100
							&& (
									(set.name === 'Tyranitar' && this.format.name.includes('1.6 ROCK TYPE BOSS CHALLENGE'))
									|| (set.name === 'Venusaur' && this.format.name.includes('2.6 GRASS TYPE BOSS CHALLENGE'))
									|| (set.name === 'Medicham' && this.format.name.includes('3.6 PSYCHIC TYPE BOSS CHALLENGE'))
									|| (set.name === 'Metagross' && this.format.name.includes('4.6 STEEL TYPE BOSS CHALLENGE'))
									|| (set.name === 'Gengar' && this.format.name.includes('5.6 GHOST TYPE BOSS CHALLENGE'))
									|| (set.name === 'Swampert' && this.format.name.includes('6.6 WATER TYPE BOSS CHALLENGE'))
									|| (set.name === 'Lucario' && this.format.name.includes('7.6 FIGHTING TYPE BOSS CHALLENGE'))
									|| (set.name === 'Ampharos' && this.format.name.includes('8.6 ELECTRIC TYPE BOSS CHALLENGE'))
								)
						)
						possibleBoss.push(set);
				}
			}
			
			if (twoHenchmen.length === 2 && possibleBoss.length === 1){
				isBossTeam.push('true');
			}
			
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				if (set.item) {
					if(!item.megaStone || alreadyAMegastone.length>0){
						restrictedItems.push(set.item);
					}
					else{//first megastone
						alreadyAMegastone.push(set.item);
					}
				}
			}
			
			const restrictedMegastone = [];

			if(this.format.name.includes('1.6 ROCK TYPE BOSS CHALLENGE'))
				restrictedMegastone.push('Tyranitarite');
			else if(this.format.name.includes('2.6 GRASS TYPE BOSS CHALLENGE'))
				restrictedMegastone.push('Venusaurite');
			else if(this.format.name.includes('3.6 PSYCHIC TYPE BOSS CHALLENGE'))
				restrictedMegastone.push('Medichamite');
			else if(this.format.name.includes('4.6 STEEL TYPE BOSS CHALLENGE'))
				restrictedMegastone.push('Metagrossite');
			else if(this.format.name.includes('5.6 GHOST TYPE BOSS CHALLENGE'))
				restrictedMegastone.push('Gengarite');
			else if(this.format.name.includes('6.6 WATER TYPE BOSS CHALLENGE'))
				restrictedMegastone.push('Swampertite');
			else if(this.format.name.includes('7.6 FIGHTING TYPE BOSS CHALLENGE'))
				restrictedMegastone.push('Lucarionite');
			else if(this.format.name.includes('8.6 ELECTRIC TYPE BOSS CHALLENGE'))
				restrictedMegastone.push('Ampharosite');
			else
				restrictedMegastone.push('');
			
			if((isBossTeam.length<1 && alreadyAMegastone[0] === restrictedMegastone[0])
				|| (isBossTeam.length>=1 && alreadyAMegastone[0] !== restrictedMegastone[0])){
				restrictedItems.push(alreadyAMegastone[0]);
			}
			
			
			if (restrictedItems.length > 0) {
				return [`You cannot use items, except for a single Mega Stone different from ${restrictedMegastone[0]}. If you are the GYM LEADER, you must have ${restrictedMegastone[0]}... (you have: ${restrictedItems.join(', ')})`];
			}
		},
		onSwitchIn(pokemon) {

			if(this.turn < 1) {
				if((pokemon.adjacentAllies()).length === 0
				    && (
							(pokemon.species.name === 'Tyranitar' && pokemon.item === 'tyranitarite' && this.format.name.includes('1.6 ROCK TYPE BOSS CHALLENGE'))
							|| (pokemon.species.name === 'Venusaur' && pokemon.item === 'venusaurite' && this.format.name.includes('2.6 GRASS TYPE BOSS CHALLENGE'))
							|| (pokemon.species.name === 'Medicham' && pokemon.item === 'medichamite' && this.format.name.includes('3.6 PSYCHIC TYPE BOSS CHALLENGE'))
							|| (pokemon.species.name === 'Metagross' && pokemon.item === 'metagrossite' && this.format.name.includes('4.6 STEEL TYPE BOSS CHALLENGE'))
							|| (pokemon.species.name === 'Gengar' && pokemon.item === 'gengarite' && this.format.name.includes('5.6 GHOST TYPE BOSS CHALLENGE'))
							|| (pokemon.species.name === 'Swampert' && pokemon.item === 'swampertite' && this.format.name.includes('6.6 WATER TYPE BOSS CHALLENGE'))
							|| (pokemon.species.name === 'Lucario' && pokemon.item === 'lucarionite' && this.format.name.includes('7.6 FIGHTING TYPE BOSS CHALLENGE'))
							|| (pokemon.species.name === 'Ampharos' && pokemon.item === 'ampharosite' && this.format.name.includes('8.6 ELECTRIC TYPE BOSS CHALLENGE'))
					 )
				  ){
					pokemon.addVolatile('boss');
				}
			}

			if(pokemon.volatiles['boss']){
				this.boost({atk: 2}, pokemon);
				this.boost({def: 2}, pokemon);
				this.boost({spa: 2}, pokemon);
				this.boost({spd: 2}, pokemon);
				this.boost({spe: 2}, pokemon);	
			}
			else{
				if(pokemon.ability !== 'contrary'){
					this.boost({atk: -2}, pokemon);
					this.boost({def: -2}, pokemon);
					this.boost({spa: -2}, pokemon);
					this.boost({spd: -2}, pokemon);
					this.boost({spe: -2}, pokemon);
				}
				else{
					this.boost({atk: 2}, pokemon);
					this.boost({def: 2}, pokemon);
					this.boost({spa: 2}, pokemon);
					this.boost({spd: 2}, pokemon);
					this.boost({spe: 2}, pokemon);			
				}
			}
		},
		onUpdate(pokemon){
			if (pokemon.level < 100){
				this.damage(pokemon.baseMaxhp, pokemon, pokemon);
			}
			
			if (pokemon.volatiles['boss'] && this.turn <= 3){
				if(pokemon.canMegaEvo){
					pokemon.canMegaEvo = null;
				}
			}
			else{
				
				if(pokemon.volatiles['boss'] && !pokemon.details.includes("-Mega")){
					
					pokemon.canMegaEvo = pokemon.name+'-Mega';
				
					this.actions.runMegaEvo(pokemon);
					
					if(this.format.name.includes('1.6 ROCK TYPE BOSS CHALLENGE'))
						this.add('rule', 'Relentless Aura');
					else if(this.format.name.includes('2.6 GRASS TYPE BOSS CHALLENGE'))
						this.add('rule', 'Voracious Aura');	
					else if(this.format.name.includes('3.6 PSYCHIC TYPE BOSS CHALLENGE'))
						this.add('rule', 'Mindful Aura');
					else if(this.format.name.includes('4.6 STEEL TYPE BOSS CHALLENGE'))
						this.add('rule', 'Mighty Aura');
					else if(this.format.name.includes('5.6 GHOST TYPE BOSS CHALLENGE'))
						this.add('rule', 'Entropic Aura');
					else if(this.format.name.includes('6.6 WATER TYPE BOSS CHALLENGE'))
						this.add('rule', 'Overflowing Aura');
					else if(this.format.name.includes('7.6 FIGHTING TYPE BOSS CHALLENGE'))
						this.add('rule', 'Resolute Aura');
					else if(this.format.name.includes('8.6 ELECTRIC TYPE BOSS CHALLENGE'))
						this.add('rule', 'Brightening Aura');
					
					this.add('rule', 'Rising Energy');

				}
			}
		},
	},
	
	relentlessaura: {
		effectType: 'Rule',
		name: 'Relentless Aura',
		desc: "After each turn, all non-MEGA BOSS pokèmon lose ⅓ of their maximum HP (this effect bypasses any protection and any semi-invulnerability condition).",
		onResidual(pokemon) {
			if(this.turn > 3 && !pokemon.volatiles['boss']){
				this.damage(pokemon.baseMaxhp/3, pokemon, pokemon);
			}
		},
	},
		
	risingenergy: {
		effectType: 'Rule',
		name: 'Rising Energy',
		desc: "After each turn, the MEGA BOSS pokèmon has 50% chance to either: heal its status conditions, raise its ATK, DEF, SPATK, SPDEF, SPE by 1 stage, heal 50% of its maximum HP",
		onResidual(pokemon) {
			if(this.turn > 3 && pokemon.volatiles['boss']){
				const r = this.random(100);
				if (r < 50) {
					const s = this.random(100);
					if(s < 33 && pokemon.status){
						pokemon.cureStatus();
					}
					if(s>33 && s<66){
						this.heal(pokemon.baseMaxhp / 2);
					}
					if(s>66){
						this.boost({atk: 1}, pokemon);
						this.boost({def: 1}, pokemon);
						this.boost({spa: 1}, pokemon);
						this.boost({spd: 1}, pokemon);
						this.boost({spe: 1}, pokemon);
					}
				}
			}
		},
	},






	
	//---NILOX' REALM:
	
	wrathoftheforest: {
		effectType: 'Rule',
		name: 'Wrath of the Forest',
		desc: "Fire type moves, Flying type moves, Ice type moves, Bug type moves, Poison type moves have 75% chance to make the non-grass type user faint at the end of the turn",
		onBegin() {
			this.add('rule', 'Wrath of the Forest');
		},
		onAfterMoveSecondary(target, source, move) {
			source.getTypes
			if(['Fire', 'Flying', 'Ice', 'Bug', 'Poison'].includes(move.type)
					&& !source.getTypes().includes('Grass')){
				source.addVolatile('insolentfool');
			}
		}
	},
	
	tengustrick: {
		effectType: 'Rule',
		name: "Tengu's Trick",
		desc: "All moves that deal 50% damage or more to a grass/dark pokèmon hit the user instead of the target",
		onBegin() {
			this.add('rule', "Tengu's Trick");
		},
		onTryHit(target, source, move){
				if(target.getTypes().includes('Grass') && target.getTypes().includes('Dark')){
			
					const damage = this.actions.getDamage(source, target, move);
					if(damage > target.baseMaxhp/2){
						this.hint('The tengu must be playing some dirty tricks!');
						const autodamage = this.actions.getDamage(source, source, move);
						this.damage(autodamage, source, source);
						return null;
					}
				}
		},
	},
	
	greencurse: {
		effectType: 'Rule',
		name: 'Green Curse',
		desc: "All non-Ghost type pokémon get cursed and all non-Grass type pokémon get leech-seeded",
		onBegin() {
			this.add('rule', 'Green Curse');
		},
		onUpdate(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if(!target.getTypes().includes('Grass') && !target.volatiles['leechseed']){
					target.addVolatile('leechseed', pokemon);		
				}
			}

			if(!pokemon.getTypes().includes('Ghost') && !pokemon.volatiles['curse']){
				pokemon.addVolatile('curse');	
			}
		},
		onResidual(pokemon) {
			if(!pokemon.getTypes().includes('Grass') || !pokemon.getTypes().includes('Ghost')){
				if(this.randomChance(1,2)){
					const negativeboost = (this.dex.abilities.get(pokemon.getAbility()).name !== 'Contrary') ? -1 : 1;
					this.boost({atk: negativeboost}, pokemon);	
					this.boost({spa: negativeboost}, pokemon);
					this.boost({def: negativeboost}, pokemon);	
					this.boost({spd: negativeboost}, pokemon);	
					this.boost({spe: negativeboost}, pokemon);
				}
			}
		},
	},

	royalinfluence: {
		effectType: 'Rule',
		name: 'Royal Influence',
		desc: "All pokémon change their ability into Contrary and all non-grass type pokémon have 50% chance to faint at the end of the turn if at least one of their stats is +1 or more",
		onBegin() {
			this.add('rule', 'Royal Influence');
		},
		onUpdate(pokemon) {		
			const oldAbility = pokemon.setAbility('contrary', pokemon);
			if (oldAbility && this.dex.abilities.get(oldAbility).name !== 'Contrary') {
				this.add('-activate', pokemon, 'ability: Contrary', this.dex.abilities.get(oldAbility).name, '[of] ' + pokemon);
			}
	
			if(!pokemon.getTypes().includes('Grass') && pokemon.positiveBoosts()>0 && !pokemon.volatiles['royalpain']){
				this.hint(pokemon.name+' is not used to all this royality!');
				pokemon.addVolatile('royalpain');	
			}
		},
	},
	
	wrathofthesnowyforest: {
		effectType: 'Rule',
		name: 'Wrath of the Snowy Forest',
		desc: "Flying type moves, Fighting type moves, Rock type moves, Steel type moves, Bug type moves, Poison type moves have 80% chance to make the non-grass/ice type user faint after the move is selected, fire type moves have 100% chance to make the non-grass/ice type user faint after the move is selected and all grass/ice pokèmon receive halved damage",
		onBegin() {
			this.add('rule', 'Wrath of the Snowy Forest');
		},
		onBeforeMove(source, target, move){
			if(!(source.getTypes().includes('Grass') && source.getTypes().includes('Ice'))){
				if(['Fighting', 'Steel', 'Flying', 'Rock', 'Bug', 'Poison'].includes(move.type)){
					if(this.randomChance(80,100)){
						this.hint(source.name+' is punished beforehand by the Boundless Forest!');
						this.damage(source.baseMaxhp, source, source);
						return null;
					}
				}
				if(move.type === 'Fire'){
					this.hint(source.name+' is punished beforehand by the Boundless Forest!');
					this.damage(source.baseMaxhp, source, source);		
					return null;
				}
			}
			
		},
		onModifyDamage(damage, source, target, move) {
			if(target.getTypes().includes('Grass') && target.getTypes().includes('Ice')){
				return this.chainModify(0.5);
			}
		},
	},

	ambushersplayground: {
		effectType: 'Rule',
		name: "Ambusher's Playground",
		desc: "The pokémon that starts first raises its DEF and SPDEF by 2 stages until the end of the turn and the pokémon that moves last has its ATK , SPATK and ACCURACY halved until the end of the turn",
		onBegin() {
			this.add('rule', "Ambusher's Playground");
		},
		onAfterMoveSecondary(target, source, move){
			for (const target of source.adjacentFoes()) {
				if(target.volatiles['ambusher']){
					return;
				}
			}
			this.hint(source.name+' is taking the lead!');
			source.addVolatile('ambusher');
		},
	},

	voraciousaura: {
		effectType: 'Rule',
		name: 'Voracious Aura',
		desc: "After each turn, all non-MEGA BOSS pokèmon lose ⅙ of their maximum HP and the MEGA BOSS pokèmon gains the sum of that amount of HP",
		onResidual(pokemon) {
			if(this.turn > 3 && pokemon.volatiles['boss']){
				const amounts = [];
				for (const target of pokemon.adjacentFoes()) {
					this.damage(target.baseMaxhp/6, target, target);
					if(amounts.length>0){
						amounts.push(amounts.pop()+(target.baseMaxhp/6));
					}
					else{
						amounts.push(target.baseMaxhp/6);
					}
				}
				pokemon.heal(amounts[0]);
			}
		},
	},

	
	//---LEO'S REALM:
	
	freshmind: {
		effectType: 'Rule',
		name: 'Fresh Mind',
		desc: "Psychic type pokémon go first in their priority bracket and any psychic type move gains 50% chance to summon a variant of Psychic Terrain that affects also non-grounded pokemon",
		onBegin() {
			this.add('rule', 'Fresh Mind');
		},
		onUpdate(pokemon) {
			if(!pokemon.volatiles['psychicatmosphere']){
				pokemon.addVolatile('psychicatmosphere');
			}
			if(pokemon.getTypes().includes('Psychic') && !pokemon.volatiles['freshminded']){
				this.hint('The mind of '+pokemon.name+' is so fresh!');
				pokemon.addVolatile('freshminded');
			}
			if(!pokemon.getTypes().includes('Psychic') && pokemon.volatiles['freshminded']){
				this.hint('The mind of '+pokemon.name+' becomes duller...');
				pokemon.removeVolatile('freshminded');
			}
		},
		onAfterMoveSecondary(target, source, move){
			if(move.type === 'Psychic' && !(this.field.terrain==='psychicterrain') && this.randomChance(1,2)){
				this.field.setTerrain('psychicterrain');
				this.add('-message', "This force is so strong that imbues the atmosphere!");
			}
		},
	},
	
	naturalabundance: {
		effectType: 'Rule',
		name: 'Natural Abundance',
		desc: "Bug type moves deal no damage and any Grass/Psychic type pokèmon has 75% chance to restore up to 75% of its maximum HP at the beginning of its turn",
		onBegin() {
			this.add('rule', 'Natural Abundance');
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Bug') {
				move.accuracy = true;
				this.add('-immune', target, '[from] rule: Natural Abundance');
				return null;
			}
		},
		onUpdate(pokemon) {
			if((pokemon.getTypes().includes('Grass') && pokemon.getTypes().includes('Psychic')) && !pokemon.volatiles['abundance']){
				pokemon.addVolatile('abundance');
			}
		},
	},

	wuwei: {
		effectType: 'Rule',
		name: 'Wu Wei',
		desc: "Water/Psychic type pokémon deal damage to the opponent equal to ¼ of its maximum HP while using status moves that heal them",
		onBegin() {
			this.add('rule', 'Wu Wei');
		},
		onAfterMoveSecondary(target, source, move) {
			if (source.getTypes().includes('Water') && source.getTypes().includes('Psychic') && move.flags['heal'] && move.category === 'Status') {
				this.hint("Sometimes doing nothing is the best thing to do!");
				for (const target of source.adjacentFoes()) {
					this.damage(target.baseMaxhp/4, target, target);
				}
			}
		},
	},

	silentinsight: {
		effectType: 'Rule',
		name: 'Silent Insight',
		desc: "Psychic/Fairy type pokémon receive only 1/3 by any type of damame and non-Psychic/Fairy type pokémon cannot raise their stats",
		onBegin() {
			this.add('rule', 'Silent Insight');
		},
		onDamage(damage, target, source, effect) {
			if (target.getTypes().includes('Psychic') && target.getTypes().includes('Fairy')) {
				return damage/3;
			}
		},
		onBoost(boost, target, source, effect) {
			if (target.getTypes().includes('Psychic') && target.getTypes().includes('Fairy')) return;
			let i: BoostID;
			for (i in boost) {
				if(boost[i] && ((boost[i]>0 && target.ability!=='Contrary') || (boost[i]<0 && target.ability==='Contrary'))){
					this.hint("The Silent Insight prevented the boost!");
					delete boost[i];
				}
			}
		},
	},	
	
	ancestralruins: {
		effectType: 'Rule',
		name: 'Ancestral Ruins',
		desc: "Psychic type moves deal super effective damage on Dark and Steel type pokémon and Psychic/Flying type pokémon receive no damage for the first two turns",
		onBegin() {
			this.add('rule', 'Ancestral Ruins');
		},
		onModifyMove(move) {
			if(move.type==='Psychic'){
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Psychic'] = true;
				}
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Psychic' && (type === 'Steel' || type === 'Dark')){
				return 1;
			}
		},
		onDamage(damage, target, source, effect) {
			//TODO: da vedere se va spostata per chiarezza dentro la volatile ancestralprotection
			if (target.volatiles['ancestralprotection']) {
				this.hint("The ancestral ruins prevented the damage!");
				return 0;
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.getTypes().includes('Psychic') && pokemon.getTypes().includes('Flying')) {
				pokemon.addVolatile('ancestralprotection');
			}
		},
	},	

	neatwisdom: {
		effectType: 'Rule',
		name: 'Neat Wisdom',
		desc: "Normal/Psychic type pokémon change their ability into Simple and Normal/Psychic type pokémon heal 25% of their maximum HP when they raise one or more oÿ their stats",
		onBegin() {
			this.add('rule', 'Neat Wisdom');
		},
		onUpdate(pokemon) {
			if(pokemon.getTypes().includes('Normal') && pokemon.getTypes().includes('Psychic')) {
				const oldAbility = pokemon.setAbility('simple', pokemon);
				if (oldAbility && this.dex.abilities.get(oldAbility).name !== 'Simple') {
					this.add('-activate', pokemon, 'ability: Simple', this.dex.abilities.get(oldAbility).name, '[of] ' + pokemon);
				}
			}
		},
		onBoost(boost, target, source, effect) {
			if (!(target.getTypes().includes('Normal') && target.getTypes().includes('Psychic'))) return;
			let i: BoostID = false;
			let anyPositiveBoost: Boolean;
			for (i in boost) {
				if(boost[i] && ((boost[i]>0 && target.ability!=='Contrary') || (boost[i]<0 && target.ability==='Contrary'))){
					anyPositiveBoost = true;
					break;
				}
			}
			
			if(anyPositiveBoost){
				this.heal(target.baseMaxhp/4);
			}
		},
	},	
	
	mindfulaura: {
		effectType: 'Rule',
		name: 'Mindful Aura',
		desc: "Every move used by the MEGA BOSS pokémon will always hit",
		onUpdate(pokemon) {
			if(this.turn > 3 && pokemon.volatiles['boss']){
				if(!pokemon.volatiles['mindfulness']){
					pokemon.addVolatile('mindfulness');
				}
			}
		},
		onModifyMove(move, pokemon) {
			if(pokemon.volatiles['mindfulness']){
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Psychic'] = true;
					move.ignoreImmunity['Fighting'] = true;
					move.ignoreImmunity['Normal'] = true;
					move.ignoreImmunity['Ghost'] = true;
					move.ignoreImmunity['Ground'] = true;
					move.ignoreImmunity['Dragon'] = true;
					move.ignoreImmunity['Electric'] = true;
					move.ignoreImmunity['Poison'] = true;
				}
				delete move.flags['protect'];
				move.accuracy = true;
				this.hint(pokemon.name+" is being mindful!");
			}
		},
	},


	
	//---ELIA'S REALM:
	
	traininghall: {
		effectType: 'Rule',
		name: 'Training Hall',
		desc: "After they deal damage, all Steel type pokémon raise their offensive stat that was involved in the damage calculation by 1 stage and after they receive damage, all Steel type pokémon raise their defensive stat that was involved in the damage calculation by 1 stage",
		onBegin() {
			this.add('rule', 'Training Hall');
		},
		onAfterMoveSecondary(target, source, move) {
			//steel pokemon that deals damage:
			if (source.getTypes().includes('Steel') && (move.category === 'Physical' || move.category === 'Special')) {
				
				const positiveboost = (this.dex.abilities.get(source.getAbility()).name !== 'Contrary') ? 1 : -1;
				
				//attacker is boosted
				if(move.overrideOffensiveStat){
					switch (move.overrideOffensiveStat) {
						case 'atk':
							this.boost({atk: positiveboost}, source);	
							break;
						case 'def':
							this.boost({def: positiveboost}, source);
							break;
						case 'spa':
							this.boost({spa: positiveboost}, source);
							break;
						case 'spd':
							this.boost({spd: positiveboost}, source);
							break;
						case 'spe':
							this.boost({spe: positiveboost}, source);	
							break;
					}
				}
				else{
					if(move.category==='Physical'){
						this.boost({atk: positiveboost}, source);	
					}
					else{
						this.boost({spa: positiveboost}, source);	
					}
				}
			}
			
			//steel pokemon that receives damage:
			if (target.getTypes().includes('Steel') && (move.category === 'Physical' || move.category === 'Special')) {
				
				const positiveboost = (this.dex.abilities.get(target.getAbility()).name !== 'Contrary') ? 1 : -1;
				
				if(move.overrideDefensiveStat){
					switch (move.overrideDefensiveStat) {
						case 'atk':
							this.boost({atk: positiveboost}, target);	
							break;
						case 'def':
							this.boost({def: positiveboost}, target);
							break;
						case 'spa':
							this.boost({spa: positiveboost}, target);
							break;
						case 'spd':
							this.boost({spd: positiveboost}, target);
							break;
						case 'spe':
							this.boost({spe: positiveboost}, target);	
							break;
					}
				}
				else{
					if(move.category==='Physical'){
						this.boost({def: positiveboost}, target);	
					}
					else{
						this.boost({spd: positiveboost}, target);	
					}
				}
			}
		},
	},
	
	
	explosiveexpertise: {
		effectType: 'Rule',
		name: 'Explosive Expertise',
		desc: "Explosion becomes Steel type and deals no damage to the user, explosion gains +2 priority and Explosion deals x2 damage to the targets that resist it",
		onBegin() {
			this.add('rule', 'Explosive Expertise');
		},
		onModifyPriority(priority, pokemon, target, move) {
			if(move.id === 'explosion') return priority + 2;
		},
		onModifyType(move, pokemon) {
			if(move.id !== 'explosion') return;
			
			move.type = 'Steel';
		},
		onModifyMove(move, pokemon) {
			if(move.id !== 'explosion') return;
			
			delete move.selfdestruct;
		},
		onModifyDamage(damage, source, target, move) {
			if(move.id !== 'explosion') return;
			
			if(target.getTypes().includes("Steel")
				|| target.getTypes().includes("Fire")
				|| target.getTypes().includes("Water")
				|| target.getTypes().includes("Electric")){
				return this.chainModify(2);
			}
		},
	},
	
	kniferain: {
		effectType: 'Rule',
		name: 'Knife Rain',
		desc: "The weather is permanently set to Knife Rain [a variant of Rain where the boost in power applies to Steel type moves instead of Water type moves and all non-Steel type pokémon lose ¼ of their maximum HP each turn while all Steel type pokémon heal ¼ of their maximum HP each turn]",
		onBegin() {
			this.add('rule', 'Knife Rain');
			this.field.setWeather('kniferainfall');
		},
		onAnySetWeather(target, source, weather) {
			if(weather.id !== 'kniferainfall')
				return false;
		},
	},
	
	bulletproofskypatroller: {
		effectType: 'Rule',
		name: 'Bulletproof Sky Patroller',
		desc: "All Flying/Steel type pokémon have their EVASION, ACCURACY and SPEED doubled and all Flying type moves of a Flying/Steel type pokémon become also Steel type and will always result in a critical hit",
		onBegin() {
			this.add('rule', 'Bulletproof Sky Patroller');
		},
		onSwitchIn(pokemon) {
			if (pokemon.getTypes().includes('Flying') && pokemon.getTypes().includes('Steel')) {
				if(pokemon.ability!=='Contrary'){
					this.boost({spe: 2}, pokemon);
					this.boost({accuracy: 2}, pokemon);
					this.boost({evasion: 2}, pokemon);
				}
				else{
					this.boost({spe: -2}, pokemon);
					this.boost({accuracy: -2}, pokemon);
					this.boost({evasion: -2}, pokemon);			
				}
			}
		},
		onModifyType(move, pokemon) {
			if(move.type !== 'Flying' || !(pokemon.getTypes().includes('Flying') && pokemon.getTypes().includes('Steel'))) return;
			
			move.type = 'Steel';
			move.willCrit = true;
		},
		onEffectiveness(typeMod, target, type, move) {
			if(this.dex.moves.get(move.id).type !== 'Flying') return typeMod;
			//se son qua ho a che fare con una mossa che era [originariamente] di tipo volante
			if(type === 'Fighting' || type === 'Grass' || type === 'Bug')
				return 1;
		},
	},
	
	
	hauntedtraininghall: {
		effectType: 'Rule',
		name: 'Haunted Training Hall',
		desc: "After they deal damage, all Steel type pokémon raise their offensive stat (ATK or SPATK) that was involved in the damage calculation by 1 stage and lower the opponent’s defensive stat (DEF or SPDEF) that was involved in the damage calculation by 1 stage and after they receive damage, all Steel type pokémon raise their defensive stat (DEF or SPDEF) that was involved in the damage calculation by 1 stage and lower the opponent’s offensive stat (ATK or SPATK) that was involved in the damage calculation by 1 stage",
		onBegin() {
			this.add('rule', 'Haunted Training Hall');
		},
		onAfterMoveSecondary(target, source, move) {
			//steel pokemon that deals damage:
			if (source.getTypes().includes('Steel') && (move.category === 'Physical' || move.category === 'Special')) {
				
				const positiveboost = (this.dex.abilities.get(source.getAbility()).name !== 'Contrary') ? 1 : -1;
				const negativeboost = (this.dex.abilities.get(target.getAbility()).name !== 'Contrary') ? -1 : 1;
				
				//attacker is boosted
				if(move.overrideOffensiveStat){
					switch (move.overrideOffensiveStat) {
						case 'atk':
							this.boost({atk: positiveboost}, source);	
							break;
						case 'def':
							this.boost({def: positiveboost}, source);
							break;
						case 'spa':
							this.boost({spa: positiveboost}, source);
							break;
						case 'spd':
							this.boost({spd: positiveboost}, source);
							break;
						case 'spe':
							this.boost({spe: positiveboost}, source);	
							break;
					}
				}
				else{
					if(move.category==='Physical'){
						this.boost({atk: positiveboost}, source);	
					}
					else{
						this.boost({spa: positiveboost}, source);	
					}
				}
				
				//defender is nerfed
				if(move.overrideDefensiveStat){
					switch (move.overrideDefensiveStat) {
						case 'atk':
							this.boost({atk: negativeboost}, target);	
							break;
						case 'def':
							this.boost({def: negativeboost}, target);
							break;
						case 'spa':
							this.boost({spa: negativeboost}, target);
							break;
						case 'spd':
							this.boost({spd: negativeboost}, target);
							break;
						case 'spe':
							this.boost({spe: negativeboost}, target);	
							break;
					}
				}
				else{
					if(move.category==='Physical'){
						this.boost({def: negativeboost}, target);	
					}
					else{
						this.boost({spd: negativeboost}, target);	
					}
				}
				
			}
			
			//steel pokemon that receives damage:
			if (target.getTypes().includes('Steel') && (move.category === 'Physical' || move.category === 'Special')) {
				
				const positiveboost = (this.dex.abilities.get(target.getAbility()).name !== 'Contrary') ? 1 : -1;
				const negativeboost = (this.dex.abilities.get(source.getAbility()).name !== 'Contrary') ? -1 : 1;
				
				if(move.overrideDefensiveStat){
					switch (move.overrideDefensiveStat) {
						case 'atk':
							this.boost({atk: positiveboost}, target);	
							break;
						case 'def':
							this.boost({def: positiveboost}, target);
							break;
						case 'spa':
							this.boost({spa: positiveboost}, target);
							break;
						case 'spd':
							this.boost({spd: positiveboost}, target);
							break;
						case 'spe':
							this.boost({spe: positiveboost}, target);	
							break;
					}
				}
				else{
					if(move.category==='Physical'){
						this.boost({def: positiveboost}, target);	
					}
					else{
						this.boost({spd: positiveboost}, target);	
					}
				}
				
				//attacker is nerfed
				if(move.overrideOffensiveStat){
					switch (move.overrideOffensiveStat) {
						case 'atk':
							this.boost({atk: negativeboost}, source);	
							break;
						case 'def':
							this.boost({def: negativeboost}, source);
							break;
						case 'spa':
							this.boost({spa: negativeboost}, source);
							break;
						case 'spd':
							this.boost({spd: negativeboost}, source);
							break;
						case 'spe':
							this.boost({spe: negativeboost}, source);	
							break;
					}
				}
				else{
					if(move.category==='Physical'){
						this.boost({atk: negativeboost}, source);	
					}
					else{
						this.boost({spa: negativeboost}, source);	
					}
				}
			}
		},
	},
	
	
	ultimatearmor: {
		effectType: 'Rule',
		name: 'Ultimate Armor',
		desc: "All attacks towards a Steel/Rock type pokémon involve its DEF instead of its SPDEF and all Steel/Rock type pokémon become immune to super effective moves",
		onBegin() {
			this.add('rule', 'Ultimate Armor');
		},
		onTryHit(target, source, move) {
			if ( !(target.getTypes().includes('Rock') && target.getTypes().includes('Steel')) || move.category === 'Status') return;
			if (target.runEffectiveness(move) > 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] rule: Ultimate Armor');
				}
				return null;
			}
			else{
				if(move.category === 'Special' || (move.overrideDefensiveStat && move.overrideDefensiveStat !== 'def')){
					move.overrideDefensiveStat = 'def';
				}
			}
		},
	},
	
	mightyaura: {
		effectType: 'Rule',
		name: 'Mighty Aura',
		desc: "Any damage that a non-MEGA BOSS pokèmon receives from the MEGA BOSS pokèmon is multiplied by 2",
		onModifyDamage(damage, source, target, move) {
			if(this.turn > 3 && source.volatiles['boss']){
				this.hint(source.name+" is using its own aura to boost the damage!");
				return this.chainModify(2);
			}
		},
	},
	
	
	
	//---PICCIA'S REALM:
	
	quantumfestival: {
		effectType: 'Rule',
		name: 'Quantum Festival',
		desc: "All non-Ghost type pokémon can be affected by multiple non-volatile status conditions at the same time and for the first 3 turns all Ghost type pokémon have their EVASION maximized",
		onBegin() {
			if(!this.ruleTable.has('quantumbreath') && !this.ruleTable.has('whimofthesithlord'))
				this.add('rule', 'Quantum Festival');
		},
		onSwitchIn(pokemon){
			if(!pokemon.getTypes().includes('Ghost') && pokemon.status!=='quantumstate'){
				pokemon.setStatus('quantumstate',pokemon);
				this.hint(pokemon.name+" can be affected by multiple statuses!");
			}
			
			if(this.turn<4 && pokemon.getTypes().includes('Ghost') && !pokemon.volatiles['quantumquirk']){
				pokemon.addVolatile('quantumquirk');
			}
		},
		onResidual(pokemon){
			if(this.turn>=3 && pokemon.volatiles['quantumquirk']){
				pokemon.removeVolatile('quantumquirk');
			}
		},
	},
	
	thespicytasteofhell: {
		effectType: 'Rule',
		name: 'The Spicy Taste of Hell',
		desc: "Every move of a Ghost/Fire pokémon gains 50% chance to burn the target and each time a Ghost/Fire pokémon burns the opposing pokémon, the target also becomes cursed and paralyzed",
		onBegin() {
			this.add('rule', 'The Spicy Taste of Hell');
		},
		onSwitchIn(pokemon){
			if(!(pokemon.getTypes().includes('Fire') && pokemon.getTypes().includes('Ghost'))){
				this.hint(pokemon.name+" received a ticket for hell!");
				pokemon.addVolatile('hellvisitor');
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if(source.getTypes().includes('Fire') && source.getTypes().includes('Ghost')){
				if(this.randomChance(50,100)){
					target.trySetStatus('brn', source);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			//questo è per gli altri spettri
			if(status.id==='brn' && (source.getTypes().includes('Fire') && source.getTypes().includes('Ghost'))){
				//metto l'if perchè il burn non è ancora stato settato, e non voglio mettere par al posto del burn
				if(target.status.id==='quantumstate'){//non dovrebbe mai essere vera...
					target.trySetStatus('par', source);
				}
				if(!target.volatiles['curse']){
					target.addVolatile('curse');		
				}
			}
		},
		onAddVolatile(status, target, source, effect) {
			//questo è per chi è affetto da quantumstate
			if(status.id==='qbrn' && (source.getTypes().includes('Fire') && source.getTypes().includes('Ghost'))){
				target.trySetStatus('par', source);
				if(!target.volatiles['curse']){
					target.addVolatile('curse');		
				}
			}
		},
	},

	
	itsadleiavde: {
		effectType: 'Rule',
		name: "It's Adleiavde!",
		desc: "All damages that a Bug/Ghost pokémon receives are delayed by 5 turns",
		onBegin() {
			this.add('rule', "It's Adleiavde!");
		},
		onDamage(damage, target, source, move) {
			if((target.getTypes().includes('Bug') && target.getTypes().includes('Ghost')) && this.turn<=5){
				target.damageAccumulation += damage;
				return false;
			}
		},
		onUpdate(pokemon){
			if((pokemon.getTypes().includes('Bug') && pokemon.getTypes().includes('Ghost')) && this.turn>5){
				if(pokemon.damageAccumulation>0){
					this.damage(pokemon.damageAccumulation);
					if(pokemon.damageAccumulation>=pokemon.baseMaxhp){
						pokemon.faint();
					}
				}
			}
		},
	},
	
	vacuumlab: {
		effectType: 'Rule',
		name: 'Vacuum Lab',
		desc: "All Ghost type pokémon will always score critical hits if they move before the target",
		onBegin() {
			if(!this.ruleTable.has('quantumbreath') && !this.ruleTable.has('whimofthesithlord'))
				this.add('rule', "Vacuum Lab");
		},
		onModifyMove(move, attacker) {
			if(!attacker.getTypes().includes('Ghost')) return;
			
			let isFirst: boolean = true;
			
			for (const target of this.getAllActive()) {
				if (target === attacker) continue;
				if (!this.queue.willMove(target)) { //uno si è già mosso...
					isFirst = false;
					break;
				}
			}
			
			if(isFirst){
				move.willCrit = true;
			}

		},
	},

	quantumbreath: {
		effectType: 'Rule',
		name: 'Quantum Breath',
		desc: "Quantum Festival+Vacuum Lab",
		onBegin() {
			if(!this.ruleTable.has('whimofthesithlord'))
				this.add('rule', 'Quantum Breath');
		},
		ruleset: ['Quantum Festival', 'Vacuum Lab'],
	},	
	
	fancymask: {
		effectType: 'Rule',
		name: 'Fancy Mask',
		desc: "All damages that are received by a Ghost type pokèmon from a Dark type move are halved",
		onBegin() {
			if(!this.ruleTable.has('whimofthesithlord'))
				this.add('rule', 'Fancy Mask');
		},
		onModifyDamage(damage, source, target, move) {
			if(target.getTypes().includes('Ghost') && move.type==='Dark'){
				return this.chainModify(0.5);
			}
		},
	},
	
	whimofthesithlord: {
		effectType: 'Rule',
		name: 'Whim of the Sith Lord',
		desc: "Quantum Breath+Fancy Mask",
		onBegin() {
			this.add('rule', 'Whim of the Sith Lord');
		},
		ruleset: ['Quantum Breath', 'Fancy Mask'],
	},
	
	requiemlabanderoule: {
		effectType: 'Rule',
		name: 'Requiem Labanderoule',
		desc: "All Ice type moves from a Ice/Ghost type pokémon will freeze the target the third turn after the move is successfully used",
		onBegin() {
			this.add('rule', 'Requiem Labanderoule');
		},
		onAfterMoveSecondary(target, source, move) {
			if(move.type === 'Ice' && (source.getTypes().includes('Ice') && source.getTypes().includes('Ghost'))){
				if(target.yohohoho===0){
					target.yohohoho=this.turn+3;
				}
			}
		},
		onResidual(pokemon){
			for(const mon of this.getAllPokemon()){
				if(!mon.fainted){
					if(mon.yohohoho===this.turn){
						let frzmessage : string = ''; //non verrebbe visualizzato il messaggio "[MON] was frozen solid!" se ha il quantumstate
						if(mon.status==='quantumstate' && !mon.statusState.statuses.map(({ name }) => name).includes('frz')){
							frzmessage = mon.name+" was frozen solid!";
						}
						mon.trySetStatus('frz');
						if(frzmessage!=''){
							this.add('-message', frzmessage);
						}
						this.hint('yohohoho~');
						mon.yohohoho = 0;
					}
				}
			}
		}
	},
		
	entropicaura: {
		effectType: 'Rule',
		name: 'Entropic Aura',
		desc: "All non-MEGA BOSS pokèmon swap their ATK with their SPATK and their DEF with their SPDEF",
		onUpdate(pokemon){
			if(this.turn>3 && !pokemon.volatiles['quantumentropy'] && !pokemon.volatiles['boss']){
				pokemon.addVolatile('quantumentropy');
			}
		},
	},	
	
	
	
	
	//---DAVIDE'S REALM:
	
	marineoptimization: {
		effectType: 'Rule',
		name: 'Marine Optimization',
		desc: "Water type pokémon raise three of their stats by 1 stage at the end of each turn",
		onBegin() {
			this.add('rule', 'Marine Optimization');
		},
		onResidual(pokemon) {
			if (pokemon.hasType('Water')) {
				
				const boosts = [{atk: 1}, {def: 1}, {spa: 1}, {spd: 1}, {spe: 1}, {accuracy: 1}, {evasion: 1}];
				const nerfs = [{atk: -1}, {def: -1}, {spa: -1}, {spd: -1}, {spe: -1}, {accuracy: -1}, {evasion: -1}];
				
				let randomNumber1 : number = this.random(0, 7);
				let randomNumber2 : number = -1;
				let randomNumber3 : number = -1;
				
				while(randomNumber2<0 || randomNumber2 === randomNumber1)
					randomNumber2 = this.random(0,7);
				
				while(randomNumber3<0 || (randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2))
					randomNumber3 = this.random(0,7);
				
				this.hint("The sea itself is optimizing "+pokemon.name+"!")
				
				if(pokemon.getAbility().id !== 'contrary'){
					this.boost(boosts[randomNumber1], pokemon);
					this.boost(boosts[randomNumber2], pokemon);
					this.boost(boosts[randomNumber3], pokemon);
				}
				else{
					this.boost(nerfs[randomNumber1], pokemon);
					this.boost(nerfs[randomNumber2], pokemon);
					this.boost(nerfs[randomNumber3], pokemon);
				}
			}
		},
	},
	
	enchantedwaterworks: {
		effectType: 'Rule',
		name: 'Enchanted Waterworks',
		desc: "Water/Fairy type pokémon cannot be statused, for the first three turns, any damage that a Water/Fairy type pokémon deals is multiplied by 3, for the first three turns, any damage that a Water/Fairy type pokémon receives is divided by 3",
		onBegin() {
			this.add('rule', 'Enchanted Waterworks');
		},
		onModifyDamage(damage, source, target, move) {
			if(this.turn < 4){
				if(target.getTypes().includes('Water') && target.getTypes().includes('Fairy')){
					return this.chainModify(0.33);
				}
				if(source.getTypes().includes('Water') && source.getTypes().includes('Fairy')){
					return this.chainModify(3);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if(!(target.getTypes().includes('Water') && target.getTypes().includes('Fairy'))) return;
			
			if (!effect || !source) return;
			if (effect.id === 'yawn') return;
			if (target !== source) {
				this.debug('interrupting setStatus');
				return null;
			}
		},
		onTryAddVolatile(status, target, source, effect) {
			if(!(target.getTypes().includes('Water') && target.getTypes().includes('Fairy'))) return;
			
			if (!effect || !source) return;
			if ((status.id === 'confusion' || status.id === 'yawn') && target !== source) {
				return null;
			}
		},
	},
	
	eternalwaterfallninjutsu: {
		effectType: 'Rule',
		name: 'Eternal Waterfall Ninjutsu',
		desc: "All the attacks of a Water/Dark type pokémon will always score critical hits and Water/Dark type pokémon will always move first in their priority bracket",
		onBegin() {
				this.add('rule', "Eternal Waterfall Ninjutsu");
		},
		onModifyMove(move, attacker) {
			if(attacker.getTypes().includes('Water') && attacker.getTypes().includes('Dark')){
				move.willCrit = true;
			}
		},
		onFractionalPriority(priority, pokemon) {
			if(pokemon.getTypes().includes('Water') && pokemon.getTypes().includes('Dark')){
				return priority+0.1;
			}
		},
	},
	
	oceanification: {
		effectType: 'Rule',
		name: 'Oceanification',
		desc: "The weather is permanently set to Rain and Water type pokémon gain an amount of HP equals to the damage they deal to the opponent if they use a Water type move",
		onBegin() {
			this.add('rule', "Oceanification");
			this.field.setWeather('raindance', null, null, true); //true=forcePermanent (il mio nuovo parametro, aggiunto a sim/field.ts)
		},
		onModifyMove(move, attacker) {
			if(attacker.getTypes().includes('Water') && move.type === 'Water'){
				move.flags['heal'] = 1;
				move.drain = [1, 1];
			}
		},
	},
	
	neptuneswrath: {
		effectType: 'Rule',
		name: "Neptune's Wrath",
		desc: "Every time a Water/Steel type pokémon is damaged by the opponent, the opponent has 80% chance to lose half of its current HP",
		onBegin() {
			this.add('rule', "Neptune's Wrath");
		},
		onAfterMoveSecondary(target, source, move) {
			if(move.category !== 'Status' && target.getTypes().includes('Water') && target.getTypes().includes('Steel')){
				if(this.randomChance(80, 100)){
					this.damage(source.baseMaxhp/2, source, source);
				}
			}
		},
	},
	
	frozenpanthalassa: {
		effectType: 'Rule',
		name: 'Frozen Panthalassa',
		desc: "Any non-Ice type pokémon has 50% chance to freeze at the end of each turn",
		onBegin() {
			this.add('rule', 'Frozen Panthalassa');
		},
		onResidual(pokemon){
			if(!pokemon.getTypes().includes('Ice')){
				if(this.randomChance(1,2)){
					pokemon.trySetStatus('frz', pokemon);
				}
			}
		},
	},
	
	overflowingaura: {
		effectType: 'Rule',
		name: 'Overflowing Aura',
		desc: "The MEGA BOSS pokémon is immune to all the moves that deal a damage higher than 30% of its maximum HP",
		onTryHit(target, source, move){
			if(this.turn > 3 && target.volatiles['boss']){
				const damage = this.actions.getDamage(source, target, move);
				if(damage > target.baseMaxhp*30/100){
					this.hint('The overflowing aura of '+target.name+' is absorbing the hit!');
					return null;
				}
			}
		},
	},
	
	
	



	// Rulesets
	///////////////////////////////////////////////////////////////////

	standard: {
		effectType: 'ValidatorRule',
		name: 'Standard',
		desc: "The standard ruleset for all offical Smogon singles tiers (Ubers, OU, etc.)",
		ruleset: [
			'Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Items Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
		],
	},
	standardnext: {
		effectType: 'ValidatorRule',
		name: 'Standard NEXT',
		desc: "The standard ruleset for the NEXT mod",
		ruleset: [
			'+Unreleased', 'Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'HP Percentage Mod', 'Cancel Mod',
		],
		banlist: ['Soul Dew'],
	},
	flatrules: {
		effectType: 'ValidatorRule',
		name: 'Flat Rules',
		desc: "The in-game Flat Rules: Adjust Level Down 50, Species Clause, Item Clause, -Mythical, -Restricted Legendary, Bring 6 Pick 3-6 depending on game type.",
		ruleset: ['Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Adjust Level Down = 50', 'Picked Team Size = Auto', 'Cancel Mod'],
		banlist: ['Mythical', 'Restricted Legendary'],
	},
	limittworestricted: {
		effectType: 'ValidatorRule',
		name: 'Limit Two Restricted',
		desc: "Limit two restricted Pokémon (flagged with * in the rules list)",
		onValidateTeam(team) {
			const restrictedSpecies = [];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (this.ruleTable.isRestrictedSpecies(species)) restrictedSpecies.push(species.name);
			}
			if (restrictedSpecies.length > 2) {
				return [`You can only use up to two restricted Pok\u00E9mon (you have: ${restrictedSpecies.join(', ')})`];
			}
		},
	},
	limitonerestricted: {
		effectType: 'ValidatorRule',
		name: 'Limit One Restricted',
		desc: "Limit one restricted Pokémon (flagged with * in the rules list)",
		onValidateTeam(team) {
			const restrictedSpecies = [];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (this.ruleTable.isRestrictedSpecies(species)) restrictedSpecies.push(species.name);
			}
			if (restrictedSpecies.length > 1) {
				return [`You can only use one restricted Pok\u00E9mon (you have: ${restrictedSpecies.join(', ')})`];
			}
		},
	},
	standarddoubles: {
		effectType: 'ValidatorRule',
		name: 'Standard Doubles',
		desc: "The standard ruleset for all official Smogon doubles tiers",
		ruleset: [
			'Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Gravity Sleep Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
		],
	},
	standardoms: {
		effectType: 'ValidatorRule',
		name: 'Standard OMs',
		desc: "The standard ruleset for all Smogon OMs (Almost Any Ability, STABmons, etc.)",
		ruleset: [
			'Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Dynamax Clause', 'HP Percentage Mod', 'Cancel Mod', 'Overflow Stat Mod',
		],
	},
	standardnatdex: {
		effectType: 'ValidatorRule',
		name: 'Standard NatDex',
		desc: "The standard ruleset for all National Dex tiers",
		/*
		ruleset: [
			'Obtainable', '+Unobtainable', '+Past', 'Sketch Gen 8 Moves', 'Team Preview', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause',
		],
		*/
		ruleset: [
			'+Past', 'Team Preview', 'Cancel Mod', 'HP Percentage Mod', 'Nickname Clause', 'Sketch Gen 8 Moves'
		],
		onValidateSet(set) {
			/*
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.species.get(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			const item = this.dex.items.get(set.item);
			if (!item.isNonstandard) return;
			if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
			*/
		},
	},
	obtainable: {
		effectType: 'ValidatorRule',
		name: 'Obtainable',
		desc: "Makes sure the team is possible to obtain in-game.",
		ruleset: ['Obtainable Moves', 'Obtainable Abilities', 'Obtainable Formes', 'EV Limit = Auto', 'Obtainable Misc'],
		banlist: ['Unreleased', 'Unobtainable', 'Nonexistent'],
		// Mostly hardcoded in team-validator.ts
		onValidateTeam(team, format) {
			let kyuremCount = 0;
			let necrozmaDMCount = 0;
			let necrozmaDWCount = 0;
			let calyrexCount = 0;
			for (const set of team) {
				if (set.species === 'Kyurem-White' || set.species === 'Kyurem-Black') {
					if (kyuremCount > 0) {
						return [
							`You cannot have more than one Kyurem-Black/Kyurem-White.`,
							`(It's untradeable and you can only make one with the DNA Splicers.)`,
						];
					}
					kyuremCount++;
				}
				if (set.species === 'Necrozma-Dusk-Mane') {
					if (necrozmaDMCount > 0) {
						return [
							`You cannot have more than one Necrozma-Dusk-Mane`,
							`(It's untradeable and you can only make one with the N-Solarizer.)`,
						];
					}
					necrozmaDMCount++;
				}
				if (set.species === 'Necrozma-Dawn-Wings') {
					if (necrozmaDWCount > 0) {
						return [
							`You cannot have more than one Necrozma-Dawn-Wings`,
							`(It's untradeable and you can only make one with the N-Lunarizer.)`,
						];
					}
					necrozmaDWCount++;
				}
				if (set.species === 'Calyrex-Ice' || set.species === 'Calyrex-Shadow') {
					if (calyrexCount > 0) {
						return [
							`You cannot have more than one Calyrex-Ice/Calyrex-Shadow.`,
							`(It's untradeable and you can only make one with the Reins of Unity.)`,
						];
					}
					calyrexCount++;
				}
			}
			return [];
		},
	},
	obtainablemoves: {
		effectType: 'ValidatorRule',
		name: 'Obtainable Moves',
		desc: "Makes sure moves are learnable by the species.",
		// Hardcoded in team-validator.ts
	},
	obtainableabilities: {
		effectType: 'ValidatorRule',
		name: 'Obtainable Abilities',
		desc: "Makes sure abilities match the species.",
		// Hardcoded in team-validator.ts
	},
	obtainableformes: {
		effectType: 'ValidatorRule',
		name: 'Obtainable Formes',
		desc: "Makes sure in-battle formes only appear in-battle.",
		// Hardcoded in team-validator.ts
	},
	obtainablemisc: {
		effectType: 'ValidatorRule',
		name: 'Obtainable Misc',
		desc: "Validate all obtainability things that aren't moves/abilities (Hidden Power type, gender, IVs, events, duplicate moves).",
		// Mostly hardcoded in team-validator.ts
		onChangeSet(set) {
			const species = this.dex.species.get(set.species);

			if (species.gender) {
				if (set.gender !== species.gender) {
					set.gender = species.gender;
				}
			} else {
				if (set.gender !== 'M' && set.gender !== 'F') {
					set.gender = '';
				}
			}

			// limit one of each move
			// repealing this will not actually let you USE multiple moves, because of a cart bug:
			// https://twitter.com/DaWoblefet/status/1396217830006132737
			if (set.moves) {
				const hasMove: {[k: string]: true} = {};
				for (const moveId of set.moves) {
					const move = this.dex.moves.get(moveId);
					const moveid = move.id;
					if (hasMove[moveid]) return [`${species.baseSpecies} has multiple copies of ${move.name}.`];
					hasMove[moveid] = true;
				}
			}
		},
	},
	hoennpokedex: {
		effectType: 'ValidatorRule',
		name: 'Hoenn Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Hoenn region (OR/AS)",
		onValidateSet(set, format) {
			const hoennDex = [
				"Abra", "Absol", "Aggron", "Alakazam", "Altaria", "Anorith", "Armaldo", "Aron", "Azumarill", "Azurill", "Bagon", "Baltoy", "Banette", "Barboach", "Beautifly", "Beldum", "Bellossom", "Blaziken", "Breloom", "Budew", "Cacnea", "Cacturne", "Camerupt", "Carvanha", "Cascoon", "Castform", "Chimecho", "Chinchou", "Chingling", "Clamperl", "Claydol", "Combusken", "Corphish", "Corsola", "Cradily", "Crawdaunt", "Crobat", "Delcatty", "Dodrio", "Doduo", "Donphan", "Dusclops", "Dusknoir", "Duskull", "Dustox", "Electrike", "Electrode", "Exploud", "Feebas", "Flygon", "Froslass", "Gallade", "Gardevoir", "Geodude", "Girafarig", "Glalie", "Gloom", "Golbat", "Goldeen", "Golduck", "Golem", "Gorebyss", "Graveler", "Grimer", "Grovyle", "Grumpig", "Gulpin", "Gyarados", "Hariyama", "Heracross", "Horsea", "Huntail", "Igglybuff", "Illumise", "Jigglypuff", "Kadabra", "Kecleon", "Kingdra", "Kirlia", "Koffing", "Lairon", "Lanturn", "Latias", "Latios", "Lileep", "Linoone", "Lombre", "Lotad", "Loudred", "Ludicolo", "Lunatone", "Luvdisc", "Machamp", "Machoke", "Machop", "Magcargo", "Magikarp", "Magnemite", "Magneton", "Magnezone", "Makuhita", "Manectric", "Marill", "Marshtomp", "Masquerain", "Mawile", "Medicham", "Meditite", "Metagross", "Metang", "Mightyena", "Milotic", "Minun", "Mudkip", "Muk", "Natu", "Nincada", "Ninetales", "Ninjask", "Nosepass", "Numel", "Nuzleaf", "Oddish", "Pelipper", "Phanpy", "Pichu", "Pikachu", "Pinsir", "Plusle", "Poochyena", "Probopass", "Psyduck", "Raichu", "Ralts", "Regice", "Regirock", "Registeel", "Relicanth", "Rhydon", "Rhyhorn", "Rhyperior", "Roselia", "Roserade", "Sableye", "Salamence", "Sandshrew", "Sandslash", "Sceptile", "Seadra", "Seaking", "Sealeo", "Seedot", "Seviper", "Sharpedo", "Shedinja", "Shelgon", "Shiftry", "Shroomish", "Shuppet", "Silcoon", "Skarmory", "Skitty", "Slaking", "Slakoth", "Slugma", "Snorunt", "Solrock", "Spheal", "Spinda", "Spoink", "Starmie", "Staryu", "Surskit", "Swablu", "Swalot", "Swampert", "Swellow", "Taillow", "Tentacool", "Tentacruel", "Torchic", "Torkoal", "Trapinch", "Treecko", "Tropius", "Vibrava", "Vigoroth", "Vileplume", "Volbeat", "Voltorb", "Vulpix", "Wailmer", "Wailord", "Walrein", "Weezing", "Whiscash", "Whismur", "Wigglytuff", "Wingull", "Wobbuffet", "Wurmple", "Wynaut", "Xatu", "Zangoose", "Zigzagoon", "Zubat",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!hoennDex.includes(species.baseSpecies) && !this.ruleTable.has('+' + species.id)) {
				return [species.baseSpecies + " is not in the Hoenn Pokédex."];
			}
		},
	},
	sinnohpokedex: {
		effectType: 'ValidatorRule',
		name: 'Sinnoh Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Sinnoh region (Platinum)",
		onValidateSet(set, format) {
			const sinnohDex = [
				"Turtwig", "Grotle", "Torterra", "Chimchar", "Monferno", "Infernape", "Piplup", "Prinplup", "Empoleon", "Starly", "Staravia", "Staraptor", "Bidoof", "Bibarel", "Kricketot", "Kricketune", "Shinx", "Luxio", "Luxray", "Abra", "Kadabra", "Alakazam", "Magikarp", "Gyarados", "Budew", "Roselia", "Roserade", "Zubat", "Golbat", "Crobat", "Geodude", "Graveler", "Golem", "Onix", "Steelix", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Machop", "Machoke", "Machamp", "Psyduck", "Golduck", "Burmy", "Wormadam", "Mothim", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Combee", "Vespiquen", "Pachirisu", "Buizel", "Floatzel", "Cherubi", "Cherrim", "Shellos", "Gastrodon", "Heracross", "Aipom", "Ambipom", "Drifloon", "Drifblim", "Buneary", "Lopunny", "Gastly", "Haunter", "Gengar", "Misdreavus", "Mismagius", "Murkrow", "Honchkrow", "Glameow", "Purugly", "Goldeen", "Seaking", "Barboach", "Whiscash", "Chingling", "Chimecho", "Stunky", "Skuntank", "Meditite", "Medicham", "Bronzor", "Bronzong", "Ponyta", "Rapidash", "Bonsly", "Sudowoodo", "Mime Jr.", "Mr. Mime", "Happiny", "Chansey", "Blissey", "Cleffa", "Clefairy", "Clefable", "Chatot", "Pichu", "Pikachu", "Raichu", "Hoothoot", "Noctowl", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax", "Snorlax", "Unown", "Riolu", "Lucario", "Wooper", "Quagsire", "Wingull", "Pelipper", "Girafarig", "Hippopotas", "Hippowdon", "Azurill", "Marill", "Azumarill", "Skorupi", "Drapion", "Croagunk", "Toxicroak", "Carnivine", "Remoraid", "Octillery", "Finneon", "Lumineon", "Tentacool", "Tentacruel", "Feebas", "Milotic", "Mantyke", "Mantine", "Snover", "Abomasnow", "Sneasel", "Weavile", "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Manaphy", "Rotom", "Gligar", "Gliscor", "Nosepass", "Probopass", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Lickitung", "Lickilicky", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Swablu", "Altaria", "Togepi", "Togetic", "Togekiss", "Houndour", "Houndoom", "Magnemite", "Magneton", "Magnezone", "Tangela", "Tangrowth", "Yanma", "Yanmega", "Tropius", "Rhyhorn", "Rhydon", "Rhyperior", "Duskull", "Dusclops", "Dusknoir", "Porygon", "Porygon2", "Porygon-Z", "Scyther", "Scizor", "Elekid", "Electabuzz", "Electivire", "Magby", "Magmar", "Magmortar", "Swinub", "Piloswine", "Mamoswine", "Snorunt", "Glalie", "Froslass", "Absol", "Giratina",
			];
			const species = this.dex.species.get(set.species || set.name);
			if ((!sinnohDex.includes(species.baseSpecies) || species.gen > 4) && !this.ruleTable.has('+' + species.id)) {
				return [`${species.name} is not in the Sinnoh Pokédex.`];
			}
		},
	},
	oldunovapokedex: {
		effectType: 'ValidatorRule',
		name: 'Old Unova Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Unova region as of the original Black/White games",
		onValidateSet(set, format) {
			const species = this.dex.species.get(set.species || set.name);
			const isUnova = (species.num >= 494 && species.num <= 649) &&
				!['Black', 'White', 'Therian', 'Resolute'].includes(species.forme) && species.gen <= 5;
			if (!isUnova && !this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the Old Unova Pokédex.`];
			}
		},
	},
	newunovapokedex: {
		effectType: 'ValidatorRule',
		name: 'New Unova Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Unova region as of the Black 2/White 2 games",
		onValidateSet(set, format) {
			const unovaDex = [
				"Victini", "Snivy", "Servine", "Serperior", "Tepig", "Pignite", "Emboar", "Oshawott", "Dewott", "Samurott", "Patrat", "Watchog", "Purrloin", "Liepard", "Pidove", "Tranquill", "Unfezant", "Unfezant", "Sewaddle", "Swadloon", "Leavanny", "Sunkern", "Sunflora", "Lillipup", "Herdier", "Stoutland", "Mareep", "Flaaffy", "Ampharos", "Psyduck", "Golduck", "Azurill", "Marill", "Azumarill", "Riolu", "Lucario", "Dunsparce", "Audino", "Pansage", "Simisage", "Pansear", "Simisear", "Panpour", "Simipour", "Venipede", "Whirlipede", "Scolipede", "Koffing", "Weezing", "Magnemite", "Magneton", "Magnezone", "Growlithe", "Arcanine", "Magby", "Magmar", "Magmortar", "Elekid", "Electabuzz", "Electivire", "Rattata", "Raticate", "Zubat", "Golbat", "Crobat", "Grimer", "Muk", "Woobat", "Swoobat", "Roggenrola", "Boldore", "Gigalith", "Onix", "Steelix", "Timburr", "Gurdurr", "Conkeldurr", "Drilbur", "Excadrill", "Skitty", "Delcatty", "Buneary", "Lopunny", "Cottonee", "Whimsicott", "Petilil", "Lilligant", "Munna", "Musharna", "Cleffa", "Clefairy", "Clefable", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sandile", "Krokorok", "Krookodile", "Darumaka", "Darmanitan", "Basculin", "Basculin", "Trubbish", "Garbodor", "Minccino", "Cinccino", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Sandshrew", "Sandslash", "Dwebble", "Crustle", "Scraggy", "Scrafty", "Maractus", "Sigilyph", "Trapinch", "Vibrava", "Flygon", "Yamask", "Cofagrigus", "Tirtouga", "Carracosta", "Archen", "Archeops", "Klink", "Klang", "Klinklang", "Budew", "Roselia", "Roserade", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Combee", "Vespiquen", "Emolga", "Heracross", "Pinsir", "Blitzle", "Zebstrika", "Buizel", "Floatzel", "Zorua", "Zoroark", "Ducklett", "Swanna", "Karrablast", "Escavalier", "Shelmet", "Accelgor", "Deerling", "Sawsbuck", "Foongus", "Amoonguss", "Castform", "Nosepass", "Probopass", "Aron", "Lairon", "Aggron", "Baltoy", "Claydol", "Larvesta", "Volcarona", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Tynamo", "Eelektrik", "Eelektross", "Frillish", "Jellicent", "Alomomola", "Axew", "Fraxure", "Haxorus", "Zangoose", "Seviper", "Elgyem", "Beheeyem", "Litwick", "Lampent", "Chandelure", "Heatmor", "Durant", "Cubchoo", "Beartic", "Cryogonal", "Tornadus", "Thundurus", "Landorus", "Skorupi", "Drapion", "Skarmory", "Numel", "Camerupt", "Spoink", "Grumpig", "Drifloon", "Drifblim", "Shuppet", "Banette", "Wingull", "Pelipper", "Lunatone", "Solrock", "Absol", "Tangela", "Tangrowth", "Mienfoo", "Mienshao", "Gligar", "Gliscor", "Pawniard", "Bisharp", "Cobalion", "Terrakion", "Virizion", "Tympole", "Palpitoad", "Seismitoad", "Stunfisk", "Shuckle", "Mantyke", "Mantine", "Remoraid", "Octillery", "Corsola", "Staryu", "Starmie", "Wailmer", "Wailord", "Lapras", "Spheal", "Sealeo", "Walrein", "Swablu", "Altaria", "Vulpix", "Ninetales", "Bronzor", "Bronzong", "Sneasel", "Weavile", "Delibird", "Vanillite", "Vanillish", "Vanilluxe", "Swinub", "Piloswine", "Mamoswine", "Ditto", "Beldum", "Metang", "Metagross", "Seel", "Dewgong", "Throh", "Sawk", "Bouffalant", "Druddigon", "Golett", "Golurk", "Deino", "Zweilous", "Hydreigon", "Slakoth", "Vigoroth", "Slaking", "Corphish", "Crawdaunt", "Igglybuff", "Jigglypuff", "Wigglytuff", "Lickitung", "Lickilicky", "Yanma", "Yanmega", "Tropius", "Carnivine", "Croagunk", "Toxicroak", "Larvitar", "Pupitar", "Tyranitar", "Reshiram", "Zekrom", "Kyurem", "Keldeo", "Meloetta", "Genesect",
			];
			const species = this.dex.species.get(set.species || set.name);
			const isUnova = unovaDex.includes(species.baseSpecies) && species.gen <= 5;
			if (!isUnova && !this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the New Unova Pokédex.`];
			}
		},
	},
	kalospokedex: {
		effectType: 'ValidatorRule',
		name: 'Kalos Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Kalos region (XY)",
		onValidateSet(set, format) {
			const kalosDex = [
				"Chespin", "Quilladin", "Chesnaught", "Fennekin", "Braixen", "Delphox", "Froakie", "Frogadier", "Greninja", "Bunnelby", "Diggersby", "Zigzagoon", "Linoone", "Fletchling", "Fletchinder", "Talonflame", "Pidgey", "Pidgeotto", "Pidgeot", "Scatterbug", "Spewpa", "Vivillon", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pansage", "Simisage", "Pansear", "Simisear", "Panpour", "Simipour", "Pichu", "Pikachu", "Raichu", "Bidoof", "Bibarel", "Dunsparce", "Azurill", "Marill", "Azumarill", "Burmy", "Wormadam", "Mothim", "Surskit", "Masquerain", "Magikarp", "Gyarados", "Corphish", "Crawdaunt", "Goldeen", "Seaking", "Carvanha", "Sharpedo", "Litleo", "Pyroar", "Psyduck", "Golduck", "Farfetch\u2019d", "Riolu", "Lucario", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Flabe\u0301be\u0301", "Floette", "Florges", "Budew", "Roselia", "Roserade", "Ledyba", "Ledian", "Combee", "Vespiquen", "Skitty", "Delcatty", "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Skiddo", "Gogoat", "Pancham", "Pangoro", "Furfrou", "Doduo", "Dodrio", "Plusle", "Minun", "Gulpin", "Swalot", "Scraggy", "Scrafty", "Abra", "Kadabra", "Alakazam", "Oddish", "Gloom", "Vileplume", "Bellossom", "Sentret", "Furret", "Nincada", "Ninjask", "Shedinja", "Espurr", "Meowstic", "Kecleon", "Honedge", "Doublade", "Aegislash", "Venipede", "Whirlipede", "Scolipede", "Audino", "Smeargle", "Croagunk", "Toxicroak", "Ducklett", "Swanna", "Spritzee", "Aromatisse", "Swirlix", "Slurpuff", "Volbeat", "Illumise", "Hoppip", "Skiploom", "Jumpluff", "Munchlax", "Snorlax", "Whismur", "Loudred", "Exploud", "Meditite", "Medicham", "Zubat", "Golbat", "Crobat", "Axew", "Fraxure", "Haxorus", "Diancie", "Hoopa", "Volcanion",
				"Drifloon", "Drifblim", "Mienfoo", "Mienshao", "Zangoose", "Seviper", "Spoink", "Grumpig", "Absol", "Inkay", "Malamar", "Lunatone", "Solrock", "Bagon", "Shelgon", "Salamence", "Wingull", "Pelipper", "Taillow", "Swellow", "Binacle", "Barbaracle", "Dwebble", "Crustle", "Tentacool", "Tentacruel", "Wailmer", "Wailord", "Luvdisc", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Staryu", "Starmie", "Shellder", "Cloyster", "Qwilfish", "Horsea", "Seadra", "Kingdra", "Relicanth", "Sandile", "Krokorok", "Krookodile", "Helioptile", "Heliolisk", "Hippopotas", "Hippowdon", "Rhyhorn", "Rhydon", "Rhyperior", "Onix", "Steelix", "Woobat", "Swoobat", "Machop", "Machoke", "Machamp", "Cubone", "Marowak", "Kangaskhan", "Mawile", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Aerodactyl", "Ferroseed", "Ferrothorn", "Snubbull", "Granbull", "Electrike", "Manectric", "Houndour", "Houndoom", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Emolga", "Yanma", "Yanmega", "Hawlucha", "Sigilyph", "Golett", "Golurk", "Nosepass", "Probopass", "Makuhita", "Hariyama", "Throh", "Sawk", "Starly", "Staravia", "Staraptor", "Stunky", "Skuntank", "Nidoran-F", "Nidorina", "Nidoqueen", "Nidoran-M", "Nidorino", "Nidoking", "Dedenne", "Chingling", "Chimecho", "Mime Jr.", "Mr. Mime", "Solosis", "Duosion", "Reuniclus", "Wynaut", "Wobbuffet", "Roggenrola", "Boldore", "Gigalith", "Sableye", "Carbink", "Tauros", "Miltank", "Mareep", "Flaaffy", "Ampharos", "Pinsir", "Heracross", "Pachirisu", "Slowpoke", "Slowbro", "Slowking", "Exeggcute", "Exeggutor", "Chatot", "Mantyke", "Mantine", "Clamperl", "Huntail", "Gorebyss", "Remoraid", "Octillery", "Corsola", "Chinchou", "Lanturn", "Alomomola", "Lapras", "Articuno", "Zapdos", "Moltres",
				"Diglett", "Dugtrio", "Trapinch", "Vibrava", "Flygon", "Gible", "Gabite", "Garchomp", "Geodude", "Graveler", "Golem", "Slugma", "Magcargo", "Shuckle", "Skorupi", "Drapion", "Wooper", "Quagsire", "Goomy", "Sliggoo", "Goodra", "Karrablast", "Escavalier", "Shelmet", "Accelgor", "Bellsprout", "Weepinbell", "Victreebel", "Carnivine", "Gastly", "Haunter", "Gengar", "Poliwag", "Poliwhirl", "Poliwrath", "Politoed", "Ekans", "Arbok", "Stunfisk", "Barboach", "Whiscash", "Purrloin", "Liepard", "Poochyena", "Mightyena", "Patrat", "Watchog", "Pawniard", "Bisharp", "Klefki", "Murkrow", "Honchkrow", "Foongus", "Amoonguss", "Lotad", "Lombre", "Ludicolo", "Buizel", "Floatzel", "Basculin", "Phantump", "Trevenant", "Pumpkaboo", "Gourgeist", "Litwick", "Lampent", "Chandelure", "Rotom", "Magnemite", "Magneton", "Magnezone", "Voltorb", "Electrode", "Trubbish", "Garbodor", "Swinub", "Piloswine", "Mamoswine", "Bergmite", "Avalugg", "Cubchoo", "Beartic", "Smoochum", "Jynx", "Vanillite", "Vanillish", "Vanilluxe", "Snover", "Abomasnow", "Delibird", "Sneasel", "Weavile", "Timburr", "Gurdurr", "Conkeldurr", "Torkoal", "Sandshrew", "Sandslash", "Aron", "Lairon", "Aggron", "Larvitar", "Pupitar", "Tyranitar", "Heatmor", "Durant", "Spinarak", "Ariados", "Spearow", "Fearow", "Cryogonal", "Skarmory", "Noibat", "Noivern", "Gligar", "Gliscor", "Hoothoot", "Noctowl", "Igglybuff", "Jigglypuff", "Wigglytuff", "Shuppet", "Banette", "Zorua", "Zoroark", "Gothita", "Gothorita", "Gothitelle", "Bonsly", "Sudowoodo", "Spinda", "Teddiursa", "Ursaring", "Lickitung", "Lickilicky", "Scyther", "Scizor", "Ditto", "Swablu", "Altaria", "Druddigon", "Deino", "Zweilous", "Hydreigon", "Dratini", "Dragonair", "Dragonite", "Xerneas", "Yveltal", "Zygarde", "Mewtwo",
			];
			const species = this.dex.species.get(set.species || set.name);
			if ((!kalosDex.includes(species.baseSpecies) || species.gen > 6) && !this.ruleTable.has('+' + species.id)) {
				return [`${species.name} is not in the Kalos Pokédex.`];
			}
		},
	},
	oldalolapokedex: {
		effectType: 'ValidatorRule',
		name: 'Old Alola Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Alola region (SUMO)",
		banlist: ['Pikachu-Partner', 'Marowak-Alola-Totem', 'Ribombee-Totem', 'Araquanid-Totem', 'Lycanroc-Dusk', 'Necrozma-Dusk-Mane', 'Necrozma-Dawn-Wings'],
		onValidateSet(set, format) {
			const alolaDex = [
				"Rowlet", "Dartrix", "Decidueye", "Litten", "Torracat", "Incineroar", "Popplio", "Brionne", "Primarina", "Pikipek", "Trumbeak", "Toucannon", "Yungoos", "Gumshoos", "Rattata-Alola", "Raticate-Alola", "Caterpie", "Metapod", "Butterfree", "Ledyba", "Ledian", "Spinarak", "Ariados", "Pichu", "Pikachu", "Raichu-Alola", "Grubbin", "Charjabug", "Vikavolt", "Bonsly", "Sudowoodo", "Happiny", "Chansey", "Blissey", "Munchlax", "Snorlax", "Slowpoke", "Slowbro", "Slowking", "Wingull", "Pelipper", "Abra", "Kadabra", "Alakazam", "Meowth-Alola", "Persian-Alola", "Magnemite", "Magneton", "Magnezone", "Grimer-Alola", "Muk-Alola", "Growlithe", "Arcanine", "Drowzee", "Hypno", "Makuhita", "Hariyama", "Smeargle", "Crabrawler", "Crabominable", "Gastly", "Haunter", "Gengar", "Drifloon", "Drifblim", "Misdreavus", "Mismagius", "Zubat", "Golbat", "Crobat", "Diglett-Alola", "Dugtrio-Alola", "Spearow", "Fearow", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Mankey", "Primeape", "Delibird", "Oricorio", "Cutiefly", "Ribombee", "Petilil", "Lilligant", "Cottonee", "Whimsicott", "Psyduck", "Golduck", "Magikarp", "Gyarados", "Barboach", "Whiscash", "Machop", "Machoke", "Machamp", "Roggenrola", "Boldore", "Gigalith", "Carbink", "Sableye", "Rockruff", "Lycanroc", "Spinda", "Tentacool", "Tentacruel", "Finneon", "Lumineon", "Wishiwashi", "Luvdisc", "Corsola", "Mareanie", "Toxapex", "Shellder", "Cloyster", "Bagon", "Shelgon", "Salamence", "Lillipup", "Herdier", "Stoutland", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Mudbray", "Mudsdale", "Igglybuff", "Jigglypuff", "Wigglytuff", "Tauros", "Miltank", "Surskit", "Masquerain", "Dewpider", "Araquanid", "Fomantis", "Lurantis", "Morelull", "Shiinotic", "Paras", "Parasect", "Poliwag", "Poliwhirl", "Poliwrath", "Politoed", "Goldeen", "Seaking", "Feebas", "Milotic", "Alomomola", "Fletchling", "Fletchinder", "Talonflame", "Salandit", "Salazzle", "Cubone", "Marowak-Alola", "Kangaskhan", "Magby", "Magmar", "Magmortar", "Stufful", "Bewear", "Bounsweet", "Steenee", "Tsareena", "Comfey", "Pinsir", "Oranguru", "Passimian", "Goomy", "Sliggoo", "Goodra", "Castform", "Wimpod", "Golisopod", "Staryu", "Starmie", "Sandygast", "Palossand", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Archen", "Archeops", "Tirtouga", "Carracosta", "Phantump", "Trevenant", "Nosepass", "Probopass", "Pyukumuku", "Chinchou", "Lanturn", "Type: Null", "Silvally", "Zygarde", "Trubbish", "Garbodor", "Skarmory", "Ditto", "Cleffa", "Clefairy", "Clefable", "Minior", "Beldum", "Metang", "Metagross", "Porygon", "Porygon2", "Porygon-Z", "Pancham", "Pangoro", "Komala", "Torkoal", "Turtonator", "Togedemaru", "Elekid", "Electabuzz", "Electivire", "Geodude-Alola", "Graveler-Alola", "Golem-Alola", "Sandile", "Krokorok", "Krookodile", "Trapinch", "Vibrava", "Flygon", "Gible", "Gabite", "Garchomp", "Klefki", "Mimikyu", "Bruxish", "Drampa", "Absol", "Snorunt", "Glalie", "Froslass", "Sneasel", "Weavile", "Sandshrew-Alola", "Sandslash-Alola", "Vulpix-Alola", "Ninetales-Alola", "Vanillite", "Vanillish", "Vanilluxe", "Snubbull", "Granbull", "Shellos", "Gastrodon", "Relicanth", "Dhelmise", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Lapras", "Exeggcute", "Exeggutor-Alola", "Jangmo-o", "Hakamo-o", "Kommo-o", "Emolga", "Scyther", "Scizor", "Murkrow", "Honchkrow", "Riolu", "Lucario", "Dratini", "Dragonair", "Dragonite", "Aerodactyl", "Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini", "Cosmog", "Cosmoem", "Solgaleo", "Lunala", "Nihilego", "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord", "Necrozma", "Magearna", "Marshadow",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!alolaDex.includes(species.baseSpecies) && !alolaDex.includes(species.name) &&
				!this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the Old Alola Pokédex.`];
			}
		},
	},
	newalolapokedex: {
		effectType: 'ValidatorRule',
		name: 'New Alola Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Alola region (US/UM)",
		onValidateSet(set, format) {
			const alolaDex = [
				"Rowlet", "Dartrix", "Decidueye", "Litten", "Torracat", "Incineroar", "Popplio", "Brionne", "Primarina", "Pikipek", "Trumbeak", "Toucannon", "Yungoos", "Gumshoos", "Rattata-Alola", "Raticate-Alola", "Caterpie", "Metapod", "Butterfree", "Ledyba", "Ledian", "Spinarak", "Ariados", "Buneary", "Lopunny", "Inkay", "Malamar", "Zorua", "Zoroark", "Furfrou", "Pichu", "Pikachu", "Raichu-Alola", "Grubbin", "Charjabug", "Vikavolt", "Bonsly", "Sudowoodo", "Happiny", "Chansey", "Blissey", "Munchlax", "Snorlax", "Slowpoke", "Slowbro", "Slowking", "Wingull", "Pelipper", "Abra", "Kadabra", "Alakazam", "Meowth-Alola", "Persian-Alola", "Magnemite", "Magneton", "Magnezone", "Grimer-Alola", "Muk-Alola", "Mime Jr.", "Mr. Mime", "Ekans", "Arbok", "Dunsparce", "Growlithe", "Arcanine", "Drowzee", "Hypno", "Makuhita", "Hariyama", "Smeargle", "Crabrawler", "Crabominable", "Gastly", "Haunter", "Gengar", "Drifloon", "Drifblim", "Murkrow", "Honchkrow", "Zubat", "Golbat", "Crobat", "Noibat", "Noivern", "Diglett-Alola", "Dugtrio-Alola", "Spearow", "Fearow", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Mankey", "Primeape", "Delibird", "Hawlucha", "Oricorio", "Cutiefly", "Ribombee", "Flabe\u0301be\u0301", "Floette", "Florges", "Petilil", "Lilligant", "Cottonee", "Whimsicott", "Psyduck", "Golduck", "Smoochum", "Jynx", "Magikarp", "Gyarados", "Barboach", "Whiscash", "Seal", "Dewgong", "Machop", "Machoke", "Machamp", "Roggenrola", "Boldore", "Gigalith", "Carbink", "Sableye", "Mawile", "Rockruff", "Lycanroc", "Spinda", "Tentacool", "Tentacruel", "Finneon", "Lumineon", "Wishiwashi", "Luvdisc", "Corsola", "Mareanie", "Toxapex", "Shellder", "Cloyster", "Clamperl", "Huntail", "Gorebyss", "Remoraid", "Octillery", "Mantyke", "Mantine", "Bagon", "Shelgon", "Salamence", "Lillipup", "Herdier", "Stoutland", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Mareep", "Flaaffy", "Ampharos", "Mudbray", "Mudsdale", "Igglybuff", "Jigglypuff", "Wigglytuff", "Tauros", "Miltank", "Surskit", "Masquerain", "Dewpider", "Araquanid", "Fomantis", "Lurantis", "Morelull", "Shiinotic", "Paras", "Parasect", "Poliwag", "Poliwhirl", "Poliwrath", "Politoed", "Goldeen", "Seaking", "Basculin", "Feebas", "Milotic", "Alomomola", "Fletchling", "Fletchinder", "Talonflame", "Salandit", "Salazzle", "Cubone", "Marowak-Alola", "Kangaskhan", "Magby", "Magmar", "Magmortar", "Larvesta", "Volcarona", "Stufful", "Bewear", "Bounsweet", "Steenee", "Tsareena", "Comfey", "Pinsir", "Hoothoot", "Noctowl", "Kecleon", "Oranguru", "Passimian", "Goomy", "Sliggoo", "Goodra", "Castform", "Wimpod", "Golisopod", "Staryu", "Starmie", "Sandygast", "Palossand", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Lileep", "Cradily", "Anorith", "Armaldo", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Tirtouga", "Carracosta", "Archen", "Archeops", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Pupitar", "Larvitar", "Tyranitar", "Phantump", "Trevenant", "Natu", "Xatu", "Nosepass", "Probopass", "Pyukumuku", "Chinchou", "Lanturn", "Type: Null", "Silvally", "Poipole", "Naganadel", "Zygarde", "Trubbish", "Garbodor", "Minccino", "Cinccino", "Pineco", "Forretress", "Skarmory", "Ditto", "Cleffa", "Clefairy", "Clefable", "Elgyem", "Beheeyem", "Minior", "Beldum", "Metang", "Metagross", "Porygon", "Porygon2", "Porygon-Z", "Pancham", "Pangoro", "Komala", "Torkoal", "Turtonator", "Houndour", "Houndoom", "Dedenne", "Togedemaru", "Electrike", "Manectric", "Elekid", "Electabuzz", "Electivire", "Geodude-Alola", "Graveler-Alola", "Golem-Alola", "Sandile", "Krokorok", "Krookodile", "Trapinch", "Vibrava", "Flygon", "Gible", "Gabite", "Garchomp", "Baltoy", "Claydol", "Golett", "Golurk", "Klefki", "Mimikyu", "Shuppet", "Banette", "Frillish", "Jellicent", "Bruxish", "Drampa", "Absol", "Snorunt", "Glalie", "Froslass", "Sneasel", "Weavile", "Sandshrew-Alola", "Sandslash-Alola", "Vulpix-Alola", "Ninetales-Alola", "Vanillite", "Vanillish", "Vanilluxe", "Scraggy", "Scrafty", "Pawniard", "Bisharp", "Snubbull", "Granbull", "Shellos", "Gastrodon", "Relicanth", "Dhelmise", "Carvanha", "Sharpedo", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Wailmer", "Wailord", "Lapras", "Tropius", "Exeggcute", "Exeggutor-Alola", "Corphish", "Crawdaunt", "Mienfoo", "Mienshao", "Jangmo-o", "Hakamo-o", "Kommo-o", "Emolga", "Scyther", "Scizor", "Heracross", "Aipom", "Ampibom", "Litleo", "Pyroar", "Misdreavus", "Mismagius", "Druddigon", "Lickitung", "Lickilicky", "Riolu", "Lucario", "Dratini", "Dragonair", "Dragonite", "Aerodactyl", "Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini", "Cosmog", "Cosmoem", "Solgaleo", "Lunala", "Nihilego", "Stakataka", "Blacephalon", "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord", "Necrozma", "Magearna", "Marshadow", "Zeraora",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!alolaDex.includes(species.baseSpecies) && !alolaDex.includes(species.name) &&
				!this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the New Alola Pokédex.`];
			}
		},
	},
	galarpokedex: {
		effectType: 'ValidatorRule',
		name: 'Galar Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Galar region (Sw/Sh)",
		banlist: ['Raichu-Alola', 'Weezing-Base'],
		onValidateSet(set, format) {
			const galarDex = [
				"Grookey", "Thwackey", "Rillaboom", "Scorbunny", "Raboot", "Cinderace", "Sobble", "Drizzile", "Inteleon", "Blipbug", "Dottler", "Orbeetle", "Caterpie", "Metapod", "Butterfree", "Grubbin", "Charjabug", "Vikavolt", "Hoothoot", "Noctowl", "Rookidee", "Corvisquire", "Corviknight", "Skwovet", "Greedent", "Pidove", "Tranquill", "Unfezant", "Nickit", "Thievul", "Zigzagoon", "Linoone", "Obstagoon", "Wooloo", "Dubwool", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Chewtle", "Drednaw", "Purrloin", "Liepard", "Yamper", "Boltund", "Bunnelby", "Diggersby", "Minccino", "Cinccino", "Bounsweet", "Steenee", "Tsareena", "Oddish", "Gloom", "Vileplume", "Bellossom", "Budew", "Roselia", "Roserade", "Wingull", "Pelipper", "Joltik", "Galvantula", "Electrike", "Manectric", "Vulpix", "Ninetales", "Growlithe", "Arcanine", "Vanillite", "Vanillish", "Vanilluxe", "Swinub", "Piloswine", "Mamoswine", "Delibird", "Snorunt", "Glalie", "Froslass", "Baltoy", "Claydol", "Mudbray", "Mudsdale", "Dwebble", "Crustle", "Golett", "Golurk", "Munna", "Musharna", "Natu", "Xatu", "Stufful", "Bewear", "Snover", "Abomasnow", "Krabby", "Kingler", "Wooper", "Quagsire", "Corphish", "Crawdaunt", "Nincada", "Ninjask", "Shedinja", "Tyrogue", "Hitmonlee", "Hitmonchan", "Hitmontop", "Pancham", "Pangoro", "Klink", "Klang", "Klinklang", "Combee", "Vespiquen", "Bronzor", "Bronzong", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Drifloon", "Drifblim", "Gossifleur", "Eldegoss", "Cherubi", "Cherrim", "Stunky", "Skuntank", "Tympole", "Palpitoad", "Seismitoad", "Duskull", "Dusclops", "Dusknoir", "Machop", "Machoke", "Machamp", "Gastly", "Haunter", "Gengar", "Magikarp", "Gyarados", "Goldeen", "Seaking", "Remoraid", "Octillery", "Shellder", "Cloyster", "Feebas", "Milotic", "Basculin", "Wishiwashi", "Pyukumuku", "Trubbish", "Garbodor", "Sizzlipede", "Centiskorch", "Rolycoly", "Carkol", "Coalossal", "Diglett", "Dugtrio", "Drilbur", "Excadrill", "Roggenrola", "Boldore", "Gigalith", "Timburr", "Gurdurr", "Conkeldurr", "Woobat", "Swoobat", "Noibat", "Noivern", "Onix", "Steelix", "Arrokuda", "Barraskewda", "Meowth", "Perrserker", "Persian", "Milcery", "Alcremie", "Cutiefly", "Ribombee", "Ferroseed", "Ferrothorn", "Pumpkaboo", "Gourgeist", "Pichu", "Pikachu", "Raichu", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Applin", "Flapple", "Appletun", "Espurr", "Meowstic", "Swirlix", "Slurpuff", "Spritzee", "Aromatisse", "Dewpider", "Araquanid", "Wynaut", "Wobbuffet", "Farfetch\u2019d", "Sirfetch\u2019d", "Chinchou", "Lanturn", "Croagunk", "Toxicroak", "Scraggy", "Scrafty", "Stunfisk", "Shuckle", "Barboach", "Whiscash", "Shellos", "Gastrodon", "Wimpod", "Golisopod", "Binacle", "Barbaracle", "Corsola", "Cursola", "Impidimp", "Morgrem", "Grimmsnarl", "Hatenna", "Hattrem", "Hatterene", "Salandit", "Salazzle", "Pawniard", "Bisharp", "Throh", "Sawk", "Koffing", "Weezing", "Bonsly", "Sudowoodo", "Cleffa", "Clefairy", "Clefable", "Togepi", "Togetic", "Togekiss", "Munchlax", "Snorlax", "Cottonee", "Whimsicott", "Rhyhorn", "Rhydon", "Rhyperior", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Karrablast", "Escavalier", "Shelmet", "Accelgor", "Elgyem", "Beheeyem", "Cubchoo", "Beartic", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Skorupi", "Drapion", "Litwick", "Lampent", "Chandelure", "Inkay", "Malamar", "Sneasel", "Weavile", "Sableye", "Mawile", "Maractus", "Sigilyph", "Riolu", "Lucario", "Torkoal", "Mimikyu", "Cufant", "Copperajah", "Qwilfish", "Frillish", "Jellicent", "Mareanie", "Toxapex", "Cramorant", "Toxel", "Toxtricity", "Toxtricity-Low-Key", "Silicobra", "Sandaconda", "Hippopotas", "Hippowdon", "Durant", "Heatmor", "Helioptile", "Heliolisk", "Hawlucha", "Trapinch", "Vibrava", "Flygon", "Axew", "Fraxure", "Haxorus", "Yamask", "Runerigus", "Cofagrigus", "Honedge", "Doublade", "Aegislash", "Ponyta", "Rapidash", "Sinistea", "Polteageist", "Indeedee", "Phantump", "Trevenant", "Morelull", "Shiinotic", "Oranguru", "Passimian", "Morpeko", "Falinks", "Drampa", "Turtonator", "Togedemaru", "Snom", "Frosmoth", "Clobbopus", "Grapploct", "Pincurchin", "Mantyke", "Mantine", "Wailmer", "Wailord", "Bergmite", "Avalugg", "Dhelmise", "Lapras", "Lunatone", "Solrock", "Mime Jr.", "Mr. Mime", "Mr. Rime", "Darumaka", "Darmanitan", "Stonjourner", "Eiscue", "Duraludon", "Rotom", "Ditto", "Dracozolt", "Arctozolt", "Dracovish", "Arctovish", "Charmander", "Charmeleon", "Charizard", "Type: Null", "Silvally", "Larvitar", "Pupitar", "Tyranitar", "Deino", "Zweilous", "Hydreigon", "Goomy", "Sliggoo", "Goodra", "Jangmo-o", "Hakamo-o", "Kommo-o", "Dreepy", "Drakloak", "Dragapult",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!galarDex.includes(species.baseSpecies) && !galarDex.includes(species.name) &&
				!this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the Galar Pokédex.`];
			}
		},
	},
	isleofarmorpokedex: {
		effectType: 'ValidatorRule',
		name: 'Isle of Armor Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Isle of Armor in the Galar Region (Sw/Sh DLC1)",
		onValidateSet(set, format) {
			const ioaDex = [
				"Slowpoke", "Slowbro", "Slowking", "Buneary", "Lopunny", "Happiny", "Chansey", "Blissey", "Skwovet", "Greedent", "Igglybuff", "Jigglypuff", "Wigglytuff", "Blipbug", "Dottler", "Fomantis", "Lurantis", "Applin", "Flapple", "Appletun", "Fletchling", "Fletchinder", "Talonflame", "Shinx", "Luxio", "Luxray", "Klefki", "Pawniard", "Bisharp", "Abra", "Kadabra", "Alakazam", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Krabby", "Kingler", "Tentacool", "Tentacruel", "Magikarp", "Gyarados", "Remoraid", "Octillery", "Mantyke", "Mantine", "Wingull", "Pelipper", "Skorupi", "Drapion", "Dunsparce", "Bouffalant", "Lickitung", "Lickilicky", "Chewtle", "Drednaw", "Wooper", "Quagsire", "Goomy", "Sliggoo", "Goodra", "Druddigon", "Shelmet", "Accelgor", "Karrablast", "Escavalier", "Bulbasaur", "Ivysaur", "Venusaur", "Squirtle", "Wartortle", "Blastoise", "Venipede", "Whirlipede", "Scolipede", "Foongus", "Amoonguss", "Comfey", "Tangela", "Tangrowth", "Croagunk", "Toxicroak", "Pichu", "Pikachu", "Raichu", "Zorua", "Zoroark", "Oranguru", "Passimian", "Corphish", "Crawdaunt", "Cramorant", "Goldeen", "Seaking", "Arrokuda", "Barraskewda", "Staryu", "Starmie", "Kubfu", "Urshifu", "Emolga", "Dedenne", "Morpeko", "Magnemite", "Magneton", "Magnezone", "Inkay", "Malamar", "Wishiwashi", "Carvanha", "Sharpedo", "Lillipup", "Herdier", "Stoutland", "Tauros", "Miltank", "Scyther", "Scizor", "Pinsir", "Heracross", "Dwebble", "Crustle", "Wimpod", "Golisopod", "Pincurchin", "Mareanie", "Toxapex", "Clobbopus", "Grapploct", "Shellder", "Cloyster", "Sandygast", "Palossand", "Drifloon", "Drifblim", "Barboach", "Whiscash", "Azurill", "Marill", "Azumarill", "Poliwag", "Poliwhirl", "Poliwrath", "Politoed", "Psyduck", "Golduck", "Whismur", "Loudred", "Exploud", "Woobat", "Swoobat", "Skarmory", "Roggenrola", "Boldore", "Gigalith", "Rockruff", "Lycanroc", "Salandit", "Salazzle", "Scraggy", "Scrafty", "Mienfoo", "Mienshao", "Jangmo-o", "Hakamo-o", "Kommo-o", "Sandshrew", "Sandslash", "Cubone", "Marowak", "Kangaskhan", "Torkoal", "Silicobra", "Sandaconda", "Sandile", "Krokorok", "Krookodile", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Rhyhorn", "Rhydon", "Rhyperior", "Larvesta", "Volcarona", "Chinchou", "Lanturn", "Wailmer", "Wailord", "Frillish", "Jellicent", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Horsea", "Seadra", "Kingdra", "Petilil", "Lilligant", "Combee", "Vespiquen", "Exeggcute", "Exeggutor", "Ditto", "Porygon", "Porygon2", "Porygon-Z",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!ioaDex.includes(species.baseSpecies) && !ioaDex.includes(species.name) &&
				!this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the Isle of Armor Pokédex.`];
			}
		},
	},
	crowntundrapokedex: {
		effectType: 'ValidatorRule',
		name: 'Crown Tundra Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Crown Tundra in the Galar Region (Sw/Sh DLC2)",
		onValidateSet(set, format) {
			const tundraDex = [
				"Nidoran-F", "Nidorina", "Nidoqueen", "Nidoran-M", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Zubat", "Golbat", "Ponyta", "Rapidash", "Mr. Mime", "Jynx", "Electabuzz", "Magmar", "Magikarp", "Gyarados", "Lapras", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Crobat", "Cleffa", "Espeon", "Umbreon", "Shuckle", "Sneasel", "Swinub", "Piloswine", "Delibird", "Smoochum", "Elekid", "Magby", "Larvitar", "Pupitar", "Tyranitar", "Zigzagoon", "Linoone", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Swablu", "Altaria", "Barboach", "Whiscash", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Absol", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Relicanth", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Bronzor", "Bronzong", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax", "Riolu", "Lucario", "Snover", "Abomasnow", "Weavile", "Electivire", "Magmortar", "Leafeon", "Glaceon", "Mamoswine", "Froslass", "Audino", "Timburr", "Gurdurr", "Conkeldurr", "Cottonee", "Whimsicott", "Basculin", "Darumaka", "Darmanitan", "Tirtouga", "Carracosta", "Archen", "Archeops", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Vanillite", "Vanillish", "Vanilluxe", "Karrablast", "Escavalier", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Litwick", "Lampent", "Chandelure", "Cubchoo", "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Druddigon", "Golett", "Golurk", "Heatmor", "Durant", "Deino", "Zweilous", "Hydreigon", "Cobalion", "Terrakion", "Virizion", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Sylveon", "Carbink", "Phantump", "Trevenant", "Bergmite", "Avalugg", "Noibat", "Noivern", "Dewpider", "Araquanid", "Mimikyu", "Dhelmise", "Skwovet", "Greedent", "Rookidee", "Corvisquire", "Corviknight", "Gossifleur", "Eldegoss", "Wooloo", "Dubwool", "Yamper", "Boltund", "Rolycoly", "Carkol", "Coalossal", "Sizzlipede", "Centiskorch", "Sinistea", "Polteageist", "Hatenna", "Hattrem", "Hatterene", "Impidimp", "Morgrem", "Grimmsnarl", "Obstagoon", "Mr. Rime", "Pincurchin", "Snom", "Frosmoth", "Stonjourner", "Eiscue", "Indeedee", "Morpeko", "Cufant", "Copperajah", "Dreepy", "Drakloak", "Dragapult", "Regieleki", "Regidrago", "Glastrier", "Spectrier",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!tundraDex.includes(species.baseSpecies) && !tundraDex.includes(species.name)) {
				return [`${species.baseSpecies} is not in the Crown Tundra Pokédex.`];
			}
		},
	},
	galarexpansionpokedex: {
		effectType: 'ValidatorRule',
		name: 'Galar Expansion Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Galar region, Isle of Armor, or Crown Tundra (Sw/Sh + Expansion Pass)",
		onValidateSet(set, format) {
			const galarDex = [
				"Grookey", "Thwackey", "Rillaboom", "Scorbunny", "Raboot", "Cinderace", "Sobble", "Drizzile", "Inteleon", "Blipbug", "Dottler", "Orbeetle", "Caterpie", "Metapod", "Butterfree", "Grubbin", "Charjabug", "Vikavolt", "Hoothoot", "Noctowl", "Rookidee", "Corvisquire", "Corviknight", "Skwovet", "Greedent", "Pidove", "Tranquill", "Unfezant", "Nickit", "Thievul", "Zigzagoon", "Linoone", "Obstagoon", "Wooloo", "Dubwool", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Chewtle", "Drednaw", "Purrloin", "Liepard", "Yamper", "Boltund", "Bunnelby", "Diggersby", "Minccino", "Cinccino", "Bounsweet", "Steenee", "Tsareena", "Oddish", "Gloom", "Vileplume", "Bellossom", "Budew", "Roselia", "Roserade", "Wingull", "Pelipper", "Joltik", "Galvantula", "Electrike", "Manectric", "Vulpix", "Ninetales", "Growlithe", "Arcanine", "Vanillite", "Vanillish", "Vanilluxe", "Swinub", "Piloswine", "Mamoswine", "Delibird", "Snorunt", "Glalie", "Froslass", "Baltoy", "Claydol", "Mudbray", "Mudsdale", "Dwebble", "Crustle", "Golett", "Golurk", "Munna", "Musharna", "Natu", "Xatu", "Stufful", "Bewear", "Snover", "Abomasnow", "Krabby", "Kingler", "Wooper", "Quagsire", "Corphish", "Crawdaunt", "Nincada", "Ninjask", "Shedinja", "Tyrogue", "Hitmonlee", "Hitmonchan", "Hitmontop", "Pancham", "Pangoro", "Klink", "Klang", "Klinklang", "Combee", "Vespiquen", "Bronzor", "Bronzong", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Drifloon", "Drifblim", "Gossifleur", "Eldegoss", "Cherubi", "Cherrim", "Stunky", "Skuntank", "Tympole", "Palpitoad", "Seismitoad", "Duskull", "Dusclops", "Dusknoir", "Machop", "Machoke", "Machamp", "Gastly", "Haunter", "Gengar", "Magikarp", "Gyarados", "Goldeen", "Seaking", "Remoraid", "Octillery", "Shellder", "Cloyster", "Feebas", "Milotic", "Basculin", "Wishiwashi", "Pyukumuku", "Trubbish", "Garbodor", "Sizzlipede", "Centiskorch", "Rolycoly", "Carkol", "Coalossal", "Diglett", "Dugtrio", "Drilbur", "Excadrill", "Roggenrola", "Boldore", "Gigalith", "Timburr", "Gurdurr", "Conkeldurr", "Woobat", "Swoobat", "Noibat", "Noivern", "Onix", "Steelix", "Arrokuda", "Barraskewda", "Meowth", "Perrserker", "Persian", "Milcery", "Alcremie", "Cutiefly", "Ribombee", "Ferroseed", "Ferrothorn", "Pumpkaboo", "Gourgeist", "Pichu", "Pikachu", "Raichu", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Applin", "Flapple", "Appletun", "Espurr", "Meowstic", "Swirlix", "Slurpuff", "Spritzee", "Aromatisse", "Dewpider", "Araquanid", "Wynaut", "Wobbuffet", "Farfetch\u2019d", "Sirfetch\u2019d", "Chinchou", "Lanturn", "Croagunk", "Toxicroak", "Scraggy", "Scrafty", "Stunfisk", "Shuckle", "Barboach", "Whiscash", "Shellos", "Gastrodon", "Wimpod", "Golisopod", "Binacle", "Barbaracle", "Corsola", "Cursola", "Impidimp", "Morgrem", "Grimmsnarl", "Hatenna", "Hattrem", "Hatterene", "Salandit", "Salazzle", "Pawniard", "Bisharp", "Throh", "Sawk", "Koffing", "Weezing", "Bonsly", "Sudowoodo", "Cleffa", "Clefairy", "Clefable", "Togepi", "Togetic", "Togekiss", "Munchlax", "Snorlax", "Cottonee", "Whimsicott", "Rhyhorn", "Rhydon", "Rhyperior", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Karrablast", "Escavalier", "Shelmet", "Accelgor", "Elgyem", "Beheeyem", "Cubchoo", "Beartic", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Skorupi", "Drapion", "Litwick", "Lampent", "Chandelure", "Inkay", "Malamar", "Sneasel", "Weavile", "Sableye", "Mawile", "Maractus", "Sigilyph", "Riolu", "Lucario", "Torkoal", "Mimikyu", "Cufant", "Copperajah", "Qwilfish", "Frillish", "Jellicent", "Mareanie", "Toxapex", "Cramorant", "Toxel", "Toxtricity", "Toxtricity-Low-Key", "Silicobra", "Sandaconda", "Hippopotas", "Hippowdon", "Durant", "Heatmor", "Helioptile", "Heliolisk", "Hawlucha", "Trapinch", "Vibrava", "Flygon", "Axew", "Fraxure", "Haxorus", "Yamask", "Runerigus", "Cofagrigus", "Honedge", "Doublade", "Aegislash", "Ponyta", "Rapidash", "Sinistea", "Polteageist", "Indeedee", "Phantump", "Trevenant", "Morelull", "Shiinotic", "Oranguru", "Passimian", "Morpeko", "Falinks", "Drampa", "Turtonator", "Togedemaru", "Snom", "Frosmoth", "Clobbopus", "Grapploct", "Pincurchin", "Mantyke", "Mantine", "Wailmer", "Wailord", "Bergmite", "Avalugg", "Dhelmise", "Lapras", "Lunatone", "Solrock", "Mime Jr.", "Mr. Mime", "Mr. Rime", "Darumaka", "Darmanitan", "Stonjourner", "Eiscue", "Duraludon", "Rotom", "Ditto", "Dracozolt", "Arctozolt", "Dracovish", "Arctovish", "Charmander", "Charmeleon", "Charizard", "Type: Null", "Silvally", "Larvitar", "Pupitar", "Tyranitar", "Deino", "Zweilous", "Hydreigon", "Goomy", "Sliggoo", "Goodra", "Jangmo-o", "Hakamo-o", "Kommo-o", "Dreepy", "Drakloak", "Dragapult",
				"Slowpoke", "Slowbro", "Slowking", "Buneary", "Lopunny", "Happiny", "Chansey", "Blissey", "Skwovet", "Greedent", "Igglybuff", "Jigglypuff", "Wigglytuff", "Blipbug", "Dottler", "Fomantis", "Lurantis", "Applin", "Flapple", "Appletun", "Fletchling", "Fletchinder", "Talonflame", "Shinx", "Luxio", "Luxray", "Klefki", "Pawniard", "Bisharp", "Abra", "Kadabra", "Alakazam", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Krabby", "Kingler", "Tentacool", "Tentacruel", "Magikarp", "Gyarados", "Remoraid", "Octillery", "Mantyke", "Mantine", "Wingull", "Pelipper", "Skorupi", "Drapion", "Dunsparce", "Bouffalant", "Lickitung", "Lickilicky", "Chewtle", "Drednaw", "Wooper", "Quagsire", "Goomy", "Sliggoo", "Goodra", "Druddigon", "Shelmet", "Accelgor", "Karrablast", "Escavalier", "Bulbasaur", "Ivysaur", "Venusaur", "Squirtle", "Wartortle", "Blastoise", "Venipede", "Whirlipede", "Scolipede", "Foongus", "Amoonguss", "Comfey", "Tangela", "Tangrowth", "Croagunk", "Toxicroak", "Pichu", "Pikachu", "Raichu", "Zorua", "Zoroark", "Oranguru", "Passimian", "Corphish", "Crawdaunt", "Cramorant", "Goldeen", "Seaking", "Arrokuda", "Barraskewda", "Staryu", "Starmie", "Kubfu", "Urshifu", "Emolga", "Dedenne", "Morpeko", "Magnemite", "Magneton", "Magnezone", "Inkay", "Malamar", "Wishiwashi", "Carvanha", "Sharpedo", "Lillipup", "Herdier", "Stoutland", "Tauros", "Miltank", "Scyther", "Scizor", "Pinsir", "Heracross", "Dwebble", "Crustle", "Wimpod", "Golisopod", "Pincurchin", "Mareanie", "Toxapex", "Clobbopus", "Grapploct", "Shellder", "Cloyster", "Sandygast", "Palossand", "Drifloon", "Drifblim", "Barboach", "Whiscash", "Azurill", "Marill", "Azumarill", "Poliwag", "Poliwhirl", "Poliwrath", "Politoed", "Psyduck", "Golduck", "Whismur", "Loudred", "Exploud", "Woobat", "Swoobat", "Skarmory", "Roggenrola", "Boldore", "Gigalith", "Rockruff", "Lycanroc", "Salandit", "Salazzle", "Scraggy", "Scrafty", "Mienfoo", "Mienshao", "Jangmo-o", "Hakamo-o", "Kommo-o", "Sandshrew", "Sandslash", "Cubone", "Marowak", "Kangaskhan", "Torkoal", "Silicobra", "Sandaconda", "Sandile", "Krokorok", "Krookodile", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Rhyhorn", "Rhydon", "Rhyperior", "Larvesta", "Volcarona", "Chinchou", "Lanturn", "Wailmer", "Wailord", "Frillish", "Jellicent", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Horsea", "Seadra", "Kingdra", "Petilil", "Lilligant", "Combee", "Vespiquen", "Exeggcute", "Exeggutor", "Ditto", "Porygon", "Porygon2", "Porygon-Z",
				"Nidoran-F", "Nidorina", "Nidoqueen", "Nidoran-M", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Zubat", "Golbat", "Ponyta", "Rapidash", "Mr. Mime", "Jynx", "Electabuzz", "Magmar", "Magikarp", "Gyarados", "Lapras", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Crobat", "Cleffa", "Espeon", "Umbreon", "Shuckle", "Sneasel", "Swinub", "Piloswine", "Delibird", "Smoochum", "Elekid", "Magby", "Larvitar", "Pupitar", "Tyranitar", "Zigzagoon", "Linoone", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Swablu", "Altaria", "Barboach", "Whiscash", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Absol", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Relicanth", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Bronzor", "Bronzong", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax", "Riolu", "Lucario", "Snover", "Abomasnow", "Weavile", "Electivire", "Magmortar", "Leafeon", "Glaceon", "Mamoswine", "Froslass", "Audino", "Timburr", "Gurdurr", "Conkeldurr", "Cottonee", "Whimsicott", "Basculin", "Darumaka", "Darmanitan", "Tirtouga", "Carracosta", "Archen", "Archeops", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Vanillite", "Vanillish", "Vanilluxe", "Karrablast", "Escavalier", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Litwick", "Lampent", "Chandelure", "Cubchoo", "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Druddigon", "Golett", "Golurk", "Heatmor", "Durant", "Deino", "Zweilous", "Hydreigon", "Cobalion", "Terrakion", "Virizion", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Sylveon", "Carbink", "Phantump", "Trevenant", "Bergmite", "Avalugg", "Noibat", "Noivern", "Dewpider", "Araquanid", "Mimikyu", "Dhelmise", "Skwovet", "Greedent", "Rookidee", "Corvisquire", "Corviknight", "Gossifleur", "Eldegoss", "Wooloo", "Dubwool", "Yamper", "Boltund", "Rolycoly", "Carkol", "Coalossal", "Sizzlipede", "Centiskorch", "Sinistea", "Polteageist", "Hatenna", "Hattrem", "Hatterene", "Impidimp", "Morgrem", "Grimmsnarl", "Obstagoon", "Mr. Rime", "Pincurchin", "Snom", "Frosmoth", "Stonjourner", "Eiscue", "Indeedee", "Morpeko", "Cufant", "Copperajah", "Dreepy", "Drakloak", "Dragapult", "Regieleki", "Regidrago", "Glastrier", "Spectrier",
			];
			const species = this.dex.species.get(set.species || set.name);
			if (!galarDex.includes(species.baseSpecies) && !galarDex.includes(species.name)) {
				return [`${species.baseSpecies} is not in the Galar, Isle of Armor, or Crown Tundra Pokédexes.`];
			}
		},
	},
	potd: {
		effectType: 'Rule',
		name: 'PotD',
		desc: "Forces the Pokemon of the Day onto every random team.",
		onBegin() {
			if (global.Config && global.Config.potd) {
				this.add('rule', "Pokemon of the Day: " + this.dex.species.get(Config.potd).name);
			}
		},
	},
	forcemonotype: {
		effectType: 'ValidatorRule',
		name: 'Force Monotype',
		desc: `Forces all teams to have the same type. Usage: Force Monotype = [Type], e.g. "Force Monotype = Water"`,
		hasValue: true,
		onValidateRule(value) {
			if (!this.dex.types.get(value).exists) throw new Error(`Misspelled type "${value}"`);
		},
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const type = this.dex.types.get(this.ruleTable.valueRules.get('forcemonotype')!);
			if (!species.types.map(this.toID).includes(type.id)) {
				return [`${set.species} must have type ${type.name}`];
			}
		},
	},
	forceselect: {
		effectType: 'ValidatorRule',
		name: 'Force Select',
		desc: `Forces a Pokemon to be on the team and selected at Team Preview. Usage: Force Select = [Pokemon], e.g. "Force Select = Magikarp"`,
		hasValue: true,
		onValidateRule(value) {
			if (!this.dex.species.get(value).exists) throw new Error(`Misspelled Pokemon "${value}"`);
		},
		onValidateTeam(team) {
			let hasSelection = false;
			const species = this.dex.species.get(this.ruleTable.valueRules.get('forceselect'));
			for (const set of team) {
				if (species.name === set.species) {
					hasSelection = true;
					break;
				}
			}
			if (!hasSelection) {
				return [`Your team must contain ${species.name}.`];
			}
		},
		// hardcoded in sim/side
	},
	evlimits: {
		effectType: 'ValidatorRule',
		name: 'EV Limits',
		desc: "Require EVs to be in specific ranges, such as: \"EV Limits = Atk 0-124 / Def 100-252\"",
		hasValue: true,
		onValidateRule(value) {
			if (!value) throw new Error(`To remove EV limits, use "! EV Limits"`);

			const slashedParts = value.split('/');
			const UINT_REGEX = /^[0-9]{1,4}$/;
			return slashedParts.map(slashedPart => {
				const parts = slashedPart.replace('-', ' - ').replace(/ +/g, ' ').trim().split(' ');
				const [stat, low, hyphen, high] = parts;
				if (parts.length !== 4 || !UINT_REGEX.test(low) || hyphen !== '-' || !UINT_REGEX.test(high)) {
					throw new Error(`EV limits should be in the format "EV Limits = Atk 0-124 / Def 100-252"`);
				}
				const statid = this.dex.toID(stat) as StatID;
				if (!this.dex.stats.ids().includes(statid)) {
					throw new Error(`Unrecognized stat name "${stat}" in "${value}"`);
				}
				return `${statid} ${low}-${high}`;
			}).join(' / ');
		},
		onValidateSet(set) {
			const limits = this.ruleTable.valueRules.get('evlimits')!;
			const problems = [];

			for (const limit of limits.split(' / ')) {
				const [statid, range] = limit.split(' ') as [StatID, string];
				const [low, high] = range.split('-').map(num => parseInt(num));
				const ev = set.evs[statid];

				if (ev < low || ev > high) {
					problems.push(`${set.name || set.species}'s ${this.dex.stats.names[statid]} EV (${ev}) must be ${low}-${high}`);
				}
			}
			return problems;
		},
	},
	teampreview: {
		effectType: 'Rule',
		name: 'Team Preview',
		desc: "Allows each player to see the Pok&eacute;mon on their opponent's team before they choose their lead Pok&eacute;mon",
		onTeamPreview() {
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details.replace(', shiny', '')
					.replace(/(Arceus|Gourgeist|Pumpkaboo|Xerneas|Silvally|Urshifu)(-[a-zA-Z?-]+)?/g, '$1-*')
					.replace(/(Zacian|Zamazenta)(?!-Crowned)/g, '$1-*'); // Hacked-in Crowned formes will be revealed
				this.add('poke', pokemon.side.id, details, '');
			}
			this.makeRequest('teampreview');
		},
	},
	onevsone: {
		effectType: 'Rule',
		name: 'One vs One',
		desc: "Only allows one Pok&eacute;mon in battle",
		ruleset: ['Picked Team Size = 1'],
	},
	twovstwo: {
		effectType: 'Rule',
		name: 'Two vs Two',
		desc: "Only allows two Pok&eacute;mon in battle",
		ruleset: ['Picked Team Size = 2'],
	},
	littlecup: {
		effectType: 'ValidatorRule',
		name: 'Little Cup',
		desc: "Only allows Pok&eacute;mon that can evolve and don't have any prior evolutions",
		ruleset: ['Max Level = 5'],
		onValidateSet(set) {
			const species = this.dex.species.get(set.species || set.name);
			if (species.prevo && this.dex.species.get(species.prevo).gen <= this.gen) {
				return [set.species + " isn't the first in its evolution family."];
			}
			if (!species.nfe) {
				return [set.species + " doesn't have an evolution family."];
			}
		},
	},
	blitz: {
		effectType: 'Rule',
		name: 'Blitz',
		// THIS 100% INTENTIONALLY SAYS TEN SECONDS PER TURN
		// IGNORE maxPerTurn. addPerTurn IS 5, TRANSLATING TO AN INCREMENT OF 10.
		desc: "Super-fast 'Blitz' timer giving 30 second Team Preview and 10 seconds per turn.",
		onBegin() {
			this.add('rule', 'Blitz: Super-fast timer');
		},
		timer: {starting: 15, addPerTurn: 5, maxPerTurn: 15, maxFirstTurn: 40, grace: 30},
	},
	vgctimer: {
		effectType: 'Rule',
		name: 'VGC Timer',
		desc: "VGC's timer: 90 second Team Preview, 7 minutes Your Time, 1 minute per turn",
		timer: {
			starting: 7 * 60, addPerTurn: 0, maxPerTurn: 55, maxFirstTurn: 90,
			grace: 90, timeoutAutoChoose: true, dcTimerBank: false,
		},
	},
	speciesclause: {
		effectType: 'ValidatorRule',
		name: 'Species Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon from the same species",
		onBegin() {
			this.add('rule', 'Species Clause: Limit one of each Pokémon');
		},
		onValidateTeam(team, format) {
			const speciesTable = new Set<number>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (speciesTable.has(species.num)) {
					return [`You are limited to one of each Pokémon by Species Clause.`, `(You have more than one ${species.baseSpecies})`];
				}
				speciesTable.add(species.num);
			}
		},
	},
	nicknameclause: {
		effectType: 'ValidatorRule',
		name: 'Nickname Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon with the same nickname",
		onValidateTeam(team, format) {
			const nameTable = new Set<string>();
			for (const set of team) {
				const name = set.name;
				if (name) {
					if (name === this.dex.species.get(set.species).baseSpecies) continue;
					if (nameTable.has(name)) {
						return [`Your Pokémon must have different nicknames.`, `(You have more than one ${name})`];
					}
					nameTable.add(name);
				}
			}
			// Illegality of impersonation of other species is
			// hardcoded in team-validator.js, so we are done.
		},
	},
	itemclause: {
		effectType: 'ValidatorRule',
		name: 'Item Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon with the same item",
		onBegin() {
			this.add('rule', 'Item Clause: Limit one of each item');
		},
		onValidateTeam(team) {
			const itemTable = new Set<string>();
			for (const set of team) {
				const item = this.toID(set.item);
				if (!item) continue;
				if (itemTable.has(item)) {
					return [
						`You are limited to one of each item by Item Clause.`,
						`(You have more than one ${this.dex.items.get(item).name})`,
					];
				}
				itemTable.add(item);
			}
		},
	},
	"2abilityclause": {
		effectType: 'ValidatorRule',
		name: '2 Ability Clause',
		desc: "Prevents teams from having more than two Pok&eacute;mon with the same ability",
		onBegin() {
			this.add('rule', '2 Ability Clause: Limit two of each ability');
		},
		onValidateTeam(team) {
			if (this.format.id === 'gen8multibility') return;
			const abilityTable = new Map<string, number>();
			const base: {[k: string]: string} = {
				airlock: 'cloudnine',
				battlearmor: 'shellarmor',
				clearbody: 'whitesmoke',
				dazzling: 'queenlymajesty',
				emergencyexit: 'wimpout',
				filter: 'solidrock',
				gooey: 'tanglinghair',
				insomnia: 'vitalspirit',
				ironbarbs: 'roughskin',
				libero: 'protean',
				minus: 'plus',
				moxie: 'chillingneigh',
				powerofalchemy: 'receiver',
				propellertail: 'stalwart',
				teravolt: 'moldbreaker',
				turboblaze: 'moldbreaker',
			};
			for (const set of team) {
				let ability = this.toID(set.ability);
				if (!ability) continue;
				if (ability in base) ability = base[ability] as ID;
				if ((abilityTable.get(ability) || 0) >= 2) {
					return [
						`You are limited to two of each ability by 2 Ability Clause.`,
						`(You have more than two ${this.dex.abilities.get(ability).name} variants)`,
					];
				}
				abilityTable.set(ability, (abilityTable.get(ability) || 0) + 1);
			}
		},
	},
	ohkoclause: {
		effectType: 'ValidatorRule',
		name: 'OHKO Clause',
		desc: "Bans all OHKO moves, such as Fissure",
		onBegin() {
			this.add('rule', 'OHKO Clause: OHKO moves are banned');
		},
		onValidateSet(set) {
			const problems: string[] = [];
			if (set.moves) {
				for (const moveId of set.moves) {
					const move = this.dex.moves.get(moveId);
					if (move.ohko) problems.push(move.name + ' is banned by OHKO Clause.');
				}
			}
			return problems;
		},
	},
	evasionclause: {
		effectType: 'ValidatorRule',
		name: 'Evasion Clause',
		desc: "Bans abilities, items, and moves that boost Evasion",
		ruleset: ['Evasion Abilities Clause', 'Evasion Items Clause', 'Evasion Moves Clause'],
		onBegin() {
			this.add('rule', 'Evasion Clause: Evasion abilities, items, and moves are banned');
		},
	},
	evasionabilitiesclause: {
		effectType: 'ValidatorRule',
		name: 'Evasion Abilities Clause',
		desc: "Bans abilities that boost Evasion under certain weather conditions",
		banlist: ['Sand Veil', 'Snow Cloak'],
		onBegin() {
			this.add('rule', 'Evasion Abilities Clause: Evasion abilities are banned');
		},
	},
	evasionitemsclause: {
		effectType: 'ValidatorRule',
		name: 'Evasion Items Clause',
		desc: "Bans moves that lower the accuracy of moves used against the user",
		banlist: ['Bright Powder', 'Lax Incense'],
		onBegin() {
			this.add('rule', 'Evasion Items Clause: Evasion items are banned');
		},
	},
	evasionmovesclause: {
		effectType: 'ValidatorRule',
		name: 'Evasion Moves Clause',
		desc: "Bans moves that consistently raise the user's evasion when used",
		banlist: ['Minimize', 'Double Team'],
		onBegin() {
			this.add('rule', 'Evasion Moves Clause: Evasion moves are banned');
		},
	},
	accuracymovesclause: {
		effectType: 'ValidatorRule',
		name: 'Accuracy Moves Clause',
		desc: "Bans moves that have a chance to lower the target's accuracy when used",
		banlist: [
			'Flash', 'Kinesis', 'Leaf Tornado', 'Mirror Shot', 'Mud Bomb', 'Mud-Slap', 'Muddy Water', 'Night Daze', 'Octazooka', 'Sand Attack', 'Smokescreen',
		],
		onBegin() {
			this.add('rule', 'Accuracy Moves Clause: Accuracy-lowering moves are banned');
		},
	},
	sleepmovesclause: {
		effectType: 'ValidatorRule',
		name: 'Sleep Moves Clause',
		desc: "Bans all moves that induce sleep, such as Hypnosis",
		banlist: ['Yawn'],
		onBegin() {
			this.add('rule', 'Sleep Clause: Sleep-inducing moves are banned');
		},
		onValidateSet(set) {
			const problems = [];
			if (set.moves) {
				for (const id of set.moves) {
					const move = this.dex.moves.get(id);
					if (move.status && move.status === 'slp') problems.push(move.name + ' is banned by Sleep Clause.');
				}
			}
			return problems;
		},
	},
	gravitysleepclause: {
		effectType: 'ValidatorRule',
		name: 'Gravity Sleep Clause',
		desc: "Bans sleep moves below 100% accuracy, in conjunction with Gravity or Gigantamax Orbeetle",
		banlist: [
			'Gravity ++ Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
		onValidateTeam(team) {
			let hasOrbeetle = false;
			let hasSleepMove = false;
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (species.name === "Orbeetle" && set.gigantamax) hasOrbeetle = true;
				if (!hasOrbeetle && species.name === "Orbeetle-Gmax") hasOrbeetle = true;
				for (const moveid of set.moves) {
					const move = this.dex.moves.get(moveid);
					if (move.status && move.status === 'slp' && move.accuracy < 100) hasSleepMove = true;
				}
			}
			if (hasOrbeetle && hasSleepMove) {
				return [`The combination of Gravity and Gigantamax Orbeetle on the same team is banned.`];
			}
		},
		onBegin() {
			this.add('rule', 'Gravity Sleep Clause: The combination of sleep-inducing moves with imperfect accuracy and Gravity or Gigantamax Orbeetle are banned');
		},
	},
	endlessbattleclause: {
		effectType: 'Rule',
		name: 'Endless Battle Clause',
		desc: "Prevents players from forcing a battle which their opponent cannot end except by forfeit",
		// implemented in sim/battle.js, see https://dex.pokemonshowdown.com/articles/battlerules#endlessbattleclause for the specification.
		onBegin() {
			this.add('rule', 'Endless Battle Clause: Forcing endless battles is banned');
		},
	},
	moodyclause: {
		effectType: 'ValidatorRule',
		name: 'Moody Clause',
		desc: "Bans the ability Moody",
		banlist: ['Moody'],
		onBegin() {
			this.add('rule', 'Moody Clause: Moody is banned');
		},
	},
	swaggerclause: {
		effectType: 'ValidatorRule',
		name: 'Swagger Clause',
		desc: "Bans the move Swagger",
		banlist: ['Swagger'],
		onBegin() {
			this.add('rule', 'Swagger Clause: Swagger is banned');
		},
	},
	batonpassclause: {
		effectType: 'ValidatorRule',
		name: 'Baton Pass Clause',
		desc: "Stops teams from having more than one Pok&eacute;mon with Baton Pass, and no Pok&eacute;mon may be capable of passing boosts to both Speed and another stat",
		banlist: ["Baton Pass > 1"],
		onBegin() {
			this.add('rule', 'Baton Pass Clause: Limit one Baton Passer, can\'t pass Spe and other stats simultaneously');
		},
		onValidateSet(set, format, setHas) {
			if (!('move:batonpass' in setHas)) return;

			const item = this.dex.items.get(set.item);
			const ability = this.toID(set.ability);
			let speedBoosted: boolean | string = false;
			let nonSpeedBoosted: boolean | string = false;

			for (const moveId of set.moves) {
				const move = this.dex.moves.get(moveId);
				if (move.id === 'flamecharge' || (move.boosts && move.boosts.spe && move.boosts.spe > 0)) {
					speedBoosted = true;
				}
				const nonSpeedBoostedMoves = [
					'acupressure', 'bellydrum', 'chargebeam', 'curse', 'diamondstorm', 'fellstinger', 'fierydance',
					'flowershield', 'poweruppunch', 'rage', 'rototiller', 'skullbash', 'stockpile',
				];
				if (nonSpeedBoostedMoves.includes(move.id) ||
					move.boosts && ((move.boosts.atk && move.boosts.atk > 0) || (move.boosts.def && move.boosts.def > 0) ||
					(move.boosts.spa && move.boosts.spa > 0) || (move.boosts.spd && move.boosts.spd > 0))) {
					nonSpeedBoosted = true;
				}
				if (item.zMove && move.type === item.zMoveType && move.zMove?.boost) {
					const boosts = move.zMove.boost;
					if (boosts.spe && boosts.spe > 0) {
						if (!speedBoosted) speedBoosted = move.name;
					}
					if (
						((boosts.atk && boosts.atk > 0) || (boosts.def && boosts.def > 0) ||
						(boosts.spa && boosts.spa > 0) || (boosts.spd && boosts.spd > 0))
					) {
						if (!nonSpeedBoosted || move.name === speedBoosted) nonSpeedBoosted = move.name;
					}
				}
			}

			const speedBoostedAbilities = ['motordrive', 'rattled', 'speedboost', 'steadfast', 'weakarmor'];
			const speedBoostedItems = ['blazikenite', 'eeviumz', 'kommoniumz', 'salacberry'];
			if (speedBoostedAbilities.includes(ability) || speedBoostedItems.includes(item.id)) {
				speedBoosted = true;
			}
			if (!speedBoosted) return;

			const nonSpeedBoostedAbilities = [
				'angerpoint', 'competitive', 'defiant', 'download', 'justified', 'lightningrod', 'moxie', 'sapsipper', 'stormdrain',
			];
			const nonSpeedBoostedItems = [
				'absorbbulb', 'apicotberry', 'cellbattery', 'eeviumz', 'ganlonberry', 'keeberry', 'kommoniumz', 'liechiberry',
				'luminousmoss', 'marangaberry', 'petayaberry', 'snowball', 'starfberry', 'weaknesspolicy',
			];
			if (nonSpeedBoostedAbilities.includes(ability) || nonSpeedBoostedItems.includes(item.id)) {
				nonSpeedBoosted = true;
			}
			if (!nonSpeedBoosted) return;

			// if both boost sources are Z-moves, and they're distinct
			if (speedBoosted !== nonSpeedBoosted && typeof speedBoosted === 'string' && typeof nonSpeedBoosted === 'string') return;

			return [
				`${set.name || set.species} can Baton Pass both Speed and a different stat, which is banned by Baton Pass Clause.`,
			];
		},
	},
	onebatonpassclause: {
		effectType: 'ValidatorRule',
		name: 'One Baton Pass Clause',
		desc: "Stops teams from having more than one Pok&eacute;mon with Baton Pass",
		banlist: ["Baton Pass > 1"],
		onBegin() {
			this.add('rule', 'One Baton Pass Clause: Limit one Baton Passer');
		},
	},
	oneboostpasserclause: {
		effectType: 'ValidatorRule',
		name: 'One Boost Passer Clause',
		desc: "Stops teams from having a Pok&eacute;mon with Baton Pass that has multiple ways to boost its stats, and no more than one Baton Passer may be able to boost its stats",
		onBegin() {
			this.add('rule', 'One Boost Passer Clause: Limit one Baton Passer that has a way to boost its stats');
		},
		onValidateTeam(team) {
			const boostingEffects = [
				'acidarmor', 'agility', 'amnesia', 'apicotberry', 'barrier', 'bellydrum', 'bulkup', 'calmmind', 'cosmicpower', 'curse',
				'defensecurl', 'dragondance', 'ganlonberry', 'growth', 'harden', 'howl', 'irondefense', 'liechiberry', 'meditate',
				'petayaberry', 'salacberry', 'sharpen', 'speedboost', 'starfberry', 'swordsdance', 'tailglow', 'withdraw',
			];
			let passers = 0;
			for (const set of team) {
				if (!set.moves.includes('Baton Pass')) continue;
				let passableBoosts = 0;
				const item = this.toID(set.item);
				const ability = this.toID(set.ability);
				for (const move of set.moves) {
					if (boostingEffects.includes(this.toID(move))) passableBoosts++;
				}
				if (boostingEffects.includes(item)) passableBoosts++;
				if (boostingEffects.includes(ability)) passableBoosts++;
				if (passableBoosts === 1) passers++;
				if (passableBoosts > 1) {
					return [
						`${set.name || set.species} has Baton Pass and multiple ways to boost its stats, which is banned by One Boost Passer Clause.`,
					];
				}
				if (passers > 1) {
					return [
						`Multiple Pokemon have Baton Pass and a way to boost their stats, which is banned by One Boost Passer Clause.`,
					];
				}
			}
		},
	},
	cfzclause: {
		effectType: 'ValidatorRule',
		name: 'CFZ Clause',
		desc: "Bans the use of crystal-free Z-Moves",
		banlist: [
			'10,000,000 Volt Thunderbolt', 'Acid Downpour', 'All-Out Pummeling', 'Black Hole Eclipse', 'Bloom Doom',
			'Breakneck Blitz', 'Catastropika', 'Clangorous Soulblaze', 'Continental Crush', 'Corkscrew Crash',
			'Devastating Drake', 'Extreme Evoboost', 'Genesis Supernova', 'Gigavolt Havoc', 'Guardian of Alola',
			'Hydro Vortex', 'Inferno Overdrive', 'Let\'s Snuggle Forever', 'Light That Burns the Sky',
			'Malicious Moonsault', 'Menacing Moonraze Maelstrom', 'Never-Ending Nightmare', 'Oceanic Operetta',
			'Pulverizing Pancake', 'Savage Spin-Out', 'Searing Sunraze Smash', 'Shattered Psyche', 'Sinister Arrow Raid',
			'Soul-Stealing 7-Star Strike', 'Splintered Stormshards', 'Stoked Sparksurfer', 'Subzero Slammer',
			'Supersonic Skystrike', 'Tectonic Rage', 'Twinkle Tackle',
		],
		onBegin() {
			this.add('rule', 'CFZ Clause: Crystal-free Z-Moves are banned');
		},
	},
	zmoveclause: {
		effectType: 'ValidatorRule',
		name: 'Z-Move Clause',
		desc: "Bans Pok&eacute;mon from holding Z-Crystals",
		onValidateSet(set) {
			const item = this.dex.items.get(set.item);
			if (item.zMove) return [`${set.name || set.species}'s item ${item.name} is banned by Z-Move Clause.`];
		},
		onBegin() {
			this.add('rule', 'Z-Move Clause: Z-Moves are banned');
		},
	},
	notfullyevolved: {
		effectType: 'ValidatorRule',
		name: 'Not Fully Evolved',
		desc: "Bans Pok&eacute;mon that are fully evolved or can't evolve",
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			if (!species.nfe) {
				return [set.species + " cannot evolve."];
			}
		},
	},
	hppercentagemod: {
		effectType: 'Rule',
		name: 'HP Percentage Mod',
		desc: "Shows the HP of Pok&eacute;mon in percentages",
		onBegin() {
			this.add('rule', 'HP Percentage Mod: HP is shown in percentages');
			this.reportPercentages = true;
		},
	},
	exacthpmod: {
		effectType: 'Rule',
		name: 'Exact HP Mod',
		desc: "Shows the exact HP of all Pok&eacute;mon",
		onBegin() {
			this.add('rule', 'Exact HP Mod: Exact HP is shown');
			this.reportExactHP = true;
		},
	},
	cancelmod: {
		effectType: 'Rule',
		name: 'Cancel Mod',
		desc: "Allows players to change their own choices before their opponents make one",
		onBegin() {
			this.supportCancel = true;
		},
	},
	sleepclausemod: {
		effectType: 'Rule',
		name: 'Sleep Clause Mod',
		desc: "Prevents players from putting more than one of their opponent's Pok&eacute;mon to sleep at a time, and bans Mega Gengar from using Hypnosis",
		banlist: ['Hypnosis + Gengarite'],
		onBegin() {
			this.add('rule', 'Sleep Clause Mod: Limit one foe put to sleep');
		},
		onSetStatus(status, target, source) {
			if (source && source.isAlly(target)) {
				return;
			}
			if (status.id === 'slp') {
				for (const pokemon of target.side.pokemon) {
					if (pokemon.hp && pokemon.status === 'slp') {
						if (!pokemon.statusState.source || !pokemon.statusState.source.isAlly(pokemon)) {
							this.add('-message', 'Sleep Clause Mod activated.');
							return false;
						}
					}
				}
			}
		},
	},
	stadiumsleepclause: {
		effectType: 'Rule',
		name: 'Stadium Sleep Clause',
		desc: "Prevents players from putting one of their opponent's Pok\u00E9mon to sleep if any of the opponent's other Pok\u00E9mon are asleep (different from Sleep Clause Mod because putting your own Pok\u00E9mon to sleep is enough to prevent opponents from putting your others to sleep).",
		onBegin() {
			this.add('rule', 'Stadium Sleep Clause: Limit one foe put to sleep');
		},
		onSetStatus(status, target, source) {
			if (source && source.isAlly(target)) {
				return;
			}
			if (status.id === 'slp') {
				for (const pokemon of target.side.pokemon) {
					if (pokemon.hp && pokemon.status === 'slp') {
						this.add('-message', "Sleep Clause activated. (In Stadium, Sleep Clause activates if any of the opponent's Pokemon are asleep, even if self-inflicted from Rest)");
						return false;
					}
				}
			}
		},
	},
	switchpriorityclausemod: {
		effectType: 'Rule',
		name: 'Switch Priority Clause Mod',
		desc: "Makes a faster Pokémon switch first when double-switching, unlike in Emerald link battles, where player 1's Pokémon would switch first",
		onBegin() {
			this.add('rule', 'Switch Priority Clause Mod: Faster Pokémon switch first');
		},
	},
	desyncclausemod: {
		effectType: 'Rule',
		name: 'Desync Clause Mod',
		desc: 'If a desync would happen, the move fails instead. This rule currently covers Psywave and Counter.',
		onBegin() {
			this.add('rule', 'Desync Clause Mod: Desyncs changed to move failure.');
		},
		// Hardcoded in gen1/moves.ts
		// Can't be disabled (no precedent for how else to handle desyncs)
	},
	deoxyscamouflageclause: {
		effectType: 'Rule',
		name: 'Deoxys Camouflage Clause',
		desc: "Reveals the Deoxys forme when it is sent in battle.",
		// Hardcoded into effect, cannot be disabled.
		onBegin() {
			this.add('rule', 'Deoxys Camouflage Clause: Reveals the Deoxys forme when it is sent in battle.');
		},
	},
	freezeclausemod: {
		effectType: 'Rule',
		name: 'Freeze Clause Mod',
		desc: "Prevents players from freezing more than one of their opponent's Pok&eacute;mon at a time",
		onBegin() {
			this.add('rule', 'Freeze Clause Mod: Limit one foe frozen');
		},
		onSetStatus(status, target, source) {
			if (source && source.isAlly(target)) {
				return;
			}
			if (status.id === 'frz') {
				for (const pokemon of target.side.pokemon) {
					if (pokemon.status === 'frz') {
						this.add('-message', 'Freeze Clause activated.');
						return false;
					}
				}
			}
		},
	},
	sametypeclause: {
		effectType: 'ValidatorRule',
		name: 'Same Type Clause',
		desc: "Forces all Pok&eacute;mon on a team to share a type with each other",
		onBegin() {
			this.add('rule', 'Same Type Clause: Pokémon in a team must share a type');
		},
		onValidateTeam(team) {
			let typeTable: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.species.get(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (i === 0) {
					typeTable = species.types;
				} else {
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				const item = this.dex.items.get(set.item);
				if (item.megaStone && species.baseSpecies === item.megaEvolves) {
					species = this.dex.species.get(item.megaStone);
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
					species = this.dex.species.get("Necrozma-Ultra");
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				if (!typeTable.length) return [`Your team must share a type.`];
			}
		},
	},
	megarayquazaclause: {
		effectType: 'Rule',
		name: 'Mega Rayquaza Clause',
		desc: "Prevents Rayquaza from mega evolving",
		onBegin() {
			this.add('rule', 'Mega Rayquaza Clause: You cannot mega evolve Rayquaza');
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.species.id === 'rayquaza') pokemon.canMegaEvo = null;
			}
		},
	},
	dynamaxclause: {
		effectType: 'Rule',
		name: 'Dynamax Clause',
		desc: "Prevents Pok&eacute;mon from dynamaxing",
		onValidateSet(set) {
			if (set.gigantamax) {
				return [
					`Your set for ${set.species} is flagged as Gigantamax, but Gigantamaxing is disallowed`,
					`(If this was a mistake, disable Gigantamaxing on the set.)`,
				];
			}
		},
		onBegin() {
			for (const side of this.sides) {
				side.dynamaxUsed = true;
			}
			this.add('rule', 'Dynamax Clause: You cannot dynamax');
		},
	},
	arceusevlimit: {
		effectType: 'ValidatorRule',
		name: 'Arceus EV Limit',
		desc: "Restricts Arceus to a maximum of 100 EVs in any one stat, and only multiples of 10",
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			if (species.num === 493 && set.evs) {
				let stat: StatID;
				for (stat in set.evs) {
					const ev = set.evs[stat];
					if (ev > 100) {
						return [
							"Arceus can't have more than 100 EVs in any stat, because Arceus is only obtainable from level 100 events.",
							"Level 100 Pokemon can only gain EVs from vitamins (Carbos etc), which are capped at 100 EVs.",
						];
					}
					if (!(
						ev % 10 === 0 ||
						(ev % 10 === 8 && ev % 4 === 0)
					)) {
						return [
							"Arceus can only have EVs that are multiples of 10, because Arceus is only obtainable from level 100 events.",
							"Level 100 Pokemon can only gain EVs from vitamins (Carbos etc), which boost in multiples of 10.",
						];
					}
				}
			}
		},
	},
	inversemod: {
		effectType: 'Rule',
		name: 'Inverse Mod',
		desc: "The mod for Inverse Battle which inverts the type effectiveness chart; weaknesses become resistances, while resistances and immunities become weaknesses",
		onNegateImmunity: false,
		onBegin() {
			this.add('rule', 'Inverse Mod: Weaknesses become resistances, while resistances and immunities become weaknesses.');
		},
		onEffectivenessPriority: 1,
		onEffectiveness(typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.dex.getImmunity(move, type)) return 1;
			return -typeMod;
		},
	},

	minsourcegen: {
		effectType: 'ValidatorRule',
		name: "Min Source Gen",
		desc: "Pokemon must be obtained from this generation or later.",
		hasValue: 'positive-integer',
		onValidateRule(value) {
			const minSourceGen = parseInt(value);
			if (minSourceGen > this.dex.gen) {
				// console.log(this.ruleTable);
				throw new Error(`Invalid generation ${minSourceGen}${this.ruleTable.blame('minsourcegen')} for a Gen ${this.dex.gen} format`);
			}
		},
	},

	stabmonsmovelegality: {
		effectType: 'ValidatorRule',
		name: 'STABmons Move Legality',
		desc: "Allows Pok&eacute;mon to use any move that they or a previous evolution/out-of-battle forme share a type with",
		checkCanLearn(move, species, setSources, set) {
			const nonstandard = move.isNonstandard === 'Past' && !this.ruleTable.has('standardnatdex');
			if (!nonstandard && !move.isZ && !move.isMax && !this.ruleTable.isRestricted(`move:${move.id}`)) {
				const speciesTypes: string[] = [];
				const moveTypes: string[] = [];
				// BDSP can't import Pokemon from Home, so it shouldn't grant moves from archaic species types
				const minObtainableSpeciesGen = this.dex.currentMod === 'gen8bdsp' ? this.dex.gen : species.gen;
				for (let i = this.dex.gen; i >= minObtainableSpeciesGen && i >= move.gen; i--) {
					const dex = this.dex.forGen(i);
					moveTypes.push(dex.moves.get(move.name).type);

					const pokemon = dex.species.get(species.name);
					if (pokemon.forme || pokemon.otherFormes) {
						const baseSpecies = dex.species.get(pokemon.baseSpecies);
						const originalForme = dex.species.get(pokemon.changesFrom || pokemon.name);
						speciesTypes.push(...originalForme.types);
						if (baseSpecies.otherFormes) {
							for (const formeName of baseSpecies.otherFormes) {
								if (baseSpecies.prevo) {
									const prevo = dex.species.get(baseSpecies.prevo);
									if (prevo.evos.includes(formeName)) continue;
								}
								const forme = dex.species.get(formeName);
								if (forme.changesFrom === originalForme.name && !forme.battleOnly) {
									speciesTypes.push(...forme.types);
								}
							}
						}
					} else {
						speciesTypes.push(...pokemon.types);
					}

					let prevo = pokemon.prevo;
					while (prevo) {
						const prevoSpecies = dex.species.get(prevo);
						speciesTypes.push(...prevoSpecies.types);
						prevo = prevoSpecies.prevo;
					}
				}
				if (moveTypes.some(m => speciesTypes.includes(m))) return null;
			}
			return this.checkCanLearn(move, species, setSources, set);
		},
	},
	alphabetcupmovelegality: {
		effectType: 'ValidatorRule',
		name: 'Alphabet Cup Move Legality',
		desc: "Allows Pok&eacute;mon to use any move that shares the same first letter as their name or a previous evolution's name.",
		checkCanLearn(move, species, setSources, set) {
			const nonstandard = move.isNonstandard === 'Past' && !this.ruleTable.has('standardnatdex');
			if (!nonstandard && !move.isZ && !move.isMax && !this.ruleTable.isRestricted(`move:${move.id}`)) {
				const letters = [species.id.charAt(0)];
				let prevo = species.prevo;
				if (species.changesFrom === 'Silvally') prevo = 'Type: Null';
				while (prevo) {
					const prevoSpecies = this.dex.species.get(prevo);
					letters.push(prevoSpecies.id.charAt(0));
					prevo = prevoSpecies.prevo;
				}
				if (letters.includes(move.id.charAt(0))) return null;
			}
			return this.checkCanLearn(move, species, setSources, set);
		},
	},
	sketchmonsmovelegality: {
		effectType: 'ValidatorRule',
		name: 'Sketchmons Move Legality',
		desc: "Pok&eacute;mon can learn one of any move they don't normally learn.",
		checkCanLearn(move, species, lsetData, set) {
			const problem = this.checkCanLearn(move, species, lsetData, set);
			if (!problem) return null;
			if (move.isZ || move.isMax || this.ruleTable.isRestricted(`move:${move.id}`)) return problem;
			if ((set as any).sketchMove) {
				return ` already has ${(set as any).sketchMove} as a sketched move.\n(${species.name} doesn't learn ${move.name}.)`;
			}
			(set as any).sketchMove = move.name;
			return null;
		},
		onValidateTeam(team) {
			const sketches = new Utils.Multiset<string>();
			for (const set of team) {
				if ((set as any).sketchMove) {
					sketches.add((set as any).sketchMove);
				}
			}
			const overSketched = [...sketches.entries()].filter(([moveName, count]) => count > 1);
			if (overSketched.length) {
				return overSketched.map(([moveName, count]) => (
					`You are limited to 1 of ${moveName} by Sketch Clause.\n(You have sketched ${moveName} ${count} times.)`
				));
			}
		},
	},
	camomonsmod: {
		effectType: 'Rule',
		name: 'Camomons Mod',
		desc: `Pok&eacute;mon have their types set to match their first two moves.`,
		onBegin() {
			this.add('rule', 'Camomons Mod: Pok\u00e9mon have their types set to match their first two moves.');
		},
		onModifySpeciesPriority: 2,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			const types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.dex.moves.get(move.id).type))];
			return {...species, types: types};
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
	},
	allowtradeback: {
		effectType: 'ValidatorRule',
		name: 'Allow Tradeback',
		desc: "Allows Gen 1 pokemon to have moves from their Gen 2 learnsets",
		// Implemented in team-validator.js
	},
	allowavs: {
		effectType: 'ValidatorRule',
		name: 'Allow AVs',
		desc: "Tells formats with the 'gen7letsgo' mod to take Awakening Values into consideration when calculating stats",
		// implemented in TeamValidator#validateStats
	},
	nfeclause: {
		effectType: 'ValidatorRule',
		name: 'NFE Clause',
		desc: "Bans all NFE Pokemon",
		onValidateSet(set) {
			const species = this.dex.species.get(set.species || set.name);
			if (species.nfe) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.species} is banned due to NFE Clause.`];
			}
		},
	},
	gemsclause: {
		effectType: 'ValidatorRule',
		name: 'Gems Clause',
		desc: "Bans all Gems",
		onValidateSet(set) {
			if (!set.item) return;
			const item = this.dex.items.get(set.item);
			if (item.isGem) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${item.name} is banned due to Gems Clause.`];
			}
		},
	},
	'sketchgen8moves': {
		effectType: 'ValidatorRule',
		name: 'Sketch Gen 8 Moves',
		desc: "Allows Pokémon who learn Sketch to learn any Gen 8 move (normally, Sketch is not usable in Gen 8).",
		// Implemented in sim/team-validator.ts
	},
	mimicglitch: {
		effectType: 'ValidatorRule',
		name: 'Mimic Glitch',
		desc: "Allows any Pokemon with access to Assist, Copycat, Metronome, Mimic, or Transform to gain access to almost any other move.",
		// Implemented in sim/team-validator.ts
	},
	overflowstatmod: {
		effectType: 'Rule',
		name: 'Overflow Stat Mod',
		desc: "Caps stats at 654 after a positive nature, or 655 after a negative nature",
		// Implemented in sim/battle.ts
	},
	formeclause: {
		effectType: 'ValidatorRule',
		name: 'Forme Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon of the same forme",
		onBegin() {
			this.add('rule', 'Forme Clause: Limit one of each forme of a Pokémon');
		},
		onValidateTeam(team) {
			const formeTable = new Set<string>();
			for (const set of team) {
				let species = this.dex.species.get(set.species);
				if (species.name !== species.baseSpecies) {
					const baseSpecies = this.dex.species.get(species.baseSpecies);
					if (
						species.types.join('/') === baseSpecies.types.join('/') &&
						Object.values(species.baseStats).join('/') === Object.values(baseSpecies.baseStats).join('/')
					) {
						species = baseSpecies;
					}
				}
				if (formeTable.has(species.name)) {
					return [
						`You are limited to one of each forme of a Pokémon by Forme Clause.`,
						`(You have more than one of ${species.name})`,
					];
				}
				formeTable.add(species.name);
			}
		},
	},
	'350cupmod': {
		effectType: 'Rule',
		name: '350 Cup Mod',
		desc: "If a Pok&eacute;mon's BST is 350 or lower, all of its stats get doubled.",
		onBegin() {
			this.add('rule', '350 Cup Mod: If a Pokemon\'s BST is 350 or lower, all of its stats get doubled.');
		},
		onModifySpeciesPriority: 2,
		onModifySpecies(species) {
			const newSpecies = this.dex.deepClone(species);
			if (newSpecies.bst <= 350) {
				newSpecies.bst = 0;
				for (const stat in newSpecies.baseStats) {
					newSpecies.baseStats[stat] = this.clampIntRange(newSpecies.baseStats[stat] * 2, 1, 255);
					newSpecies.bst += newSpecies.baseStats[stat];
				}
			}
			return newSpecies;
		},
	},
	flippedmod: {
		effectType: 'Rule',
		name: 'Flipped Mod',
		desc: "Every Pok&eacute;mon's stats are reversed. HP becomes Spe, Atk becomes Sp. Def, Def becomes Sp. Atk, and vice versa.",
		onBegin() {
			this.add('rule', 'Flipped Mod: Pokemon have their stats flipped (HP becomes Spe, vice versa).');
		},
		onModifySpeciesPriority: 2,
		onModifySpecies(species) {
			const newSpecies = this.dex.deepClone(species);
			const reversedNums = Object.values(newSpecies.baseStats).reverse();
			for (const [i, statName] of Object.keys(newSpecies.baseStats).entries()) {
				newSpecies.baseStats[statName] = reversedNums[i];
			}
			return newSpecies;
		},
	},
	scalemonsmod: {
		effectType: 'Rule',
		name: 'Scalemons Mod',
		desc: "Every Pok&eacute;mon's stats, barring HP, are scaled to give them a BST as close to 600 as possible",
		onBegin() {
			this.add('rule', 'Scalemons Mod: Every Pokemon\'s stats, barring HP, are scaled to come as close to a BST of 600 as possible');
		},
		onModifySpeciesPriority: 1,
		onModifySpecies(species) {
			const newSpecies = this.dex.deepClone(species);
			const bstWithoutHp: number = newSpecies.bst - newSpecies.baseStats['hp'];
			const scale = 600 - newSpecies.baseStats['hp'];
			newSpecies.bst = newSpecies.baseStats['hp'];
			for (const stat in newSpecies.baseStats) {
				if (stat === 'hp') continue;
				newSpecies.baseStats[stat] = this.clampIntRange(newSpecies.baseStats[stat] * scale / bstWithoutHp, 1, 255);
				newSpecies.bst += newSpecies.baseStats[stat];
			}
			return newSpecies;
		},
	},
	teamtypepreview: {
		effectType: 'Rule',
		name: 'Team Type Preview',
		desc: "Allows each player to see the Pok&eacute;mon on their opponent's team and those Pok&eacute;mon's types before they choose their lead Pok&eacute;mon",
		onTeamPreview() {
			this.add('clearpoke');
			for (const side of this.sides) {
				for (const pokemon of side.pokemon) {
					const details = pokemon.details.replace(', shiny', '')
						.replace(/(Arceus|Gourgeist|Pumpkaboo|Silvally|Urshifu)(-[a-zA-Z?-]+)?/g, '$1-*');
					this.add('poke', pokemon.side.id, details, '');
				}
				let buf = 'raw|';
				for (const pokemon of side.pokemon) {
					if (!buf.endsWith('|')) buf += '/</span>&#8203;';
					buf += `<span style="white-space:nowrap"><psicon pokemon="${pokemon.species.id}" />`;
					for (const type of pokemon.species.types) {
						buf += `<psicon type="${type}" /> `;
					}
				}
				this.add(`${buf}</span>`);
			}
			this.makeRequest('teampreview');
		},
	},
	aaarestrictedabilities: {
		effectType: 'ValidatorRule',
		name: 'AAA Restricted Abilities',
		desc: "Allows validation for AAA formats to use restricted abilities instead of banned ones.",
		onValidateSet(set) {
			const ability = this.dex.abilities.get(set.ability);
			if (this.ruleTable.isRestricted(`ability:${ability.id}`)) {
				const species = this.dex.species.get(set.species);
				if (!Object.values(species.abilities).includes(ability.name)) {
					return [
						`The Ability "${ability.name}" is restricted.`,
						`(Only Pok\u00e9mon that get ${ability.name} naturally can use it.)`,
					];
				}
			}
		},
	},
	eventmovesclause: {
		effectType: 'ValidatorRule',
		name: 'Event Moves Clause',
		desc: "Bans moves only obtainable through events.",
		onBegin() {
			this.add('rule', 'Event Moves Clause: Event-only moves are banned');
		},
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const learnsetData = {...(this.dex.data.Learnsets[species.id]?.learnset || {})};
			let prevo = species.prevo;
			while (prevo) {
				const prevoSpecies = this.dex.species.get(prevo);
				const prevoLsetData = this.dex.data.Learnsets[prevoSpecies.id]?.learnset || {};
				for (const moveid in prevoLsetData) {
					if (!(moveid in learnsetData)) {
						learnsetData[moveid] = prevoLsetData[moveid];
					} else {
						learnsetData[moveid].push(...prevoLsetData[moveid]);
					}
				}
				prevo = prevoSpecies.prevo;
			}
			const problems = [];
			if (set.moves?.length) {
				for (const move of set.moves) {
					if (learnsetData[this.toID(move)] && !learnsetData[this.toID(move)].filter(v => !v.includes('S')).length) {
						problems.push(`${species.name}'s move ${move} is obtainable only through events.`);
					}
				}
			}
			if (problems.length) problems.push(`(Event-only moves are banned.)`);
			return problems;
		},
	},
	pickedteamsize: {
		effectType: 'Rule',
		name: 'Picked Team Size',
		desc: "Team size (number of pokemon) that can be brought out of Team Preview",
		hasValue: 'positive-integer',
		// hardcoded in sim/side
		onValidateRule() {
			if (!(this.ruleTable.has('teampreview') || this.ruleTable.has('teamtypepreview'))) {
				throw new Error(`The "Picked Team Size" rule${this.ruleTable.blame('pickedteamsize')} requires Team Preview.`);
			}
		},
	},
	minteamsize: {
		effectType: 'ValidatorRule',
		name: "Min Team Size",
		desc: "Minimum team size (number of pokemon) that can be brought into Team Preview (or into the battle, in formats without Team Preview)",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	evlimit: {
		effectType: 'ValidatorRule',
		name: "EV Limit",
		desc: "Maximum total EVs on each pokemon.",
		hasValue: 'integer',
		// hardcoded in sim/team-validator
	},
	maxteamsize: {
		effectType: 'ValidatorRule',
		name: "Max Team Size",
		desc: "Maximum team size (number of pokemon) that can be brought into Team Preview (or into the battle, in formats without Team Preview)",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	maxmovecount: {
		effectType: 'ValidatorRule',
		name: "Max Move Count",
		desc: "Max number of moves allowed on a single pokemon (defaults to 4 in a normal game)",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	maxtotallevel: {
		effectType: 'Rule',
		name: 'Max Total Level',
		desc: "Teams are restricted to a total maximum Level limit and Pokemon are restricted to a set range of Levels",
		hasValue: 'positive-integer',
		onValidateTeam(team) {
			const pickedTeamSize = this.ruleTable.pickedTeamSize || team.length;
			const maxTotalLevel = this.ruleTable.maxTotalLevel;
			if (maxTotalLevel === null) throw new Error("No maxTotalLevel specified.");

			const teamLevels = [];
			for (const set of team) {
				teamLevels.push(set.level);
			}
			teamLevels.sort((a, b) => a - b);

			let totalLowestLevels = 0;
			for (let i = 0; i < pickedTeamSize; i++) {
				totalLowestLevels += teamLevels[i];
			}
			if (totalLowestLevels > maxTotalLevel) {
				const thePokemon = pickedTeamSize === team.length ?
					`all ${team.length} Pokémon` : `the ${pickedTeamSize} lowest-leveled Pokémon`;
				return [
					`The combined levels of ${thePokemon} of your team is ${totalLowestLevels}, above the format's total level limit of ${maxTotalLevel}${this.ruleTable.blame('maxtotallevel')}.`,
				];
			}

			let minTotalWithHighestLevel = teamLevels[teamLevels.length - 1];
			for (let i = 0; i < pickedTeamSize - 1; i++) {
				minTotalWithHighestLevel += teamLevels[i];
			}
			if (minTotalWithHighestLevel > maxTotalLevel) {
				return [
					`Your highest level Pokémon is unusable, because there's no way to create a team with it whose total level is less than the format's total level limit of ${maxTotalLevel}${this.ruleTable.blame('maxtotallevel')}.`,
				];
			}
		},
		onValidateRule(value) {
			const ruleTable = this.ruleTable;
			const maxTotalLevel = ruleTable.maxTotalLevel!;
			const maxTeamSize = ruleTable.pickedTeamSize || ruleTable.maxTeamSize;
			const maxTeamSizeBlame = ruleTable.pickedTeamSize ? ruleTable.blame('pickedteamsize') : ruleTable.blame('maxteamsize');
			if (maxTotalLevel >= ruleTable.maxLevel * maxTeamSize) {
				throw new Error(`A Max Total Level of ${maxTotalLevel}${ruleTable.blame('maxtotallevel')} is too high (and will have no effect) with ${maxTeamSize}${maxTeamSizeBlame} Pokémon at max level ${ruleTable.maxLevel}${ruleTable.blame('maxlevel')}`);
			}
			if (maxTotalLevel <= ruleTable.minLevel * maxTeamSize) {
				throw new Error(`A Max Total Level of ${maxTotalLevel}${ruleTable.blame('maxtotallevel')} is too low with ${maxTeamSize}${maxTeamSizeBlame} Pokémon at min level ${ruleTable.minLevel}${ruleTable.blame('minlevel')}`);
			}
		},
		// hardcoded in sim/side
	},
	minlevel: {
		effectType: 'ValidatorRule',
		name: 'Min Level',
		desc: "Minimum level of brought Pokémon",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	maxlevel: {
		effectType: 'ValidatorRule',
		name: 'Max Level',
		desc: "Maximum level of brought Pokémon (if you're using both this and Adjust Level, this will control what level moves you have access to)",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	defaultlevel: {
		effectType: 'ValidatorRule',
		name: 'Default Level',
		desc: "Default level of brought Pokémon (normally should be equal to Max Level, except Custom Games have a very high max level but still default to 100)",
		hasValue: 'positive-integer',
		// hardcoded in sim/team-validator
	},
	adjustlevel: {
		effectType: 'ValidatorRule',
		name: 'Adjust Level',
		desc: "All Pokémon will be set to exactly this level (but unlike Max Level and Min Level, it will still be able to learn moves from above this level) (when using this, Max Level is the level of the pokemon before it's level-adjusted down)",
		hasValue: 'positive-integer',
		mutuallyExclusiveWith: 'adjustleveldown',
		// hardcoded in sim/team-validator
	},
	adjustleveldown: {
		effectType: 'ValidatorRule',
		name: 'Adjust Level Down',
		desc: "Any Pokémon above this level will be set to this level (but unlike Max Level, it will still be able to learn moves from above this level)",
		hasValue: 'positive-integer',
		mutuallyExclusiveWith: 'adjustlevel',
		// hardcoded in sim/team-validator
	},
	stadiumitemsclause: {
		effectType: 'ValidatorRule',
		name: 'Stadium Items Clause',
		desc: "Bans items that are not usable in Pokemon Stadium 2.",
		banlist: ['Fast Ball', 'Friend Ball', 'Great Ball', 'Heavy Ball', 'Level Ball', 'Love Ball', 'Lure Ball', 'Master Ball', 'Moon Ball', 'Park Ball', 'Poke Ball', 'Safari Ball', 'Ultra Ball', 'Fire Stone', 'Leaf Stone', 'Moon Stone', 'Sun Stone', 'Thunder Stone', 'Upgrade', 'Water Stone', 'Mail'],
	},
	nintendocup2000movelegality: {
		effectType: 'ValidatorRule',
		name: "Nintendo Cup 2000 Move Legality",
		desc: "Prevents Pok\u00e9mon from having moves that would only be obtainable in Pok\u00e9mon Crystal.",
		// Implemented in mods/gen2/rulesets.ts
	},
	aptclause: {
		effectType: 'ValidatorRule',
		name: 'APT Clause',
		desc: "Bans the combination of Agility and partial trapping moves like Wrap.",
		banlist: ['Agility + Wrap', 'Agility + Fire Spin', 'Agility + Bind', 'Agility + Clamp'],
	},
	nintendocup1997movelegality: {
		effectType: 'ValidatorRule',
		name: "Nintendo Cup 1997 Move Legality",
		desc: "Bans move combinations on Pok\u00e9mon that weren't legal in Nintendo Cup 1997.",
		// Implemented in mods/gen1jpn/rulesets.ts
	},
	noswitching: {
		effectType: 'Rule',
		name: 'No Switching',
		desc: 'All Pok\u00e9mon are trapped (cannot switch naturally, but can as the effect of an item, move, or Ability).',
		onBegin() {
			this.add('rule', 'No Switching: All Pok\u00e9mon are trapped');
		},
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
	},
	crazyhouserule: {
		effectType: 'Rule',
		name: 'Crazyhouse Rule',
		desc: "Pok\u00e9mon you KO are added to your team and removed from the opponent's, and vice versa.",
		onValidateRule(value) {
			if (this.format.gameType === 'doubles' || this.format.gameType === 'triples') {
				throw new Error(`Crazyhouse Rule currently does not support ${this.format.gameType} battles.`);
			}
			const ruleTable = this.ruleTable;
			const maxTeamSize = ruleTable.pickedTeamSize || ruleTable.maxTeamSize;
			const numPlayers = (this.format.gameType === 'freeforall' || this.format.gameType === 'multi') ? 4 : 2;
			const potentialMaxTeamSize = maxTeamSize * numPlayers;
			if (potentialMaxTeamSize > 24) {
				throw new Error(`Crazyhouse Rule cannot be added because a team can potentially have ${potentialMaxTeamSize} Pokemon on one team, which is more than the server limit of 24.`);
			}
		},
		// In order to prevent a case of the clones, housekeeping is needed.
		// This is especially needed to make sure one side doesn't end up with too many Pokemon.
		onBeforeSwitchIn(pokemon) {
			if (this.turn < 1 || !pokemon.side.faintedThisTurn) return;
			pokemon.side.pokemon = pokemon.side.pokemon.filter(x => !(x.fainted && !x.m.outofplay));
			for (let i = 0; i < pokemon.side.pokemon.length && i < 24; i++) {
				pokemon.side.pokemon[i].position = i;
			}
		},
		onFaint(target, source, effect) {
			if (!target.m.numSwaps) {
				target.m.numSwaps = 0;
			}
			target.m.numSwaps++;
			if (effect && effect.effectType === 'Move' && source.side.pokemon.length < 24 &&
                source.side !== target.side && target.m.numSwaps < 4) {
				const hpCost = this.clampIntRange(Math.floor((target.baseMaxhp * target.m.numSwaps) / 4), 1);
				// Just in case(tm) and for Shedinja
				if (hpCost === target.baseMaxhp) {
					target.m.outofplay = true;
					return;
				}
				source.side.pokemonLeft++;
				source.side.pokemon.length++;

				// A new Pokemon is created and stuff gets aside akin to a deep clone.
				// This is because deepClone crashes when side is called recursively.
				// Until a refactor is made to prevent it, this is the best option to prevent crashes.
				const newPoke = new Pokemon(target.set, source.side);
				const newPos = source.side.pokemon.length - 1;

				const doNotCarryOver = [
					'fullname', 'side', 'fainted', 'status', 'hp', 'illusion',
					'transformed', 'position', 'isActive', 'faintQueued',
					'subFainted', 'getHealth', 'getDetails', 'moveSlots', 'ability',
				];
				for (const [key, value] of Object.entries(target)) {
					if (doNotCarryOver.includes(key)) continue;
					// @ts-ignore
					newPoke[key] = value;
				}
				newPoke.maxhp = newPoke.baseMaxhp; // for dynamax
				newPoke.hp = newPoke.baseMaxhp - hpCost;
				newPoke.clearVolatile();
				newPoke.position = newPos;
				source.side.pokemon[newPos] = newPoke;
				this.add('poke', source.side.pokemon[newPos].side.id, source.side.pokemon[newPos].details, '');
				this.add('-message', `${target.name} was captured by ${newPoke.side.name}!`);
			} else {
				target.m.outofplay = true;
			}
		},
	},
	chimera1v1rule: {
		effectType: 'Rule',
		name: 'Chimera 1v1 Rule',
		desc: "Validation and battle effects for Chimera 1v1.",
		ruleset: ['Team Preview', 'Picked Team Size = 6'],
		onValidateSet(set) {
			if (!set.item) return;
			const item = this.dex.items.get(set.item);
			if (item.itemUser && !this.ruleTable.has(`+item:${item.id}`)) {
				return [`${set.species}'s item ${item.name} is banned.`];
			}
		},
		onValidateRule() {
			const table = this.ruleTable;
			if ((table.pickedTeamSize || table.minTeamSize) < 6) {
				throw new Error(
					`Custom rules that could allow the active team size to be reduced below 6 (Min Team Size < 6, Picked Team Size < 6) could prevent the Chimera from being fully defined, and are incompatible with Chimera 1v1.`
				);
			}
			const gameType = this.format.gameType;
			if (gameType === 'doubles' || gameType === 'triples') {
				throw new Error(
					`The game type '${gameType}' cannot be 1v1 because sides can have multiple active Pok\u00e9mon, so it is incompatible with Chimera 1v1.`
				);
			}
		},
		onBeforeSwitchIn(pokemon) {
			const allies = pokemon.side.pokemon.splice(1);
			pokemon.side.pokemonLeft = 1;
			const newSpecies = this.dex.deepClone(pokemon.baseSpecies);
			newSpecies.abilities = allies[1].baseSpecies.abilities;
			newSpecies.baseStats = allies[2].baseSpecies.baseStats;
			newSpecies.bst = allies[2].baseSpecies.bst;
			pokemon.item = allies[0].item;
			pokemon.ability = pokemon.baseAbility = allies[1].ability;
			pokemon.set.evs = allies[2].set.evs;
			pokemon.set.nature = allies[2].set.nature;
			pokemon.set.ivs = allies[2].set.ivs;
			pokemon.hpType = (pokemon as any).baseHpType = allies[2].baseHpType;
			pokemon.moveSlots = (pokemon as any).baseMoveSlots = [
				...allies[3].baseMoveSlots.slice(0, 2), ...allies[4].baseMoveSlots.slice(2),
			].filter((move, index, moveSlots) => moveSlots.find(othermove => othermove.id === move.id) === move);
			// so all HP-related properties get re-initialized in setSpecies
			pokemon.maxhp = 0;
			pokemon.setSpecies(newSpecies, null);
		},
	},
	bonustyperule: {
		name: "Bonus Type Rule",
		effectType: "Rule",
		desc: `Pok&eacute;mon can be nicknamed the name of a type to have that type added onto their current ones.`,
		onBegin() {
			this.add('rule', 'Bonus Type Rule: Pok\u00e9mon can be nicknamed the name of a type to have that type added onto their current ones.');
		},
		onModifySpeciesPriority: 1,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			const typesSet = new Set(species.types);
			const bonusType = this.dex.types.get(target.set.name);
			if (bonusType.exists) typesSet.add(bonusType.name);
			return {...species, types: [...typesSet]};
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
	},
	firstbloodrule: {
		effectType: "Rule",
		name: "First Blood Rule",
		desc: `The first team to have a Pok&eacute;mon faint loses.`,
		onBegin() {
			this.add('rule', 'First Blood Rule: The first team to have a Pok\u00e9mon faint loses.');
		},
		onFaint(target) {
			this.lose(target.side);
		},
	},
	tiershiftmod: {
		effectType: "Rule",
		name: "Tier Shift Mod",
		desc: `Pok&eacute;mon below OU get their stats, excluding HP, boosted. UU/RUBL get +10, RU/NUBL get +20, NU/PUBL get +30, and PU or lower get +40.`,
		ruleset: ['Overflow Stat Mod'],
		onBegin() {
			this.add('rule', 'Tier Shift Mod: Pok\u00e9mon get stat buffs depending on their tier, excluding HP.');
		},
		onModifySpecies(species, target, source, effect) {
			if (!species.baseStats) return;
			const boosts: {[tier: string]: number} = {
				uu: 10,
				rubl: 10,
				ru: 20,
				nubl: 20,
				nu: 30,
				publ: 30,
				pu: 40,
				nfe: 40,
				lc: 40,
			};
			let tier: string = this.toID(species.tier);
			if (!(tier in boosts)) return;
			// Non-Pokemon bans in lower tiers
			if (target) {
				if (target.set.item === 'lightclay') return;
				if (['drizzle', 'drought', 'snowwarning'].includes(target.set.ability) && boosts[tier] > 20) tier = 'nubl';
			}
			const pokemon = this.dex.deepClone(species);
			pokemon.bst = pokemon.baseStats['hp'];
			const boost = boosts[tier];
			let statName: StatID;
			for (statName in pokemon.baseStats as StatsTable) {
				if (statName === 'hp') continue;
				pokemon.baseStats[statName] = this.clampIntRange(pokemon.baseStats[statName] + boost, 1, 255);
				pokemon.bst += pokemon.baseStats[statName];
			}
			return pokemon;
		},
	},
	revelationmonsmod: {
		effectType: "Rule",
		name: "Revelationmons Mod",
		desc: `The moves in the first slot(s) of a Pok&eacute;mon's set have their types changed to match the Pok&eacute;mon's type(s).`,
		onBegin() {
			this.add('rule', 'Revelationmons Mod: The first moveslots have their types changed to match the Pok\u00e9mon\'s types');
		},
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const slotIndex = species.types.length - 1;
			const problems = [];
			for (const [i, moveid] of set.moves.entries()) {
				const move = this.dex.moves.get(moveid);
				if (!this.ruleTable.isRestricted(`move:${move.id}`)) continue;
				if (i <= slotIndex) {
					problems.push(`${move.name} can't be in moveslot ${i + 1} because it's restricted from being in the first ${slotIndex + 1 > 1 ? `${slotIndex + 1} slots` : 'slot'}.`);
				}
			}
			return problems;
		},
		onModifyMove(move, pokemon, target) {
			const types = pokemon.getTypes(true);
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (noModifyType.includes(move.id)) return;
			for (const [i, type] of types.entries()) {
				if (!this.dex.types.isName(type)) continue;
				if (pokemon.moveSlots[i] && move.id === pokemon.moveSlots[i].id) move.type = type;
			}
		},
	},
	reevolutionmod: {
		effectType: "Rule",
		name: "Re-Evolution Mod",
		desc: "Pok&eacute;mon gain the stat changes they would gain from evolving again.",
		onBegin() {
			this.add('rule', 'Re-Evolution Mod: Pok\u00e9mon gain the boosts they would gain from evolving again');
		},
		onModifySpecies(species, target) {
			const newSpecies = this.dex.deepClone(species);
			if (!newSpecies.prevo) return;
			const prevoSpecies = this.dex.species.get(newSpecies.prevo);
			let statid: StatID;
			newSpecies.bst = 0;
			for (statid in prevoSpecies.baseStats) {
				const change = newSpecies.baseStats[statid] - prevoSpecies.baseStats[statid];
				newSpecies.baseStats[statid] = this.clampIntRange(newSpecies.baseStats[statid] + change, 1, 255);
				newSpecies.bst += newSpecies.baseStats[statid];
			}
			return newSpecies;
		},
	},
	brokenrecordmod: {
		effectType: "Rule",
		name: "Broken Record Mod",
		desc: `Pok&eacute;mon can hold a TR to use that move in battle.`,
		onValidateSet(set) {
			if (!set.item) return;
			const item = this.dex.items.get(set.item);
			if (!/^tr\d\d/i.test(item.name)) return;
			const moveName = item.desc.split('move ')[1].split('.')[0];
			if (set.moves.map(this.toID).includes(this.toID(moveName))) {
				return [
					`${set.species} can't run ${item.name} (${moveName}) as its item because it already has that move in its moveset.`,
				];
			}
		},
		onValidateTeam(team) {
			const trs = new Set<string>();
			for (const set of team) {
				if (!set.item) continue;
				const item = this.dex.items.get(set.item).name;
				if (!/^tr\d\d/i.test(item)) continue;
				if (trs.has(item)) {
					return [`Your team already has a Pok\u00e9mon with ${item}.`];
				}
				trs.add(item);
			}
		},
		onTakeItem(item) {
			return !/^tr\d\d/i.test(item.name);
		},
		onModifyMove(move) {
			if (move.id === 'knockoff') {
				move.onBasePower = function (basePower, source, target, m) {
					const item = target.getItem();
					if (!this.singleEvent('TakeItem', item, target.itemState, target, target, m, item)) return;
					// Very hardcode but I'd prefer to not make a mod for one damage calculation change
					if (item.id && !/^tr\d\d/i.test(item.id)) {
						return this.chainModify(1.5);
					}
				};
			} else if (move.id === 'fling') {
				move.onPrepareHit = function (target, source, m) {
					if (source.ignoringItem()) return false;
					const item = source.getItem();
					if (!this.singleEvent('TakeItem', item, source.itemState, source, source, m, item)) return false;
					if (!item.fling) return false;
					if (/^tr\d\d/i.test(item.id)) return false;
					m.basePower = item.fling.basePower;
					if (item.isBerry) {
						m.onHit = function (foe) {
							if (this.singleEvent('Eat', item, null, foe, null, null)) {
								this.runEvent('EatItem', foe, null, null, item);
								if (item.id === 'leppaberry') foe.staleness = 'external';
							}
							if (item.onEat) foe.ateBerry = true;
						};
					} else if (item.fling.effect) {
						m.onHit = item.fling.effect;
					} else {
						if (!m.secondaries) m.secondaries = [];
						if (item.fling.status) {
							m.secondaries.push({status: item.fling.status});
						} else if (item.fling.volatileStatus) {
							m.secondaries.push({volatileStatus: item.fling.volatileStatus});
						}
					}
					source.addVolatile('fling');
				};
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				const item = pokemon.getItem();
				if (/^tr\d\d/i.test(item.name)) {
					const move = this.dex.moves.get(item.desc.split('move ')[1].split('.')[0]);
					pokemon.moveSlots = (pokemon as any).baseMoveSlots = [
						...pokemon.baseMoveSlots, {
							id: move.id,
							move: move.name,
							pp: move.pp * 8 / 5,
							maxpp: move.pp * 8 / 5,
							target: move.target,
							disabled: false,
							disabledSource: '',
							used: false,
						},
					];
				}
			}
		},
	},
	categoryswapmod: {
		effectType: 'Rule',
		name: 'Category Swap Mod',
		desc: `All physical moves become special, and all special moves become physical.`,
		onBegin() {
			this.add('rule', 'Category Swap Mod: All physical moves become special, and vice versa');
		},
		onModifyMove(move, pokemon, target) {
			if (move.category === "Status") return;

			if (move.category === "Physical") {
				move.category = "Special";
			} else if (move.category === "Special") {
				move.category = "Physical";
			}

			switch (move.id) {
			case 'doomdesire': {
				move.onTry = function (source, subtarget) {
					if (!subtarget.side.addSlotCondition(subtarget, 'futuremove')) return false;
					Object.assign(subtarget.side.slotConditions[subtarget.position]['futuremove'], {
						move: 'doomdesire',
						source: source,
						moveData: {
							id: 'doomdesire',
							name: "Doom Desire",
							accuracy: 100,
							basePower: 140,
							category: "Physical",
							priority: 0,
							flags: {},
							effectType: 'Move',
							isFutureMove: true,
							type: 'Steel',
						},
					});
					this.add('-start', source, 'Doom Desire');
					return this.NOT_FAIL;
				};
				break;
			}
			case 'futuresight': {
				move.onTry = function (source, subtarget) {
					if (!subtarget.side.addSlotCondition(subtarget, 'futuremove')) return false;
					Object.assign(subtarget.side.slotConditions[subtarget.position]['futuremove'], {
						duration: 3,
						move: 'futuresight',
						source: source,
						moveData: {
							id: 'futuresight',
							name: "Future Sight",
							accuracy: 100,
							basePower: 120,
							category: "Physical",
							priority: 0,
							flags: {},
							ignoreImmunity: false,
							effectType: 'Move',
							isFutureMove: true,
							type: 'Psychic',
						},
					});
					this.add('-start', source, 'move: Future Sight');
					return this.NOT_FAIL;
				};
				break;
			}
			// Moves with dynamic categories will always be physical if not special-cased
			case 'lightthatburnsthesky':
			case 'photongeyser': {
				move.category = 'Special';
				if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
				break;
			}
			case 'shellsidearm': {
				if (!target) return;
				move.category = 'Special';
				const atk = pokemon.getStat('atk', false, true);
				const spa = pokemon.getStat('spa', false, true);
				const def = target.getStat('def', false, true);
				const spd = target.getStat('spd', false, true);
				const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
				const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
				if (physical > special || (physical === special && this.random(2) === 0)) {
					move.category = 'Physical';
					move.flags.contact = 1;
				}
				break;
			}
			}
		},
	},
};
