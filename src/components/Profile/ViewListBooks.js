import {Fragment} from "react";
import BookItem from "./BookItem";
import {Route, useRouteMatch} from "react-router-dom";
import BookDetails from "../AddBookComponenets/BookDetails";
import classes from "./List.module.css";


const ViewListBooks = (props) => {

    const match = useRouteMatch();

    console.log(match.path);


    return (<Fragment>

        <Route path={match.path}>
            <ul className={classes.list}>
                {props.books.map((book) => (
                <BookItem key={book.key} id={book.key} idAuth={book.idAuth} title={book.title} author={book.author} />
            ))}</ul>

        </Route>


        {/*<Route path={match.path+'/book-details/:bookId'} >*/}
        {/*    <BookDetails/>*/}

        {/*</Route>*/}
    </Fragment>);

}

export default ViewListBooks;