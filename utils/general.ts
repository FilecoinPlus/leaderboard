import _ from 'lodash';

export const addHttpsIfNotLocal = (url: any) => {
  // console.log('process.env.IS_LOCAL ->', process.env.IS_LOCAL);
  if (process.env.IS_LOCAL) {
    return url;
  }
  return 'https://' + url;
};

export const isAddressKey = (address: string) => address.length >= 14 && address.length <= 100;
export const isAddressId = (address: string) => address.length > 4 && address.length <= 13;
