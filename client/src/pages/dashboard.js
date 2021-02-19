import {useAuth0 as UseAuth0} from '@auth0/auth0-react';
import React,{useEffect as UseEffect} from 'react'

 const dashboard=()=>{
    const {getAccessTokenSilently}=UseAuth0()
    UseEffect(async()=>{
        try {
            const accessToken=await getAccessTokenSilently({
                audience:process.env.REACT_APP_AUTH0_AUDIENCE
            })
            const data=await fetch('https://reumgbrqwd.execute-api.us-east-1.amazonaws.com/dev/appointments/user/2021-02-25',{
                headers:{
                    Authorization:`bearer ${accessToken}`
                }
            })
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    },[])
    return (
        <div>Hello</div>
    )    
}
export default dashboard