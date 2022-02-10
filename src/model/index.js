class Menu {
  /*
  constructor(title, name, children) {
    this.title = title;
    this.name = name;
    this.children = children;
  }
*/
  constructor(title, name, children = [], type="", path="") {
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

export { Menu };
