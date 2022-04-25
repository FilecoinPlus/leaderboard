import _ from 'lodash';
import moment from 'moment';

export const addHttpsIfNotLocal = (url: any) => {
  // console.log('process.env.IS_LOCAL ->', process.env.IS_LOCAL);
  if (process.env.IS_LOCAL) {
    return url;
  }
  return 'https://' + url;
};

const humanizeDate = (seconds: any) =>
  moment.duration(seconds, 'seconds').humanize();

export const getAverageTtd = (secondsToDatacapList: any) => {
  if (_.isEmpty(secondsToDatacapList)) {
    return { averageTtdInSeconds: null, averageTtdInDuration: null };
  }

  const sumInSeconds = secondsToDatacapList.reduce(
    (previous: any, current: any) => previous + current
  );

  const averageTtdInSeconds = Number(
    sumInSeconds / secondsToDatacapList.length
  ).toFixed();
  const averageTtdInDuration = humanizeDate(averageTtdInSeconds);

  const datesHumanized = secondsToDatacapList.map((v: any) => humanizeDate(v));

  return {
    averageTtdInSeconds,
    averageTtdInDuration,
  };
};

export const isAddressKey = (address) => address.length >= 14 && address.length <= 100;
export const isAddressId = (address) => address.length <= 13;
