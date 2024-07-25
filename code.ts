figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'track-elements') {
    const nodes = figma.currentPage.children;
    const elements: Array<{ id: string, name: string, type: string, depth: number, childrenCount: number }> = [];

    function traverse(node: SceneNode, depth = 0) {
      elements.push({
        id: node.id,
        name: node.name,
        type: node.type,
        depth: depth,
        childrenCount: 'children' in node ? node.children.length : 0
      });

      if ('children' in node) {
        for (const child of node.children) {
          traverse(child, depth + 1);
        }
      }
    }

    nodes.forEach(node => traverse(node as SceneNode));

    figma.ui.postMessage({ type: 'tracked-elements', elements: elements });
  }
};