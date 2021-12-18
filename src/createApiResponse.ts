export const createApiResponse = (items: any[]) => {
  return {
    data: {
      items,
    },
  };
};
