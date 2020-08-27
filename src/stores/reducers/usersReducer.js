import { ADD_USER, USER_LIST, LOGIN_TYPE } from '../actions/types';

const initialState = {
	usersData : [],
	payload : {},
	userType : 0,
}

const  usersReducers = (state = initialState, action) => {

	switch(action.type){

		case USER_LIST : 
			return {
				...state,
				usersData : state.usersData,
			}
		
		
		case ADD_USER :
			return {
				...state,
				usersData : [ ...state.usersData, action.payload ],
			}

		case LOGIN_TYPE :
			return {
				...state,
				usersData : state.usersData,
				userType : action.addType,
			}		
		
		default :
			return state;
				
	}
}

export default usersReducers ;