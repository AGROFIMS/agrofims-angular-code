// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  baseUrl: 'https://research.cip.cgiar.org/agrofims/api/app',
  baseUrlAuth: 'http://localhost:4000/api/auth',
  // baseUrlUser: 'http://localhost:4000/api/user',
  // baseUrlAuth: 'http://52.30.61.201:4000/api/auth',
  // baseUrlUser: 'http://52.30.61.201:4000/api/user',
};
