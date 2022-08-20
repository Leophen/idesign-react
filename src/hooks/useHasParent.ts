/**
 * 触发节点是否在指定包裹层中
 * @param node 要判断的节点
 * @param parent 是否在该容器中
 * @returns true 为在反之不在
 */
export const useHasParent = (node: HTMLElement, parent: HTMLElement) => {
  while (node) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode as HTMLElement;
  }
  return false;
};
