initialState = {
    nameState: 'name'
}

const TOGGLE_NAME_STATE = 'ui/toggle_name_state'

export function toggleNameState() {
    return (dispatch, getState) => {
        const { nameState } = getState().ui

        dispatch({
            type: TOGGLE_NAME_STATE,
            payload: nameState === 'name' ? 'fullName' : 'name'
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_NAME_STATE:
            return { ...state, nameState: action.payload }
        default:
            return state;
    }
}