const INITIAL_STATE = {
    id:'',
    roleid: '',
    merchantid: '',
    first:'',
    last:'',
    username:'',
    phone:'',
    email:'',
    city:'',
    fulladdress:'',
    password:'',
    login: false
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {...state, ...action.payload, login:true}
        default:
            return state
    }
}