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

export const formatData = (props: any) =>
  props.notaries
    // TODO(alexxnica): move the filtering to the `data` repository.
    .filter((v: any) => !!v.name)
    .filter((v: any) => v.name != 'n/a')
    .filter((v: any) => !/Testing[^a-zA-Z]*Deleted/i.test(v.name))
    .map((notary: any, index: any) => {
      // const notaryName = notary.name.match(/(^[^\(]+)/i);
      // const orgName = notary.name.match(/\(([^\(\)]+)\)/i);
      // console.log('notary ->', notary);
      return {
        key: index,
        name: notary.name,
        organization: notary.organization || '–',
        location: (_.isArray(notary.region) && formatRegion(notary.region)) || ['–'],
        addressId: notary.addressId || '–',
        addressKey: notary.addressKey || '–',
        // url: /^https?/i.test(notary.auditTrail) && notary.auditTrail,
        url:
          _.isNumber(notary.issueNumber) &&
          `https://github.com/filecoin-project/notary-governance/issues/${notary.issueNumber}`,
        clients: notary.fromInterplanetaryOne.verifiedClientsCount,
        datacapAvailable: prettyBytes(Number(notary.fromInterplanetaryOne.allowance), {
          binary: true,
        }),
        datacapAvailableRaw: Number(notary.fromInterplanetaryOne.allowance),
        // datacapAllocated: bytesToSize(Number((Number(notary.fromInterplanetaryOne.initialAllowance)-Number(notary.fromInterplanetaryOne.allowance))))
        datacapAllocated: prettyBytes(
          Number(notary.fromInterplanetaryOne.initialAllowance) - Number(notary.fromInterplanetaryOne.allowance),
          { binary: true },
        ),
        datacapAllocatedRaw:
          Number(notary.fromInterplanetaryOne.initialAllowance) - Number(notary.fromInterplanetaryOne.allowance),
        datacapTotal: prettyBytes(
          Number(notary.fromInterplanetaryOne.initialAllowance) + Number(notary.fromInterplanetaryOne.allowance),
          { binary: true },
        ),
        datacapTotalRaw:
          Number(notary.fromInterplanetaryOne.initialAllowance) + Number(notary.fromInterplanetaryOne.allowance),
        averageTtd: notary.ttdAverages.averageTtd || '–',
        averageTtdRaw: notary.ttdAverages.averageTtdRaw || 999999999,
      };
    });
