import axios from "axios";

export const FETCH_EXCHANGE = "FETCH_EXCHANGE";
export const FETCH_STATS = "FETCH_STATS";
export const ROOT_URL    = "/api/";

export function fetchExchange(amount, base, target) {
    const request = axios.get(`${ROOT_URL}calculate_exchange?base=${base}&target=${target}&amount=${amount}`);
    
    return {
        type: FETCH_EXCHANGE,
        payload: request
    };
}

export function fetchStats() {
    const request = axios.get(`${ROOT_URL}stats`);
    
    return {
        type: FETCH_STATS,
        payload: request
    };
}