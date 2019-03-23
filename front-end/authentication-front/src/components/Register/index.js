import React, { Component } from 'react'

import  { _UTIL } from '../../util'
import './style.css'

class Register extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            username : { 
                value : '',
                hasValue : false,
                hasTouch : false
            },
            email : {
                value : '',
                hasValue : false,
                hasTouch : false
            },
            password : {
                value : '',
                hasValue : false,
                hasTouch : false
            },
            confPassword : {
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
        const { username , email , password , confPassword } = this.state

        return (
        <div className="register-wrapper">
                <div className="register-form">
                    <form className="ui form" autoComplete="off" action="/register" method="post">
                        <div className="ui huge header">Register<i className="fas fa-users"></i></div>
                        <div className={ `field ${ !username.hasValue && username.hasTouch ? 'error' : '' }`}>
                            <label htmlFor="username">Username:</label>
                            <input type="text"
                                name="username"
                                id="username"
                                placeholder="username"
                                onChange={ e => this.onChangeInput( e ) }
                                value={ username.value }
                                required
                            />
                        </div>
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
                        <div className={ `field ${ !confPassword.hasValue && confPassword.hasTouch ? 'error' : ''}`}>
                            <input type="password"
                                name="confPassword"
                                id="confPassword"
                                placeholder="password"
                                pattern=".{8,}"
                                onChange={ e => this.onChangeInput( e ) }
                                value={ confPassword.value }
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

export default Register