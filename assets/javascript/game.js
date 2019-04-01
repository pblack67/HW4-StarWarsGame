$(document).ready(function () {


    var shadow = $("<div>").attr("id", "shadow");

    function reset() {
        resetCharacters($(shadow));
        resetCharacters($("#playerCharacter"));
        resetCharacters($("#enemies"));
        resetCharacters($("#defender"));
    }

    function resetCharacters(jqueryObject) {
        var children = jqueryObject.children();
        for (var i = 0; i < children.length; i++) {
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
        }

    });
// on click of reset button
    $("#reset").on("click", function (event) {
        console.log("RESET");
        reset();
    });

    // on click of attack button
    $("#attack").on("click", function () {
        console.log("ATTACK!");

        //      mumble if no enemy to attack (or just hide the silly thing)
        // for now, just make sure there's one attacker and one defender
        if ($("#playerCharacter").children().length === 1 &&
            $("#defender").children().length === 1) {
            console.log("Valid attack!");
            var attacker = $("#playerCharacter").children()[0];
            var defender = $("#defender").children()[0];

            // deal currentAttack damage to defender
            var currentAttack = parseInt($(attacker).attr("currentAttack"));
            var defenderHitPoints = parseInt($(defender).attr("currentHitPoints"));
            defenderHitPoints -= currentAttack;
            console.log("Defender has", defenderHitPoints, "remaining");
            $(defender).attr("currentHitPoints", defenderHitPoints);

            // increment currentAttack by baseAttack
            var baseAttack = parseInt($(attacker).attr("baseAttack"));
            currentAttack += baseAttack;
            console.log("Current Attack is now", currentAttack);
            $(attacker).attr("currentAttack", currentAttack);

            //      update playerattack message to the result

            //      if defender's hp's less then or equal to 0, remove defender
            //      if no more defenders, VICTORY!!! else
            if (defenderHitPoints <= 0) {
                console.log("One enemy down!");
                $(shadow).append(defender);
                // $("#defender").empty();
            } else {
                //          deal defender's counterattack damage to player
                var counterAttack = parseInt($(defender).attr("counterAttack"));
                var attackerHitPoints = parseInt($(attacker).attr("currentHitPoints"));
                attackerHitPoints -= counterAttack;
                $(attacker).attr("currentHitPoints", attackerHitPoints);
                console.log("Attacker has", attackerHitPoints, "remaining");
                //          update defender's counterattack message to reflect the above
                //          if player's hp's less than or equal to 0, DEFEAT!
                if (attackerHitPoints <= 0) {
                    console.log("Defeat! Zounds!");
                }
            }
            //      if VICTORY or DEFEAT display reset button
        }
    });

    // characters.push(new Character("Luke Skywalker", 30, 30, 40));
    // characters.push(new Character("Darth Vader", 25, 25, 45));
    // characters.push(new Character("Obi-Wan Kenobi", 15, 15, 55));

    reset();
});