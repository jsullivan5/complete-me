import Trie from '../scripts/Trie.js';
import { expect } from 'chai';
import fs from 'fs';
require('locus');

const text = "/usr/share/dict/words"
let dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe('The Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie()
  })

  it('should instatiate a trie', () => {
    expect(trie).to.be.instanceOf(Trie)
  })

  it('should be able to insert words', () => {
    trie.insert('hi');
    expect(trie.root.children.h.children.i.letter).to.equal('i');
  })

  it('should be able to insert new words without overwriting', () => {
    trie.insert('hi');
    expect(trie.root.children.h.children.i.letter).to.equal('i');
    trie.insert('hit');
    expect(trie.root.children.h.children.i.children.t.letter).to.equal('t');
  })

  it('should set the last letter isAWord property to true', () => {
    trie.insert('hil')
    trie.insert('hi');

    expect(trie.root.children.h.children.i.isAWord).to.equal(true)
    expect(trie.root.children.h.children.i.children.l.isAWord).to.equal(true)
  })

  it('should count number of words in the tree', () => {
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
    expect(trie.suggest()).to.deep.equal('Input a word!')
    trie.insert('him')
    trie.insert('hat')
    trie.insert('hillstuff')
    trie.insert('bat')
    trie.insert('bats')
    expect(trie.suggest('hi')).to.deep.equal(['him', 'hillstuff'])
  })

  describe('the tree populated with the dictionary', function() {

    let trie = new Trie()

    this.timeout(15000)
    trie.populate(dictionary);


    it('should populate the tree with the dictionary', () => {
      expect(trie.wordCount).to.equal(0);
      trie.count()
      expect(trie.wordCount).to.be.above(200000)

    })

    it('should return an array of 10 or less words', () => {
      expect(trie.suggest()).to.equal('Input a word!')
      expect(trie.suggest('hell').length).to.equal(10)
    })

    it('should suggest words based on the dictionary', () => {
      expect(trie.suggest()).to.equal('Input a word!')
      trie.count()
      expect(trie.wordCount).to.be.above(200000)
      expect(trie.suggest('hell')).to.deep.equal([
        'helladian',
        'helladic',
        'helladotherium',
        'hellandite',
        'hellanodic',
        'hellbender',
        'hellborn',
        'hellbox',
        'hellbred',
        'hellbroth' ])
    })
    describe('select function', () => {
      it(`should traverse the tree for the length of the
       word and incremenet the frequency`, () => {
        expect(trie.root.children.h.children.i.frequency).to.equal(0)
        trie.select('hi')
        expect(trie.root.children.h.children.i.frequency).to.equal(1)
      })

      it('should order suggestions by frequency', () => {
        trie.select('hellbox')
        expect(trie.suggest('hell')).to.deep.equal([
          'hellbox',
          'helladian',
          'helladic',
          'helladotherium',
          'hellandite',
          'hellanodic',
          'hellbender',
          'hellborn',
          'hellbred',
          'hellbroth' ])
      })
    })

  })

})
