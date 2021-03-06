import {db} from '@services'

const initialState = {
    inLobby: false,
    inGame: false,
    roomId: null,
    timeOffset: 0,
}

const PLAYER_IN_LOBBY = 'loading/player_in_lobby'
const PLAYER_IN_GAME = 'loading/player_in_game'

const RESET = 'loading/reset'

const GET_TIMEOFFSET = 'loading/get-timeoffset'

export function inLobbyStatus(roomId) {
    return (dispatch) => {
        dispatch({
            type: PLAYER_IN_LOBBY,
            payload: roomId
        })
    }
}

export function inGameStatus() {
    return (dispatch) => {
        dispatch({
            type: PLAYER_IN_GAME
        })
    }
}

export function reset() {
    return (dispatch) => {
        dispatch({
            type: RESET
        })
    }
}

export function getTimeOffset() {
    return async (dispatch) => {
        let dt = await db.get('.info/serverTimeOffset')
        dispatch({
            type: GET_TIMEOFFSET,
            payload: dt
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case PLAYER_IN_LOBBY:
            return { ...state, inLobby: true, roomId: action.payload }
        case PLAYER_IN_GAME:
            return { ...state, inGame: true }
        case RESET:
            return initialState;
        case GET_TIMEOFFSET:
            return { ...state, timeOffset: action.payload }
        default:
            return state;
    }
}