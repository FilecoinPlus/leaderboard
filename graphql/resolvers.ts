export const resolvers = {
  Query: {
    verifiersFromInterPlanetaryOne: (
      parent: any,
      args: any,
      context: any,
      info: any
    ) => context.dataSources.interplanetaryOneAPI.getAllVerifiers(),
    verifiers: async (parent: any, args: any, context: any, info: any) => {
      const verifiersFromIPO =
        await context.dataSources.interplanetaryOneAPI.getAllVerifiers();
      // console.log('verifiersFromIPO ->', verifiersFromIPO);
      return verifiersFromIPO.map((verifier: any) => {
        return { ...verifier, name: 'test' };
      });
    },
    // verifiers: (parent: any, args: any, { dataSources }: any, info: any) => {
    //   return { ...dataSources.interplanetaryOneAPI.getAllVerifiers() };
    // },
    // verifierFromInterPlanetaryOne: (
    //   _: any,
    //   { id }: any,
    //   { dataSources }: any
    // ) => dataSources.interplanetaryOneAPI.getVerifierById({ verifierId: id }),
    // verifiers: (_: any, __: any, { dataSources }: any) =>
    //   dataSources.verifiersAPI.getAllVerifiers(),
  },
  Verifier: {
    name: async (parent: any, args: any, context: any, info: any) => {
      // console.log('parent ->', parent);
      // console.log('args ->', args);
      // console.log('context ->', context);
      // console.log('info ->', info);
      return 'TestName2';
    },
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
