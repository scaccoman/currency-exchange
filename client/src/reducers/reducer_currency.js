import { FETCH_EXCHANGE } from "../actions";

export default function(state = null, action) {
    switch (action.type) {
         case FETCH_EXCHANGE:
            return action.payload.data || state;
        default:
            return state;
    }
}