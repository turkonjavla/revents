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

  
  if(process.env.NODE_ENV !== 'production') {
    if(module.hot) {
      module.hot.accept('../reducers/rootReducer.js', () => {
        const newRootReducer = require('../reducers/rootReducer').default;
        store.replaceReducer(newRootReducer);
      })
    }
  }

  return store;
}