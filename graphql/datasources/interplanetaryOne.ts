import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

const FILECOIN_GENESIS_UNIX_EPOCH = 1598306400;
const convertHeightToUnix = (filEpoch: number) =>
  filEpoch * 30 + FILECOIN_GENESIS_UNIX_EPOCH;

class InterPlanetaryOneAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.filplus.d.interplanetary.one/public/api/';
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('x-api-key', `${process.env.INTERPLANETARY_ONE_API_KEY}`);
  }

  verifierReducer(verifier: any) {
    // let githubIssueNumber = verifier.auditTrail.match(/[0-9]+$/g);
    return {
      id: verifier.id || 0,
      name: verifier.name,
      organization: '',
      addressKey: verifier.address,
      addressId: verifier.addressId,
      githubIssueNumber: Number(verifier.auditTrail.match(/[0-9]+$/g)),
      startedAt: new Date(
        convertHeightToUnix(verifier.createdAtHeight) * 1000
      ).toISOString(),
      status: (!!verifier.removed && 'REMOVED') || 'ACTIVE',
      hasDatacap: {
        total: verifier.initialAllowance,
        allocated: verifier.allowance,
        available: verifier.initialAllowance - verifier.allowance,
      },
      hasStats: {
        averageTtd: 0,
      },
    };
  }

  async getAllVerifiers() {
    const response = await this.get('getVerifiers');
    const responseData = response.data;
    return Array.isArray(responseData)
      ? responseData.map((verifier: any) => this.verifierReducer(verifier))
      : [];
  }

  async getVerifierById({ verifierId }: any) {
    const response = await this.get('getVerifiers', { filter: verifierId });
    const responseData = response.data;
    return this.verifierReducer(responseData[0]);
  }

  getVerifiersByIds({ verifierIds }: any) {
    return Promise.all(
      verifierIds.map((verifierId: any) => this.getVerifierById({ verifierId }))
    );
  }
}

export { InterPlanetaryOneAPI };
