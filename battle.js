

function updatescreen(PKMN1,PKMN2,AI) {

    hide(1,'yes')
    hide(2,'yes')

    species1 = PKMN1.species;
    species2 = PKMN2.species;

    if (species1 == 'Ho-Oh') {
        species1 = 'hooh';
    }
    if (species2 == 'Ho-Oh') {
        species2 = 'hooh';
    }

    if (species1.toLowerCase() in mistakesdict) {
        url = mistakesdict[species1.toLowerCase()]
    }
    else {
        url = species1.toLowerCase()
    }

    
    if (species2.toLowerCase() in mistakesdict) {
        url2 = mistakesdict[species1.toLowerCase()]
    }
    else {
        url2 = species2.toLowerCase()
    }

    var source1 = "https://play.pokemonshowdown.com/sprites/gen5/" + url + ".png"
    var source2 = "https://play.pokemonshowdown.com/sprites/gen5/" + url2 + ".png"
    document.getElementById("Pokemon1sprite").src = source1;
    document.getElementById("Pokemon2sprite").src = source2;

    document.getElementById("move1button").innerHTML = PKMN1.moveset[0] + ' (' + PKMN1.movePP[0] + ')';
    document.getElementById("move2button").innerHTML = PKMN1.moveset[1] + ' (' + PKMN1.movePP[1] + ')';
    document.getElementById("move3button").innerHTML = PKMN1.moveset[2] + ' (' + PKMN1.movePP[2] + ')';
    document.getElementById("move4button").innerHTML = PKMN1.moveset[3] + ' (' + PKMN1.movePP[3] + ')';

    if (AI[1] != 1) {
        document.getElementById("move1button2").src = PKMN2.moveset[0]+ ' (' + PKMN2.movePP[0] + ')';;
        document.getElementById("move2button2").src = PKMN2.moveset[1]+ ' (' + PKMN2.movePP[1] + ')';;
        document.getElementById("move3button2").src = PKMN2.moveset[2]+ ' (' + PKMN2.movePP[2] + ')';;
        document.getElementById("move4button2").src = PKMN2.moveset[3]+ ' (' + PKMN2.movePP[3] + ')';;
    }

}



function PKMNbattle(PKMN1,PKMN2,MAXHP1,MAXHP2,field1,field2,move1,move2,AI,randmove,randmove2) {

    PKMN1base = myFunction(PKMN1.species);
    PKMN2base = myFunction(PKMN2.species);

    if (move1.code == "0B6") {
        move1new = legal_moves[Math.floor(Math.random()*legal_moves.length)];
        for (let j=1; j<legal_moves.length; j++) {
            if (moveset[i] == legal_moves[j][2]) {
                row = j;
                break;
            }
        }
    
        movedemo = {
        id: legal_moves[row][0],
        name: legal_moves[row][2],
        code: legal_moves[row][3],
        power: legal_moves[row][4],
        type: legal_moves[row][5][0] + legal_moves[row][5].slice(1).toLowerCase(),
        kind: legal_moves[row][6],
        accuracy: legal_moves[row][7],
        PP: legal_moves[row][8],
        statchance: legal_moves[row][9],
        targets: legal_moves[row][10],
        priority: legal_moves[row][11],
        }

        move1 = movedemo;
    }


    if (move2.code == "0B6") {
        move2new = legal_moves[Math.floor(Math.random()*legal_moves.length)];
        for (let j=1; j<legal_moves.length; j++) {
            if (moveset[i] == legal_moves[j][2]) {
                row = j;
                break;
            }
        }
    
        movedemo = {
            id: legal_moves[row][0],
            name: legal_moves[row][2],
            code: legal_moves[row][3],
            power: legal_moves[row][4],
            type: legal_moves[row][5][0] + legal_moves[row][5].slice(1).toLowerCase(),
            kind: legal_moves[row][6],
            accuracy: legal_moves[row][7],
            PP: legal_moves[row][8],
            statchance: legal_moves[row][9],
            targets: legal_moves[row][10],
            priority: legal_moves[row][11],
        }

        move2 = movedemo;
    }

    prio = priority(PKMN1,PKMN2,move1,move2,field1,field2);
    if (prio == 1) {
        batout1 = battleturn(PKMN1,PKMN2,PKMN1base,PKMN2base,field1,field2,move1,randmove,MAXHP1,MAXHP2,1)
        PKMN1 = batout1[0];
        PKMN2 = batout1[1];
        batout2 = battleturn(PKMN2,PKMN1,PKMN2base,PKMN1base,field2,field1,move2,randmove2,MAXHP2,MAXHP1,2)
        PKMN1 = batout2[1];
        PKMN2 = batout2[0];
    }
    else {
        batout2 = battleturn(PKMN2,PKMN1,PKMN2base,PKMN1base,field2,field1,move2,randmove2,MAXHP2,MAXHP1,2)
        PKMN1 = batout2[1];
        PKMN2 = batout2[0];
        batout1 = battleturn(PKMN1,PKMN2,PKMN1base,PKMN2base,field1,field2,move1,randmove,MAXHP1,MAXHP2,1)
        PKMN1 = batout1[0];
        PKMN2 = batout1[1];
    }

    PKMN1.currstats[0] = Math.floor(PKMN1.currstats[0])
    PKMN2.currstats[0] = Math.floor(PKMN2.currstats[0])
    PKMN1.hpperc = Math.floor(100*PKMN1.currstats[0]/MAXHP1)
    if (PKMN1.hpperc == 0 && PKMN1.currstats[0] != 0) {
        PKMN1.hpperc = 1;
    }
    PKMN2.hpperc = Math.floor(100*PKMN2.currstats[0]/MAXHP2)
    if (PKMN2.hpperc == 0 && PKMN2.currstats[0] != 0) {
        PKMN2.hpperc = 1;
    }
    if (PKMN1.currstats[0] <= 0) {
        chatlog += PKMN1.nickname + ' fainted <br>'
        updatechat()
        afterdeath = 1;
        PKMN1.currstats[0] = 0;
        PKMN1.hpperc = 0;
    }
    if (PKMN2.currstats[0] <= 0) {
        chatlog += PKMN2.nickname + ' fainted <br>'
        updatechat()
        PKMN2.currstats[0] = 0;
        PKMN2.hpperc = 0;
    } 
    
    if (PKMN1.hpperc != 0 && PKMN2.hpperc != 0) {
        afterturn(PKMN2,PKMN1,field2,field1,MAXHP2,MAXHP1,2);
        afterturn(PKMN1,PKMN2,field1,field2,MAXHP1,MAXHP2,1);
        [PKMN1,PKMN1base] = calculatestats(PKMN1,PKMN1base,0,1,PKMN2,PKMN2base);
        [PKMN2,PKMN2base] = calculatestats(PKMN2,PKMN2base,0,2,PKMN1,PKMN1base);
    }
    chatlog += "<br><br>"

    array = []
    array.push(PKMN1)
    array.push(PKMN2)
    return array
    
}

function battlefull(AI) {

    Pokemonboxfull = randomizeteam(1);

    PKMNBOXX1 = Pokemonboxfull[0];
    PKMNBOXX2 = Pokemonboxfull[1];
    PKMN2 = PKMNBOXX2[0];
    PKMN1 = PKMNBOXX1[0];

    field1 = {
        weather: 'none',
        rem: [],
        nonrem: [],
        turnsin: 0
    }
    
    field2 = {
        weather: 'none',
        rem: [],
        nonrem: [],
        turnsin: 0
    }

    chatlog += 'Please pick one of your own pokemon to start <br> <br>'
    updatechat()

    document.getElementById("switch1button").onclick = function(){Switcher(0,number2,PKMN2,field1,field2,1)};
    document.getElementById("switch2button").onclick = function(){Switcher(1,number2,PKMN2,field1,field2,1)};
    document.getElementById("switch3button").onclick = function(){Switcher(2,number2,PKMN2,field1,field2,1)};
    document.getElementById("switch4button").onclick = function(){Switcher(3,number2,PKMN2,field1,field2,1)};
    document.getElementById("switch5button").onclick = function(){Switcher(4,number2,PKMN2,field1,field2,1)};
    document.getElementById("switch6button").onclick = function(){Switcher(5,number2,PKMN2,field1,field2,1)};
}



function Switcher(no,no2,PKMN22,field1,field2,who){

    if (who == 1) {
        timesout1[no] ++
    }
    if (who == 2) {
        timesout2[no2] ++
    }
    

    PKMN1 = PKMNBOXX1[no];
    PKMN2 = PKMNBOXX2[no2];
    PKMN1base = myFunction(PKMN1.species);
    PKMN2base = myFunction(PKMN2.species);
    
    if (timesout1[no] == 1) {
        [PKMN1,PKMN1base] = calculatestats(PKMN1,PKMN1base,1,1,PKMN2,PKMN2base);
        MAXHP1 = PKMN1.currstats[0];
    }
    else {
        [PKMN1,PKMN1base] = calculatestats(PKMN1,PKMN1base,0,1,PKMN2,PKMN2base);
    }

    console.log(no2,timesout2)
    if (timesout2[no2] == 1) {
        [PKMN2,PKMN2base] = calculatestats(PKMN2,PKMN2base,1,2,PKMN1,PKMN1base);
        MAXHP2 = PKMN2.currstats[0];
    }
    else {
        [PKMN2,PKMN2base] = calculatestats(PKMN2,PKMN2base,0,2,PKMN1,PKMN1base);
    }
    console.log(PKMN2)

  
   
    movebox1 = findmovestats(PKMN1.moveset)
    movebox2 = findmovestats(PKMN2.moveset)
    updatescreen(PKMN1,PKMN2,[0,1])

    var prio = 1;
    if (prio == 1) {
        entry(PKMN1,PKMN2,field1,field2,MAXHP1,MAXHP2,1);
    }

    updatescreen(PKMN1,PKMN2,[0,1])
                                                  
    document.getElementById("move1button").onclick = function(){Executebutton(PKMN1,PKMN2,MAXHP1,MAXHP2,field1,field2,movebox1[0],movebox2,[0,1],0,no,no2)};
    document.getElementById("move1button").style.backgroundColor = "white";
    document.getElementById("move2button").onclick = function(){Executebutton(PKMN1,PKMN2,MAXHP1,MAXHP2,field1,field2,movebox1[1],movebox2,[0,1],1,no,no2)};
    document.getElementById("move2button").style.backgroundColor = "white";
    document.getElementById("move3button").onclick = function(){Executebutton(PKMN1,PKMN2,MAXHP1,MAXHP2,field1,field2,movebox1[2],movebox2,[0,1],2,no,no2)};
    document.getElementById("move3button").style.backgroundColor = "white";
    document.getElementById("move4button").onclick = function(){Executebutton(PKMN1,PKMN2,MAXHP1,MAXHP2,field1,field2,movebox1[3],movebox2,[0,1],3,no,no2)};
    document.getElementById("move4button").style.backgroundColor = "white";

    for (i=0; i<4; i++) {
        if(PKMN1.movePP[i] == 0) {
            console.log(i)
            document.getElementById("move" + (i+1) + "button").onclick = function(){};
            document.getElementById("move" + (i+1) + "button").style.backgroundColor = "red";
        }
    }

    console.log(afterdeath)
    if (turns != 0 && afterdeath != 1) {
        move1 = 'none';
        moveno = 0;
        entry(PKMN2,PKMN1,field2,field1,MAXHP1,MAXHP2,2)
        Executebutton(PKMN1,PKMN2,MAXHP1,MAXHP2,field1,field2,move1,movebox2,[0,1],moveno,no,no2)
    }

    afterdeath = 0;

    updateswitchstats(PKMNBOXX1)
    turns ++ 
}

function PickMoveAI(PKMN1,PKMN2,movebox2,no2) {

    
    let maxdmg = 0;
    let chosen;
    for (let i=0; i<3; i++) {
        movee = movebox2[i]
        let eff = typechart[dict[movee.type]][dict[PKMN1.type1]] * typechart[dict[movee.type]][dict[PKMN1.type2]];
        let dmg1;

        if (movee.kind == 'Physical') {
            dmg1 = ( (2*PKMN2.level/5+2) * movee.power * PKMN2.currstats[1] / PKMN1.currstats[2])/50 + 2;
        }
        else if (movee.kind == 'Special') {
            dmg1 = ( (2*PKMN2.level/5+2) * movee.power * PKMN2.currstats[3] / PKMN1.currstats[4])/50 + 2;
        }

        if (Math.floor(dmg1 * eff) > maxdmg) {
            maxdmg = Math.floor(dmg1 * eff)
            chosen = i;
        }
    }

    randompick = Math.floor(Math.random()*3);

    if (randompick == 2) {
        chosen = 3;
    } 

    return chosen
}

function Executebutton(PKMN1,PKMN2,MAXHP1,MAXHP2,field1,field2,move1,movebox2,AI,moveno,no,no2) {

    randmove2 = PickMoveAI(PKMN1,PKMN2,movebox2,no2)
    move2 = movebox2[randmove2]
    let PKMNN1;
    let PKMNN2;
    ha = PKMNbattle(PKMN1,PKMN2,MAXHP1,MAXHP2,field1,field2,move1,move2,AI,moveno,randmove2)
    PKMNN1 = ha[0]
    PKMNN2 = ha[1]
    updatescreen(PKMN1,PKMN2,AI)
    console.log(PKMNN1,PKMNN2)
    PKMNBOXX1[no] = PKMNN1;
    PKMNBOXX2[number2] = PKMNN2;
    turns++

    console.log(PKMNN1)
    console.log(PKMNN1.locked)
    for (let i=0; i<4; i++) {
        innerH = document.getElementById("move" + (i+1) + "button").innerHTML
        if(PKMNN1.movePP[i] == 0 || (PKMNN1.locked != -1 && PKMNN1.locked[0] != innerH.slice(0,innerH.indexOf('(')-1)) || PKMNN1.hpperc == 0) {
            document.getElementById("move" + (i+1) + "button").onclick = function(){};
            document.getElementById("move" + (i+1) + "button").style.backgroundColor = "red";
        }
    }
    
    updateswitchstats(PKMNBOXX1)

    console.log(PKMNN2)
    
    if (PKMNN2.hpperc == 0 && number2 < 6) {
        number2 ++
        afterdeath = 1;
        PKMN2 = PKMNBOXX2[number2]
        Switcher(no,number2,PKMN2,field1,field2,2)
    }


}

function updateswitchstats(PKMNBOXX) {
    for (i=0; i<6; i++) {
        basis = PKMNBOXX[i]
        statss = " HP:" + basis.hpperc + "%<br> Nature: " + basis.nature + " <br> Ability: " + basis.ability + " <br> Item: " + basis.item + " <br> Status: none <br>" 
        document.getElementById("switch" + (i+1) + "stats").innerHTML = statss;
        if (basis.hpperc == 0 || basis.currstats[0] == 0) {
            document.getElementById("switch" + (i+1) + "button").onclick = function(){};
            document.getElementById("switch" + (i+1) + "button").style.backgroundColor = "red";
        }
    }

}

//TO DO (maybe)
//neutralizing gas (ability)
//fix dictionary with wrong names
//tiers (maybe)

//priorities

//make player 2 switches
//make player 2 stats not shown
//fix field stats
//remove attack stats when switching
//oppoment moves when you switch