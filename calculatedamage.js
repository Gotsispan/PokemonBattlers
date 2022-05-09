

function findmovestats(moveset) {
    var row;
    var movesetout = [];
    for (let i=0; i<4; i++) {
        for (let j=0; j<legal_moves.length; j++) {
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

        movesetout.push(movedemo)
        
        
    }
    return movesetout;
}


function calculatestats(PKMN1cur,PKMN1base,firstturn,pkmnno,PKMN2cur,PKMN2base){

    var currentstats = {}
    if (PKMN1.ability == "Imposter" && firstturn == 1) {

        console.log('Imposter')
        let newstats = PKMN2.currstats
        newstats[0] = PKMN1.currstats[0]

        currentstats = {
            nickname: PKMN1.nickname,
            species: PKMN2.species,
            gender: PKMN2.gender,
            type1: PKMN2.type1,
            type2: PKMN2.type2,
            item: PKMN1.item,
            level: PKMN2.level,
            ability: PKMN2.ability,
            nature: PKMN2.nature,
            status: PKMN1.status,
            status2: PKMN1.status2,
            IV: PKMN1.IV,
            EV: PKMN1.EV,
            stages: PKMN2.stages,
            hpperc: PKMN1.hpperc,
            currstats: newstats,
            moveset: PKMN2.moveset,
            movePP: [5,5,5,5]
        }

        currentbase = {
            species: PKMN2.species,
            type1: PKMN2.type1,
            type2: PKMN2.type2,
            hpbase: PKMN2base.hpbase,
            atkbase: PKMN2base.atkbase,
            defbase: PKMN2base.defbase,
            spatkbase: PKMN2base.spatkbase,
            spdefbase: PKMN2base.spdefbase,
            speedbase: PKMN2base.speedbase,
            legendary: PKMN2base.legendary
        }
    }
    else {
        currentstats = {
        nickname: PKMN1cur.nickname,
        species: PKMN1base.species,
        gender: PKMN1cur.gender,
        type1: PKMN1base.type1,
        type2: PKMN1base.type2,
        level: PKMN1cur.level,
        ability: PKMN1cur.ability,
        nature: PKMN1cur.nature,
        item: PKMN1cur.item,
        status: PKMN1cur.status,
        status2: PKMN1cur.status2,
        IV: PKMN1cur.IV,
        EV: PKMN1cur.EV,
        stages: PKMN1cur.stages,
        hpperc: PKMN1cur.hpperc,
        currstats: PKMN1cur.currstats,
        moveset: PKMN1cur.moveset,
        movePP: PKMN1cur.movePP,
        locked: PKMN1cur.locked
        }

        currentbase = PKMN1base;
    }

        if (firstturn != 1) {
            currentstats.type1 = PKMN1cur.type1;
            currentstats.type2 = PKMN1cur.type2;
        }
        
        var stagearray = ['attack','defence','special attack','special defence','speed'];
        for (let i=0; i<6; i++) {
            if (PKMN1cur.stages[i] > 6) {
                chatlog += PKMN1cur.nickname + "'s " + stagearray[i] + " can't go higher. <br>"
                currentstats.stages[i] = 6;
            }
            if (PKMN1cur.stages[i] < -6) {
                chatlog += PKMN1cur.nickname + "'s " + stagearray[i] + " can't go lower. <br>"
                currentstats.stages[i] = -6
            }
        }
    

       //HP
       if (firstturn == 1) {
         currentstats.currstats[0] = Math.floor((2*parseInt(PKMN1base.hpbase)+PKMN1cur.IV[0]+PKMN1cur.EV[0]/4)*PKMN1cur.level/100 + PKMN1cur.level + 10);
       }
       else {
        currentstats.currstats[0] = PKMN1cur.currstats[0];
        currentstats.hpperc = PKMN1cur.hpperc;
       }

       let MAXHP1 = Math.floor((2*parseInt(PKMN1base.hpbase)+currentstats.IV[0]+currentstats.EV[0]/4)*currentstats.level/100 + currentstats.level + 10);
       currentstats.hpperc = Math.floor(100*currentstats.currstats[0]/MAXHP1);
       if (currentstats.hpperc == 0 && currentstats.currstats[0] != 0) {
           currentstats.hpperc = 1;
       }


       //ATK DEF SPATK SPDEF SPEED
       var natureeffect = [[1,1,1,1,1],[1.1,0.9,1,1,1],[1.1,1,1,1,0.9],[1.1,1,0.9,1,1],[1.1,1,1,0.9,1],
                           [0.9,1.1,1,1,1],[1,1,1,1,1],[1,1.1,1,1,0.9],[1,1.1,0.9,1,1],[1,1.1,1,0.9,1],
                           [0.9,1,1,1,1.1],[1,0.9,1,1,1.1],[1,1,1,1,1],[1,1,0.9,1,1.1],[1,1,1,0.9,1.1],
                           [0.9,1,1.1,1,1],[1,0.9,1.1,1,1],[1,1,1.1,1,0.9],[1,1,1,1,1],[1,1,1.1,0.9,1],
                           [0.9,1,1,1.1,1],[1,0.9,1,1.1,1],[1,1,1,1.1,0.9],[1,1,0.9,1.1,1],[1,1,1,1,1]];

       for (i=1; i<6; i++) {
           var base = 0;
            if (i==1) {
                base = PKMN1base.atkbase;
            }
            else if (i==2) {
                base = PKMN1base.defbase;
            }
            else if (i==3) {
                base = PKMN1base.spatkbase;
            }
            else if (i==4) {
                base = PKMN1base.spdefbase;
            }
            else{
                base = PKMN1base.speedbase;
            }
            
            currentstats.currstats[i] = ((2*parseInt(base)+currentstats.IV[i]+currentstats.EV[i]/4)*currentstats.level/100 + 5);
            currentstats.currstats[i] = currentstats.currstats[i] * natureeffect[natures.indexOf(currentstats.nature)][i-1];

        
            if (currentstats.stages[i-1] > 0) {
                currentstats.currstats[i] = currentstats.currstats[i] * ((2+currentstats.stages[i-1])/2);
            }
            else if (currentstats.stages[i-1] < 0) {
                currentstats.currstats[i] = currentstats.currstats[i] * (2/(2-currentstats.stages[i-1]));
            }
            currentstats.currstats[i] = Math.floor(currentstats.currstats[i]);
       }


       if (currentstats.species == 'Shedinja') {
           currentstats.currstats[0] = 1;
       }

       if (currentstats.item == "Assault Vest") {
            currentstats.currstats[4] = 1.5 * currentstats.currstats[4];
       }

       if (field1.nonrem.includes('Tailwind')) {
            currentstats.currstats[5] = 2 * currentstats.currstats[5];
        }

        if (currentstats.status == 'paralyze' && currentstats.ability != 'Quick Feet') {
            currentstats.currstats[5] /= 2;
        }

        if (field1.nonrem.includes('Trick Room')) {
            currentstats.currstats[5] = Math.floor(10000/currentstats.currstats[5]);
        }
    
        if (field1.weather == 'rain' && currentstats.ability == 'Swift Swim') {
            currentstats.currstats[5] *= 2;
        }

        if (field1.weather == 'sun' && currentstats.ability == 'Chlorophyl') {
            currentstats.currstats[5] *= 2;
        }   

        if (field1.weather == 'sandstorm' && currentstats.ability == 'Sand Rush'){
            currentstats.currstats[5] *= 2;
        }

        if (field1.weather == 'hail' && currentstats.ability == 'Slush Rush'){
            currentstats.currstats[5] *= 2;
        }

        if (currentstats.status != 'none' && currentstats.ability == 'Quick Feet') {
            currentstats.currstats[5] *= 2;
        }

        if (currentstats.item == 'Eviolite') {
            currentstats.currstats[4] *= 1.5;
            currentstats.currstats[2] *= 1.5;
        }

        if (currentstats.item == "Choice Scarf") {
            currentstats.currstats[5] *= 1.5;
        }

        if (currentstats.item == "Choice Specs") {
            currentstats.currstats[3] *= 1.5;
        }

        if (currentstats.item == "Choice Band") {
            currentstats.currstats[1] *= 1.5;
        }

        

        var txtarray = ['Species: ','Type: ','Nature: ','Ability: ','Level: ','Item: ','Status: ','Other: ','Attack: ','Defence: ','Sp.Atk: ','Sp.Def: ','Speed: ']
        var typingg = currentstats.type1
        if (currentstats.type2 != 'none') {
            typingg += '/' + currentstats.type2;
        }
        var array2 = [currentstats.species,typingg,currentstats.nature,currentstats.ability,currentstats.level,currentstats.item,currentstats.status,currentstats.status2,
            currentstats.currstats[1],currentstats.currstats[2],currentstats.currstats[3],currentstats.currstats[4],currentstats.currstats[5]]
        var array3 = [currentstats.stages[0],currentstats.stages[1],currentstats.stages[2],currentstats.stages[3],currentstats.stages[4]]
    
        var statshow = ""

        for (i=0; i<txtarray.length; i++) {
            if (i>7 && array3[i-8] != 0) {
                if (array3[i-8] == 1 || array3[i-8] == -1){
                    statshow += txtarray[i] + array2[i] + ' (' + array3[i-8] + ' stages) <br>';
                }
                else {
                    statshow += txtarray[i] + array2[i] + ' (' + array3[i-8] + ' stagess) <br>';
                }
            }
            else {
                statshow += txtarray[i] + array2[i] + "<br>";
            }
        }

        idd = "Pokemon" + pkmnno + "stats";
        
        for (i=0; i<6; i++) {
            currentstats.currstats[i] = Math.floor(currentstats.currstats[i]);
        }

        currentstats.hpperc = Math.floor(Math.floor(100*currentstats.currstats[0]/MAXHP1));
        if (currentstats.hpperc == 0 && currentstats.currstats[0] != 0) {
            currentstats.hpperc = 1;
        }

        if (currentstats.currstats[0] < 0) {
            currentstats.currstats[0] = 0;
            currentstats.hpperc = 0;
        }

        if (currentstats.currstats[0] > MAXHP1) {
            currentstats.currstats[0] = MAXHP1;
            currentstats.hpperc = 100;
        }

        document.getElementById("rect" + pkmnno + "1").style.width = Math.floor(2* currentstats.hpperc) + 'px';
        document.getElementById("rect" + pkmnno + "2").style.width = 200 - Math.floor(2* currentstats.hpperc)  + 'px';

        document.getElementById(idd).innerHTML = statshow;
        document.getElementById("hpperc" + pkmnno).innerHTML = currentstats.hpperc + '%';

        let array = [];
        array.push(currentstats,currentbase)
       return array;
    
}


function calculatedamage(PKMN1,PKMN2,basedef,basespdef,move1,field1,field2,MAXHP1,MAXHP2){
    
    var succ = -1;
    var dmg1 = 0;
    if (move1.power>0 && move1.kind != 'Status') {
        var succrate = ((6+PKMN1.stages[5]) / (6+PKMN2.stages[6])) * move1.accuracy;
        if (PKMN1.ability == 'Compound Eyes') {
        succrate = succrate * 1.3;
        }
        if (succrate > 100) {
            succrate = 100;
        }

        succ = 0;    
        var succrand = (Math.random());
        if (succrand > 1-succrate/100) {
            var succ = 1;
        }

        var codee = move1.code;

        if (codee == "00D" && field1.weather == 'hail') {
            succrate = 100;
        }

        if (codee == "011" && PKMN1.status != 'sleep') {
            succrate = 0;
        }   
            
        if (codee == "012" && field1.turnsin1 > 1) {
            succrate = 0;
        }

        if (move1.code == "0A5") {
            succrate = 100;
        }
    

        if (move1.code == "087") {

            if (field1.weather == 'sun') {
                move1.type = 'Fire'
                move1.power = 100
            }

            if (field1.weather == 'rain') {
                move1.type = 'Water'
                move1.power = 100
            }

            if (field1.weather == 'hail') {
                move1.type = 'Ice'
                move1.power = 100
            }

            if (field1.weather == 'sandstorm') {
                move1.type = 'Rock'
                move1.power = 100
            }

        }

        if (move1.code == "089") {
            move1.power = 102;
        }

        if (move1.code == "08A") {
            move1.power = 102;
        }

        if (move1.code == "08B") {
            move1.power = Math.floor(150 * PKMN1.hpperc/100);
        }

        if (move1.code == "08C") {
            move1.power = Math.floor(120 * PKMN2.hpperc/100);
        }

        if (move1.code == "08D") {
            move1.power = Math.floor(PKMN2.currstats[5]/PKMN1.currstats[5]*25)
            if (move1.power > 150) {
                move1.power = 150;
            }
        }

        if (move1.code == "08E") {
            var sum = 0;
            if (PKMN1.stages[0] > 0) {
                sum += PKMN1.stages[0]
            }
            if (PKMN1.stages[1] > 0) {
                sum += PKMN1.stages[1]
            }
            if (PKMN1.stages[2] > 0) {
                sum += PKMN1.stages[2]
            }
            if (PKMN1.stagess[3] > 0) {
                sum += PKMN1.stagess[3]
            }
            if (PKMN1.stages[4] > 0) {
                sum += PKMN1.stages[4]
            }
            if (PKMN1.stages[5] > 0) {
                sum += PKMN1.stages[5]
            }
            if (PKMN1.stages[6] > 0) {
                sum += PKMN1.stages[6]
            }
            move1.power = Math.floor(20 * (1+sum));
        }

        if (move1.code == "08E") {
            var sum = 0;
            if (PKMN2.stages[0] > 0) {
                sum += PKMN2.stages[0]
            }
            if (PKMN2.stages[1] > 0) {
                sum += PKMN2.stages[1]
            }
            if (PKMN2.stages[2] > 0) {
                sum += PKMN2.stages[2]
            }
            if (PKMN2.stagess[3] > 0) {
                sum += PKMN2.stages[3]
            }
            if (PKMN2.stages[4] > 0) {
                sum += PKMN2.stages[4]
            }
            if (PKMN2.stages[5] > 0) {
                sum += PKMN2.stages[5]
            }
            if (PKMN2.stages[6] > 0) {
                sum += PKMN2.stages[6]
            }
            move1.power = Math.floor(20 * (3+sum))

            if (move1.power > 200) {
                move1.power = 200;
            }
        }


        if (move1.code == "094") {
            randeffect = Math.random()
            if (randeffect < 0.2) {
                move1.power = 0
                PKMN2.currstats[0] += MAXHP2/4
            }
            else if (randeffect < 0.6) {
                move1.power = 40;
            }
            else if (randeffect < 0.9) {
                move1.power = 80;
            }
            else {
                move1.power = 120;
            }
        }

        if (move1.code == "095") {
            randeffect = Math.random()
            var magn = 4;
            if (randeffect < 0.05) {
                move1.power = 10;
                magn = 4;
            }
            else if (randeffect < 0.15) {
                move1.power = 30;
                magn = 5;
            }
            else if (randeffect < 0.35) {
                move1.power = 50;
                magn = 6;
            }
            else if (randeffect < 0.65) {
                move1.power = 70;
                magn = 7;
            }
            else if (randeffect < 0.85) {
                move1.power = 90;
                magn = 8;
            }
            else if (randeffect < 0.95) {
                move1.power = 110;
                magn = 9;
            }
            else {
                move1.power = 150;
                magn = 10;
            }
            chatlog += 'The foe was hit with a magnitude of power ' + magn + '.';
        }


        if (move1.code == "097") {
            PP = PKMN1.movePP[PKMN1.moveset.indexOf('Trump Card')]
            if (PP == 1) {
                move1.power = 200;
            }
            else if (PP == 2) {
                move1.power = 80;
            }
            else if (PP == 3) {
                move1.power = 60;
            }
            else if (PP == 4) {
                move1.power = 50;
            }
            else {
                move1.power = 40;
            }
        }

    
        if (move1.code == "098") {
            calc = Math.floor(48 * PKMN1.currstats[0]/MAXHP1)
            if (calc < 2) {
                move1.power = 200;
            }
            else if (calc < 5) {
                move1.power = 150;
            }
            else if (calc < 10) {
                move1.power = 100;
            }
            else if (calc < 17) {
                move1.power = 80;
            }
            else if (calc < 33) {
                move1.power = 40;
            }
            else {
                move1.power = 20;
            }
        }

        
        if (move1.code == "099") {
            calc = Math.floor(PKMN1.currstats[5]/PKMN2.currstats[5])
            if (calc > 4) {
                move1.power = 150;
            }
            else if (calc == 3) {
                move1.power = 120;
            }
            else if (calc == 2) {
                move1.power = 80;
            }
            else if (calc == 1) {
                move1.power = 60;
            }
            else {
                move1.power = 40;
            }
        }

        if (move1.kind == 'Physical') {
            dmg1 = ( (2*PKMN1.level/5+2) * move1.power * PKMN1.currstats[1] / PKMN2.currstats[2])/50 + 2;
        }
        else if (move1.kind == 'Special') {
            dmg1 = ( (2*PKMN1.level/5+2) * move1.power * PKMN1.currstats[3] / PKMN2.currstats[4])/50 + 2;
        }

        if (move1.code == "0A9") {
            if (move1.kind == 'Physical' && PKMN2.stages[1] > 0) {
                dmg1 = ( (2*PKMN1.level/5+2) * move1.power * PKMN1.currstats[1] / PKMN2.currstats[2] * (2+PKMN2.stages[1])/2)/50 + 2;
            }
            else if (move1.kind == 'Special' && PKMN2.stages[1] > 0) {
                dmg1 = ( (2*PKMN1.level/5+2) * move1.power * PKMN1.currstats[3] / PKMN2.currstats[4] * (2+PKMN2.stagess[1])/2)/50 + 2;
            }    
        }

        if (succ == 0) {
            chatlog += 'The move missed its target <br>'
            dmg1 = 0
        }
       
        //ability
        var ability1 = PKMN1.ability;
        var ability2 = PKMN2.ability;

        //crit
        var critroll = Math.random();
        var critlimit = 0.0625;
        if (PKMN1.stages[7] == 1) {
            critlimit = 1/8;
        }
        if (PKMN1.stages[7] == 2) {
            critlimit = 1/4;
        }
        if (PKMN1.stages[7] == 3) {
            critlimit = 1/2;
        }
        if (PKMN1.stages[7] > 3) {
            critlimit = 1;
        }

        if (PKMN1.item == "Scope Lens") {
            critlimit = 2 * critlimit;
        }

        if (move1.code == "0AD") {
            critlimit = 1;
        }

        if (critroll < critlimit && ability2 != 'Battle Armor' && ability2 != 'Shell Armor' && succ != 0) {
            chatlog += "It's a critical hit! <br>"
            PKMN1.currstats[2] = ((2*parseInt(basedef)+PKMN2.DEFIV+PKMN2.EV[2]/4)*PKMN2.level/100 + 5);
            PKMN1.currstats[4] = ((2*parseInt(basespdef)+PKMN2.DEFIV+PKMN2.EV[2]/4)*PKMN2.level/100 + 5);
            if (move1.kind == 'Physical') {
                dmg1 = ( (2*PKMN1.level/5+2) * move1.power * PKMN1.currstats[1] / PKMN2.currstats[2])/50 + 2;
            }
            else if (move1.kind == 'Special') {
                dmg1 = ( (2*PKMN1.level/5+2) * move1.power * PKMN1.currstats[3] / PKMN2.currstats[4])/50 + 2;
            }
            dmg1 = dmg1 * 1.5; 
            if (ability1 == 'Sniper'){
            dmg1 = dmg1 * 2.25/1.5;
            }
        }
        
        // Targets
        //if (targets > 1) {
            //dmg1 = dmg1 * 0.75;
        //}

        //Weather
        if (field1.weather == 'rain') {
            if (move1.type == 'Water') {
                dmg1 = dmg1 * 1.5;
            }
            if (move1.type == 'Fire') {
                dmg1 = dmg1 * 0.5;
            }
        }
        
        if (field1.weather == 'sun') {
            if (move1.type == 'Fire') {
                dmg1 = dmg1 * 1.5;
            }
            if (move1.type == 'Water') {
                dmg1 = dmg1 * 0.5;
            }
        }

        if (field1.nonrem.includes('Mud Sport') && move1.type == 'Electric') {
            dmg1 = dmg1/3
        }

        if (field1.nonrem.includes('Water Sport') && move1.type == 'Fire') {
            dmg1 = dmg1/3
        }

        if (field2.nonrem.includes('Reflect') && move1.kind == 'Physical') {
            dmg1 = dmg1/2
        }

        if (field2.nonrem.includes('Light Screen') && move1.kind == 'Special') {
            dmg1 = dmg1/2
        }

        //STAB
        var STAB = 1;
        if (move1.type == PKMN1.type1 || move1.type == PKMN1.type2) {
            STAB = 1.5;
            if (PKMN1.ability == 'Adaptability') {
                STAB = 2;
            }
        }
        if ( PKMN1.ability == 'Protean' || PKMN1.ability == 'Libero') {
            chatlog += PKMN1.nickname  + ' gained the ' + move1.type + ' type. <br>'
            PKMN1.type1 = move1.type;
            STAB = 1.5;
        }
        dmg1 = dmg1 * STAB;
       
        //Burn
        if (move1.kind == 'Physical' && PKMN1.status == 'burn' && PKMN1.ability != 'Guts') {
            dmg1 = dmg1 * 0.5;
        }

        if (ability1 == 'Aerilate' && move1.type == 'Normal') {
            chatlog += PKMN1.nickname  + ' turned ' + move1.name + ' into flying type. <br>'
            move1.type = 'Flying';
        }
        if (ability1 == 'Normalize') {
            chatlog += PKMN1.nickname  + ' turned ' + move1.name + ' into normal type. <br>'
            move1.type = 'Normal';
            dmg1 = 1.2 * dmg1;
        }
        if (ability1 == 'Pixilate' && move1.type == 'Normal') {
            chatlog += PKMN1.nickname  + ' turned ' + move1.name + ' into fairy type. <br>'
            move1.type = 'Fairy';
        }
        if (ability1 == 'Blaze' && move1.type == "Fire" && PKMN1.hpperc < 33.3) {
            dmg1 = 1.5 * dmg1;
        }
        if (ability1 == 'Overgrow' && move1.type == "Grass" && PKMN1.hpperc < 33.3) {
            dmg1 = 1.5 * dmg1;
        }
        if (ability1 == 'Swarm' && move1.type == "Bug" && PKMN1.hpperc < 33.3) {
            dmg1 = 1.5 * dmg1;
        }
        if (ability1 == 'Torrent' && move1.type == "Water" && PKMN1.hpperc < 33.3) {
            dmg1 = 1.5 * dmg1;
        }

        if (ability1 == 'Technician' && move1.power < 61){
            dmg1 = dmg1 * 1.5;
        }
        if (move1.priority > 1 && ability2 == 'Dazzling') {
            dmg1 = 0;
        }


        

        //effectiveness
        var eff = typechart[dict[move1.type]][dict[PKMN2.type1]] * typechart[dict[move1.type]][dict[PKMN2.type2]];
        if (ability2 == 'Wonder Guard' && eff < 2) {
            eff = 0;
        }
        if (ability2 == 'Levitate' && move1.type == 'Ground'){
            eff = 0;
        }
        if (ability2 == 'Lightning Rod' && move1.type == 'Electric'){
            eff = 0;
        }
        if ( (ability2 == 'Dry Skin' || ability2 == 'Water Absorb') && move1.type == 'Water') {
            eff = 0;
        }
        if ( (ability2 == 'Volt Absorb') && move1.type == 'Electric') {
            eff = 0;
        }
        if ( ability2 == 'Sap Sipper' && move1.type == 'Grass') {
            eff = 0;
        }
        if ( ability2 == 'Storm Drain' && move1.type == 'Water') {
            eff = 0;
        }

        if (PKMN2.item == 'Air Balloon') {
            if (move1.power > 0) {
                chatlog += PKMN2.nickname + "'s air baloon popped <br>"
                PKMN2.item == 'none'
            } 
            if (move1.type == 'Ground') {
                chatlog += 'The move had no effect due to air baloon <br>'
                eff = 0;
            }
        }

        if (succ != 0) {
            if (eff > 1) {
                chatlog += "It's super effective <br>"
            }
            if (eff < 1 && eff >0) {
                chatlog += "It's not very effective <br>"
            }
            if (eff == 0) {
                chatlog += "It doesn't have any effect <br>"
            }
        }

        if (eff>1 && PKMN1.item == 'Expert Belt') {
            dmg1 = dmg1 * 1.2;
        }

        berries = ["Passho","Occa","Wacan","Rindo","Yache","Chople","Kebia","Shuca","Coba","Payapa","Tanga","Charti","Kasib","Haban","Colbur","Babiri"]
        typesberry = ["Water","Fire","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Bug","Steel"]

        for (i=0; i<16; i++) {
            if (PKMN2.item == (berries[i] + ' Berry') && move1.type == typesberry[i]) {
                chatlog += berries[i] + " Berry weakened the super effective move <br>";
                dmg1 = dmg1 * 0.5;
                PKMN2.item = 'none'
            }
        }

        if (ability2 == 'Thick Fat' && (move1.type == 'Fire' || move1.type == 'Ice')){
            eff = eff * 0.5;
        }

        if ((ability2 == 'Solid Rock' || ability2 == 'Prism Armor') && eff > 1){
            eff = eff * 0.75;
        }

        if (ability2 == 'Heatproof' && move1.type == 'Fire'){
            eff = eff * 0.5;
        }

        if (ability2 == 'Dry Skin' && move1.type == 'Fire'){
            eff = eff * 1.25;
        }

        if (ability2 == 'Multiscale' && PKMN2.hpperc == 100){
            eff = eff * 0.5;
        }

        if (ability2 == 'Water Bubble' && move1.type == "Fire"){
            eff = eff * 0.5;
        }

        if (ability1 == 'Scrappy' && move1.type == 'Normal') {
            eff = 1;
        }

        if (ability1 == 'Tinted Lens' && eff < 1) {
            eff = eff * 2;
        }

        dmg1 = dmg1 * eff;

        if (ability1 == 'Guts' && PKMN1.status != 'none'){
            dmg1 = dmg1 * 1.5;
        }

        if (ability1 == 'Sheer Force' && move1.code != "000") {
            dmg1 = 1.3 * dmg1;
        }
       
        if ( (ability2 == 'Dry Skin' || ability2 == 'Water Absorb') && move1.type == 'Water') {
            chatlog += PKMN2.nickname + ' healed some HP back due to its ' + ability2 + '. <br>';
            dmg1 = -PKMN2.currstats[0]*25/PKMN2.hpperc;
        }
        if ( (ability2 == 'Volt Absorb') && move1.type == 'Electric') {
            chatlog += PKMN2.nickname + ' healed some HP back due to its ' + ability2 + '. <br>';
            dmg1 = -PKMN2.currstats[0]*25/PKMN2.hpperc;
        }
        if ( ability2 == 'Sap Sipper' && move1.type == 'Grass') {
            chatlog += PKMN2.nickname + ' raised attack due to its ' + ability2 + '. <br>';
            dmg1 = 0;
            PKMN2.stages[0] = PKMN2.stages[0] + 1;
        }
        if ( ability2 == 'Storm Drain' && move1.type == 'Water') {
            chatlog += PKMN2.nickname + ' raised sp. attack due to its ' + ability2 + '. <br>';
            dmg1 = 0;
            PKMN2.stages[2] = PKMN2.stages[2] + 1;
        }
        
        if (PKMN1.item == "Life Orb") {
            dmg1 = dmg1 * 1.3;
            PKMN1.currstats[0] -= Math.floor(MAXHP1/10)+1;
        }

        if (PKMN2.item == "Rocky Helmet" && move1.type == 'Physical') {
            chatlog += PKMN1.nickname + ' took some damage due to Rocky Helmet. <br>';
            PKMN1.currstats[0] -= Math.floor(MAXHP1/6);
        }

        if (PKMN2.ability == "Iron Barbs" && move1.type == 'Physical') {
            chatlog += PKMN1.nickname + ' took some damage due to Iron Barbs. <br>';
            PKMN1.currstats[0] -= Math.floor(MAXHP1/8);
        }

        if (move1.code == "07B" && (PKMN2.status == 'poison' || PKMN2.status == 'bpoison')) {
            dmg1 = 2 * dmg1;
        }

        if (move1.code == "07C" && PKMN2.status == 'paralyzed' ) {
            dmg1 = 2 * dmg1;
            PKMN2.status = 'none';
        }

        if (move1.code == "07D" && PKMN2.status == 'sleep' ) {
            dmg1 = 2 * dmg1;
            PKMN2.status = 'none';
        }

        if (move1.code == "07E" && PKMN1.status != 'none' ) {
            dmg1 = 2 * dmg1;
            if (PKMN1.status = 'burn') {
                dmg1 = 2 * dmg1;
            }
        }

        if (move1.code == "07F" && PKMN2.status != 'none' ) {
            dmg1 = 2 * dmg1;
        }

        if (move1.code == "080" && PKMN2.currstats[0] < MAXHP2/2) {
            dmg1 = 2 * dmg1;
        }

        if (move1.code == "086" && PKMN1.item == 'none') {
            dmg1 = 2* dmg1
        }

        if (ability1 == 'Water Bubble' && move1.type == "Water"){
            eff = eff * 2;
        }

        
        //Random Roll
        dmg1 = dmg1 * (Math.floor((Math.random() * 15) + 1)/100 + 0.85);

        if (eff != 0) {

            if (move1.code == "06A") {
                dmg1 = 20;
            }

            if (move1.code == "06B") {
                dmg1 = 40;
            }

            if(move1.code == "06C") {
                dmg1 = PKMN2.currstats[0]/2;
            }

            if (move1.code == "06D"){
                dmg1 = PKMN1.level
            }

            if (move1.code == "06D"){
                dmg1 = PKMN2.currstats[0] - PKMN1.currstats[0];
                if (dmg1<0) {
                    dmg1 = 0;
                }
            }

            if (move1.code == "070") {
                dmg1 = 10*MAXHP2;
                chatlog += "It's an 1-HIT KO! <br>"
            }


            if (field2.nonrem.includes('Protect')) {
                chatlog += PKMN2.nickname +  "protected itself <br>"
                dmg1 = 0;
            }

            
            if (field2.nonrem.includes('Quick Guard') && move1.priority > 0) {
                chatlog += PKMN2.nickname +  "protected itself from priority <br>"
                dmg1 = 0;
            }

        }
    }
    return [Math.floor(dmg1),succ];
        
}






