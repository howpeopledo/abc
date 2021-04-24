import React from 'react';
import './Navbar.scss';
import newgenlogo from '../assets/newgenlogo.svg';
import { Avatar } from '@material-ui/core';

function Navbar() {
    return (
        <div className="header">
            <div className="header__left">
                <img
                    src={newgenlogo}
                />
                <div className="separator_and_admin_desktop">
                    <p className="nav__separator"></p>
                    <div className="nav__admin_desktop">
                        <p>OMNIDOCS <strong>ADMIN DESKTOP</strong></p>
                    </div>
                </div>
            </div>

            <div className="header__right">
                <Avatar />
            </div>
        </div>
    )
}

export default Navbar
