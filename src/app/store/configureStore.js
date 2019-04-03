import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

export const configureStore = (preloadedState) => {
  const middlewares = [];
  const middlewareEnchancer = applyMiddleware(...middlewares);

  const storeEnchancers = [middlewareEnchancer];
  const composedEncahncer = composeWithDevTools(...storeEnchancers);

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEncahncer
  );

  return store;
}