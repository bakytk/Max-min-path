class Tree {
  constructor(val) {
    this.val = val;
    this.children = [];
  }

  addChild(val) {
    // Create a new Tree from the given value
    const tree = new Tree(val);
    this.children.push(tree);
    return tree;
  }

  isDescendant(tree) {
    if (this.children.includes(tree)) {
      return true;
    }
    for (let child of this.children) {
      if (child.isDescendant(tree)) {
        return true;
      }
    }
    return false;
  }
}

export default Tree;
