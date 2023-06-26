import ExtendedError from "../utils/ExtendedError";

export default function buildMakeAuthorization({
  tokenSign,
  tokenVerify,
  comparePw,
  encryptPw,
}: buildMakeAuthorizationParameters) {
  return async function makeAuthorization({
    userArr, //Object Of User(s) We Wanna Add To System
    registerSecret, //Register Secret From Env (Only Admin Can Have It)
    username, //Username From Request
    password, //Password From Request
    refreshToken, //Refresh Token From Request
    accessToken, //Access Token From Request
  }: makeAuthorizationParameters): Promise<makeAuthorizationReturn> {
    try {
      //Change In Env
      const REGISTER_SECRET = <string>process.env.REGISTER_SECRET;
      const ACCESS_TOKEN_SECRET = <string>process.env.ACCESS_TOKEN_SECRET;
      const REFRESH_TOKEN_SECRET = <string>process.env.REFRESH_TOKEN_SECRET;
      const ACCESS_TOKEN_EXPIRE = <string>process.env.ACCESS_TOKEN_EXPIRE;
      const REFRESH_TOKEN_EXPIRE = <string>process.env.REFRESH_TOKEN_EXPIRE;

      // Make User Array (Encrypt Passwords)
      const getUserArr = async () => {
        //Check That User(s) Should Be Array Of Object(s) And Contains "username" and "password"
        if (
          !(
            Array.isArray(userArr) &&
            userArr.length &&
            userArr.every((element) => typeof element === "object") &&
            userArr.every((element) => Object.entries(element).length !== 0) &&
            userArr.every(
              (element) =>
                element.hasOwnProperty("username") &&
                element.hasOwnProperty("password")
            )
          )
        )
          throw new ExtendedError(
            "Invalid User(s) Format, It Should Be Array Of Object(s) That Contains 'username' and 'password'",
            400
          );
        //Encrypt Passwords Of Users
        let encryptedUserArr: object[] = [];
        let errors = new Set();
        const pwRegex =
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        let promises: any = [];
        for (const user of userArr) {
          if (!pwRegex.test(user.password)) {
            errors.add(
              `Password :${user.password} is not a valid password in User:${user.username}, password must contain upper case, lower case, number ,special letters`
            );
          }
          promises.push(encryptPw({ value: user.password }));
        }
        if (errors.size > 0) throw { message: Array.from(errors) };
        const passwords = await Promise.all(promises);
        passwords.forEach((password, i) => {
          encryptedUserArr.push({ username: userArr[i].username, password });
        });
        return encryptedUserArr;
      };

      //Compare Register Secret
      const compareRegisterSecret = () => registerSecret === REGISTER_SECRET;

      //Token Sign
      const getAccessToken = () => {
        return tokenSign({
          payload: { username },
          secret: ACCESS_TOKEN_SECRET,
          options: { expiresIn: ACCESS_TOKEN_EXPIRE },
        });
      };
      const getRefreshToken = () => {
        return tokenSign({
          payload: { username },
          secret: REFRESH_TOKEN_SECRET,
          options: { expiresIn: REFRESH_TOKEN_EXPIRE },
        });
      };

      //Token Verify
      const getVerifiedRefreshToken = () => {
        return tokenVerify({
          token: refreshToken,
          secret: REFRESH_TOKEN_SECRET,
        });
      };
      const getVerifiedAccessToken = () => {
        return tokenVerify({
          token: accessToken,
          secret: ACCESS_TOKEN_SECRET,
        });
      };
      const verifyRefreshTokenAndGetAccessToken = () => {
        const verifiedToken = tokenVerify({
          token: refreshToken,
          secret: REFRESH_TOKEN_SECRET,
        });
        const username = verifiedToken?.username;
        if (!username) throw Error("Username undefiend");
        const accessToken = tokenSign({
          payload: { username },
          secret: ACCESS_TOKEN_SECRET,
          options: { expiresIn: ACCESS_TOKEN_EXPIRE },
        });
        return { verifiedToken, accessToken };
      };

      //Encrypt And Compare Passwords
      const getEncryptedPassword = async () => {
        return await encryptPw({ value: password });
      };

      const getComparedPassword = async (hashedPassword: string) => {
        return await comparePw({
          hashedValue: hashedPassword,
          value: password,
        });
      };

      return Object.freeze({
        getUsername: () => username || undefined,
        getPassword: () => password || undefined,
        getUserArr,
        compareRegisterSecret,
        getAccessToken,
        getRefreshToken,
        getVerifiedRefreshToken,
        getVerifiedAccessToken,
        verifyRefreshTokenAndGetAccessToken,
        getEncryptedPassword,
        getComparedPassword,
      });
    } catch (err) {
      throw err;
    }
  };
}

//TS Interfaces
import { JwtPayload } from "jsonwebtoken";

interface userArrObj {
  username: string;
  password: string;
}

interface makeAuthorizationParameters {
  userArr?: [userArrObj];
  registerSecret?: string;
  username?: string;
  password?: string;
  refreshToken?: string;
  accessToken?: string;
}

interface verifyRefreshTokenAndGetAccessTokenReturn {
  verifiedToken: JwtPayload;
  accessToken: string;
}

interface makeAuthorizationReturn {
  getUsername: () => string | undefined;
  getPassword: () => string | undefined;
  getUserArr: () => Promise<object[]>;
  compareRegisterSecret: () => boolean;
  getAccessToken: () => string;
  getRefreshToken: () => string;
  getVerifiedRefreshToken: () => JwtPayload;
  getVerifiedAccessToken: () => JwtPayload;
  verifyRefreshTokenAndGetAccessToken: () => verifyRefreshTokenAndGetAccessTokenReturn;
  getEncryptedPassword: () => Promise<string | null>;
  getComparedPassword: (hashedPassword: string) => Promise<boolean>;
}

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

interface buildMakeAuthorizationParameters {
  tokenSign: ({ payload, secret, options }: tokenSignParameters) => string;
  tokenVerify: ({ token, secret }: tokenVerifyParameters) => JwtPayload;
  encryptPw: ({ value }: encryptPwParameters) => Promise<string | null>;
  comparePw: ({ value, hashedValue }: comparePwParameters) => Promise<boolean>;
}
