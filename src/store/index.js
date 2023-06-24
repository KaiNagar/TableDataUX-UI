import { createStore, combineReducers } from 'redux';
import { dataReducer } from './reducers/dataReducer';



const rootReducer = combineReducers({
  dataModule: dataReducer,
});

export const store = createStore(
  rootReducer,
);