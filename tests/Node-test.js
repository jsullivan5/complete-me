import { expect } from 'chai';
import Node from '../scripts/Node.js';

describe('Node constructor', () => {

  let nodeDiggity;

  beforeEach(() => {
    nodeDiggity = new Node('a')
  })

  it('should instantiate a node', () => {

    expect(nodeDiggity).to.be.instanceOf(Node)
  })

  it('should have a letter', () => {

    expect(nodeDiggity.letter).to.equal('a')
  })

  it('should have a default frequency', () => {

    expect(nodeDiggity.frequency).to.equal(0)
  })

  it('should have an isWord default', () => {

    expect(nodeDiggity.isAWord).to.equal(false)
  })

  it('should no children as a default', () => {

    expect(nodeDiggity.children).to.deep.equal({})
  })

})
