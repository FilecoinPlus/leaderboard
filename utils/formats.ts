import _ from 'lodash';
import prettyBytes from 'pretty-bytes';

export const formatData = (props: any) =>
  props.notaries
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
        organization: notary.organization,
        location: notary.region || ['–'],
        addressId: notary.addressId || '–',
        addressKey: notary.addressKey || '–',
        // url: /^https?/i.test(notary.auditTrail) && notary.auditTrail,
        url:
          _.isNumber(notary.issueNumber) &&
          `https://github.com/filecoin-project/notary-governance/issues/${notary.issueNumber}`,
        clients: notary.verifiedClientsCount,
        datacapAvailable: prettyBytes(Number(notary.allowance), {
          binary: true,
        }),
        datacapAvailableRaw: Number(notary.allowance),
        // datacapAllocated: bytesToSize(Number((Number(notary.initialAllowance)-Number(notary.allowance))))
        datacapAllocated: prettyBytes(Number(notary.initialAllowance) - Number(notary.allowance), { binary: true }),
        datacapAllocatedRaw: Number(notary.initialAllowance) - Number(notary.allowance),
        datacapTotal: prettyBytes(Number(notary.initialAllowance) + Number(notary.allowance), { binary: true }),
        datacapTotalRaw: Number(notary.initialAllowance) + Number(notary.allowance),
        averageTtd: notary.ttdAverages.averageTtdInDuration || '–',
        averageTtdRaw: notary.ttdAverages.averageTtdInSeconds || 999999999,
      };
    });
