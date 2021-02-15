import { Fragment } from "react"
import AuthenticationButton from "../components/authentication-button"
import {Route,NavLink} from 'react-router-dom'
import {withAuthenticationRequired} from '@auth0/auth0-react'

import dashboard from './dashboard'
import newAppointment from './newAppointment'

export const Home = () => {
    return (
        <Fragment>
            <header className='header-container'>
                <nav className="navbar navbar-light bg-dark">
                    <span className='.navbar-text text-light'> Appointments system</span>
                    <div className='auth-buttons'>
                        <AuthenticationButton />
                    </div>
                </nav>
            </header>
            <section>
                <div style={{textAlign:'center'}}>
                    <NavLink to='/dashboard' style={{marginRight:"15px"}}>Dashboard</NavLink>
                    <NavLink to='/new-appointment'>New Appointment</NavLink>
                </div>
                <Route path='/dashboard' component={withAuthenticationRequired(dashboard)} />
                <Route path='/new-appointment' component={withAuthenticationRequired(newAppointment)} />
            </section>
        </Fragment>
    )
}