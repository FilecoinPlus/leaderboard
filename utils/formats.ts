import prettyBytes from 'pretty-bytes';

export const formatData = (props: any) => props.notaries
.filter((v: any) => !!v.name)
.filter((v: any) => v.name != 'n/a')
.filter((v: any) => !/Testing[^a-zA-Z]*Deleted/i.test(v.name))
.map((notary: any, index: any) => {
  const notaryName = notary.name.match(/(^[^\(]+)/i);
  const orgName = notary.name.match(/\(([^\(\)]+)\)/i);
  return {
    key: index,
    name: notaryName && notaryName[0],
    organization: orgName && orgName[1],
    location: '–',
    addressId: notary.addressId,
    addressKey: notary.address || '–',
    url: /^https?/i.test(notary.auditTrail) && notary.auditTrail,
    clients: notary.verifiedClientsCount,
    datacapAvailable: prettyBytes(Number(notary.allowance), {
      binary: true,
    }),
    datacapAvailableRaw: Number(notary.allowance),
    // datacapAllocated: bytesToSize(Number((Number(notary.initialAllowance)-Number(notary.allowance))))
    datacapAllocated: prettyBytes(
      Number(notary.initialAllowance) - Number(notary.allowance),
      { binary: true }
    ),
    datacapAllocatedRaw:
      Number(notary.initialAllowance) - Number(notary.allowance),
    datacapTotal: prettyBytes(
      Number(notary.initialAllowance) + Number(notary.allowance),
      { binary: true }
    ),
    datacapTotalRaw:
      Number(notary.initialAllowance) + Number(notary.allowance),
    averageTtd: notary.ttdAverages.averageTtdInDuration || '–',
    averageTtdRaw: notary.ttdAverages.averageTtdInSeconds || 999999999,
  };
});
