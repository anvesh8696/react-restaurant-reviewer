import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore as create } from 'redux';
import { combineReducers, routerReducer, stateTransformer } from 'redux-seamless-immutable';

import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import { landingReducer } from 'components/routes/Landing/LandingModule';

const RootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    landing: landingReducer,
    ...asyncReducers
  });
};

export const createStore = (initialState = {}, history) => {
  const loggerMiddleware = createLogger({
    stateTransformer: stateTransformer
  });
  const middleware = [thunkMiddleware, promiseMiddleware, routerMiddleware(history), loggerMiddleware];
  const store = create(
    RootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware)
    )
  );
  store.asyncReducers = {};
  return store;
};
