import _ from 'lodash';
import moment from 'moment';
import * as utils from '../utils/general';

const verifier = Object.create({});

verifier.getDatacap = () => {};
verifier.getAverageTtd = (secondsToDatacapList: any) => {
  if (_.isEmpty(secondsToDatacapList)) {
    return { averageTtdInSeconds: null, averageTtdInDuration: null };
  }

  const sumInSeconds = secondsToDatacapList.reduce((previous: any, current: any) => previous + current);

  const averageTtdInSeconds = Number(sumInSeconds / secondsToDatacapList.length).toFixed();
  const averageTtdInDuration = utils.humanizeDate(averageTtdInSeconds);

  const datesHumanized = secondsToDatacapList.map((v: any) => utils.humanizeDate(v));

  return {
    averageTtdInSeconds,
    averageTtdInDuration,
  };
};

verifier.getVerifiedClients = async (verifierAddressId: string) => {
  const res = await fetch(
    `https://api.filplus.d.interplanetary.one/public/api/getVerifiedClients/${verifierAddressId}`,
    {
      headers: {
        'x-api-key': `${process.env.INTERPLANETARY_ONE_API_KEY}`,
      },
    },
  );
  const data = await res.json();

  return data;
};

export default verifier;
