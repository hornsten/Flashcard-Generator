var SimpleCard = require("./Simple");
var Cloze = require("./Cloze");
var inquirer = require("inquirer");
var fs = require("fs"); //this is the file stream object
var correct = 0;
var wrong = 0;
var cardArray = [];
// ********************************* Main Process *************************************

function flashcards() {

    inquirer.prompt([{

            type: 'list',
            name: 'userType',
            message: 'What would you like to do?',
            choices: ['create-basic-cards', 'create-cloze-cards', 'basic-quiz', 'cloze-quiz', 'quit']
        }

    ]).then(function(choice) {

        if (choice.userType === 'create-basic-cards') {
            addToCards();
        } else if (choice.userType === 'create-cloze-cards') {
            addToClozeCards();
        } else if (choice.userType === 'basic-quiz') {
            basicQuiz(0);
        } else if (choice.userType === 'cloze-quiz') {
            clozeQuiz(0);
        } else if (choice.userType === 'quit') {
            console.log('Thanks for playing!');
        }
    });
}
//***************************************** Functions *********************************
function addToCards() {
    cardArray = [];
    //This grabs any previously created cards and saves them to a new array...
    fs.readFile('log.txt', "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);

        for (var i = 0; i < jsonContent.length; i++) {
            cardArray.push(jsonContent[i]);
        }

    });
    //...So that new cards and old can be combined into a single array
    createBasicCards();
};

function addToClozeCards() {
    cardArray = [];
    //This grabs any previously created cloze cards and saves them to a new array...

    fs.readFile('cloze-log.txt', "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);

        for (var i = 0; i < jsonContent.length; i++) {
            cardArray.push(jsonContent[i]);
        }
    });
    //...So that new cards and old can be combined into a single array
    createClozeCards();
};

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
        createAnotherCard();

    });

};

function createClozeCards() {

    inquirer.prompt([{
        name: "text",
        message: "Enter a sentence, putting the word you want to hide in parentheses, like this: 'I cannot tell a (lie)'",
        validate: function(value) {
            var parentheses = /\(\w.+\)/;
            if (value.search(parentheses) > -1) {
                return true;
            }
            return 'Please put a word in your sentence in parentheses'
        }

    }]).then(function(answers) {

        var card = new Cloze(answers.text);
        cardArray.push(card);

        createAnotherClozeCard();

    });
};

function basicQuiz(x) {

    fs.readFile('log.txt', "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);

        if (x < jsonContent.length) {

            var gameCard = new SimpleCard(jsonContent[x].front, jsonContent[x].back);

            inquirer.prompt([{
                name: "question",
                message: gameCard.front

            }]).then(function(answers) {

                if (answers.question.toLowerCase().indexOf(gameCard.back.toLowerCase()) > -1) {
                    console.log('Correct!');
                    correct++;
                    x++;
                    basicQuiz(x);
                } else {
                    gameCard.printBack();
                    wrong++;
                    x++;
                    basicQuiz(x);
                }

            })

        } else {
            console.log('Here\'s how you did: ');
            console.log('correct: ' + correct);
            console.log('wrong: ' + wrong);
            correct = 0;
            wrong = 0;
            flashcards();
        }
    });
};

function clozeQuiz(x) {

    fs.readFile('cloze-log.txt', "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);

        if (x < jsonContent.length) {

            var clozeCard = new Cloze(jsonContent[x].text, jsonContent[x].cloze);

            inquirer.prompt([{
                name: "question",
                message: clozeCard.message

            }]).then(function(answers) {

                if (answers.question.toLowerCase().indexOf(clozeCard.cloze.toLowerCase()) > -1) {
                    console.log('Correct!');
                    correct++;
                    x++;
                    clozeQuiz(x);
                } else {
                    console.log('Incorrect. Here is the full sentence: ');
                    clozeCard.printFull();
                    wrong++;
                    x++;
                    clozeQuiz(x);
                }

            })

        } else {
            console.log('Here\'s how you did: ');
            console.log('correct: ' + correct);
            console.log('wrong: ' + wrong);
            correct = 0;
            wrong = 0;
            flashcards();
        }
    });
};

//function to append all the search results to log.txt
function writeToLog(info) {
    var f = 'log.txt';

    fs.writeFile(f, info, function(err) {
        if (err)
            console.error(err);
    });
}

function writeToClozeLog(info) {
    var f = 'cloze-log.txt';

    fs.writeFile(f, info, function(err) {
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
    //Prompts user to make more cards or do something else
    inquirer.prompt(makeMore).then(function(user) {
        if (user.makeMore) {
            createBasicCards();
        } else {
            writeToLog(JSON.stringify(cardArray));
            flashcards();
        }
    })
}

function createAnotherClozeCard() {
    //Prompts user to go again, then either restarts or exits program
    inquirer.prompt(makeMore).then(function(user) {
        if (user.makeMore) {
            createClozeCards();
        } else {
            writeToClozeLog(JSON.stringify(cardArray));
            flashcards();
        }
    })
}

flashcards();
