import { SWITCH_MENU } from '../action'

const initialState = {
    menuName: '首页'
}

export default (state = initialState,action) => {
    switch(action.type) {
        case SWITCH_MENU:{
            return{
                ...state,
                menuName:action.payload.menuName
            };
        }
        default:
            return {...state}
    }
}