import axios from 'axios'

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    console.log("Fetching data . .. ...") 

    try {
        const res = await axios.post("auth/login", userCredentials)
        
        console.log("Authenticating credentials . .. ...")
        console.log(res.data)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
 
    } catch (error) {
        console.log("Authenticaion error : Wrong username or password ");
        dispatch({ type: "LOGIN_FAILURE", payload: error })
        console.log(error)
    }
}

export default loginCall;