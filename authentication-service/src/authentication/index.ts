import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import buildMakeAuthorization from "./authentication";

//Token Functions
const tokenSign = ({ payload, secret, options }: tokenSignParameters) => {
  if (Object.keys(payload).length == 0) return "";
  return jwt.sign(payload, secret, options);
};
const tokenVerify = ({ token, secret }: tokenVerifyParameters) => {
  if (!token) return {};
  return jwt.verify(token, secret) as JwtPayload;
};

//Password Hash Functions
const encryptPw = async ({ value }: encryptPwParameters) => {
  try {
    if (!value) return null;
    const encrypt = await bcrypt.hash(value, 10);
    return encrypt;
  } catch (err) {
    throw err;
  }
};
const comparePw = async ({ value, hashedValue }: comparePwParameters) => {
  try {
    if (!value || !hashedValue) return false;
    const compare = await bcrypt.compare(value, hashedValue);
    return compare;
  } catch (err) {
    throw err;
  }
};

const makeAuthorization = buildMakeAuthorization({
  tokenSign,
  tokenVerify,
  encryptPw,
  comparePw,
});

export default makeAuthorization;

//Interfaces
interface tokenSignParameters {
  payload: {
    username: string | undefined;
  };
  secret: string;
  options: {
    expiresIn: string;
  };
}

interface tokenVerifyParameters {
  token: string | undefined;
  secret: string;
}

interface encryptPwParameters {
  value: string | undefined;
}

interface comparePwParameters {
  value: string | undefined;
  hashedValue: string | undefined;
}
