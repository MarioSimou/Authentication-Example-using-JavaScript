import React from 'react'

const Login = props => {
    return (
        <div className="login">
            <div className="login-form">
                <form className="ui form">
                    <div className="field">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="username" />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" name="email" id="email" placeholder="email address" />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="password" />
                    </div>
                    <div className="field">
                        <input type="password" name="confPassword" id="confPassword" placeholder="password" />
                    </div>
                    <div className="field">
                        <button className="ui teal button" type="submit" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login