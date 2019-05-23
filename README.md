# Star Wars Game

* URL: [https://pblack67.github.io/StarWarsGame/](https://pblack67.github.io/StarWarsGame/)

* Technologies: HTML, CSS, JavaScript, Events, jQuery

## Overview

This game simulates basic combat between characteres in a role-playing game. It's a Star Wars theme with several famous characters from over the years. The user selects a character to play. Then they select an enemy to battle from the remaining characters. The Attack button then reduces the hit points of the enemy while the enemy retaliates. The attack and retaliate values are different for each character. Also, the attack value for the character builds with each attack. The user wins if they are able to defeat the enemies before their hit points go to 0 or below.

## Architecture

The main program flow is in the game.js file. Application flow is driven by mouse click events on the character graphics and the attack button. Event handlers are attached via jQuery. Clicking on a character either moves it to the player character area or the defender area based on where the character graphic is. The attack button processes the attack logic and notifies the user whether their attack was successful or they ran out of hit points and lost. If the defender is defeated then it's moved to a shadow div so the application doesn't lose track of it. 