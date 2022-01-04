import React from 'react';
import classes from "./List.module.css";
import {Link, NavLink, useRouteMatch} from "react-router-dom";

const BookItem = (props) => {

    const match = useRouteMatch();
    console.log(match.path);

    console.log(props.id);


    return (
        <li className={classes.item} >
            <figure>
                <blockquote><p>{props.title}</p></blockquote>
                <figcaption>{props.author}</figcaption>

            </figure>
            <NavLink className='btn' to={`/profile/book-details/${props.id}`}>View Book</NavLink>
        </li>


    );
}

export default BookItem;