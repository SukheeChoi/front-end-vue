export class Menu {
  constructor(title, name, children = [], type = '', path = '') {
    this.title = title;
    this.name = name;
    this.children = children;
    this.type = type;
    this.path = path;
  }

  static create(...args) {
    return new Menu(...args);
  }
}

class Collection {
  constructor(arr = []) {
    this._arr = arr;
  }
  clear() {
    this._arr = [];
  }
  get length() {
    return this._arr.length;
  }
  get isEmpty() {
    return this.length === 0;
  }
}

export class Queue extends Collection {
  constructor() {
    super();
  }
  enqueue(...items) {
    this._arr.push(...items);
  }
  dequeue() {
    return this._arr.shift();
  }
}

export class Stack extends Collection {
  constructor() {
    super();
  }
  push(...items) {
    this._arr.push(...items);
  }
  pop() {
    return this._arr.pop();
  }
  peek() {
    return this._arr.at(-1);
  }
}
