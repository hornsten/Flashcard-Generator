var Cloze = function(cloze, partial) {

    this.cloze = cloze;
    this.partial = partial;
    this.printCloze = function() {

        console.log(this.cloze);
    }
    this.printPartial = function() {
        console.log(this.partial);
    }

    this.printFull = function() {
        var answer = this.partial.replace('[cloze]', this.cloze);
        console.log(answer);

    }
}

var card4 = new Cloze('Liger', 'A half man, half tiger is called a [cloze]');

card4.printFull();

module.exports = Cloze;
