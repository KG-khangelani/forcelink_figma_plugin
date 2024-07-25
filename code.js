"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__);
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'track-elements') {
        const nodes = figma.currentPage.children;
        const elements = [];
        function traverse(node, depth = 0) {
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
        nodes.forEach(node => traverse(node));
        figma.ui.postMessage({ type: 'tracked-elements', elements: elements });
    }
});
