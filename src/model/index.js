class Menu {
  constructor(title, name, children) {
    this.title = title;
    this.name = name;
    this.children = children;
  }

  static create(...args) {
    return new Menu(...args);
  }
}

export { Menu };
