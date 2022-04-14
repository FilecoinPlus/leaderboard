export const addHttpsIfNotLocal = (url: any) => {
  if (process.env.IS_LOCAL && !process.env.IS_LOCAL) {
    return 'https' + url;
  }
  return url;
};
