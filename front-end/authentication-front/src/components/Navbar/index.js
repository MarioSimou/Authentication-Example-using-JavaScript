import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// actions
import { displayedPage } from '../../actions'

// style
import './style.css'

class Navbar extends Component {
    onClickLink = e => {
        const { target } = e;
        switch( target.tagName.toLowerCase() ){
            case undefined:
                const a = target.closest('a')
            case 'a':
                const { href } = e.target || a.href
                const pathname = href.match(/(http|https):\/\/.*(?=\/)(.*)/)
                // records the current page
                this.props.displayedPage(pathname ? pathname[2] : null)     
                break;
            default:
                return   
        }
    }

    render() {
        const { CURRENT_PAGE } = this.props
        console.log(this.props.CURRENT_PAGE)
        return (
            <div className="navbar">
                <div className="left">
                    <div className="site-logo field">
                        <Link to="/"
                            onClick={e => this.onClickLink(e)}
                        >
                            <i className="fab fa-accusoft"></i>
                        </Link>

                    </div>
                </div>
                <div className="center">
                    <div className="field">
                        <Link to="/"
                            className={`item ${CURRENT_PAGE === '/' ? 'active' : ''}`}
                            onClick={e => this.onClickLink(e)}
                        >Home
                        </Link>
                    </div>
                </div>
                <div className="right">
                    <div className="field">
                        <Link to="/login"
                            className={`item ${CURRENT_PAGE === '/login' ? 'active' : ''}`}
                            onClick={e => this.onClickLink(e)}
                        >Login</Link>
                    </div>
                    <div className="field">
                        <Link to="/register"
                            className={`item ${CURRENT_PAGE === '/register' ? 'active' : ''}`}
                            onClick={e => this.onClickLink(e)}
                        >Register</Link>
                    </div>
                    <div className="field">
                        <Link to="/logout"
                            className={`item ${CURRENT_PAGE === '/logout' ? 'active' : ''}`}
                            onClick={e => this.onClickLink(e)}
                        >Logout</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { CURRENT_PAGE: state.updateDisplayedPage }
}

export default connect(mapStateToProps, { displayedPage })(Navbar)