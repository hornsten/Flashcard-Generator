var Simple = function(front, back) {
    this.front = front;
    this.back = back;
}

Simple.prototype.printCard = function() {
    console.log('Front: ' + this.front + ', ' + 'Back: ' + this.back);
};

Simple.prototype.printFront = function() {
    console.log(this.front);
}

Simple.prototype.printBack = function() {
    console.log('The correct answer is ' + this.back + '.');
}

var card1 = new Simple('What mythological beast has the head of a man, the body of a lion, and the tail and feet of a dragon?', 'A manticore');
var card2 = new Simple('What legendary fire-breathing female monster had a lion\'s head, a goat\'s body and a dragon\'s tail?', 'The Chimera');

module.exports = Simple;
