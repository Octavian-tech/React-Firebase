import {Link, NavLink} from "react-router-dom";
import React from "react";
import classes from './ProfileNavigator.module.css';

const ProfileNavigator = () => {
    return (
        <div className={classes.profileNav}>
            <ul>
                {/*<li><Link to='/profile/book-detail'>book details</Link></li>*/}

                {/*<NavLink to={`/profile/view-data/book-details/${props.id}`}>View full</NavLink>*/}
                <li><NavLink activeClassName={classes.active} to='/profile/view-data'>View data</NavLink></li>
                <li><NavLink  activeClassName={classes.active} to='/profile/edit-data'>User Profile</NavLink></li>

                <li><NavLink  activeClassName={classes.active} to='/profile/add-book'>Add book</NavLink></li>
            </ul>
        </div>)

    // <UserProfile/>;
}

export default ProfileNavigator;