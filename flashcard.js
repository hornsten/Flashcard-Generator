var SimpleCard = require("./Simple");
var Cloze = require("./Cloze");

var card3 = new SimpleCard('How\'s it going?', 'Not so great.');
var card5 = new Cloze('Clock', 'You tell time with a');

card3.printCard();
card5.printCloze();
