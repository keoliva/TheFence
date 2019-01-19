import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AsyncStorage } from 'react-native';
import userTokenReducer from './userToken';
import locationReducer from './location';

const reducer = combineReducers({
	userToken: userTokenReducer,
	location: locationReducer,
});
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

store.subscribe(() => {
	const userToken = store.getState().userToken;
	AsyncStorage.setItem('USER_TOKEN', JSON.stringify(userToken));
});

export default store;
export * from './userToken';
export * from './location';
