var SimpleCard = require("./Simple");
var Cloze = require("./Cloze");
var inquirer = require("inquirer");
var fs = require("fs"); //this is the file stream object
var correct = 0;
var wrong = 0;
var cardArray = [];
var clozeArray = [];
// **********************************************************************

function flashcards() {

    inquirer.prompt([{

            type: 'list',
            name: 'userType',
            message: 'What would you like to do?',
            choices: ['create-basic-cards', 'create-cloze-cards', 'test-my-knowledge', 'test-my-cloze-knowledge', 'quit']
        }

    ]).then(function(choice) {

        if (choice.userType === 'create-basic-cards') {
            addToCards();
        } else if (choice.userType === 'create-cloze-cards') {
            addToClozeCards();
        } else if (choice.userType === 'test-my-knowledge') {
            testMyKnowledge(0);
        } else if (choice.userType === 'test-my-cloze-knowledge') {
            testMyClozeKnowledge(0);
        } else if (choice.userType === 'quit') {
            console.log('Thanks for playing!');
        }
    });
}

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

        var card = new Cloze(answers.partial, answers.cloze);
        clozeArray.push(card);

        createAnotherClozeCard();

    });
};

function testMyKnowledge(x) {

    fs.readFile('log.txt', "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);


        if (x < jsonContent.length) {

            inquirer.prompt([{
                name: "question",
                message: jsonContent[x].front

            }]).then(function(answers) {

                if (answers.question.toLowerCase().indexOf(jsonContent[x].back.toLowerCase()) > -1) {
                    console.log('Correct!');
                    correct++;
                    x++;
                    testMyKnowledge(x);
                } else {
                    console.log('Incorrect. The correct answer is ' + jsonContent[x].back);
                    wrong++;
                    x++;
                    testMyKnowledge(x);
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

function testMyClozeKnowledge(x) {

    fs.readFile('cloze-log.txt', "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);


        if (x < jsonContent.length) {

            inquirer.prompt([{
                name: "question",
                message: jsonContent[x].partial

            }]).then(function(answers) {

                if (answers.question.toLowerCase().indexOf(jsonContent[x].cloze.toLowerCase()) > -1) {
                    console.log('Correct!');
                    correct++;
                    x++;
                    testMyClozeKnowledge(x);
                } else {
                    console.log('Incorrect. The correct answer is ' + jsonContent[x].cloze);
                    wrong++;
                    x++;
                    testMyClozeKnowledge(x);
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
            writeToClozeLog(JSON.stringify(clozeArray));
            flashcards();
        }
    })
}

function addToCards() {
    fs.readFile('log.txt', "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);

        for (var i = 0; i < jsonContent.length; i++) {
            cardArray.push(jsonContent[i]);
        }

    });

    createBasicCards();
};

function addToClozeCards() {
    fs.readFile('cloze-log.txt', "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);

        for (var i = 0; i < jsonContent.length; i++) {
            clozeArray.push(jsonContent[i]);
        }
    });
    createClozeCards();
};


flashcards();
