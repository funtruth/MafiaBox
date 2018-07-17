import { combineReducers } from 'redux'

import ProfileReducer from '../modules/profile/ProfileReducer'
import LoadingReducer from '../modules/loading/LoadingReducer'
import MenuReducer from '../menu/MenuReducer'
import HomeReducer from '../modules/home/HomeReducer'
import LobbyReducer from '../modules/lobby/LobbyReducer'
import GameReducer from '../modules/game/GameReducer'
import InterfaceReducer from '../modules/gameUI/InterfaceReducer'
import OwnerReducer from '../modules/game/engine/OwnerReducer'

const reducers = {
    profile: ProfileReducer,
    loading: LoadingReducer,
    menu: MenuReducer,
    home: HomeReducer,
    lobby: LobbyReducer,
    game: GameReducer,
    ui: InterfaceReducer,
    owner: OwnerReducer
}

export default combineReducers( reducers )