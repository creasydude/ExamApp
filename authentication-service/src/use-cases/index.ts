import makeRegister from "./register";
import makeLogin from "./login";
import makeRefreshToken from "./refreshToken";
import makeLougout from "./logout";
import Database from "../data-access";

const register = makeRegister({ Database });
const login = makeLogin({ Database });
const refreshToken = makeRefreshToken({ Database });
const logout = makeLougout({ Database });

//Export
const useCases = Object.freeze({
  register,
  login,
  refreshToken,
  logout,
});
export default useCases;
export { register, login, refreshToken, logout };
