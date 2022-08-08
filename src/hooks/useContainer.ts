/**
 * 获取装入指定容器的 id 节点
 * @param id 标识符
 * @param container 装入的容器
 * @param className 容器类名（可选）
 */
export function useContainer(id: string, container: Element, className?: string) {
  let result = document.querySelector(`#${id}`);
  if (!result) {
    result = document.createElement('div');
    result.className = className ?? id;
    result.id = id;
    container.append(result);
  }
  return result;
}
