/**
 * check if element is visible in browser view port
 *
 * created with chatGPT
 */
export function isElementInView($element: HTMLElement) {
  var bounding = $element.getBoundingClientRect();

  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}
/**
 * check if an element is currently scrollable
 *
 * created with chatGPT
 */

export function isScrollable(element: HTMLElement | null) {
  return element && element.clientHeight < element.scrollHeight;
}

/**
 * ensure a given child element is within the parent's visible scroll area
 * if the child is not visible, scroll the parent
 *
 * created with chatGPT
 */
export function maintainScrollVisibility(activeElement: HTMLElement, scrollParent: HTMLElement, opt?: Options) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;
  const extraOffset = opt?.offset ?? 0;

  // I subtract 6px and add 6px to the scroll position to account for the padding
  // on the listbox element
  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop - extraOffset);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight + extraOffset);
  }
}

export type Options = {
  offset?: number
};
