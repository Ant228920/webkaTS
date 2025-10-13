import { expect } from 'chai';
import { Library } from '../src/library.js';

describe('Library class', () => {
  let lib: Library<number>;

  beforeEach(() => {
    lib = new Library<number>();
    lib.add(5);
    lib.add(10);
  });

  it('should add a new item', () => {
    lib.add(15);
    expect(lib.getAll()).to.deep.equal([5, 10, 15]);
  });

  it('should remove item by predicate', () => {
    lib.remove((item) => item === 5); // видаляємо 5
    expect(lib.getAll()).to.deep.equal([10]);
  });

  it('should find item by predicate', () => {
    const found = lib.find((item) => item === 10);
    expect(found).to.equal(10);
  });

  it('should return undefined if item not found', () => {
    const found = lib.find((item) => item === 999);
    expect(found).to.be.undefined;
  });

  it('should return all items', () => {
    expect(lib.getAll()).to.deep.equal([5, 10]);
  });
});
