import _ from 'lodash';
import prettyBytes from 'pretty-bytes';

const formatRegion = (regions: string[]) =>
  regions.map((region) => {
    if (region === 'AFRICA') return 'Africa';
    if (region === 'ASIA_NOT_GREATER_CHINA') return 'Asia (excl. Greater China)';
    if (region === 'EUROPE') return 'Europe';
    if (region === 'GREATER_CHINA') return 'Greater China';
    if (region === 'NORTH_AMERICA') return 'North America';
    if (region === 'OCEANIA') return 'Oceania';
    if (region === 'SOUTH_AMERICA') return 'South America';
    if (region === 'GLOBAL') return 'Global';
    if (region === 'OTHER') return 'Other';
    return region;
  });

export const formatData = (verifiers) =>
  verifiers.map((verifier: any, index: any) => {
    return {
      ...verifier,
      key: index,
      name: verifier.name,
      organization: verifier.organization || '–',
      region: (_.isArray(verifier.region) && formatRegion(verifier.region)) || ['–'],
      regionRaw: (_.isArray(verifier.region) && verifier.region) || ['–'],
      addressId: verifier.addressId || '–',
      addressKey: verifier.addressKey || '–',
      issueUrl: verifier.issueUrl || '#',
      clientsCount: verifier.clientsCount,
      datacapAvailable: prettyBytes(Number(BigInt(verifier.hasDatacap.available).toString()), {
        binary: true,
      }),
      datacapAvailableRaw: Number(BigInt(verifier.hasDatacap.available).toString()),
      datacapAllocated: prettyBytes(Number(BigInt(verifier.hasDatacap.allocated).toString()), { binary: true }),
      datacapAllocatedRaw: Number(BigInt(verifier.hasDatacap.allocated).toString()),
      datacapTotal: prettyBytes(Number(BigInt(verifier.hasDatacap.total).toString()), { binary: true }),
      datacapTotalRaw: Number(BigInt(verifier.hasDatacap.total).toString()),
      averageTtd: verifier.hasStats.timeToDatacap.averageTtd || '–',
      averageTtdRaw: verifier.hasStats.timeToDatacap.averageTtdRaw || 999999999,
      averageLdnTtd: verifier.hasStats.ldnTimeToDatacap.averageTtd || '–',
      averageLdnTtdRaw: verifier.hasStats.ldnTimeToDatacap.averageTtdRaw || 999999999,
    };
  });
