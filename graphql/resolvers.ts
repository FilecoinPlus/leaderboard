export const resolvers = {
  Query: {
    verifiersFromInterPlanetaryOne: (_: any, __: any, { dataSources }: any) =>
      dataSources.interplanetaryOneAPI.getAllVerifiers(),
    // verifierFromInterPlanetaryOne: (
    //   _: any,
    //   { id }: any,
    //   { dataSources }: any
    // ) => dataSources.interplanetaryOneAPI.getVerifierById({ verifierId: id }),
  },
};
