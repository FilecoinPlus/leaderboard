export async function mergeVerifiersFromMultipleSources() {
  const API_ENDPOINTS = {
    OUR_OWN: 'http://localhost:3000/api/getVerifiers',
    KEYKO: 'http://localhost:3000/api/getVerifiersFromKeyko',
    INTERPLANETARY_ONE:
      'http://localhost:3000/api/getVerifiersFromInterplanetaryOne',
  };

  const keykoRes = await fetch(API_ENDPOINTS.KEYKO);
  const keykoData = await keykoRes.json();

  // console.log(keykoData);

  const data = keykoData;

  return data;
}
