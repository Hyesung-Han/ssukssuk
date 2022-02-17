const SET_FARM = 'setFarm';
const SET_FARM_INIT = 'setFarmInit';
const SET_FARM_NO='setFarmNo';
const SET_PATH = 'setPath';

const FarmInitialState = {
  farm: {
    farm_no: '',
    user_id: '',
    serial_no: '',
    farm_name: '',
    farm_regidate: '',
    farm_text: '',
    file_path: '',
  },
};

export const setFarm = farm => ({
  type: SET_FARM,
  farm,
});
export const setFarm_no = farm_no => ({
  type: SET_FARM_NO,
  farm_no,
});

export const setFarmInit = () => ({
  type: SET_FARM_INIT,
});

export const setPath = file_path => ({
  type: SET_PATH,
  file_path,
});

export const FarmReducer = (state = FarmInitialState, action) => {
  switch (action.type) {
    case SET_FARM:
      return {
        state,
        farm: action.farm,
      };
    case SET_FARM_INIT:
      return {
        state,
        farm: FarmInitialState.user,
      };
    case SET_PATH:
      state.farm.file_path = action.file_path;
      return { ...state };
    default:
      return state;
  }
};
