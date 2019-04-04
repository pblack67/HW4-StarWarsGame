var shadow = $("<div>").attr("id", "shadow");

function updateHitPoints(jedi, hitPoints) {
    jedi.find('[class~="hitPoints"]').text(hitPoints);
}

function reset() {
    resetCharacters($(shadow));
    resetCharacters($("#playerCharacter"));
    resetCharacters($("#enemies"));
    resetCharacters($("#defender"));
    setMessages("", "", false);
}

function resetCharacters(jqueryObject) {
    var children = jqueryObject.children();
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        // reset each character's values back to their initial settings
        $(child).attr("currentHitPoints", $(child).attr("baseHitPoints"));
        $(child).attr("currentAttack", $(child).attr("baseAttack"));
        updateHitPoints($(child), $(child).attr("baseHitPoints"));
        $("#characters").append(children[i]);
    }
}

function processCharacterClick(event) {
    console.log("CHARACTER CLICK");
    console.log("Selected Character:", $(this).text());

    if ("characters" === $(this).parent().attr("id")) {
        //      move/copy selected jedi to player character
        $("#playerCharacter").append($(this));

        //      move/copy rest of collection to enemies
        var children = $("#characters").children();
        for (var i = 0; i < children.length; i++) {
            $("#enemies").append(children[i]);
        }
    } else if ("enemies" === $(this).parent().attr("id")) {
        //      move character to defender
        $("#defender").append($(this));
        setMessages("", "", false);
    }
}

function setMessages(attackerMessage, defenderMessage, showResetButton) {
    $("#attackerMessage").text(attackerMessage);
    $("#defenderMessage").text(defenderMessage);
    if (showResetButton) {
        $("#reset").show();
    } else {
        $("#reset").hide();
    }
}

function attack(attacker, defender, attackAttributeName, isRegularAttack) {
    var currentAttack = parseInt(attacker.attr(attackAttributeName));
    var defenderHitPoints = parseInt(defender.attr("currentHitPoints"));
    defenderHitPoints -= currentAttack;
    console.log("Defender has", defenderHitPoints, "remaining");
    defender.attr("currentHitPoints", defenderHitPoints);
    updateHitPoints(defender, defenderHitPoints);

    if (isRegularAttack) {
        var defenderName = defender.find('[class~="jediname"]').text();
        $("#attackerMessage").text("You attacked " + defenderName + " for " + currentAttack + " damage");
        // increment currentAttack by baseAttack
        var baseAttack = parseInt(attacker.attr("baseAttack"));
        currentAttack += baseAttack;
        console.log("Current Attack is now", currentAttack);
        attacker.attr("currentAttack", currentAttack);
    } else {
        // Must be a counterattack
        var attackerName = attacker.find('[class~="jediname"]').text();
        $("#defenderMessage").text(attackerName + " attacked you for " + currentAttack + " damage");
    }
    return defenderHitPoints;
}

function processAttackClick(event) {
    console.log("ATTACK!");

    //      mumble if no enemy to attack (or just hide the silly thing)
    // for now, just make sure there's one attacker and one defender
    if ($("#playerCharacter").children().length === 1 &&
        $("#defender").children().length === 1) {
        var attacker = $($("#playerCharacter").children()[0]);
        var defender = $($("#defender").children()[0]);

        // make sure player still has hitpoints!
        if (parseInt(attacker.attr("currentHitPoints")) > 0) {
            // deal currentAttack damage to defender
            var defenderHitPoints = attack(attacker, defender, "currentAttack", true);

            //      if defender's hp's less then or equal to 0, remove defender
            //      if no more defenders, VICTORY!!! else
            if (defenderHitPoints <= 0) {
                $(shadow).append(defender);

                // check for victory
                if ($("#enemies").children().length === 0 &&
                    $("#defender").children().length === 0) {
                    console.log("VICTORY!!!");
                    setMessages("You defeated all the enemies! Well done! GAME OVER...", "", true);
                } else {
                    console.log("One enemy down!");
                    setMessages("You defeated " + defender.find('[class~="jediname"]').text() + ". Choose another enemy to attack.", "", false);
                }
            } else {
                //          deal defender's counterattack damage to player
                var attackerHitPoints = attack(defender, attacker, "counterAttack", false);

                //          if player's hp's less than or equal to 0, DEFEAT!
                if (attackerHitPoints <= 0) {
                    console.log("DEFEAT");
                    setMessages("You were defeated. Better luck next time. GAME OVER...", "", true);
                }
            }
        }
    }
}

$(document).ready(function () {

    // on click of a character in characters
    $(".jedi").on("click", processCharacterClick);

    // on click of reset button
    $("#reset").on("click", reset);

    // on click of attack button
    $("#attack").on("click", processAttackClick);

    reset();
});