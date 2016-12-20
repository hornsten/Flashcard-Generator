var SimpleCard = require("./Simple");
var Cloze = require("./Cloze");

var card3 = new SimpleCard('How\'s it going?', 'Not so great.');
var card5 = new Cloze('Clock', 'A [cloze] will tell you what time it is');

card3.printCard();

card5.printFull();
