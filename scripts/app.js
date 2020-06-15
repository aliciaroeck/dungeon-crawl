/* === start game === */
$('.begin').on('click', function(){
    begin();
});

/* === how to button === */
$('.howTo').on("click", function(){
    $(".fadedBack").css("display", "flex");
});

$('.close').on("click", function(){
    $(".fadedBack").css("display", "none");
});

/* === roll die button click === */
$('.roll').on('click', roll);

const game = {
    health: 100,
    currentRoom: -1,
    rooms: [
        { 
            name: 'one',
            prompt: 'You enter the first room. It is quiet and dark. You squint and try to see into the shadows, but are unable to see anything. A silhouette appears in the darkness, moving closer to you. As the figure grows closer and closer you take your stance. From the shadows emerges a vampire. It grins as it sees your brief flash of fear and quickly darts toward you. Roll to see what happens…',
            damage: 20,
            roomColor: "#a20e0e",
            roll: 0,
            pass: "Anticipating the vampire's quick move, you were able to jump out to the way and dart toward the next room.",
            fail: "In the shock of seeing your first vampire, you were not able to able to dodge out of the way in time. The vampire latched onto your neck."
        },
        {
            name: 'two',
            prompt: 'As you shut the door behind you, you peer over your shoulder. You hear what sounds like a glob of goo slopping around on the floor. You see a giant green-opaque slime. It moves from your left to your right, getting closer and closer. You start to run for the next door, but the slime spreads out across the floor. Roll to see what happens…',
            damage: 40,
            roomColor: "#a20e0e",
            roll: 0,
            pass: "You see the slime moving into your path. Just before it completely blocks you in, you leap forward over the slime covered floor, landing just in-front of the door to the next room.",
            fail: "You attempt to jump over the slime as it crosses your path, but you did not jump high enough. It touches your leg with its acid sludge."
        },
        {
            name: 'three',
            prompt: 'You enter the next room. A stampede of loud thuds breaks the eerie silence. Your eyes strain to see what could be making the loud noise as the ground shakes under your feet. You see three green-skinned giant trolls emerge from the shadows. You look around the room to see if there is any way to move past them. They spot you and begin moving quickly, each one trying to be the first to get to you. Roll to see what happens…',
            damage: 60,
            roomColor: "#a20e0e",
            roll: 0,
            pass: "You sprint forward and leap, using the trolls as a stepping stone to the chandeliers above you, and swing through the doorway to the next room.",
            fail: "You sprint forward and attempt to use one of the trolls as a stepping stone to the chandeliers above. The troll immediately noticed what you were doing, biting you and slashing your arm."
        },
        {
            name: 'four',
            prompt: 'You enter into the final room. Blanketed in complete darkness, you are unable to see anything around you. You hear a rustling of chains in the distance. Moving forward, you grip the wall beside you, using it as a guide. You hear the chains getting louder. Pausing, you hear a low grumble. Suddenly with a flash, the entire room is illuminated. You feel a rush of warmth as fire whips past your face and lights a torch hanging on the wall beside you. A large dragon moves into your focus and you sprint toward the exit. Roll to find out what happens.',
            damage: 80,
            roomColor: "#a20e0e",
            roll: 0,
            pass: "The dragon whips around you trying to block your path, but you anticipate it's moves. You counter any attempts to hit you by jumping, ducking, and dodging out of the way. Right as you open the door to the exit the dragon breaths fire one last time. You leap out of the doorway as fire rushes past you.",
            fail: "Your pants caught fire as you were trying to escape. As you stopped to pat it out, the dragon whipped around you and smacked you with his tail."
        }
    ]
}


function begin () {
    $('.begin').hide();

    game.currentRoom++

    const room = game.rooms[game.currentRoom];

    $('.prompt').text(room.prompt);
    $(`.${room.name}`).css("background-color", room.roomColor);

    $('.game-board').css("visibility", "visible");
    $('#health').css("visibility", "visible");
}

function moveRoom(){
    game.currentRoom++
    const room = game.rooms[game.currentRoom];

    $('.prompt').text(room.prompt);
    $(`.${room.name}`).css("background-color", room.roomColor);

    $('.response').remove();
    $('.game-board').css("visibility", "visible");
}

function updateHealth(){
    if(game.health >= 0){
    $('#health').text(`Health: ${game.health}`);
    }
}

function roll(){
    let ranNum = Math.round(Math.random()*20) + 1;

    game.rooms[game.currentRoom].rolled = ranNum

    if(ranNum <= 10){
        game.health -= (game.rooms[game.currentRoom].damage);
        damageResponse()
    } else {
        noDamageResponse()
    }
    
    updateHealth()

    if (game.health <= 0){
        lose();
    } else if (game.currentRoom === 3 && game.health > 0) {
        win();
    }
}

function win(){
    $('.game-board').css("visibility", "hidden");
    $('.response').remove();
    $('.game-board__text').prepend(`<div class="response"><p class="noDamage">You rolled ${game.rooms[game.currentRoom].rolled}. <br> ${game.rooms[game.currentRoom].pass}</p><p class="end">You survived!</p><button class="restart">Restart</button></div>`);
    $('.response').css("visibility", "visible")
    $('.restart').on("click", restartGame);
}

function lose(){
    $('.game-board').css("visibility", "hidden");
    $('.response').remove();
    $('.game-board__text').prepend(`<div class="response"><p class="noDamage">You rolled ${game.rooms[game.currentRoom].rolled}. <br> ${game.rooms[game.currentRoom].fail}</p><p class="damage end">You took ${game.rooms[game.currentRoom].damage} damage and died.</p><button class="restart">Restart</button></div>`);
    $('.response').css("visibility", "visible")
    $('.restart').on("click", restartGame);
}

function damageResponse(){
    $('.game-board').css("visibility", "hidden");
    $('.game-board__text').prepend(`<div class="response"><p class="noDamage">You rolled ${game.rooms[game.currentRoom].rolled}. <br> ${game.rooms[game.currentRoom].fail}</p><p class="damage">You took ${game.rooms[game.currentRoom].damage} damage!</p><button class="continueButton">Continue</button></div>`);
    $('.response').css("visibility", "visible")
    $('.continueButton').on("click", moveRoom);
}

function noDamageResponse(){
    $('.game-board').css("visibility", "hidden");
    $('.game-board__text').prepend(`<div class="response"><p class="noDamage">You rolled ${game.rooms[game.currentRoom].rolled}. <br> ${game.rooms[game.currentRoom].pass}</p><p class="noDamage">You did not take any damage!</p><button class="continueButton">Continue</button></div>`);
    $('.response').css("visibility", "visible")
    $('.continueButton').on("click", moveRoom);
}

/* === restart game === */
function restartGame() {
    $(".boxes").css("background-color", "#f1f1f1");
    $('.response').remove();
    game.currentRoom = -1;
    game.health = 100;
    $('#health').text(`Health: ${game.health}`);
    begin();
}