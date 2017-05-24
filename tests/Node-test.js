import { expect } from 'chai';
import Node from '../scripts/Node.js';

describe('Node constructor', () => {

  it('should instantiate a node', () => {
    let nodeIggity = new Node()
    expect(nodeIggity).to.be.instanceOf(Node)
  })

  it('should have a letter', () => {
    let nodeIggity = new Node('a');

    expect(nodeIggity.letter).to.equal('a')
  })

})
