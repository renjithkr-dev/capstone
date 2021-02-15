import {useAuth0 as UseAuth0} from '@auth0/auth0-react';
import { useEffect } from 'react';
export const getUserAppointments=async()=>{
    const {getAccessTokenSilently}=UseAuth0()
    useEffect(()=>{
        try {
            const accessToken=await getAccessTokenSilently({
                audience:process.env.REACT_APP_AUTH0_AUDIENCE
            })
            
            console.log(accessToken)
        } catch (error) {
            console.error(error)
        }
    },[])
}