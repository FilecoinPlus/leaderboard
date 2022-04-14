export const addHttpsIfNotLocal = (url: any) => {
  if (process.env.IS_LOCAL) {
    return;
  }
  return 'https://' + url;
};
