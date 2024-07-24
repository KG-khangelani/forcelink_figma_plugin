// Main plugin code
figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'track-elements') {
        const nodes = figma.currentPage.children;
        const elements = [];

        function traverse(node, depth = 0) {
            elements.push({
                id: node.id,
                name: node.name,
                type: node.type,
                depth: depth,
                childrenCount: node.children ? node.children.length : 0
            });

            if (node.children) {
                for (const child of node.children) {
                    traverse(child, depth + 1);
                }
            }
        }

        nodes.forEach(node => traverse(node));

        figma.ui.postMessage({ type: 'tracked-elements', elements: elements });
    }
};