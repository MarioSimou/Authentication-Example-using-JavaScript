import React, { Component } from 'react'

import  { _UTIL } from '../../util'
import './style.css'

class Login extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            email : {
                value : '',
                hasValue : false,
                hasTouch : false
            },
            password : {
                value : '',
                hasValue : false,
                hasTouch : false
            }
        }
    }
    onChangeInput = e => {
        const { id , value } = e.target
        const hasValue = _UTIL.hasValue( value )
        this.setState({ [id] : { value  , hasValue , 'hasTouch' : true } })
    }

    render() {
        const {  email , password  } = this.state

        return (
            <div className="login-wrapper">
                <div className="login-form">
                    <form className="ui form" autoComplete="off" action="/login" method="post">
                        <div className="ui huge header">Login</div>
                        <div className={ `field ${ !email.hasValue && email.hasTouch ? 'error' : ''}`}>
                            <label htmlFor="email">Email Address:</label>
                            <input type="email"
                                name="email"
                                id="email"
                                placeholder="email address"
                                onChange={ e => this.onChangeInput( e ) }
                                value={ email.value }
                                required
                            />
                        </div>
                        <div className={ `field ${ !password.hasValue && password.hasTouch ? 'error' : ''}`}>
                            <label htmlFor="password">Password:</label>
                            <input type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                pattern=".{8,}"
                                onChange={ e => this.onChangeInput( e ) }
                                value={ password.value }
                                required
                            />
                        </div>
                        <div className="field">
                            <button className="ui fluid teal button" type="submit" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>)
    }
}

export default Login