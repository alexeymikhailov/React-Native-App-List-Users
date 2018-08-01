import {
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import UsersReducer from '../reducers/UsersReducer';

const rootReducer=combineReducers({
  UsersReducer
});

const configureStore=() => {
  let store=createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
  );

  return store;
};

export default configureStore;
