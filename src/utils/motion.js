export const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.15 },
  },
};

export const revealChild = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};
