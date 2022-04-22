export const getRegion = (v): any => /^<?.*region[^:]*:([^\n]+)<+?/im.exec(v);
export const getAddress = (v): any => /^<?.*address[^:]*:([^\n]+)<+?/im.exec(v);
export const getName = (v): any => /^<?.*name[^:]*:([^\n]+)<+?/im.exec(v);
export const getOrganization = (v): any =>
  /^<?.*organization[^:]*:([^\n]+)<+?/im.exec(v);
export const getWebsiteAndSocial = (v): any =>
  /^<?.*website.{0,3}social[^:]*:([^\n]+)<+?/im.exec(v);
export const getApprovedAddress = (v): any =>
  /approved.*[\r\n]*.*address.*[\r\n]*.*\s+(f[0-9]+[^\r]+)/im.exec(v);
