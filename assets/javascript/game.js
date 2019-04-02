$(document).ready(function () {


    var shadow = $("<div>").attr("id", "shadow");

    function reset() {
        resetCharacters($(shadow));
        resetCharacters($("#playerCharacter"));
        resetCharacters($("#enemies"));
        resetCharacters($("#defender"));
        $("#attackerMessage").text("");
        $("#defenderMessage").text("");
        $("#reset").hide();
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

    // on click of a character in characters
    $(".jedi").on("click", function (event) {
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
            $("#attackerMessage").text("");
            $("#defenderMessage").text("");
        }

    });
    // on click of reset button
    $("#reset").on("click", function (event) {
        console.log("RESET");
        reset();
    });

    function updateHitPoints(jedi, hitPoints) {
        $(jedi.children()[2]).text(hitPoints);
    }

    // on click of attack button
    $("#attack").on("click", function () {
        console.log("ATTACK!");

        //      mumble if no enemy to attack (or just hide the silly thing)
        // for now, just make sure there's one attacker and one defender
        if ($("#playerCharacter").children().length === 1 &&
            $("#defender").children().length === 1) {
            var attacker = $("#playerCharacter").children()[0];
            var defender = $("#defender").children()[0];

            // deal currentAttack damage to defender
            var currentAttack = parseInt($(attacker).attr("currentAttack"));
            var defenderHitPoints = parseInt($(defender).attr("currentHitPoints"));
            defenderHitPoints -= currentAttack;
            console.log("Defender has", defenderHitPoints, "remaining");
            $(defender).attr("currentHitPoints", defenderHitPoints);
            updateHitPoints($(defender), defenderHitPoints);
            // $($(defender).children()[2]).text(defenderHitPoints);

            // update playerattack message to the result
            $("#attackerMessage").text("You attacked " + $($(defender).children()[0]).text() + " for " + currentAttack + " damage");

            // increment currentAttack by baseAttack
            var baseAttack = parseInt($(attacker).attr("baseAttack"));
            currentAttack += baseAttack;
            console.log("Current Attack is now", currentAttack);
            $(attacker).attr("currentAttack", currentAttack);


            //      if defender's hp's less then or equal to 0, remove defender
            //      if no more defenders, VICTORY!!! else
            if (defenderHitPoints <= 0) {
                console.log("One enemy down!");
                $("#attackerMessage").text("You defeated " + $($(defender).children()[0]).text() + ". Choose another enemy to attack.");
                $("#defenderMessage").text("");
                $(shadow).append(defender);

                // check for victory
                if ($("#enemies").children().length === 0 &&
                    $("#defender").children().length === 0) {
                        console.log("VICTORY!!!");
                        $("#attackerMessage").text("You defeated all the enemies! Well done! GAME OVER...");
                        $("#defenderMessage").text("");
                        $("#reset").show();
                }
            } else {
                //          deal defender's counterattack damage to player
                var counterAttack = parseInt($(defender).attr("counterAttack"));
                var attackerHitPoints = parseInt($(attacker).attr("currentHitPoints"));
                attackerHitPoints -= counterAttack;
                $(attacker).attr("currentHitPoints", attackerHitPoints);
                console.log("Attacker has", attackerHitPoints, "remaining");
                updateHitPoints($(attacker), attackerHitPoints);

                //          update defender's counterattack message to reflect the above
                $("#defenderMessage").text($($(defender).children()[0]).text() + " attacked you for " + counterAttack + " damage");

                //          if player's hp's less than or equal to 0, DEFEAT!
                if (attackerHitPoints <= 0) {
                    console.log("DEFEAT");
                    $("#attackerMessage").text("You were defeated. Better luck next time. GAME OVER...");
                    $("#defenderMessage").text("");
                    $("#reset").show();
                }
            }
        }
        //      if VICTORY or DEFEAT display reset button
    });

    reset();
});