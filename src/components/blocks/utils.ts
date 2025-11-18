export const getBaseAnimation = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: index * 0.1 }
});

export const getBlockClassName = (blockClassName?: string, defaultClass?: string) =>
  `${defaultClass || ''} ${blockClassName || ''}`.trim();