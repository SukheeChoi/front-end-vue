
class MenuMaker {
  constructor() {
    this.rootNode = null;
  }
  tree(data, isRoot = true) {
    //console.log(data);
    var node = this.node(data, isRoot);
    
    if (isRoot) {
      this.rootNode = node;
    }

    if (data.children) {
      for (var i = 0; i < data.children.length; i++) {
        this.rootNode.children.push(this.tree(data.children[i], false));
      }
    }

    return node;
  }

  node(data, isRoot) {
    let route = {
      path: isRoot ? '/' + data.path : data.path,
      name: data.name,
      title: data.title,
      component: isRoot
        ? () => import('@/views/AppMain')
        : () => import('@@' + this.rootNode.path + '/views/' + data.path),
      children: data.children ? [] : undefined,
      redirect: undefined,
    };
    return route;
  }
}
export default new MenuMaker();

