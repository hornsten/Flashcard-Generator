var Cloze = function(cloze, partial) {

    this.cloze = cloze;
    this.partial = partial;
    this.printCloze = function() {

        console.log(this.cloze);
    }
    this.printPartial = function() {
        console.log(this.partial);
    }
}

var card4 = new Cloze('Liger', 'A half man, half tiger is called a ');

card4.printPartial();

module.exports = Cloze;
