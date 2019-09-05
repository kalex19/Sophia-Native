export const accountsReducer = (state = {}, actions) =>{
	const { newClientProfile, newCaretakerProfile } = actions
  switch (action.type){
    case 'CREATE_CLIENT_ACCOUNT':
    	return {...state, newClientProfile }
    case 'CREATE_CARETAKER_ACCOUNT':
    	return {...state, newCaretakerProfile }
    default:
    	return state;
  }
}

