import React, { Component } from "react";
import Logo from '../../imagesSpazi/logo_blue.png'
import { Link } from 'react-router-dom'

import "./Sidebar.css"
import LogoWhite from "../logo-white/logo-white";
import {getData} from "../../helpers"

class Sidebar extends Component {
    constructor(){
        super();
        this.state= {
            userName: ""
        }
        
    }
    componentDidMount() {
        this.setState({ userName: localStorage.getItem('user-name') })
        const response = getData().then(resp => this.setState({ userName: resp.name}));
    }

    render() {
        //console.log("USER NAME ----- ",localStorage.getItem('user-name'))
        return (
            <div className="nav-bar-container">
                <nav className="nav-bar">
                    <div className='nav-bar-img-container'>
                        <div className='user-img'>
                            <h3 className='user-name'>{this.state.userName}</h3>
                        </div>

                    </div>
                    <ul className="nav-bar-list">
                        <Link className="link-users" to='/users'> <li className="nav-bar-item"><i className="spazi-icon"></i>Spazis</li> </Link>
                        <Link className="link-users" to='/history'><li className="nav-bar-item"><i className="history-icon" ></i>History</li></Link>
                        <Link className="link-users" to='/profile'><li className="nav-bar-item"><i className="profile-icon"></i>Configuration</li></Link>
                    </ul>
                    <ul className="nav-bar-session">
                        <Link className="link-users" to='/logout'> <li className="nav-bar-item"><i className="logout-icon"></i>log out</li> </Link>
                        <Link className="link-users" to='/'><li className="nav-bar-item"><i className="aboutus-icon" ></i>About us</li></Link>
                    </ul>
                    <LogoWhite className='logo-white' />
                </nav>
            </div>
        )
    }
}

export default Sidebar



