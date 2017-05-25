import { expect } from 'chai';
import Node from '../scripts/Node.js';

describe('Node constructor', () => {

  it('should instantiate a node', () => {
    let nodeDiggity = new Node()

    expect(nodeDiggity).to.be.instanceOf(Node)
  })

  it('should have a letter', () => {
    let nodeDiggity = new Node('a');

    expect(nodeDiggity.letter).to.equal('a')
  })

})
