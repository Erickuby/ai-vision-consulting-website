export function navigateToPath(path: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (currentPath === path) {
    return;
  }

  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
}

export function shouldHandleClientNavigation(event: {
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  button: number;
}) {
  return !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0);
}
