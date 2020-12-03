import { Tokens } from './tokens';

export class RespLogin {
  flag: boolean;
  msg: string;
  tokens: Tokens;
}

export class RespSignup {
  flag: boolean;
  msg: string;
}

export class RespPassword {
  flag: boolean;
  msg: string;
}

export class RespAuthentication {
  flag: boolean;
  msg: string;
}

export class RespProfile {
  emailAddress: string;
  personTypeId: string;
  personTypeOther: string;
  firstName: string;
  lastName: string;
  affiliationId: string;
  affiliationName: string;
  affiliationNameOther: string;
  affiliationCenterId: string;
  orcid: string;
  country: string;
  image: string;
}

