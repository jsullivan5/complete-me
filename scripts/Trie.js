import Node from '../scripts/Node.js';
require('locus');

class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
  }

  insert(word) {
    if (!word) {
      return 'Pass in a word!'
    }
    let currentNode = this.root;
    let splicedWord = word.toLowerCase().split('');

    splicedWord.forEach((elem, index, array) => {
      if (!currentNode.children[elem]) {
        currentNode.children[elem] = new Node(elem);
      }
      if (index === array.length - 1) {
        currentNode.children[elem].isAWord = true;
      }
      currentNode = currentNode.children[elem];
    })
  }

  count(node = this.root) {
    let currentNode = node;
    let keys = Object.keys(currentNode.children)

    keys.forEach((elem) => {
      if (currentNode.children[elem].isAWord === true) {
        this.wordCount++;
      }
      this.count(currentNode.children[elem])
    })
  }


  scrubArray(array) {
    let sorted = array
                .slice(0, 10)
                .sort((a, b) => b.frequency - a.frequency)
                .map(elem => elem = elem.word);

    return sorted
  }

  suggest(word) {
    if (!word) {
      return 'Input a word!'
    }

    let array = this.suggestFind(word);
    let sorted = this.scrubArray(array);

    return sorted
  }

  suggestFind(word) {
    let currentNode = this.root;
    let splicedWord = [...word.toLowerCase()];

    splicedWord.forEach((elem) => {
      if (currentNode.children[elem]) {
        currentNode = currentNode.children[elem];
      }
    })

    return this.suggestHelper(currentNode, word)
  }

  suggestHelper(node, word, wordArray = []) {
    let currentNode = node;
    let completeWord = word;
    let keys = Object.keys(currentNode.children);

    keys.forEach((elem) => {
      let newWord = completeWord + currentNode.children[elem].letter;

      if (currentNode.children[elem].isAWord === true) {
        wordArray.push({word: newWord,
          frequency: currentNode.children[elem].frequency});
      }
      if (currentNode.children) {
        wordArray  = this.suggestHelper(
        currentNode.children[elem],
        newWord,
        wordArray);
      }
    })

    return wordArray
  }

  populate(array) {
    array.forEach((elem) => {
      this.insert(elem);
    })
  }

  select(word) {
    if (!word) {
      return 'Input a word!'
    }
    let currentNode = this.root;
    let splicedWord = [...word.toLowerCase()];

    splicedWord.forEach((elem, index, array) => {
      if ( index === array.length - 1) {
        currentNode.children[elem].frequency++;
      }
      if (currentNode.children[elem]) {
        currentNode = currentNode.children[elem];
      }
    })
  }
}

export default Trie
