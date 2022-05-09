//https://essentialsdocs.fandom.com/wiki/Function_codes



function priority(PKMN1,PKMN2,move1,move2,field1,field2) {
    prio1 = move1.priority;
    prio2 = move2.priority;
    speed1 = PKMN1.currstats[5];
    speed2 = PKMN2.currstats[5];

    //Pokemon1 speed/prio change
    if (move1.kind == 'Status' && PKMN1.ability == 'Prankster' && PKMN2.type1 != 'Dark' && PKMN2.type2 != 'Dark') {
        prio1 += 1;
    }
    if (move1.type == 'Flying' && PKMN1.ability == 'Gale Wings') {
        prio1 += 1;
    }

    //Pokemon1 speed/prio change
    if (move2.kind == 'Status' && PKMN2.ability == 'Prankster' && PKMN1.type1 != 'Dark' && PKMN1.type2 != 'Dark') {
        prio2 += 1;
    }
    if (move2.type == 'Flying' && PKMN2.ability == 'Gale Wings') {
        prio2 += 1;
    }
    if (field2.nonrem.includes('Tailwind')) {
        speed2 = 2 * speed2;
    }
    if (PKMN2.status == 'paralyze' && PKMN2.ability != 'Quick Feet') {
        speed2 = speed2/2;
    }
    if (field2.nonrem.includes('Trick Room')) {
        speed2 = floor(10000/speed1);
    }
    if (field2.weather == 'rain' && PKMN2.ability == 'Swift Swim') {
        speed2 = 2 * speed2;
    }
    if (field2.weather == 'sun' && PKMN2.ability == 'Chlorophyl') {
        speed2 = 2 * speed2;
    }
    if (field2.weather == 'sandstorm' && PKMN2.ability == 'Sand Rush'){
        speed2 = 2 * speed2;
    }
    if (field2.weather == 'hail' && PKMN2.ability == 'Slush Rush'){
        speed2 = 2 * speed2;
    }
    if (PKMN2.status != 'none' && PKMN2.ability == 'Quick Feet') {
        speed2 = 2 * speed2;
    }

    //choose who goes first
    if ( prio1 > prio2) {
        return 1;
    }
    else if (prio1 < prio2) {
        return 2;
    }
    else {
        if (speed1 > speed2) {
            return 1;
        }
        else if (speed1 < speed2) {
            return 2;
        } 
        else {
            randprio = Math.random();
            if (randprio < 0.5) {
                return 1;
            }
            else {
                return 2;
            }
        }
    }
}


function battleturn(P1,P2,P1base,P2base,f1,f2,m1,rm,MAX1,MAX2,no) {
    [P1,P1base] = calculatestats(P1,P1base,0,no,P2,P2base);
    [P2,P2base] = calculatestats(P2,P2base,0,no%2+1,P2,P2base);
    play1 = preturn(P1,P2,f1,f2);

    if (m1 == 'none') {
        play1 = 0;
    }

    if (play1 == 1) {
        [P1,P1base] = calculatestats(P1,P1base,0,no,P2,P2base);
        [P2,P2base] = calculatestats(P2,P2base,0,no%2+1,P2,P2base);
        P1.movePP[rm] -= 1;
        chatlog += P1.nickname + ' used ' + m1.name
        if (m1.targets != "10") {
            chatlog += ' against ' + P2.nickname + '. <br>'
        } 
        else {
            chatlog += '. <br>'
        }
        updatechat()
        ret1 = calculatedamage(P1,P2,P2base.defbase,P2base.spdefbase,m1,f1,f2,MAX1,MAX2);
        dmg1 = ret1[0];
        succ1 = ret1[1];
        array = movesecondary(P1,P2,P1base,P2base,MAX1,MAX2,m1,f1,f2,succ1);
        P1 = array[0];
        P2 = array[1];
        if (P2.currstats[0] == MAX2 && P2.item == 'Focus Sash' && dmg1 >= MAX2) {
            chatlog += P2.nickname + ' survived due to its focus sash. <br>'
            P2.currstats[0] = 1;
        }
        else {
            P2.currstats[0] -= dmg1;
            P2.hpperc -= Math.floor(10*dmg1/MAX2*100)/10;
        }
        if (dmg1 != 0 && succ1 != 0) {
            chatlog += P1.nickname + ' dealt ' + Math.floor(10*dmg1/MAX2*100)/10 + '%  damage to ' + P2.nickname + "<br>" 
        }
        chatlog += '<br>'
        updatechat()
    }
    [P1,P1base] = calculatestats(P1,P1base,0,no,P2,P2base);
    [P2,P2base] = calculatestats(P2,P2base,0,no%2+1,P2,P2base);
    array = []
    array.push(P1,P2)
    return array;
}



function randomizeteam(fullrand) {

    fullbox1 = [];
    fullbox2 = [];
    fullboxx = [ [[],[],[],[],[],[]] , [[],[],[],[],[],[]] ];
    
    for (let j=0; j<2; j++) {
        for (let i=0; i<6; i++) {
            let basis = {
                nickname: 'none',
                species: 'none',
                gender: 'none',
                type1: 'none',
                type2: 'none',
                level: 100,
                ability: 'none',
                nature: 'none',
                status: 'none',
                status2: [],
                IV: [31,31,31,31,31,31],
                EV: [0,0,0,0,0,0],
                stages: [0,0,0,0,0,0,0,0],
                hpperc: 100,
                currstats: [1,1,1,1,1,1],
                moveset: ['none','none','none','none'],
                movePP: [10,10,10,10],
                locked: -1
            }

            //randomselect
            pokename1no = Math.floor(Math.random()*legal_pokemon.length) + 1;
            basis.species = legal_pokemon[pokename1no];

            basis.nickname = legal_pokemon[pokename1no];

            //ability
            ability1no = Math.floor(Math.random()*legal_abilities.length);
            basis.ability = legal_abilities[ability1no];

            var Pokemonchosen = legal_pokemon[pokename1no];
            var Pokemonstats = myFunction(Pokemonchosen);
            let stab1moves = [];
            let stab2moves = [];
            let coveragemoves = [];
            let statusmoves = [];
            //MOVES
            for (let moveno=0; moveno<legal_moves.length; moveno++) {
                movetype = legal_moves[moveno][5][0] + legal_moves[moveno][5].slice(1).toLowerCase();
                if (parseInt(Pokemonstats.atkbase) > parseInt(Pokemonstats.spatkbase) ){
                    if (legal_moves[moveno][6] == 'Physical' && movetype == Pokemonstats.type1 && parseInt(legal_moves[moveno][4]) > 40) {
                        stab1moves.push(legal_moves[moveno][2]);
                    }
                    if (legal_moves[moveno][6] == 'Physical' && movetype != Pokemonstats.type1 && movetype != Pokemonstats.type2 && parseInt(legal_moves[moveno][4]) > 40) {
                        coveragemoves.push(legal_moves[moveno][2]);
                    }
                    if (legal_moves[moveno][6] == 'Physical' && movetype == Pokemonstats.type2 && parseInt(legal_moves[moveno][4]) > 40) {
                        stab2moves.push(legal_moves[moveno][2]);
                    }
                    if (legal_moves[moveno][6] == 'Status') {
                        statusmoves.push(legal_moves[moveno][2]);
                    }
                }
                else {
                    if (legal_moves[moveno][6] == 'Special' && movetype == Pokemonstats.type2 && parseInt(legal_moves[moveno][4]) > 40) {
                        stab2moves.push(legal_moves[moveno][2]);
                    }
                    if (legal_moves[moveno][6] == 'Special' && movetype == Pokemonstats.type1 && parseInt(legal_moves[moveno][4]) > 40) {
                        stab1moves.push(legal_moves[moveno][2]);
                    }
                    if (legal_moves[moveno][6] == 'Special' && movetype != Pokemonstats.type1 && movetype != Pokemonstats.type2 && parseInt(legal_moves[moveno][4]) > 40) {
                        coveragemoves.push(legal_moves[moveno][2]);
                    }
                    if (legal_moves[moveno][6] == 'Status') {
                        statusmoves.push(legal_moves[moveno][2]);
                    }
                }
            }
            
            moveboxx1 = [];

            if (stab1moves.length < 2) {
                let covmoves = coveragemoves
                let shufcov = covmoves
                    .map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
                moveboxx1 = [];
                move14no = Math.floor(Math.random()*statusmoves.length);

                moveboxx1.push(shufcov[0]);
                moveboxx1.push(shufcov[1]);
                moveboxx1.push(shufcov[2]);
                moveboxx1.push(statusmoves[move14no]);
            }
            else {
                let s1moves = stab1moves
                let shufs1 = s1moves
                    .map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
                moveboxx1.push(shufs1[0]);

                if (Pokemonstats.type2 == 'none' || stab2moves.length < 2) {
                    moveboxx1.push(shufs1[1])
                }
                else {
                    move12no = Math.floor(Math.random()*stab2moves.length);
                    moveboxx1.push(stab2moves[move12no]);
                }
                move13no = Math.floor(Math.random()*coveragemoves.length);
                moveboxx1.push(coveragemoves[move13no]);
                move14no = Math.floor(Math.random()*statusmoves.length);
                moveboxx1.push(statusmoves[move14no]);
 
            }

            basis.moveset = moveboxx1;
            movebox1 = findmovestats (basis.moveset);
            ppset1 = []

            for (let ii=0; ii<4; ii++) {
                ppset1.push(movebox1[ii].PP)
            }

            basis.movePP = ppset1;

            //ITEM
            item1no = Math.floor(Math.random()*legal_items.length);
            basis.item = legal_items[item1no];


            //EVS
            EVchoices = [0,1,2,3,4,5]
            maxEVall = []

            pokestatss = {
                atkbase: Pokemonstats.atkbase,
                defbase: Pokemonstats.defbase,
                spatkbase: Pokemonstats.spatkbase,
                spdefbase: Pokemonstats.spdefbase,
                speedbase: Pokemonstats.speedbase
            }

            basearray = ['atkbase','defbase','spatkbase','spdefbase','speedbase']
            let sortable = [];
            for (var stat in pokestatss) {
                sortable.push([stat, pokestatss[stat]]);
            }

            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });

            maxEV1 = Math.floor(Math.random()*6);
            EVchoices.slice(EVchoices[maxEV1],1);
            maxEVall.push(EVchoices[maxEV1])

            maxEV2 = Math.floor(Math.random()*5);
            EVchoices.slice(EVchoices[maxEV2],1);
            maxEVall.push(EVchoices[maxEV2])

            maxEV3 = Math.floor(Math.random()*4);
            maxEVall.push(EVchoices[maxEV3])

            basis.EV = [0,0,0,0,0,0];
            basis.EV[basearray.indexOf(sortable[0][0])+1] = 252;
            basis.EV[basearray.indexOf(sortable[1][0])+1] = 252;
            basis.EV[0] = 4;

            //NATURE

            var natureeffect = [[1,1,1,1,1],[1.1,0.9,1,1,1],[1.1,1,1,1,0.9],[1.1,1,0.9,1,1],[1.1,1,1,0.9,1],
                           [0.9,1.1,1,1,1],[1,1,1,1,1],[1,1.1,1,1,0.9],[1,1.1,0.9,1,1],[1,1.1,1,0.9,1],
                           [0.9,1,1,1,1.1],[1,0.9,1,1,1.1],[1,1,1,1,1],[1,1,0.9,1,1.1],[1,1,1,0.9,1.1],
                           [0.9,1,1.1,1,1],[1,0.9,1.1,1,1],[1,1,1.1,1,0.9],[1,1,1,1,1],[1,1,1.1,0.9,1],
                           [0.9,1,1,1.1,1],[1,0.9,1,1.1,1],[1,1,1,1.1,0.9],[1,1,0.9,1.1,1],[1,1,1,1,1]];

            desiredarr = [1,1,1,1,1];
            desiredarr[basearray.indexOf(sortable[0][0])] = 1.1;
            desiredarr[basearray.indexOf(sortable[4][0])] = 0.9;
            for (ii=0; ii<25; ii++) {
                if (natureeffect[ii][basearray.indexOf(sortable[4][0])] == 0.9 && natureeffect[ii][basearray.indexOf(sortable[0][0])] == 1.1) {
                    natureno = ii;
                    break;
                }
            }
            basis.nature = natures[natureno];

            if (j==0) {
                if (basis.species.toLowerCase() in mistakesdict) {
                    item = basis.species.toLowerCase();
                    document.getElementById("switch" + (i+1) + "button").innerHTML = mistakesdict[item][0].toUpperCase() + mistakesdict[item].slice(1)
                    document.getElementById("switch" + (i+1) + "image").src = "https://play.pokemonshowdown.com/sprites/gen5/" + mistakesdict[item] + ".png"
                }
                else {
                    document.getElementById("switch" + (i+1) + "button").innerHTML = basis.species;
                    document.getElementById("switch" + (i+1) + "image").src = "https://play.pokemonshowdown.com/sprites/gen5/" + basis.species.toLowerCase() + ".png"
                }
                statss = "HP%: 100% <br> Nature: " + basis.nature + " <br> Ability: " + basis.ability + " <br> Item: " + basis.item + " <br> Status: none <br>" 
                document.getElementById("switch" + (i+1) + "stats").innerHTML = statss;
            }

            //level balance

            let stattotal = parseInt(Pokemonstats.atkbase) + parseInt(Pokemonstats.defbase) + parseInt(Pokemonstats.spatkbase) + parseInt(Pokemonstats.spdefbase) + parseInt(Pokemonstats.speedbase);
            let balancelvl = Math.floor((750-stattotal)/10) + 50;
            if (balancelvl > 100) {
                balancelvl = 100;
            }

            basis.level = balancelvl


            fullboxx[j][i] = Object.assign({}, basis);
        }
        
    }
    
    console.log(fullboxx)
    return fullboxx;

}