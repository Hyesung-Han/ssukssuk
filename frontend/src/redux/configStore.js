import { persistReducer } from 'redux-persist';
import { createStore, combineReducers } from 'redux';
import { AuthReducer } from './reducers/AuthReducer';
import { FarmReducer } from './reducers/FarmReducer';
// sessionStorage 사용
import sessionStorage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  //sessionStorage에 저장
  storage: sessionStorage,
};

const allReducers = combineReducers({
  Auth: AuthReducer,
  Farm: FarmReducer,
});

const store = createStore(
  persistReducer(persistConfig, allReducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
