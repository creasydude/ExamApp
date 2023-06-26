import makePostRegister from "./postRegister";
import makePostLogin from "./postLogin";
import makeGetRefreshToken from "./getRefreshToken";
import makePostLogout from "./postLogout";

import { register, login, refreshToken, logout } from "../use-cases";

const postRegister = makePostRegister({ register });
const postLogin = makePostLogin({ login });
const getRefreshToken = makeGetRefreshToken({ refreshToken });
const postLogout = makePostLogout({ logout });

//Export
const controllers = Object.freeze({
  postRegister,
  postLogin,
  getRefreshToken,
  postLogout,
});
export default controllers;
export { postRegister, postLogin, getRefreshToken, postLogout };
