import { combineReducers } from 'redux';
import CurrencyReducer from './reducer_currency';
import StatsReducer from './reducer_stats';

const rootReducer = combineReducers({
  currency: CurrencyReducer,
  stats: StatsReducer
});

export default rootReducer;