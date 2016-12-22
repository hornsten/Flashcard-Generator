var SimpleCard = require("./Simple");
var Cloze = require("./Cloze");
var inquirer = require("inquirer");
var fs = require("fs"); //this is the file stream object
// **********************************************************************

function flashcards() {

    inquirer.prompt([{

            type: 'list',
            name: 'userType',
            message: 'What would you like to do?',
            choices: ['create-basic-cards', 'create-cloze-cards', 'test-my-knowledge']
        }

    ]).then(function(choice) {

        if (choice.userType === 'create-basic-cards') {
            createBasicCards();
        } else if (choice.userType === 'create-cloze-cards') {
            createClozeCards();
        } else if (choice.userType === 'test-my-knowledge') {
            testMyKnowledge();
        }
    });
}

var cardArray = [];

function createBasicCards() {

    inquirer.prompt([{
        name: "front",
        message: "Enter Front of Card: "
    }, {
        name: "back",
        message: "Enter Back of Card: "

    }]).then(function(answers) {
        var card = new SimpleCard(answers.front, answers.back);

        cardArray.push(card);

        // var card = JSON.stringify(answers, null, ' ');

        // appendToLog(card + ",");
        // readTheCards();
        createAnotherCard();

    });

};

function createClozeCards() {

    inquirer.prompt([{
        name: "partial",
        message: "Enter the partial sentence, replacing the missing word using the following format: 'I cannot tell a [cloze]': ",
        validate: function(value) {

            if (value.indexOf('[cloze]') > -1) {
                return true;
            }
            return 'Please replace a word in the sentence with "[cloze]"'
        }
    }, {
        name: "cloze",
        message: "Enter the missing word: "

    }]).then(function(answers) {

        var card = JSON.stringify(answers, null, ' ');

        appendToClozeLog(card + ",");
        // readTheCards();
        createAnotherClozeCard();

    });
};

function testMyKnowledge() {
    readTheCards();
}

//function to append all the search results to log.txt
function appendToLog(info) {
    var f = 'log.txt';

    fs.appendFile(f, info, function(err) {
        if (err)
            console.error(err);
    });
}

function appendToClozeLog(info) {
    var f = 'cloze-log.txt';

    fs.appendFile(f, info, function(err) {
        if (err)
            console.error(err);
    });
}
var makeMore = {
    //Prompt to find out if user wants to play again before exiting program (default is yes)
    type: 'confirm',
    name: 'makeMore',
    message: 'Create another card (hit enter for YES)?',
    default: true
}

function createAnotherCard() {
    //Prompts user to go again, then either restarts or exits program
    inquirer.prompt(makeMore).then(function(user) {
        if (user.makeMore) {
            createBasicCards();
        } else {
            appendToLog(JSON.stringify(cardArray));

            readTheCards();

        }
    })
}

function createAnotherClozeCard() {
    //Prompts user to go again, then either restarts or exits program
    inquirer.prompt(makeMore).then(function(user) {
        if (user.makeMore) {
            createClozeCards();
        } else {

            readTheClozeCards();

        }
    })
}


function readTheCards() {
    fs.readFile('log.txt', "utf8", function(error, data) {

        var myArray = data;

        console.log(myArray);

    });
};

function readTheClozeCards() {
    fs.readFile('cloze-log.txt', "utf8", function(error, data) {


    });
};


flashcards();

// var card3 = new SimpleCard('In Greek mythology, who was the queen of the underworld and wife of Hades?', 'Persephone');
// var card5 = new Cloze('According to legend, a unicorn\'s horn is white at the base, [cloze] in the middle and red at the tip', 'black');

// card3.printCard();

// card5.printFull();
