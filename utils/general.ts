import _ from 'lodash';
import moment from 'moment';
import {
  regionIsAfrica,
  regionIsAsiaNotGreaterChina,
  regionIsEurope,
  regionIsGreaterChina,
  regionIsNorthAmerica,
  regionIsOceania,
  regionIsSouthAmerica,
} from './regexes';

export const addHttpsIfNotLocal = (url: any) => {
  // console.log('process.env.IS_LOCAL ->', process.env.IS_LOCAL);
  if (process.env.IS_LOCAL) {
    return url;
  }
  return 'https://' + url;
};

export const humanizeDate = (seconds: any) => moment.duration(seconds, 'seconds').humanize();

export const getAverageTtd = (secondsToDatacapList: any) => {
  if (_.isEmpty(secondsToDatacapList)) {
    return { averageTtdInSeconds: null, averageTtdInDuration: null };
  }

  const sumInSeconds = secondsToDatacapList.reduce((previous: any, current: any) => previous + current);

  const averageTtdInSeconds = Number(sumInSeconds / secondsToDatacapList.length).toFixed();
  const averageTtdInDuration = humanizeDate(averageTtdInSeconds);

  const datesHumanized = secondsToDatacapList.map((v: any) => humanizeDate(v));

  return {
    averageTtdInSeconds,
    averageTtdInDuration,
  };
};

export const isAddressKey = (address: string) => address.length >= 14 && address.length <= 100;
export const isAddressId = (address: string) => address.length > 4 && address.length <= 13;

export const trimAndClean = (string: string) =>
  string
    ?.trim()
    ?.replace(/<\/?[^>]*>/gi, '')
    ?.replace(/^\[|\]$/gi, '');

export const normalizeVerifier = (verifier: {}) => {
  const normalizeRegion = (region) => region;
  return Object.fromEntries(
    Object.entries(verifier).map(([key, value]) => {
      let newValue;
      newValue = (_.isString(value) && value.trim()) || value;
      if (key === 'region' && _.isString(newValue)) {
        if (regionIsAfrica(newValue)) newValue = 'AFRICA';
        if (regionIsAsiaNotGreaterChina(newValue)) newValue = 'ASIA_NOT_GREATER_CHINA';
        if (regionIsEurope(newValue)) newValue = 'EUROPE';
        if (regionIsGreaterChina(newValue)) newValue = 'GREATER_CHINA';
        if (regionIsNorthAmerica(newValue)) newValue = 'NORTH_AMERICA';
        if (regionIsOceania(newValue)) newValue = 'OCEANIA';
        if (regionIsSouthAmerica(newValue)) newValue = 'SOUTH_AMERICA';
        newValue = [newValue];
      }

      if (key === 'organization' && _.isString(newValue)) {
        if (newValue === 'n/a' || newValue === 'None') newValue = null;
      }

      if (key === 'websiteAndSocial' && _.isString(newValue)) {
        if (newValue === 'n/a') newValue = null;
      }

      return [key, newValue];
    }),
  );
};

export const normalizeVerifiers = (verifiers: any[]) => verifiers.map((verifier) => normalizeVerifier(verifier));

export const defaultVerifier = {
  id: undefined,
  name: undefined,
  organization: undefined,
  location: undefined,
  addressKey: undefined,
  addressId: undefined,
  totalApprovals: undefined,
  githubUsername: undefined,
  githubAvatarUrl: undefined,
  githubIssueNumber: undefined,
  status: undefined,
  startedAt: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  hasDatacap: undefined,
  hasStats: undefined,
  hasClient: undefined,
  fromDatasource: undefined,
};
