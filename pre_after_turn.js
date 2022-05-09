function preturn(PKMN1,PKMN2,field1,field2) {
    play = 1;

    if (PKMN1.status2.includes('flinch')) {
        const index = PKMN1.status2.indexOf('flinch');
        if (index > -1) {
            PKMN1.status2.splice(index, 1);
        }
        chatlog += PKMN1.nickname + " flinched. <br>";
        play = 0;
    }

    if (PKMN1.status == 'paralyze' && play != 0) {
        hityourself = Math.random()
        if (hityourself < 0.25) {
            chatlog += PKMN1.nickname + " is paralyzed and can't move. <br>";
            play = 0;
        }

    }

    if (PKMN1.status == 'sleep' && play != 0) {
        play = 0;
        snapout = Math.random()
        if (snapout < 0.35) {
            chatlog += PKMN1.nickname + "woke up <br>"
            PKMN1.status = '';
            play = 1;
        }
    }

    if (PKMN1.status2 == 'freeze' && play != 0) {
        play = 0;
        snapout = Math.random()
        if (snapout < 0.35) {
            chatlog += PKMN1.nickname + ' is defrosted <br>'
            PKMN1.status = '';
            play = 1;
        }
        
    }

    if (PKMN1.status2.includes('attract') && play != 0) {
        hityourself = Math.random()
        if (hityourself < 0.5) {
            chatlog += PKMN1.nickname + ' is immobilized by love. <br>'
            play = 0;
        }
    }

    if (PKMN1.status2.includes('confused') && play != 0) {
        play = 0;
        hityourself = Math.random()
        snapout = Math.random()
        if (snapout < 0.3) {
            play = 1;
            const index = PKMN1.status2.indexOf('confused.');
            if (index > -1) {
                chatlog += PKMN1.nickname + " got out of confusion. <br>";
                PKMN1.status2.splice(index, 1);
            }
        }
        else if (hityourself < 0.33) {
            dmgyourself =  ((2*PKMN1.level/5+2) * 40 * PKMN1.atkcurr / PKMN1.defcurr)/50 + 2;
            chatlog += PKMN1.nickname + ' hit itself in its confusion. <br>'
            PKMN1.currstats[0] -= dmgyourself;
            play = 0;
        }
    }


    if (PKMN1.currstats[0] <= 0) {
        chatlog += PKMN1.nickname + ' fainted <br>'
        PKMN1.currstats[0] = 0;
        PKMN1.hpperc = 0;
        play = 0;
    }

    PKMN1.hpperc = Math.floor(100*PKMN1.currstats[0]/MAXHP1)
    PKMN2.hpperc = Math.floor(100*PKMN2.currstats[0]/MAXHP2)

    return play;

}

function afterturn(PKMN1,PKMN2,field1,field2,MAXHP1,MAXHP2,pkmno) {
    //if (PKMN1.ability != 'Overcoat') {

    //Pokemon1
    if (PKMN1.status == 'poison') {
        if (PKMN1.ability == 'Poison Heal' && PKMN1.hpperc != 100) {
            chatlog += PKMN1.nickname + " healed" + Math.floor(100/8) + "% hp back due to Poison Heal. <br>";
            PKMN1.currstats[0] += Math.floor(MAXHP1/8);
        }
        else {
            chatlog += PKMN1.nickname + " lost "+ Math.floor(100/8) + "% hp damage due to poison <br>";
            PKMN1.currstats[0] = PKMN1.currstats[0] - Math.floor(MAXHP1/8);
        }
    }

    if (PKMN1.status == 'bpoison') {
        if (PKMN1.ability == 'Poison Heal' && PKMN1.hpperc != 100) {
            chatlog += PKMN1.nickname + " healed" + Math.floor(100/8) + "% hp back due to Poison Heal. <br>";
            PKMN1.currstats[0] += Math.floor(MAXHP1/8);
        }
        else {
            chatlog += PKMN1.nickname + " lost "+ Math.floor(100/8) + "% hp damage due to poison <br>";
            PKMN1.currstats[0] = PKMN1.currstats[0] - Math.floor(MAXHP1/8);
        }
    }

    if (PKMN1.ability == 'Rain Dish' && field1.weather == 'rain'  && PKMN1.hpperc != 100) {
        chatlog += PKMN1.nickname + " healed " + Math.floor(100/16) + "% hp back due to Rain Dish. <br>";
        PKMN1.currstats[0] = PKMN1.currstats[0] + Math.floor(MAXHP1/16);
    }

    if ( (PKMN1.item == 'Leftovers'  && PKMN1.hpperc != 100) || (PKMN1.item == 'Black Sludge' && PKMN1.type1 == 'Poison' && PKMN1.type2 == 'Poison'  && PKMN1.hpperc != 100) ) {
        chatlog += PKMN1.nickname + " healed " + Math.floor(100/16) + "% hp back due to its" + PKMN2.item + " <br>";
        PKMN1.currstats[0] = PKMN1.currstats[0] + Math.floor(MAXHP1/16);
    }

    
    if (PKMN1.ability == 'Ice Body' && field1.weather == 'hail') {
        chatlog += PKMN1.nickname + " healed "+ Math.floor(100/16) + "% hp back due to Ice Body <br>";
        PKMN1.currstats[0] = PKMN1.currstats[0] + Math.floor(MAXHP1/16);
    }

    if (PKMN1.status == 'burn') {
        chatlog += PKMN1.nickname + " lost "+ Math.floor(100/8) + "% hp damage <br>";
        PKMN1.currstats[0] = PKMN1.currstats[0] - Math.floor(MAXHP1/8);
    }

    if (PKMN1.status2.includes('cursed')) {
        chatlog += PKMN1.nickname + " lost "+ 25 + "% hp due to curse <br>";
        PKMN1.currstats[0] = PKMN1.currstats[0] - Math.floor(MAXHP1/4);
    }

    if (PKMN1.ability != 'Overcoat' && field1.weather == 'hail' && PKMN1.type1 != 'Ice' && PKMN1.type2 != 'Ice' && PKMN1.ability != "Ice Body") {
        chatlog += PKMN1.nickname + " lost "+ Math.floor(100/16) + "% hp due to hail <br>";
        PKMN1.currstats[0] = PKMN1.currstats[0] - Math.floor(MAXHP1/16);
    }

    if (PKMN1.ability != 'Overcoat' && field1.weather == 'sandstorm' && PKMN1.type1 != 'Rock' && PKMN1.type2 != 'Rock' && PKMN1.type1 != 'Steel' && PKMN1.type2 != 'Steel' && PKMN1.type1 != 'Ground' && PKMN1.type2 != 'Ground' ) {
        chatlog += PKMN1.nickname + " lost " + Math.floor(100/16) + "% hp due to sandstorm <br>";
        PKMN1.currstats[0] = PKMN1.currstats[0] - Math.floor(MAXHP1/16);
    }

    for (i=1; i<field1.rem.length; i=i+2) {
        field1.rem[i] -= 1;
    }

    for (i=field1.rem.length; i>0; i=i-2) {
        if (field1.rem[i] == 0) {
            field1.rem.splice(field1.rem.indexOf(field1.rem[i-1]),2);
        }
    }

    for (i=1; i<field1.nonrem.length; i=i+2) {
        field1.nonrem[i] -= 1;
    }

    for (i=1; i<field1.nonrem.length; i=i+2) {

        if (field1.nonrem[i] == 0) {
            field1.nonrem.splice(field1.nonrem.indexOf(field1.nonrem[i-1]),2);
        }
    }

    field1.turnsin ++

    PKMN1.hpperc = Math.floor(100*PKMN1.currstats[0]/MAXHP1);
    PKMN2.hpperc = Math.floor(100*PKMN2.currstats[0]/MAXHP2);

    if (PKMN1.item == "Figy Berry" || PKMN1.item == "Wiki Berry" || PKMN1.item == "Mago Berry" || PKMN1.item == "Aguav Berry" || PKMN1.item == "Iapapa Berry") {
        if (PKMN1.hpperc < 26 || (PKMN1.hpperc < 51 && PKMN1.ability == "Gluttony")) {
            chatlog += PKMN1.nickname + ' consumed its ' + PKMN1.item + '. <br>';
            PKMN1.currstats[0] += PKMN1.currstats[0] + Math.floor(33/100*MAXHP1);
        }
    }
  
    PKMN1.hpperc = Math.floor(100*PKMN1.currstats[0]/MAXHP1);
    PKMN2.hpperc = Math.floor(100*PKMN2.currstats[0]/MAXHP2);

    fieldstats1 = "Field" + pkmno + ": <br>"
    if (field1.weather != 'none') { 
        fieldstats1 += "Weather: " + field1.weather + '<br>'
    }
    if (field1.rem.length>0){
        fieldstats1 += 'Removable: <br>'
        for (i=0; i<field1.rem.length; i=i+2){
            fieldstats1 += field1.rem[i] + ' for ' + field1.rem[i+1] + ' more turns <br>'
        }
    }
    if (field1.nonrem.length>0) {
        fieldstats1 += 'Non Removable: <br>'
        for (i=0; i<field1.nonrem.length; i=i+2){
            fieldstats1 += field1.nonrem[i] + ' for ' + field1.nonrem[i+1] + ' more turns <br>'
        }
        document.getElementById('fieldstats' + pkmno).innerHTML = fieldstats1;
    }

}

function entry(PKMN1,PKMN2,field1,field2,MAXHP1,MAXHP2,pkmno) {

    if (field1.rem.includes('toxic spikes') && PKMN1.type1 != 'Steel' && PKMN1.type2 != 'Steel') {
        if (PKMN1.type1 == 'Poison' || PKMN1.type2 == 'Poison') {
            chatlog += 'Toxic spikes were removed from' + PKMN1.nickname + "'s field. <br>"
            field1.splice(field1.IndexOf('toxic spikes'),1);
        }
        else if (PKMN1.status == 'none' && PKMN1.type1 != 'Flying' && PKMN1.type2 != 'Flying' && PKMN1.item != "Heavy Duty Boots") {
            chatlog += PKMN1.nickname + 'got poisoned due to toxic spikes  <br>';
            PKMN1.status = 'poison';
        }
    }

    if (field1.rem.includes('stealth rock') && PKMN1.item != "Heavy Duty Boots") {
        var eff = typechart[dict['Rock']][dict[PKMN1.type1]] * typechart[dict['Rock']][dict[PKMN1.type2]];
        PKMN1.currstats[0] -= 12.5/100 * eff * MAXHP1;
        chatlog += PKMN1.nickname + ' took ' + 12.5* eff + ' % damage from stealth rock. <br>'
    }

    if (field1.rem.includes('spikes')  && PKMN1.item != "Heavy Duty Boots") {
        counter = 0;
        for (i=0; i<field1.rem.length; i++) {
            if (field1.rem[i] == 'spikes') {
                counter++
            }
        }
        
        if (counter > 3) {
            counter = 3;
        }

        if (PKMN1.type1 != 'Flying' && PKMN1.type2 != 'Flying') {
            PKMN1.currstats[0] -= 1/(10-2*counter) * MAXHP1;
            chatlog += PKMN1.nickname + 'took' + 12.5/100 * eff + '% damage from spikes <br>'
        }
    }

    if (field1.rem.includes('sticky web') && PKMN1.item != "Heavy Duty Boots") {
        chatlog += PKMN1.nickname + "'s speed fell due to sticky web <br>"
        PKMN1.stages[4] -= 1; 
    }

    if (PKMN2.ability != 'Air Lock' || PKMN2.ability != 'Cloud Nine') {
        if (PKMN1.ability == 'Drizzle') {
            chatlog += PKMN1.nickname + "'s Drizzle turned the weather to rain <br>"
            field1.weather == 'rain';
            field2.weather == 'rain';
        }

        if (PKMN1.ability == 'Drought') {
            chatlog += PKMN1.nickname + "'s Drought turned the weather to harsh sunlight <br>"
            field1.weather == 'sun';
            field2.weather == 'sun';
        }

        if (PKMN1.ability == 'Sand Stream') {
            chatlog += PKMN1.nickname + "'s Sand Stream created a sandstorm <br>"
            field1.weather == 'sandstorm';
            field2.weather == 'sandstorm';
        }

        if (PKMN1.ability == 'Snow Warning') {
            chatlog += PKMN1.nickname + "'s Snow Warning turned the weather to hail <br>"
            field1.weather == 'hail';
            field2.weather == 'hail';
        }
    }

        if (PKMN1.ability == "Download") {
            if (PKMN2.defcurr <= PKMN2.spdefcurr) {
                chatlog += PKMN1.nickname + "'s attack rose <br>"
                PKMN1.stages[0] += 1;
            }
            else {
                chatlog += PKMN1.nickname + "'s special attack rose <br>"
                PKMN1.stages[2] += 1;
            }
        }

        if (PKMN1.ability == "Frisk") {
            chatlog += PKMN2.nickname + "'s item is" + PKMN2.item + '<br>'
        }

        if (PKMN1.ability == "Intimidate" && PKMN2.ability != "Mold Breaker") {
            chatlog += PKMN2.nickname + "'s attack fell <br>"
            PKMN2.stages[0] -= 1;
        }
        
        if (PKMN1.ability == 'Trace') {
            chatlog += PKMN1.nickname + " copied " + PKMN2.nickname + "'s ability " + PKMN2.ability + ' .<br>'
            PKMN1.ability = PKMN2.abilty;
        }

        if (PKMN1.ability == "Screen Cleaner") {
            if (field1.nonrem.includes("Light Screen")) {
                chatlog += PKMN1.nickname + "'s ability Screen Cleaner removed Light Screen <br>"
                field1.nonrem.splice(field1.nonrem.IndexOf("Light Screen"),2);
            }
            if (field1.nonrem.includes("Reflect")) {
                chatlog += PKMN1.nickname + "'s ability Screen Cleaner removed Reflect <br>"
                field1.nonrem.splice(field1.nonrem.IndexOf("Reflect"),2);
            }
            if (field1.nonrem.includes("Aurora Veil")) {
                chatlog += PKMN1.nickname + "'s ability Screen Cleaner removed Aurora Veil <br>"
                field1.nonrem.splice(field1.nonrem.IndexOf("Aurora Veil"),2);
            }
        }

        fieldstats1 = "Field" + pkmno + ": <br>"
        if (field1.weather != 'none') { 
            fieldstats1 += "Weather: " + field1.weather + '<br>'
        }
        if (field1.rem.length>0){
            fieldstats1 += 'Removable: <br>'
            for (i=0; i<field1.rem.length; i=i+2){
                fieldstats1 += field1.rem[i] + ' for ' + field1.rem[i+1] + ' more turns <br>'
            }
        }

        if (field1.nonrem.length>0) {
            fieldstats1 += 'Non Removable: <br>'
            for (i=0; i<field1.nonrem.length; i=i+2){
                fieldstats1 += field1.nonrem[i] + ' for ' + field1.nonrem[i+1] + ' more turns <br>'
            }
            document.getElementById('fieldstats' + pkmno).innerHTML = fieldstats1;
        }

        PKMN1.hpperc = Math.floor(100*PKMN1.currstats[0]/MAXHP1);
        PKMN2.hpperc = Math.floor(100*PKMN2.currstats[0]/MAXHP2);
        updatechat()
}
 

