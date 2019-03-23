import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// components
import Navbar from '../Navbar'
import Home from '../Home'

// style
import './style.css'


class App extends Component {
    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={Home} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App