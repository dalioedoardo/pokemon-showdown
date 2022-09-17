export const Conditions: {[k: string]: ConditionData} = {
	
	//Harzen 10/09/2022
	boss: {
		name: 'boss',
		// this is a volatile status [invisible]
	},

	
	//---NILOX' CONDITIONS:
	
	//Harzen 11/09/2022 - questo è il misero stato di chi disturba la Boundless Forest con la sua arroganza
	insolentfool: {
		name: 'insolentfool',
		// this is a volatile status [invisible]
		onStart(target, source, sourceEffect) {
			//this.add('-start', target, 'insolentfool'); //commented, invisible for now
		},
		onResidual(pokemon){
			if(this.randomChance(75, 100)){
				this.damage(pokemon.baseMaxhp);
			}
			else{
				pokemon.removeVolatile('insolentfool');
				//this.add('-end', pokemon, 'insolentfool');
			}
		}
	},
	
	royalpain: {
		name: 'royalpain',
		// this is a volatile status [invisible]
		onStart(target, source, sourceEffect) {
			if(!target.getTypes().includes('Grass')){
				//this.add('-start', target, 'royalpain');
			}
		},
		onResidual(pokemon){
			if(pokemon.positiveBoosts()===0){
				pokemon.removeVolatile('royalpain');
				//this.add('-end', pokemon, 'royalpain');		
			}
			else if(this.randomChance(50, 100)){
				this.damage(pokemon.baseMaxhp);
			}
		}
	},
	
	ambusher: {
		name: 'ambusher',
		// this is a volatile status [invisible]
		onStart(target, source, sourceEffect){
			if(target.ability !== 'contrary'){
				this.boost({def: 2}, target);
				this.boost({spd: 2}, target);
			}
			else{
				this.boost({def: -2}, target);
				this.boost({spd: -2}, target);
			}
			
			for (const opponent of target.adjacentFoes()) {
				if(opponent.ability !== 'contrary'){
					this.boost({atk: -2}, opponent);
					this.boost({spa: -2}, opponent);
					this.boost({accuracy: -2}, opponent);
				}
				else{
					this.boost({atk: 2}, opponent);
					this.boost({spa: 2}, opponent);
					this.boost({accuracy: 2}, opponent);
				}
			}
		},
		onResidual(pokemon){
			pokemon.removeVolatile('ambusher');
			if(pokemon.ability !== 'contrary'){
				this.boost({def: -2}, pokemon);
				this.boost({spd: -2}, pokemon);
			}
			else{
				this.boost({def: 2}, pokemon);
				this.boost({spd: 2}, pokemon);
			}
			
			for (const opponent of pokemon.adjacentFoes()) {
				if(opponent.ability !== 'contrary'){
					this.boost({atk: 2}, opponent);
					this.boost({spa: 2}, opponent);
					this.boost({accuracy: 2}, opponent);
				}
				else{
					this.boost({atk: -2}, opponent);
					this.boost({spa: -2}, opponent);
					this.boost({accuracy: -2}, opponent);
				}
			}
		}
	},
	
	
	
	//---LEO'S CONDITIONS:
	
	psychicatmosphere: {
		name: 'psychicatmosphere',
		// this is a volatile status [invisible]
		onTryHit(target, source, move) {
			if (move && (move.priority <= 0.1 || move.target === 'self')) {
				return;
			}
			if (target.isSemiInvulnerable() || target.isAlly(source)) return;
			if(this.field.terrain==='psychicterrain' && !target.isGrounded() && move.priority>0){
				this.hint("This Psychic Terrain also affects the atmosphere!");
				return null;
			}
		}
	},
	
	freshminded: {
		name: 'freshminded',
		// this is a volatile status [invisible]
		onFractionalPriority(priority, pokemon) {
			if (priority <= 0) {
				return 0.1;
			}
		},
	},
	
	abundance: {
		name: 'abundance',
		// this is a volatile status [invisible]
		onUpdate(pokemon) {
			if(this.effectState.turn != this.turn) {
				if(this.randomChance(75,100)){
					this.heal(pokemon.baseMaxhp*3/4);
				}
				this.effectState.turn = this.turn;
			}
		},
	},
	
	ancestralprotection: {
		name: 'ancestralprotection',
		// this is a volatile status [invisible]
		onStart(target, source, sourceEffect) {
			if(this.turn>2){
				pokemon.removeVolatile('ancestralprotection');
			}
		},
		onUpdate(pokemon){
			if(this.turn>2 && pokemon.volatiles['ancestralprotection']){
				pokemon.removeVolatile('ancestralprotection');
			}
		}
	},
	
	mindfulness: {
		name: 'mindfulness',
		// this is a volatile status [invisible]
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectState.target)) return 0;
		},
	},
	
	
	//---ELIA'S CONDITIONS:
	kniferainfall: {
		name: 'KnifeRainfall',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Steel') {
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'KnifeRainfall', '', '');
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'KnifeRainfall', '[upkeep]');
			if (this.field.isWeather('kniferainfall')) this.eachEvent('Weather');
		},
		onWeather(target) {
			if(target.getTypes().includes('Steel')){
				this.heal(target.baseMaxhp/8)
			}
			else{
				this.damage(target.baseMaxhp/8);			
			}
		},
	},
	
	
	//---PICCIA'S CONDITIONS:
	
	//this affects ghost type mons
	quantumquirk: {
		name: 'quantumquirk',
		onStart(target, source, sourceEffect) {
			if(target.ability !== 'contrary'){
				this.boost({evasion: 6}, target);
			}
			else{
				this.boost({def: -6}, target);
			}
		},
		onEnd(target){
			if(target.ability !== 'contrary'){
				this.boost({evasion: -6}, target);
			}
			else{
				this.boost({def: 6}, target);
			}
		},
	},
	
	//this affects non-ghost type mons
	quantumstate: {
		name: 'quantumstate',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			//Harzen 17/09/2022 - in statuses voglio memorizzare:
			//[{name: <statusid>, params: {time: <thetime>, startTime: <theStartTime>, stage: <theStage>}}, {...}, {...}]
			this.effectState.statuses = [];
			this.add('-status', target, 'quantumstate', '[from] rule: Quantum Festival');
		},
		onSetStatus(status, target, source, effect) {
			//inserita in sim/pokemon.ts nella funzione setStatus(...)
		},
		onSwitchIn(pokemon) {
			if(pokemon.status === 'quantumstate' && pokemon.statusState.statuses.map(({ name }) => name).includes('tox')){
				const i = pokemon.statusState.statuses.findIndex((st) => st.name=="tox");
				this.effectState.statuses[i].params.stage = 0;	
			}
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			if(pokemon.status === 'quantumstate' && pokemon.statusState.statuses.map(({ name }) => name).includes('brn')){
				this.damage(pokemon.baseMaxhp / 16);
			}
			
			if(pokemon.status === 'quantumstate' && pokemon.statusState.statuses.map(({ name }) => name).includes('psn')){
				this.damage(pokemon.baseMaxhp / 8);
			}
			
			if(pokemon.status === 'quantumstate' && pokemon.statusState.statuses.map(({ name }) => name).includes('tox')){
				const i = pokemon.statusState.statuses.findIndex((st) => st.name=="tox");
				if (this.effectState.statuses[i].params.stage < 15) {
					this.effectState.statuses[i].params.stage++;
				}
				this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.statuses[i].params.stage);
			}
		},
		onModifySpe(spe, pokemon) {
			if(pokemon.status === 'quantumstate' && pokemon.statusState.statuses.map(({ name }) => name).includes('par')){
				// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
				spe = this.finalModify(spe);
				if (!pokemon.hasAbility('quickfeet')) {
					spe = Math.floor(spe * 50 / 100);
				}
				return spe;
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			
			let toBeReturned : string = '';
			
			if(pokemon.status === 'quantumstate' && pokemon.statusState.statuses.map(({ name }) => name).includes('slp')){
				
				const i = pokemon.statusState.statuses.findIndex((st) => st.name=="slp");
				
				if (pokemon.hasAbility('earlybird')) {
					pokemon.statusState.statuses[i].params.time--;
				}
				pokemon.statusState.statuses[i].params.time--;
				if (pokemon.statusState.statuses[i].params.time <= 0) {
					//rimuovo la condizione di slp:
					pokemon.statusState.statuses.splice(i, 1);
				}
				else{
					if (!move.sleepUsable) {
						this.add('cant', pokemon, 'quantumstate');
						toBeReturned='false';
					}
				}
			}
			
			if(pokemon.status === 'quantumstate' && pokemon.statusState.statuses.map(({ name }) => name).includes('par')){
				if (this.randomChance(1, 4)) {
					this.add('cant', pokemon, 'quantumstate');
					toBeReturned = 'false';
				}
			}
			
			if(pokemon.status === 'quantumstate' && pokemon.statusState.statuses.map(({ name }) => name).includes('frz')){	
				
				const i = pokemon.statusState.statuses.findIndex((st) => st.name=="frz");
				
				if (!move.flags['defrost']){
					if (this.randomChance(1, 5)) {
						//rimuovo la condizione di frz:
						pokemon.statusState.statuses.splice(i, 1);
					}
					else{
						this.add('cant', pokemon, 'quantumstate');
						toBeReturned = 'false';
					}
				}
			}
			
			if(toBeReturned==='false'){
				return false;	
			}
			else{
				return;
			}
		},
		onModifyMove(move, pokemon) {
			if(pokemon.status === 'quantumstate' && pokemon.statusState.statuses.map(({ name }) => name).includes('frz')){	
				const i = pokemon.statusState.statuses.findIndex((st) => st.name=="frz");
				if (move.flags['defrost']) {
					//rimuovo la condizione di frz:
					pokemon.statusState.statuses.splice(i, 1);	
				}
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if(target.status === 'quantumstate' && target.statusState.statuses.map(({ name }) => name).includes('frz')){	
				const i = target.statusState.statuses.findIndex((st) => st.name=="frz");
				if (move.thawsTarget) {
					//rimuovo la condizione di frz:
					target.statusState.statuses.splice(i, 1);	
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if(target.status === 'quantumstate' && target.statusState.statuses.map(({ name }) => name).includes('frz')){	
				const i = target.statusState.statuses.findIndex((st) => st.name=="frz");
				if (move.type === 'Fire' && move.category !== 'Status') {
					//rimuovo la condizione di frz:
					target.statusState.statuses.splice(i, 1);	
				}
			}
		},	
	},
	
	
	
	
	
	
	
	
	
	
	
	
	brn: {
		name: 'brn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'flameorb') {
				this.add('-status', target, 'brn', '[from] item: Flame Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 50 / 100);
			}
			return spe;
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4)) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},
	
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost']) return;
			if (this.randomChance(1, 5)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.clearStatus();
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.thawsTarget) {
				target.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
	},
	psn: {
		name: 'psn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'psn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'psn');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	tox: {
		name: 'tox',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectState.stage = 0;
			if (sourceEffect && sourceEffect.id === 'toxicorb') {
				this.add('-status', target, 'tox', '[from] item: Toxic Orb');
			} else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'tox');
			}
		},
		onSwitchIn() {
			this.effectState.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.stage < 15) {
				this.effectState.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
		},
	},
	confusion: {
		name: 'confusion',
		// this is a volatile status
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.id === 'lockedmove') {
				this.add('-start', target, 'confusion', '[fatigue]');
			} else {
				this.add('-start', target, 'confusion');
			}
			this.effectState.time = this.random(2, 6);
			
			
			if(sourceEffect.id === 'solarmiragerule'){
				this.effectState.solarmiragerule = true;
			}
			else{
				this.effectState.solarmiragerule = false;
			}
		},
		onEnd(target) {
			this.add('-end', target, 'confusion');
		},
		onBeforeMovePriority: 3,
		onBeforeMove(pokemon) {
			
			//Harzen 08/09/2022
			if(!this.effectState.solarmiragerule){
				pokemon.volatiles['confusion'].time--;
			}
			
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			if (!this.randomChance(33, 100)) {
				return;
			}
			this.activeTarget = pokemon;
			
			if(this.effectState.solarmiragerule){
				const damage = this.actions.getConfusionDamage(pokemon, 80);
				if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
				const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
				this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			}
			else{
				const damage = this.actions.getConfusionDamage(pokemon, 40);
				if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
				const activeMove = {id: this.toID('confused'), effectType: 'Move', type: '???'};
				this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			}

			return false;
		},
	},
	solarmiragerule: {
		name: 'solarmiragerule',
		onStart(target, source, effect) {
		        target.addVolatile('confusion');
		},
	},
	flinch: {
		name: 'flinch',
		duration: 1,
		onBeforeMovePriority: 8,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'flinch');
			this.runEvent('Flinch', pokemon);
			return false;
		},
	},
	trapped: {
		name: 'trapped',
		noCopy: true,
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onStart(target) {
			this.add('-activate', target, 'trapped');
		},
	},
	trapper: {
		name: 'trapper',
		noCopy: true,
	},
	partiallytrapped: {
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
		},
	},
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		name: 'lockedmove',
		duration: 2,
		onResidual(target) {
			if (target.status === 'slp') {
				// don't lock, and bypass confusion for calming
				delete target.volatiles['lockedmove'];
			}
			this.effectState.trueDuration--;
		},
		onStart(target, source, effect) {
			this.effectState.trueDuration = this.random(2, 4);
			this.effectState.move = effect.id;
		},
		onRestart() {
			if (this.effectState.trueDuration >= 2) {
				this.effectState.duration = 2;
			}
		},
		onEnd(target) {
			if (this.effectState.trueDuration > 1) return;
			target.addVolatile('confusion');
		},
		onLockMove(pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.effectState.move;
		},
	},
	twoturnmove: {
		// Skull Bash, SolarBeam, Sky Drop...
		name: 'twoturnmove',
		duration: 2,
		onStart(attacker, defender, effect) {
			// ("attacker" is the Pokemon using the two turn move and the Pokemon this condition is being applied to)
			this.effectState.move = effect.id;
			attacker.addVolatile(effect.id);
			// lastMoveTargetLoc is the location of the originally targeted slot before any redirection
			// note that this is not updated for moves called by other moves
			// i.e. if Dig is called by Metronome, lastMoveTargetLoc will still be the user's location
			let moveTargetLoc: number = attacker.lastMoveTargetLoc!;
			if (effect.sourceEffect && this.dex.moves.get(effect.id).target === 'normal') {
				// this move was called by another move such as Metronome
				// and needs a random target to be determined this turn
				// it will already have one by now if there is any valid target
				// but if there isn't one we need to choose a random slot now
				if (defender.fainted) {
					defender = this.sample(attacker.foes(true));
				}
				moveTargetLoc = attacker.getLocOf(defender);
			}
			attacker.volatiles[effect.id].targetLoc = moveTargetLoc;
			this.attrLastMove('[still]');
			// Run side-effects normally associated with hitting (e.g., Protean, Libero)
			this.runEvent('PrepareHit', attacker, defender, effect);
		},
		onEnd(target) {
			target.removeVolatile(this.effectState.move);
		},
		onLockMove() {
			return this.effectState.move;
		},
		onMoveAborted(pokemon) {
			pokemon.removeVolatile('twoturnmove');
		},
	},
	choicelock: {
		name: 'choicelock',
		noCopy: true,
		onStart(pokemon) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!this.activeMove.id || this.activeMove.hasBounced || this.activeMove.sourceEffect === 'snatch') return false;
			this.effectState.move = this.activeMove.id;
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] &&
				move.id !== this.effectState.move && move.id !== 'struggle'
			) {
				// Fails unless the Choice item is being ignored, and no PP is lost
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onDisableMove(pokemon) {
			if (!pokemon.getItem().isChoice || !pokemon.hasMove(this.effectState.move)) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (pokemon.ignoringItem() || pokemon.volatiles['dynamax']) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectState.move) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
	},
	mustrecharge: {
		name: 'mustrecharge',
		duration: 2,
		onBeforeMovePriority: 11,
		onBeforeMove(pokemon) {
			this.add('cant', pokemon, 'recharge');
			pokemon.removeVolatile('mustrecharge');
			pokemon.removeVolatile('truant');
			return null;
		},
		onStart(pokemon) {
			this.add('-mustrecharge', pokemon);
		},
		onLockMove: 'recharge',
	},
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectState;
			// time's up; time to hit! :D
			const move = this.dex.moves.get(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(target.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			this.add('-end', target, 'move: ' + move.name);
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			if (data.source.hasAbility('adaptability') && this.gen >= 6) {
				data.moveData.stab = 2;
			}
			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.actions.trySpreadMoveHit([target], data.source, hitMove, true);
			if (data.source.isActive && data.source.hasItem('lifeorb') && this.gen >= 5) {
				this.singleEvent('AfterMoveSecondarySelf', data.source.getItem(), data.source.itemState, data.source, target, data.source.getItem());
			}
			this.activeMove = null;

			this.checkWin();
		},
	},
	healreplacement: {
		// this is a slot condition
		name: 'healreplacement',
		onStart(target, source, sourceEffect) {
			this.effectState.sourceEffect = sourceEffect;
			this.add('-activate', source, 'healreplacement');
		},
		onSwitchInPriority: 1,
		onSwitchIn(target) {
			if (!target.fainted) {
				target.heal(target.maxhp);
				this.add('-heal', target, target.getHealth, '[from] move: ' + this.effectState.sourceEffect, '[zeffect]');
				target.side.removeSlotCondition(target, 'healreplacement');
			}
		},
	},
	stall: {
		// Protect, Detect, Endure counter
		name: 'stall',
		duration: 2,
		counterMax: 729,
		onStart() {
			this.effectState.counter = 3;
		},
		onStallMove(pokemon) {
			// this.effectState.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectState.counter || 1;
			this.debug("Success chance: " + Math.round(100 / counter) + "%");
			const success = this.randomChance(1, counter);
			if (!success) delete pokemon.volatiles['stall'];
			return success;
		},
		onRestart() {
			if (this.effectState.counter < (this.effect as Condition).counterMax!) {
				this.effectState.counter *= 3;
			}
			this.effectState.duration = 2;
		},
	},
	gem: {
		name: 'gem',
		duration: 1,
		affectsFainted: true,
		onBasePowerPriority: 14,
		onBasePower(basePower, user, target, move) {
			this.debug('Gem Boost');
			return this.chainModify([5325, 4096]);
		},
	},

	// weather is implemented here since it's so important to the game

	raindance: {
		name: 'RainDance',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	primordialsea: {
		name: 'PrimordialSea',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'PrimordialSea', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'PrimordialSea', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sunnyday: {
		name: 'SunnyDay',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('heatrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'SunnyDay', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	desolateland: {
		name: 'DesolateLand',
		effectType: 'Weather',
		duration: 0,
		onTryMovePriority: 1,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Water' && move.category !== 'Status') {
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DesolateLand', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	sandstorm: {
		name: 'Sandstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		// This should be applied directly to the stat before any of the other modifiers are chained
		// So we give it increased priority.
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			if (this.field.isWeather('sandstorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	hail: {
		name: 'Hail',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Hail', '[upkeep]');
			if (this.field.isWeather('hail')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	deltastream: {
		name: 'DeltaStream',
		effectType: 'Weather',
		duration: 0,
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-activate', '', 'deltastream');
				return 0;
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DeltaStream', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DeltaStream', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},

	dynamax: {
		name: 'Dynamax',
		noCopy: true,
		onStart(pokemon) {
			this.effectState.turns = 0;
			pokemon.removeVolatile('minimize');
			pokemon.removeVolatile('substitute');
			if (pokemon.volatiles['torment']) {
				delete pokemon.volatiles['torment'];
				this.add('-end', pokemon, 'Torment', '[silent]');
			}
			if (['cramorantgulping', 'cramorantgorging'].includes(pokemon.species.id) && !pokemon.transformed) {
				pokemon.formeChange('cramorant');
			}
			this.add('-start', pokemon, 'Dynamax', pokemon.gigantamax ? 'Gmax' : '');
			if (pokemon.baseSpecies.name === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 1.5 + (pokemon.dynamaxLevel * 0.05);

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			this.add('-block', pokemon, 'Dynamax');
			return null;
		},
		onResidualPriority: -100,
		onResidual() {
			this.effectState.turns++;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.baseSpecies.name === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},

	// Arceus and Silvally's actual typing is implemented here.
	// Their true typing for all their formes is Normal, and it's only
	// Multitype and RKS System, respectively, that changes their type,
	// but their formes are specified to be their corresponding type
	// in the Pokedex, so that needs to be overridden.
	// This is mainly relevant for Hackmons Cup and Balanced Hackmons.
	arceus: {
		name: 'Arceus',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	silvally: {
		name: 'Silvally',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'rkssystem' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
};
