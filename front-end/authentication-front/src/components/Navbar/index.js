import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// actions
import { displayedPage } from '../../actions'

// style
import './style.css'

class Navbar extends Component {
    onClickLink = e => {
        const { href } = e.target 
        const pathname = href.match( /(http|https):\/\/.*(?=\/)(.*)/ )
        // records the current page
        this.props.displayedPage( pathname ? pathname[2] : null )
    }

    render() {
        const { CURRENT_PAGE } = this.props
        console.log(this.props.CURRENT_PAGE )
        return (
            <div className="navbar">
                <div className="ui teal inverted small menu">
                    <Link to="/" 
                          className={ `item ${ CURRENT_PAGE === '/' ? 'active' : '' }` }
                          onClick={ e => this.onClickLink( e ) }      
                    >Home</Link>
                    <div className="right menu">
                        <Link to="/login" 
                              className={ `item ${ CURRENT_PAGE === '/login' ? 'active' : '' }` }
                          onClick={ e => this.onClickLink( e ) }
                        >Login</Link>
                        <Link to="/register" 
                          className={ `item ${ CURRENT_PAGE === '/register' ? 'active' : '' }` }
                          onClick={ e => this.onClickLink( e ) }
                        >Register</Link>
                        <Link to="/logout" 
                          className={ `item ${ CURRENT_PAGE === '/logout' ? 'active' : '' }` }
                          onClick={ e => this.onClickLink( e ) }
                        >Logout</Link>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { CURRENT_PAGE : state.updateDisplayedPage }
}

export default connect( mapStateToProps , { displayedPage } )( Navbar )