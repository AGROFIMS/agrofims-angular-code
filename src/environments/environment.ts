// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // baseUrl: 'https://con.agrofims.org/agrofims/api/app',
  // baseUrl: 'https://con.agrofims.org/agrofims/api/dev/0369/app/',

  // new 2022 with Metrika
  baseUrl: "https://con.agrofims.org/agrofims/api/prod/0369/app/",
  // baseUrlAuth: 'http://localhost:4000/api/auth',
  baseUrlAuth: "https://dev.agrofims.org/api/auth",
  // baseUrlAuth: '',
};
