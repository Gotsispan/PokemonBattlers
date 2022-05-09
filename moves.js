function movesecondary(PKMN1,PKMN2,PKMNbase1,PKMNbase2,MAXHP1,MAXHP2,move1,field1,field2,succin) {

    if (PKMN1.item == "Choice Scarf" || PKMN1.item == "Choice Band" || PKMN1.item == "Choice Specs") {
        PKMN1.locked = [move1.name,999];
    }

    succrate = 100;

    var burnimm = ["Water Veil","Water Bubble"].includes(PKMN2.ability) || PKMN2.type1 == 'Fire' || PKMN2.type2 == 'Fire';
    var flinchimm = ["Shield Dust","Inner Focus"].includes(PKMN2.ability) || PKMN2.status2.includes('flinch');
    var confuseimm = ["Own Tempo"].includes(PKMN2.ability) || PKMN2.status2.includes('confusion');;
    var sleepimm = ["Insomnia","Vital Spirit","Sweet Veil"].includes(PKMN2.ability);
    var poisonimm = ["Immunity","Pastel Veil"].includes(PKMN2.ability) || PKMN2.type1 == 'Poison' || PKMN2.type2 == 'Poison' || PKMN2.type1 == 'Steel' || PKMN2.type2 == 'Steel';
    var paralyzeimm = ["Limber"].includes(PKMN2.ability) || PKMN2.type1 == 'Electric' || PKMN2.type2 == 'Electric';
    var attractimm = PKMN1.gender == PKMN2.gender || PKMN1.gender != 'none' || PKMN2.gender != 'none' || PKMN2.status2.includes('attraction');;
    var statusimm = field2.rem.includes("Safeguard") || (PKMN2.ability == 'Leaf Guard' && field1.weather == 'sun') || PKMN2.ability == "Comatose";
    var freezeimm = ["Magma Armor","Comatose","Shield Dust"].includes(PKMN2.ability) || field1.weather == 'sun' || PKMN2.type1 == 'Ice' || PKMN2.type2 == 'Ice';

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

    if (codee == "016" && attractimm) {
        succrate = 0;
    }

    if (codee == "04E" && attractimm) {
        succrate = 0;
    }

    if (move1.kind == 'Status' && move1.accuracy == 0) {
        succrate = 100;
    }

    

    //calculate chance
    if (succin == '-1') {
        succ = 0;       
        var succrand = (Math.random());
        if (succrand > 1-succrate/100) {
            var succ = 1;
        }
 
    }
    else {
        var succ = succin
    }

    var eff = typechart[dict[move1.type]][dict[PKMN2.type1]] * typechart[dict[move1.type]][dict[PKMN2.type2]];
    var secondrate = move1.statchance;

    if (eff>1 && PKMN2.item == "Weakness Policy") {
        chatlog += PKMN2.nickname + "'s attack and special attack rose <br>"
        PKMN2.stages[0] + 2;
        PKMN2.stages[2] + 2;
    }

    if (move1.kind == 'Status' && move1.statchance == 0) {
        secondrate = 100;
    }
    var secondrand = (Math.random());

    //

    //no serene grace
    if (succ == 1 && eff != 0 && secondrand > 1-secondrate/100) {

        if (codee == "018" && (PKMN1.status == 'burn' || PKMN1.status == 'paralysis' || PKMN1.status == 'poison')) {
            chatlog +=  PKMN1.nickname + ' is cured from status effects <br>'
            PKMN1.status = 'none';
        }

        if (codee == "01A") {
            chatlog += PKMN1.nickname + ' protects itself from status effects <br>'
            field1.rem.push('Safeguard');
            field1.rem.push(5)
        }

        if (codee == "016") {
            chatlog += PKMN2.nickname + " fell in love with " + PKMN1.nickname
            PKMN2.status2.push('attract');
        }
        
        if (codee == "01B" && PKMN2.status == 'none' && PKMN1.status != 'none') {
            PKMN2.status = PKMN1.status;
            PKMN1.status = 'none';
        }

        var one = 1;
        if (PKMN1.ability == 'Simple') {
            one = 2;
        }

        //0 ATK
        //1 DEF
        //2 SPATK
        //3 SPDEF
        //4 SPEED
        //5 ACC
        //6 EVA
        //7 CRIT

        if (codee == "01C") {
            chatlog += PKMN1.nickname + "'s attack rose <br>"
            PKMN1.stages[0] += 1*one;
        }

        if (codee == "01D" && codee == "01E") {
            chatlog += PKMN1.nickname + "'s defense rose <br>"
            PKMN1.stages[1] += 1*one;
        }

        if (codee == "01F") {
            chatlog += PKMN1.nickname + "'s defense rose <br>"
            PKMN1.stages[4] += 1*one;
        }

        if (codee == "020") {
            chatlog += PKMN1.nickname + "'s special attack rose <br>"
            PKMN1.stages[2] += 1*one;
        }

        if (codee == "022") {
            chatlog += PKMN1.nickname + "'s defense rose <br>"
            PKMN1.stages[6] += 1*one;
        }

        if (codee == "023") {
            chatlog += PKMN1.nickname + "'s critical ratio sharply rose <br>"
            PKMN1.stages[7] += 2*one;
        }

        if (codee == "024") {
            chatlog += PKMN1.nickname + "'s attack and defense rose <br>"
            PKMN1.stages[0] += 1*one;
            PKMN1.stages[1] += 1*one;
        }

        if (codee == "025") {
            chatlog += PKMN1.nickname + "'s attack,defense and accuracy rose <br>"
            PKMN1.stages[0] += 1*one;
            PKMN1.stages[1] += 1*one;
            PKMN1.stages[5] += 1*one;
        }

        if (codee == "026") {
            chatlog += PKMN1.nickname + "'s attack and speed rose <br>"
            PKMN1.stages[0] += 1*one;
            PKMN1.stages[4] += 1*one;
        }

        if (codee == "027") {
            chatlog += PKMN1.nickname + "'s attack and special attack rose <br>"
            PKMN1.stages[0] += 1*one;
            PKMN1.stages[2] += 1*one;
        }

        if (codee == "028") {
            
            PKMN1.stages[0] += 1*one;
            PKMN1.stages[2] += 1*one;
            if (weather == 'sun') {
                chatlog += PKMN1.nickname + "'s attack and special attack sharply rose <br>"
                PKMN1.stages[0] += 1*one;
                PKMN1.stages[2] += 1*one; 
            }
            else {
                chatlog += PKMN1.nickname + "'s attack and special attack rose <br>"
            }
        }
        
        if (codee == "029") {
            chatlog += PKMN1.nickname + "'s attack and accuracy rose <br>"
            PKMN1.stages[0] += 1*one;
            PKMN1.stages[5] += 1*one;
        }

        if (codee == "02A") {
            chatlog += PKMN1.nickname + "'s defense and special defense rose <br>"
            PKMN1.stages[1] += 1*one;
            PKMN1.stages[3] += 1*one;
        }

        if (codee == "02B") {
            chatlog += PKMN1.nickname + "'s special attack,special defense and speed <br>"
            PKMN1.stages[2] += 1*one;
            PKMN1.stages[4] += 1*one;
            PKMN1.stages[3] += 1*one;
        }

        if (codee == "02C") {
            chatlog += PKMN1.nickname + "'s special attack and special defense <br>"
            PKMN1.stages[2] += 1*one;
            PKMN1.stages[3] += 1*one;
        }

        if (codee == "02D") {
            chatlog += PKMN1.nickname + "'s boosted all its stats <br>"
            PKMN1.stages[0] += 1*one;
            PKMN1.stages[1] += 1*one;
            PKMN1.stages[2] += 1*one;
            PKMN1.stages[3] += 1*one;
            PKMN1.stages[4] += 1*one;
        }

        if (codee == "02E") {
            chatlog += PKMN1.nickname + "'s attack sharply rose <br>"
            PKMN1.stages[0] += 2*one;
        }
        
        if (codee == "02F") {
            chatlog += PKMN1.nickname + "'s defense sharply rose <br>"
            PKMN1.stages[1] += 2*one;
        }

        if (codee == "030" || codee == "031") {
            chatlog += PKMN1.nickname + "'s speed sharply rose <br>"
            PKMN1.stages[4] += 2*one;
        }

        if (codee == "032") {
            chatlog += PKMN1.nickname + "'s special attack sharply rose <br>"
            PKMN1.stages[2] += 2*one;
        }

        if (codee == "033") {
            chatlog += PKMN1.nickname + "'s special defense sharply rose <br>"
            PKMN1.stages[3] += 2*one;
        }

        if (codee == "034") {
            chatlog += PKMN1.nickname + "'s evasion sharply rose <br>"
            PKMN1.stages[6] += 2*one;
        }

        if (codee == "035") {
            chatlog += PKMN1.nickname + " broke out of its shell sharply raising attack, special attack and speed and lost some defense and special defense <br>"
            PKMN1.stages[0] += 2*one;
            PKMN1.stages[1] -= 1*one;
            PKMN1.stages[2] += 2*one;
            PKMN1.stages[3] -= 1*one;
            PKMN1.stages[4] += 2*one;
        }

        if (codee == "036") {
            chatlog += PKMN1.nickname + "'s attack rose and its speed sharply rose <br>"
            PKMN1.stages[4] += 2*one;
            PKMN1.stages[0] += 1*one;
        }

        if (codee == "037") {
            randstat = Math.floor(Math.random()*7);
            if (randstat == 0) {
                chatlog += PKMN1.nickname + "'s attack sharply rose <br>"
                PKMN1.stages[0] += 2*one;
            }
            if (randstat == 1) {
                chatlog += PKMN1.nickname + "'s defense sharply rose <br>"
                PKMN1.stages[1] += 2*one;
            }
            if (randstat == 2) {
                chatlog += PKMN1.nickname + "'s special attack sharply rose <br>"
                PKMN1.spatktage += 2*one;
            }
            if (randstat == 3) {
                chatlog += PKMN1.nickname + "'s special defense sharply rose <br>"
                PKMN1.stages[3] += 2*one;
            }
            if (randstat == 4) {
                chatlog += PKMN1.nickname + "'s speed sharply rose <br>"
                PKMN1.stages[4] += 2*one;
            }
            if (randstat == 5) {
                chatlog += PKMN1.nickname + "'s accuracy sharply rose <br>"
                PKMN1.stages[5] += 2*one;
            }
            if (randstat == 6) {
                chatlog += PKMN1.nickname + "'s evasion sharply rose <br>"
                PKMN1.stages[6] += 2*one;
            }
        }

        if (codee == "038") {
            chatlog += PKMN1.nickname + "'s defense sharply rose <br>"
            PKMN1.stages[1] += 3*one;
        }

        if (codee == "039") {
            chatlog += PKMN1.nickname + "'s special attack sharply rose <br>"
            PKMN1.stages[2] += 3*one;
        }

        if (codee == "03A" && PKMN1.hpperc > 50) {
            chatlog += PKMN1.nickname + " maximized its attack stat <br>"
            PKMN1.hpperc -= 50;
            PKMN1.currstats[0] -= 50*PKMN1.currstats[0]/PKMN1.hpperc;
            PKMN1.stages[0] += 6; 
        }

        if (codee == "03B") {
            chatlog += PKMN1.nickname + "'s attack and defense fell <br>"
            PKMN1.stages[0] -= 1*one;
            PKMN1.stages[1] -= 1*one;
        }

        if (codee == "03C") {
            chatlog += PKMN1.nickname + "'s defense and special defense fell <br>"
            PKMN1.stages[1] -= 1*one;
            PKMN1.stages[3] -= 1*one;
        }

        if (codee == "03D") {
            chatlog += PKMN1.nickname + "'s speed fell <br>"
            PKMN1.stages[4] -= 1*one;
        }

        if (codee == "03F") {
            chatlog += PKMN1.nickname + "'s special attack harshly fell <br>"
            PKMN1.stages[2] -= 2*one;
        }
        
        //with serene grace
        if (PKMN1.ability == 'Serene Grace') {
            secondrate = 2*secondrate;
        }

        if (field2.nonrem.includes('Protect')) {
            secondrate = 0;
        }

        if (field2.nonrem.includes('Quick Guard') && move1.priority > 0) {
            secondrate = 0;
        }

        if (secondrand > 1-secondrate/100 && (PKMN1.ability != "Sheer Force" || move1.kind == "Status" )) {

            if (codee == "002") {
                PKMN1.currstats[0] = PKMN1.currstats[0] - 1/4 * 25*PKMN1.currstats[0]/PKMN1.hpperc;
            }

            if (codee == "003" && PKMN2.status == 'none' && !sleepimm && !statusimm) {
                chatlog += PKMN2.nickname + ' fell asleep <br>'
                PKMN2.status = 'sleep';
            }

            if (codee == "005" && PKMN2.status == 'none' && !poisonimm && !statusimm) {
                chatlog += PKMN2.nickname + ' got poisoned <br>'
                PKMN2.status = 'poison';
            }

            if (codee == "006" && PKMN2.status == 'none' && !poisonimm && !statusimm) {
                chatlog += PKMN2.nickname + ' got badly poisoned <br>'
                PKMN2.status = 'bpoison';
            }

            if ((codee == "007" || codee == "008")  && !paralyzeimm && !statusimm && PKMN2.status == 'none') {
                chatlog += PKMN2.nickname + ' got paralyzed and may be unable to move <br>'
                PKMN2.status = 'paralyze';
            }

            if (codee == "009") {
                randstat = Math.random();
                if (randstat > 0.5 && !paralyzeimm && PKMN2.status == 'none' && !statusimm) {
                    chatlog += PKMN2.nickname + ' got paralyzed and may be unable to move <br>'
                    PKMN2.status = 'paralyze';
                }
                else if (!flinchimm) {
                    chatlog += PKMN2.nickname + ' flinched <br>'
                    PKMN2.status2.push('flinch');
                }
            }

            if (codee == "00A" && PKMN2.status == 'none' && !burnimm && !statusimm) {
                chatlog += PKMN2.nickname + ' got burnt <br>'
                PKMN2.status = 'burn';
            }

            if (codee == "00B") {
                randstat = Math.random();
                if (randstat > 0.5 && PKMN2.status == 'none' && !burnimm && !statusimm) {
                    chatlog += PKMN2.nickname + ' got burnt <br>'
                    PKMN2.status = 'burn';
                }
                else if (!flinchimm) {
                    chatlog += PKMN2.nickname + ' flinched <br>'
                    PKMN2.status2.push('flinch');
                }
            }

            if ((codee == "00C" || codee == "00D") && PKMN2.status == 'none' && !freezeimm && !statusimm) {
                chatlog += PKMN2.nickname + ' got frozen <br>'
                PKMN2.status = 'freeze';
            }

            if (codee == "00E") {
                randstat = Math.random();
                if (randstat > 0.5 && PKMN2.status == 'none' && !freezeimm && !statusimm) {
                    chatlog += PKMN2.nickname + ' got frozen <br>'
                    PKMN2.status = 'freeze';
                }
                else if (!flinchimm) {
                    chatlog += PKMN2.nickname + ' flinched <br>'
                    PKMN2.status2.push('flinch');
                }
            }

            if (codee == "00F" && !flinchimm) {
                chatlog += PKMN2.nickname + ' flinched <br>'
                PKMN2.status2.push('flinch');
            }

            if (codee == "011" && !flinchimm) {
                chatlog += PKMN2.nickname + ' flinched <br>'
                PKMN2.status2.push('flinch');
            }

            if (codee == "012" && !flinchimm) {
                chatlog += PKMN2.nickname + ' flinched <br>'
                PKMN2.status2.push('flinch');
            }

            if ((codee == "013" || codee == "015") && !confuseimm) {
                chatlog += PKMN2.nickname + ' is confused <br>'
                PKMN2.status2.push('confusion');
            }

            if (codee == "017" && PKMN2.status == 'none') {
                randstat = Math.random();
                if (randstat < 0.33 && !freezeimm && !statusimm) {
                    chatlog += PKMN2.nickname + ' is frozen solid <br>'
                    PKMN2.status = 'freeze';
                }
                else if ( randstat > 0.33 && randstat < 0.66 && !paralyzeimm && !statusimm){
                    chatlog += PKMN2.nickname + ' got paralyzed and may be unable to move <br>'
                    PKMN2.status2 = 'paralyze';
                }
                else if (!burnimm && !statusimm) {
                    chatlog += PKMN2.nickname + ' got burnt <br>'
                    PKMN2.status2 = 'burn';
                }
            }

            if (codee == "040" && PKMN2.status == 'none' && !confuseimm) {
                PKMN2.stages[2] += 1;
                chatlog += PKMN2.nickname + ' is confused <br>'
                PKMN2.status2.push('confusion');
            }

            if (codee == "041" && PKMN2.status == 'none' && !confuseimm ) {
                PKMN2.stages[0] += 2;
                chatlog += PKMN2.nickname + ' is confused <br>'
                PKMN2.status2.push('confusion');
            }

            if (codee == "042") {
                chatlog += PKMN2.nickname + "'s attack fell <br>"
                PKMN2.stages[0] -= 1;
            }

            if (codee == "043") {
                chatlog += PKMN2.nickname + "'s attack fell <br>"
                PKMN2.stages[0] -= 1;
            }

            if (codee == "045") {
                chatlog += PKMN2.nickname + "'s speed fell <br>"
                PKMN2.stages[4] -= 1;
            }

            if (codee == "046") {
                chatlog += PKMN2.nickname + "'s special defense fell <br>"
                PKMN2.stages[3] -= 1;
            }

            if (codee == "047") {
                chatlog += PKMN2.nickname + "'s accuracy fell <br>"
                PKMN2.stages[5] -= 1;
            }

            if (codee == "048") {
                chatlog += PKMN2.nickname + "'s evasion harshly fell <br>"
                PKMN2.stages[6] -= 2;
            }

            if (codee == "049") {
                chatlog += PKMN2.nickname + "'s evasion fell and all removable hazards were cleared <br>"
                PKMN2.stages[6] -= 1;
                field1.rem = []
                field2.rem = []
            }

            if (codee == "04A") {
                chatlog += PKMN2.nickname + "'s attack and defense fell <br>"
                PKMN2.stages[0] -= 1;
                PKMN2.stages[1] -= 1;
            }

            if (codee == "04B") {
                chatlog += PKMN2.nickname + "'s attack harshly fell <br>"
                PKMN2.stages[0] -= 2;
            }

            if (codee == "04C") {
                chatlog += PKMN2.nickname + "'s defense harshly fell <br>"
                PKMN2.stages[1] -= 2;
            }

            if (codee == "04D") {
                chatlog += PKMN2.nickname + "'s speed harshly fell <br>"
                PKMN2.stages[4] -= 2;
            }

            if (codee == "04E") {
                chatlog += PKMN2.nickname + "'s special attack harshly fell <br>"
                PKMN2.stages[2] -= 2;
            }

            if (codee == "04F") {
                chatlog += PKMN2.nickname + "'s special defense harshly fell <br>"
                PKMN2.stages[3] -= 2;
            }

            if (codee == "050") {
                chatlog += PKMN2.nickname + "'s stat changes were neutralized <br>"
                PKMN2.stages[0] = 0;
                PKMN2.stages[1] = 0;
                PKMN2.stages[2] = 0;
                PKMN2.stages[3] = 0;
                PKMN2.stages[4] = 0;
            }

            if (codee == "051") {  
                chatlog += "All stat changes were neutralized <br>"
                PKMN2.stages[0] = 0;
                PKMN2.stages[1] = 0;
                PKMN2.stages[2] = 0;
                PKMN2.stages[3] = 0;
                PKMN2.stages[4] = 0;

                PKMN1.stages[0] = 0;
                PKMN1.stages[1] = 0;
                PKMN1.stages[2] = 0;
                PKMN1.stages[3] = 0;
                PKMN1.stages[4] = 0;
            }

            if (codee == "052") {
                chatlog += PKMN1.nickname + " swapped attack and special attack stages with " + PKMN2.nickname + ". <br>"
                saveatkstage = PKMN1.stages[0]
                savespatkstage = PKMN1.stages[2]
                PKMN1.stages[0] = PKMN2.stages[0]
                PKMN1.stages[2] = PKMN2.stages[2]
                PKMN2.stages[0] = saveatkstage
                PKMN2.stages[2] = savespatkstage
            }

            if (codee == "053") {
                chatlog += PKMN1.nickname + " swapped defense and special defense stages with " + PKMN2.nickname + ". <br>"
                savedefstage = PKMN1.stages[1]
                savespdefstage = PKMN1.spefstage
                PKMN1.stages[1] = PKMN2.stages[1]
                PKMN1.stages[3] = PKMN2.stages[3]
                PKMN2.stages[1] = savedefstage
                PKMN2.stages[3] = savespdefstage
            }

            if (codee == "054") { 
                chatlog += PKMN1.nickname + " swapped all stat changes with " + PKMN2.nickname + ". <br>"
                var saveatkstage =  PKMN1.stages[0]
                var savedefstage = PKMN1.stages[1]
                var savespatkstage = PKMN1.stages[2]
                var savespdefstage = PKMN1.stages[3]
                var savespeedstage = PKMN1.stages[4]

                PKMN1.stages[0] = PKMN2.stages[0];
                PKMN1.stages[1] = PKMN2.stages[1];
                PKMN1.stages[2] = PKMN2.stages[2];
                PKMN1.stages[3] = PKMN2.stages[3];
                PKMN1.stages[4] = PKMN2.stages[4];

                
                PKMN2.stages[0] = saveatkstage;
                PKMN2.stages[1] = savedefstage;
                PKMN2.stages[2] = savespatkstage;
                PKMN2.stages[3] = savespdefstage;
                PKMN2.stages[4] = savespeedstage;

            }

            if (codee == "055") { 
                chatlog += PKMN1.nickname + " copied all of " + PKMN2.nickname + "'s stat changes <br>"
                PKMN1.stages[0] = PKMN2.stages[0];
                PKMN1.stages[1] = PKMN2.stages[1];
                PKMN1.stages[2] = PKMN2.stages[2];
                PKMN1.stages[3] = PKMN2.stages[3];
                PKMN1.stages[4] = PKMN2.stages[4];
            }

            if (codee == "057") { 
                chatlog += PKMN2.nickname + " swapped its attack and defense stats <br>"
                savedef = parseInt(PKMN1base.atkbase);
                PKMN1base.atk = parseInt(PKMN1base.defbase);
                PKMN1base.defbase = savedef;
            }

            if (codee == "058") { 
                chatlog += PKMN1.nickname + " shared its attacking stats with " + PKMN2.nickname + " <br>"
                saveatk = Math.floor( (parseInt(PKMN1base.atkbase)+parseInt(PKMN2base.atkbase))/2 );
                savespatk = Math.floor((parseInt(PKMN1base.spatkbase)+parseInt(PKMN2base.spatkbase))/2);
                PKMN1base.atkbase = saveatk;
                PKMN2base.atkbase = saveatk;
                PKMN1base.spatkbase = savespatk;
                PKMN2base.spatkbase = savespatk;
            }

            if (codee == "059") { 
                chatlog += PKMN1.nickname + " shared its defensive stats with " + PKMN2.nickname + " <br>"
                savedef = Math.floor((parseInt(PKMN1base.defbase)+parseInt(PKMN2base.defbase))/2);
                savespdef = Math.floor((parseInt(PKMN1base.spdefbase)+parseInt(PKMN2base.spdefbase))/2);
                PKMN1base.defbase = savedef;
                PKMN2base.defbase = savedef;
                PKMN1base.spdefbase = savespdef;
                PKMN2base.spdefbase = savespdef;
            }

            if (codee == "05A") {
                chatlog += PKMN1.nickname + " shared its HP stat with " + PKMN2.nickname + " <br>"
                HPsave = Math.floor((PKMN1.currstats[0] + PKMN2.currstats[0])/2)
                PKMN1.currstats[0] = HPsave;
                PKMN2.currstats[0]= HPsave;
                if (PKMN1.currstats[0] > MAXHP1) {
                    PKMN1.currstats[0] = MAXHP1
                }
                if (PKMN2.currstats[0] > MAXHP2) {
                    PKMN2.currstats[0] = MAXHP2
                }
            }

            if (codee == "05B") {
                chatlog += PKMN1.nickname + "'s team speed is boosted cause of Tailwind <br>"
                field1.nonrem.push('Tailwind')
                field1.nonrem.push(5)
            }

            if (codee == '061') {
                chatlog += PKMN2.nickname + " was turned into the Water type <br>"
                PKMN2.type1 = 'Water'
                PKMN2.type2 = 'none'
            }

            if (codee == "062") {
                if (PKMN1.type2 != 'none') {
                    chatlog += PKMN2.nickname + " was turned into a " + PKMN1.type1 + "/" + PKMN1.type2 
                }
                else {
                    chatlog += PKMN2.nickname + " was turned into a " + PKMN1.type1 + "type <br>"
                }
                PKMN2.type1 = PKMN1.type1;
                PKMN2.type2 = PKMN1.type2;
            }

            if (codee == "063") {
                chatlog += PKMN2.nickname + "'s ability became Simple <br>"
                PKMN2.ability = 'Simple'
            }

            if (codee == "064") {
                chatlog += PKMN2.nickname + "'s ability became Insomnia <br>"
                PKMN2.ability = 'Insomnia'
            }

            if (codee == "065") {
                chatlog += PKMN1.nickname + " copied " + PKMN2.nickname + "'s ability <br>"
                PKMN1.ability = PKMN2.ability
            }

            if (codee == "066") {
                chatlog += PKMN1.nickname + " gave " + PKMN2.nickname + " its ability <br>"
                PKMN2.ability = PKMN1.ability
            }

            if (codee == "067") {
                chatlog += PKMN1.nickname + " and " + PKMN2.nickname + " swapped abilities <br>"
                saveability = PKMN1.ability
                PKMN1.ability = PKMN2.ability
                PKMN2.ability = saveability
            }

            if (codee == "068") {
                chatlog += PKMN1.nickname + " made " + PKMN2.nickname + " have no ability <br>"
                PKMN2.ability = 'none'
            }

            if (move1.code == "09D") {
                chatlog += "Electricity's power is weakened"
                field2.nonrem.push('Mud Sport')
                field2.nonrem.push(5)
            }
    
            if (move1.code == "09E") {
                chatlog += "Fire's power is weakened <br>"
                field2.nonrem.push('Water Sport')
                field2.nonrem.push(5)
            }
    
            if (move1.code == "0A2") {
                chatlog += PKMN1.nickname + " set up a Reflect lowering all physical damage <br>" 
                field1.nonrem.push('Reflect')
                field1.nonrem.push(5)
            }
    
            if (move1.code == "0A3") {
                chatlog += PKMN1.nickname + " set up a Light Screen lowering all physical damage <br>" 
                field1.nonrem.push('Light Screen')
                field1.nonrem.push(5)
            }
            
            if (move1.code == "0AA") {
                chatlog += PKMN1.nickname + " protects itself <br>" 
                field1.nonrem.push('Protect')
                field1.nonrem.push(1)
            }

            if (move1.code == "0AB") {
                chatlog += PKMN1.nickname + " protects itself against priority moves <br>" 
                field1.nonrem.push('Quick Guard')
                field1.nonrem.push(1)
            }

        }

    }
    array = [];
    array.push(PKMN1)
    array.push(PKMN2)
    return array;
}


