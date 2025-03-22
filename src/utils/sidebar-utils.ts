export const isPathMatchingPattern = (
  pathname: string,
  pattern: string,
): boolean => {
  if (!pattern.includes(":")) {
    return pathname === pattern;
  }
  const regexPattern = pattern
    .replace(/\//g, "\\/")
    .replace(/:\w+/g, "[^\\/]+");

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
};

// ? - How to use
// const isExactMatch = props.pathname === props.url;

// const isActivePatternMatch =
//   Array.isArray(props.active) &&
//   props.active.some((activePattern) =>
//     isPathMatchingPattern(props.pathname, activePattern),
//   );

// const activeLink = isExactMatch || isActivePatternMatch;
