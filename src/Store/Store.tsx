import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../Reducer/Reducer'
import sagas from '../Sagas'

const reduxSagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(reduxSagaMiddleware));
reduxSagaMiddleware.run(sagas)

export default store;
