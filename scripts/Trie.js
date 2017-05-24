import Node from '../scripts/Node.js'
require('locus')

class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;

  }
  insert(word) {
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

    if (!currentNode) {
      return
    }
    let keys = Object.keys(currentNode.children)

    keys.forEach((elem) => {
     if (currentNode.children[elem].isAWord === true) {
       this.wordCount++
     }
     this.count(currentNode.children[elem])
    })
  }

  suggest(word) {
    let currentNode = this.root;
    let splicedWord = [...word.toLowerCase()];
    let completeWord = word;

    splicedWord.forEach((elem) => {
        if (currentNode.children[elem]) {
          currentNode = currentNode.children[elem]
        }
      })

     return this.searchHelper(currentNode, word)
  }

  searchHelper(node, word, wordArray = []) {
    let currentNode = node;
    let completeWord = word;

    if (!currentNode.children) {
       completeWord = word;
      return
    }
    let keys = Object.keys(currentNode.children)

    keys.forEach((elem) => {
      let newWord = completeWord + currentNode.children[elem].letter;

      if (currentNode.children[elem].isAWord === true) {
        wordArray.push(newWord)
      }
      if (currentNode.children) {
      wordArray  = this.searchHelper(currentNode.children[elem], newWord, wordArray)
      }
    })
    return wordArray
  }
}






export default Trie
