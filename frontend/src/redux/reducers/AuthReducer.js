const SET_TOKEN = 'setToken';
const SET_NICKNAME = 'setNickname';
const SET_INIT = 'setInit';

const AuthInitialState = {
  user: {
    token: '',
    user_id: '',
    user_nickName: '',
    status: '',
    user_code: '',
    code_name: '',
  },
};
export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const setNickname = user_nickName => ({
  type: SET_NICKNAME,
  user_nickName,
});

export const setInit = () => ({
  type: SET_INIT,
});

export const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        state,
        user: action.token,
      };
    case SET_NICKNAME:
      state.user.user_nickName = action.user_nickName;
      return { ...state };
    case SET_INIT:
      return {
        state,
        user: AuthInitialState.user,
      };
    default:
      return state;
  }
};
