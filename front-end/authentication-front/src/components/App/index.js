import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// components
import Navbar from '../Navbar'
import Home from '../Home'
import Login from '../Login'
import Register from '../Register'

// style
import './style.css'


class App extends Component {
    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={ Home } />
                        <Route exact path='/login' component={ Login } />
                        <Route exact path='/register' component={Register } />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App