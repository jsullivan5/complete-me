class Node {
  constructor(letter, frequency) {
    this.letter = letter;
    this.frequency = 0;
    this.isAWord = false;
    this.children = {};
  }
}




export default Node;
