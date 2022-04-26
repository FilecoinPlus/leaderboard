import _ from 'lodash';
import moment from 'moment';
import * as utils from '../utils/general'

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

export default verifier;
