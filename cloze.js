var Cloze = function(partial, cloze) {

    this.partial = partial;
    this.cloze = cloze;
    this.printCloze = function() {

        console.log(this.cloze);
    }
    this.printPartial = function() {
        console.log(this.partial);
    }

}

Cloze.prototype.printFull = function() {
    return this.partial.replace('[cloze]', this.cloze);
};

var card4 = new Cloze('A half man, half tiger is called a [cloze]', 'liger');

// card4.printFull();

module.exports = Cloze;
