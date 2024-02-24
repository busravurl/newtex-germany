import { UPDATE_TOKEN , LOGIN_SUCCESS, LOGOUT, UPDATE_USER_DATA, UPDATE_USER_INFO} from "../actionTypes"

// const updateToken = (token)=>{
//     return {
//         type: UPDATE_TOKEN,
//         payload:token
//     }
// }


// export {updateToken}

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user ,
});

export const logout = () => ({
  type: LOGOUT,
});

// export const updateUserInfo = (userInformation) => ({
//   type: UPDATE_USER_DATA,
//   payload: userInformation,
// });