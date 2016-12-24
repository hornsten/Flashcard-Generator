var Cloze = function(text, cloze) {

    this.text = text;
    this.cloze = this.text.match(/\(([^)]+)\)/)[1];
    this.printCloze = function() {
        console.log(this.cloze);
    }
    this.printText = function() {
        console.log(this.text);
    }
    this.blank = function() {

        var blankSentence = this.text.replace('(' + this.cloze + ')', '________');
        console.log(blankSentence);
    }
    this.message = this.text.replace('(' + this.cloze + ')', '________');

}

Cloze.prototype.printFull = function() {

    console.log(this.text.replace(/[{()}]/g, ''));
};

var card4 = new Cloze('This is the (best) way to do it');
var card5 = new Cloze('I wonder if this will (work)');

// card5.printCloze();
// card5.blank();
// card5.printText();
// card5.printFull();
// console.log(card5.message);

module.exports = Cloze;
