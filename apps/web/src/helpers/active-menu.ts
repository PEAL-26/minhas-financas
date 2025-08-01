export const activeMenu = (href: string, pathname: string, start = true) => {
  if (start) pathname !== '/' && pathname.startsWith(href);

  return pathname === href;
};
