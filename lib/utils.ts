export const getHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.API_KEY}`,
  };
};
