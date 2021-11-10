import React, { useState } from 'react';
import '../tab-bar.css'
import { GrHomeRounded, GrSearch, GrFavorite, GrNotes } from 'react-icons/gr'
import { MdFavoriteBorder } from 'react-icons/md'
import { CgProfile, CgMenuBoxed } from 'react-icons/cg'

function TabBar() {
    return (
        <div className="tabBar__">
            <ul className="tabBar__menu-list">
                <li className="tabBar__home"><a className="tabBar__menu" href="#">
                    <GrHomeRounded></GrHomeRounded>
                    <span className="tabBar__menu-name">Home</span>
                </a></li>
                <li className="tabBar__search"><a className="tabBar__menu" href="#">
                    <GrSearch></GrSearch>
                    <span className="tabBar__menu-name">Search</span>
                </a></li>
                <li className="tabBar__fav"><a className="tabBar__menu" href="#">
                    <GrFavorite></GrFavorite>
                    <span className="tabBar__menu-name">Favorite</span>
                </a></li>
                <li className="tabBar__order"><a className="tabBar__menu" href="#">
                    <CgMenuBoxed></CgMenuBoxed><span className="tabBar__menu-name">Order</span>
                
                </a></li>
                <li className="tabBar__profile"><a className="tabBar__menu" href="#">
                    <CgProfile></CgProfile>
                    <span className="tabBar__menu-name">Profile</span>
                </a></li>
            </ul>
        </div>
    )
}

export default TabBar