# Flashcard-Generator
This Flashcard Generator is designed to be user-friendly.  Open node flashcards.js in your command line, and the CLI will guide you through the process of creating both simple and cloze-deleted flashcards.  Your cards will be saved into log.txt and cloze-log.txt, respectively.  The Flashcard Generator also allows you to quiz yourself using the cards you created.

## Table of contents

- [Creating a Simple Flashcard](#creating-a-simple-flashcard)
- [Creating a Cloze Flashcard](#Creating a Cloze Flashcard)
- [Taking a quiz](#Taking a quiz)
- [Dependencies](#Dependencies)
- [Next Steps](#Next Steps)


##Creating a Simple Flashcard
To create a basic flashcard displaying a question on the front and its answer on the back, use your arrow keys to choose 'create-basic-cards' from the command line menu.  Follow the prompts to create the front and back of a card.  You will be given the option to make more basic cards or perform a different task.

##Creating a Cloze Flashcard
Creating a Cloze card couldn't be easier.  Simply choose 'create-cloze-cards' from the menu.  The CLI will prompt you to enter a sentence with the word or phrase you want to hide in parentheses.  The omitted word can occur anywhere in the sentence.  Here are two examples:

Tea bags were invented in 1908 in the United States by (Thomas Sullivan).

The most popular type of tea is (black) tea.

##Taking a quiz
It is also easy to quiz yourself using the flashcards you created.  Choose the 'basic-quiz' or 'cloze-quiz', depending which set of cards you'd like to access. The basic quiz will present the front of your card and allow you to type in the answer.  The cloze quiz will present your cloze cards with a blank replacing the hidden word/s.  In both cases, the program will let you know whether each answer was correct and tally your score at the end.  

##Dependencies
This app was created using inquirer.js and node.js File System (fs).  Flashcards.js serves as the entry point for the app.  Constructors and methods for the two types of cards are exported from the files simple.js and cloze.js.  Each of the constructor modules provides methods not only for creating the cards, but also for displaying information during the quiz.

##Next Steps
I would like to increase the utility of this app by adding the ability to save and access separate decks of cards, as well as edit or delete existing cards through the interface.  To that end, it would make sense to incorporate a database and possibly create a web-based user interface at some point.

