import { FETCH_STATS } from "../actions";

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_STATS:
            return action.payload.data;
        default:
            return state;
    }
}