import React, { Component } from 'react'
import node from '../../config/node'
import { _UTIL } from '../../util'
import './style.css'
import qs from 'qs'

// Components
import Message from '../Message'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError : false
            },
            email: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError : false
            },
            password: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError : false
            },
            confPassword: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError : false
            },
            message: {
                show: false,
                content: '',
                header: '',
                type: null
            }
        }
    }

    // Events Callbacks
    onChangeInput = e => {
        const { id, value } = e.target
        const hasValue = _UTIL.hasValue(value)
        this.setState({ [id]: { value, hasValue, 'hasTouch': true , hasError : false } })
    }

    onSubmitForm = async e => {
        console.log('submit form')
        // prevents default behaviour
        e.preventDefault();
        try {
            // form data
            const { username, email, password, confPassword } = this.state
            let hasErrorUsername, hasErrorEmail, hasErrorPassword, hasErrorConfPassword;

            // POST localhost:3001/register application/x-www-form-urlencoded
            const req = { username: username.value, email: email.value, password: password.value, confPassword: confPassword.value }
            const res = await node.post('/register', qs.stringify( req ))

            // update component
            // update component
            const { header, content, type, errors } = res.data.message

            if (errors) {
                const set = new Set(errors.map(v => v.param))
                const stack = []

                // an error class is added if the email and password have an error
                for (let field of [ 'username', 'email', 'password' , 'confPassword']) {    
                    if (set.has(field)) stack.push(true)
                    else stack.push(false)
                }

                [hasErrorUsername, hasErrorEmail, hasErrorPassword, hasErrorConfPassword] = stack
            }
            // updates the state so it includes any possible errors
            this.setState({ 
                username : { ...username , hasError : hasErrorUsername },
                email: { ...email, hasError: hasErrorEmail }, 
                password: { ...password, hasError: hasErrorPassword }, 
                confPassword : { ...confPassword , hasError : hasErrorConfPassword },
                message: { show: true, header, content, type } })

        } catch (e) {
            this.setState({ message: { show: true, header : 'Internal Error' , content: e.message } })
            console.log('POST ERROR: ', e.message)
        }
    }
    // Routines
    resetMessage = s => {
        this.setState({ message: { show: s, header: '', content: '', type: null } })
    }

    // returns the registration form JSX
    getRegistrationForm = () => {
        const { username, email, password, confPassword } = this.state
        
        return (
            <div className="register-form">
                <form className="ui form" autoComplete="off" onSubmit={e => this.onSubmitForm(e)} noValidate>
                    <div className="ui huge header">Register<i className="fas fa-users"></i></div>
                    <div className={`field ${ (!username.hasValue && username.hasTouch) || username.hasError ? 'error' : ''}`}>
                        <label htmlFor="username">Username:</label>
                        <input type="text"
                            name="username"
                            id="username"
                            placeholder="username"
                            onChange={e => this.onChangeInput(e)}
                            value={username.value}
                            required
                        />
                    </div>
                    <div className={`field ${ (!email.hasValue && email.hasTouch) || email.hasError ? 'error' : ''}`}>
                        <label htmlFor="email">Email Address:</label>
                        <input type="email"
                            name="email"
                            id="email"
                            placeholder="email address"
                            onChange={e => this.onChangeInput(e)}
                            value={email.value}
                            required
                        />
                    </div>
                    <div className={`field ${ (!password.hasValue && password.hasTouch) || password.hasError ? 'error' : ''}`}>
                        <label htmlFor="password">Password:</label>
                        <input type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            pattern=".{8,}"
                            onChange={e => this.onChangeInput(e)}
                            value={password.value}
                            required
                        />
                    </div>
                    <div className={`field ${ (!confPassword.hasValue && confPassword.hasTouch) || confPassword.hasError ? 'error' : ''}`}>
                        <input type="password"
                            name="confPassword"
                            id="confPassword"
                            placeholder="password"
                            pattern=".{8,}"
                            onChange={e => this.onChangeInput(e)}
                            value={confPassword.value}
                            required
                        />
                    </div>
                    <div className="field">
                        <button className="ui fluid teal button" type="submit" >Submit</button>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        const { message } = this.state
        if (!message.show) {
            return (
                <div className="register-wrapper">
                    {this.getRegistrationForm()}
                </div>
            )
        } else {
            return (
                <div className="register-wrapper">
                    <div className="message-wrapper">
                        <Message message={message} showMessage={this.resetMessage} />
                    </div>
                    {this.getRegistrationForm()}
                </div>)
        }

    }
}

export default Register