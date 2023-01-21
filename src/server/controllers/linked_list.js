class Node {
  constructor(value) {
    this.name = "node";
    this.value = value;
    this.next = null;
  }
  set_next(node) {
    //console.log(this.name);
    this.next = node;
  }
}

class LinkedList {
  constructor(value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1;
  }

  add(value, index = null) {
    let newNode = new Node(value);
    let current = this.head;
    let pointer = 0;
    if (index) {
      //non_root only
      while (pointer < index) {
        //insert in the middle
        current = current.next;
        pointer++;
      }
      let afterNew = current;
      current.set_next(newNode);
      newNode.set_next(afterNew);
      if (index === this.length - 1) {
        this.tail = newNode;
      }
    } else {
      //append
      this.tail.set_next(newNode);
      this.tail = newNode;
    }
    this.length++;
  }

  list() {
    let values = [];
    let current = this.head;
    let pointer = 0;
    while (pointer < this.length) {
      values.push(current.value);
      current = current.next;
      pointer++;
    }
    return values;
  }

  getLength() {
    return this.length;
  }
}

module.exports.LinkedList = LinkedList;

//seed
let llist = new LinkedList(50);

//grow
[70, 50, 20, 3, 5, 10].forEach((v) => llist.add(v));

//list
console.log(llist.getLength());
console.log(llist.list());
