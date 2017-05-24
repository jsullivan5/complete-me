import Trie from '../scripts/Trie.js';
import { expect } from 'chai';
require('locus')


describe('The Trie', () => {

  it('should instatiate a trie', () => {
    let trie = new Trie()
    expect(trie).to.be.instanceOf(Trie)
  })

  it('should be able to insert words', () => {
    let trie = new Trie();
    trie.insert('hi');
    expect(trie.root.children.h.children.i.letter).to.equal('i');
  })

  it('should be able to insert new words without overwriting', () => {
    let trie = new Trie();
    trie.insert('hi');
    expect(trie.root.children.h.children.i.letter).to.equal('i');
    trie.insert('hit');
    expect(trie.root.children.h.children.i.children.t.letter).to.equal('t');
  })

  it('should set the last letter isAWord property to true', () => {
    let trie = new Trie();
    trie.insert('hil')
    trie.insert('hi');

    expect(trie.root.children.h.children.i.isAWord).to.equal(true)
    expect(trie.root.children.h.children.i.children.l.isAWord).to.equal(true)

    ;
  })

  it('should count number of words in the tree', () => {
    let trie = new Trie();
    expect(trie.wordCount).to.equal(0)
    trie.insert('him')
    trie.insert('hat')
    trie.insert('hill')
    trie.insert('bat')
    trie.insert('bats')
    trie.count();
    expect(trie.wordCount).to.equal(5)
  })

    it('should suggest words', () => {
      let trie = new Trie();
      trie.insert('him')
      trie.insert('hat')
      trie.insert('hillstuff')
      trie.insert('bat')
      trie.insert('bats')
      expect(trie.suggest('hi')).to.deep.equal(['him', 'hillstuff'])
    })
})
