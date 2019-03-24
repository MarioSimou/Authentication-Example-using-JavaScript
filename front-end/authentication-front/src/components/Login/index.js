import React, { Component } from 'react'
import { connect } from 'react-redux'
import node from '../../config/node'
import { _UTIL } from '../../util'
import qs from 'qs'

// Components
import Message from '../Message'
// actions
import { loggedUser } from '../../actions' 
// styles
import './style.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError: false,
            },
            password: {
                value: '',
                hasValue: false,
                hasTouch: false,
                hasError: false,
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
        this.setState({ [id]: { value, hasValue, 'hasTouch': true , 'hasError' : false } })
    }

    onSubmitForm = async e => {
        console.log('submit form')
        // prevents default behaviour
        e.preventDefault();
        
        try {
            // form data
            const { email, password } = this.state
            let hasErrorEmail , hasErrorPassword; 
            // POST localhost:3001/login application/x-www-form-urlencoded
            const req = { email: email.value, password: password.value }
            const res = await node({ method : 'POST', url : '/login', data : qs.stringify( req ) })
            // destructure the response object
            const { user , message } = res.data
            const { header, content, type , errors } = message
            
            // update redux store - if a user exists
            if ( user) this.props.loggedUser( user )

            // maps those fields which returned with an error
            if ( errors ) {
                [ hasErrorEmail , hasErrorPassword ] = _UTIL.mapErrorObject( errors , ['email' , 'password'] )
            }

            // updates the state so it includes any possible errors
            this.setState({ 
                email : { ...email , hasError : hasErrorEmail} , 
                password : { ...password, hasError : hasErrorPassword } , 
                message: { show: true, header, content, type } 
            })

        } catch (e) {
            this.setState({ message: { show: true, header : 'Internal Error', content: e.message } })
            console.log('POST ERROR: ', e.message)
        }
    }
    // Routines
    resetMessage = s => {
        this.setState( {message : { show : s , header : '' , content : '' , type : null } })
    }

    // returns the registration form JSX
    getRegistrationForm = () => {
        const { email, password } = this.state
       
        return (
            <div className="login-form">
                <form className="ui form" autoComplete="off" onSubmit={e => this.onSubmitForm(e)} noValidate>
                    <div className="ui huge header">Login<i className="fas fa-users"></i></div>
                    <div className={`field ${(!email.hasValue && email.hasTouch) || email.hasError ? 'error' : ''}`}>
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
                    <div className={`field ${(!password.hasValue && password.hasTouch) || password.hasError ? 'error' : ''}`}>
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
                <div className="login-wrapper">
                    {this.getRegistrationForm()}
                </div>
            )
        } else {
            return (
                <div className="login-wrapper">
                    <div className="message-wrapper">
                        <Message message={message} showMessage={ this.resetMessage } />
                    </div>
                    {this.getRegistrationForm()}
                </div>)
        }
    }
}

const mapStateToProps = state => {
    return { user : state.storeLoggedUser }
}

export default connect( mapStateToProps , { loggedUser } )( Login )