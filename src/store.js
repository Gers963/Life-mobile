import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = [thunk];

if (__DEV__) {
  middlewares.push();
}

export default createStore(
  reducers,
  undefined,
  applyMiddleware(...middlewares),
);
