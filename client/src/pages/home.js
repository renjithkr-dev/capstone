import { Fragment } from "react"
import AuthenticationButton from "../components/authentication-button"
import { Route, NavLink, Switch } from 'react-router-dom'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import {StaffDashboard} from './staffDashboard'

import dashboard from './dashboard'
import newAppointment from './newAppointment'

export const Home = () => {
    const isStaff=true
    const { isAuthenticated, user } = useAuth0();
    console.log(user)
    //const isStaff = user['http://capstone.com/claims/roles'].includes('staff')
    //console.log(isStaff)
    const authenticatedContents = isAuthenticated ? 'block' : 'none';
    return (
        <Fragment>
            <header className='header-container'>
                <nav className="navbar navbar-light bg-dark">
                    <span className='.navbar-text text-light'> Appointments system</span>
                    <div style={{ textAlign: 'center', display: authenticatedContents }}>
                        
                {!isStaff?<>
                        <NavLink to='/dashboard' style={{ marginRight: "15px" }}>Dashboard</NavLink>
                        <NavLink to='/new-appointment'>New Appointment</NavLink></>
                        :
                        <></>
                }
                    </div>
                    <div className='auth-buttons'>
                        <AuthenticationButton />
                    </div>
                </nav>
            </header>
            <section>
                <Switch>
                <Route path='/dashboard' component={withAuthenticationRequired(dashboard)} />
                <Route path='/new-appointment' component={withAuthenticationRequired(newAppointment)} />
                <Route path='/staffdashboard' component={withAuthenticationRequired(StaffDashboard)} />
                </Switch>
            </section>
        </Fragment>
    )
}