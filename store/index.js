import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AsyncStorage } from 'react-native';
import accessTokenReducer from './accessToken';

const reducer = combineReducers({
	accessToken: accessTokenReducer,
});
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

//
store.subscribe(() => {
	const userToken = store.getState().accessToken;
	AsyncStorage.setItem('ACCESS_TOKEN', JSON.stringify(userToken));
});
export default store;
export * from './accessToken';
