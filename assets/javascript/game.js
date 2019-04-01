$(document).ready(function () {
    // character collection
    var characters = [];


    // attacking character
    var attacker = 0;

    // defending character
    var defender = 0;

    function Character(name, base, current, counter) {
        this.displayName = name;
        this.baseAttack = base;
        this.currentAttack = current;
        this.counterAttack = counter;
    }

    function reset() {
        //      Add items from character collection to characters div
        $("#characters").empty();
        for (var i = 0; i < characters.length; i++) {
            var jedi = characters[i];
            var element = $("<div>");
            element.text(jedi.displayName);
            element.addClass("jedi");
            $("#characters").append(element);
        }

        //      remove character from player character div
        $("#playerCharacter").empty();        
        //      remove any characters from enemies div
        $("#enemies").empty();
        //      remove any character from defender div
        $("#defender").empty();
    }

    // on click of reset button
    $("#reset").on("click", function (event) {
        console.log("RESET");
        reset();
    });

    // on click of a character in characters
    $(".jedi").on("click", function (event) {
        console.log("CHARACTER CLICK");
        console.log($(this).text());
    //      move/copy selected object to player character
        // var attackerDiv = $("#characters").remove(this);
        // $("#playerCharacter").append(attackerDiv);

    //      move/copy rest of collection to enemies
    });


    // on click of a character in enemies
    //      move character to defender
    //      show attack button (or just leave it on the screen all the time)

    // on click of attack button
    $("#attack").on("click", function () {
        console.log("ATTACK!");
    //      mumble if no enemy to attack (or just hide the silly thing)
    //      attack defender, dealing current attack power damage
    //      update playerattack message to the result
    //      if defender's hp's less then or equal to 0, remove defender
    //      if no more defenders, VICTORY!!! else
    //          increment current attack power by base attack power
    //          deal defender's counterattack damage to player
    //          update defender's counterattack message to reflect the above
    //          if player's hp's less than or equal to 0, DEFEAT!
    //      if VICTORY or DEFEAT display reset button
});
    characters.push(new Character("Luke Skywalker", 30, 30, 40));
    characters.push(new Character("Darth Vader", 25, 25, 45));

    reset();
});