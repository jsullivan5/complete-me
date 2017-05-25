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

  it('Should have an insert function', () => {
    expect(trie.insert()).to.be.a.function
  })

  it('Should throw an error without a word passed in',
  () => {
    expect(trie.insert()).to.equal('Pass in a word!');
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

  it('Should have an count function', () => {
    expect(trie.count()).to.be.a.function
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

  it('Should have an suggest function', () => {
    expect(trie.suggest()).to.be.a.function
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

    it('Should have an populate function', () => {
      expect(trie.populate).to.be.a.function
    })

    it('should populate the tree with the dictionary', () => {
      expect(trie.wordCount).to.equal(0);
      trie.count()
      expect(trie.wordCount).to.be.above(200000)

    })

    it('should return an array of 10 or less words', () => {
      //With dictionary words

      expect(trie.suggest()).to.equal('Input a word!')
      expect(trie.suggest('hell').length).to.equal(10)

      //With smaller sample

      let trie2 = new Trie()

      trie2.insert('morose')
      trie2.insert('moron')
      expect(trie2.suggest('mor').length).to.equal(2)
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

      it('Should have an select function', () => {
        expect(trie.select).to.be.a.function
      })

      it('Should throw an error without a word',
      () => {
        expect(trie.select()).to.equal('Input a word!')
      })

      it(`should traverse the tree for the length of the
       word and incremenet the frequency`, () => {
        expect(trie.root.children.h.children.i.frequency).to.equal(0)
        trie.select('hi')
        expect(trie.root.children.h.children.i.frequency).to.equal(1)
      })

      it('should order suggestions by frequency', () => {
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
        trie.select('hellbender')
        trie.select('hellbender')
        expect(trie.suggest('hell')).to.deep.equal([
          'hellbender',
          'hellbox',
          'helladian',
          'helladic',
          'helladotherium',
          'hellandite',
          'hellanodic',
          'hellborn',
          'hellbred',
          'hellbroth' ])
        trie.select('hellbroth')
        trie.select('hellbroth')
        trie.select('hellbroth')
        expect(trie.suggest('hell')).to.deep.equal([
          'hellbroth',
          'hellbender',
          'hellbox',
          'helladian',
          'helladic',
          'helladotherium',
          'hellandite',
          'hellanodic',
          'hellborn',
          'hellbred', ])
      })
    })

  })

})
