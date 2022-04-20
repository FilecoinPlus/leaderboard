export const resolvers = {
  Query: {
    verifiersFromInterPlanetaryOne: (_: any, __: any, { dataSources }: any) =>
      dataSources.interplanetaryOneAPI.getAllVerifiers(),
    // verifierFromInterPlanetaryOne: (
    //   _: any,
    //   { id }: any,
    //   { dataSources }: any
    // ) => dataSources.interplanetaryOneAPI.getVerifierById({ verifierId: id }),
    // verifiers: (_: any, __: any, { dataSources }: any) =>
    //   dataSources.verifiersAPI.getAllVerifiers(),
  },
  // Verifier: {
  //   name: async (parent: any, args: any, { dataSources }: any, info: any) => {
  //     const verifierFromIPO =
  //       await dataSources.interplanetaryOneAPI.getVerifierById({
  //         verifierId: 'f0107408',
  //       });
  //     // console.log(verifierFromIPO);
  //     return `${verifierFromIPO.name}`;
  //   },
  // },
};
