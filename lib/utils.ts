export const getHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.API_KEY}`,
  };
};

export const shuffleArray = <T>(array: Array<T>) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
