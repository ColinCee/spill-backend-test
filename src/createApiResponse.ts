// Responses should be in Google JSON Style
// See https://google.github.io/styleguide/jsoncstyleguide.xml
export const createApiResponse = (items: any[]) => {
  return {
    data: {
      items,
    },
  };
};
