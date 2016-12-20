var SimpleCard = require("./Simple");
var Cloze = require("./Cloze");

var card3 = new SimpleCard('In Greek mythology, who was the queen of the underworld and wife of Hades?', 'Persephone');
var card5 = new Cloze('black', 'According to legend, a unicorn\'s horn is white at the base, [cloze] in the middle and red at the tip');

card3.printCard();

card5.printFull();
