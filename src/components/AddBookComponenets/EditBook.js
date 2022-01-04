import {useReducer, useRef, useState} from "react";
import {getSingleBook, updateBook} from "../../api/api";
import useHttp from "../../hooks/use-hook";
import classes from './EditBook.module.css';


const EditBook = (props) => {

    const authorRef = useRef();
    // const [authorVal, setAuthorVal] = useState('actavian');
    const titleRef = useRef();
    const priceRef = useRef();
    const bookId = props.bookId;

    const {sendRequest, status, error} = useHttp(updateBook, true);

    const initialState = {author: "", title: "", price: 0};

    const formReducer = (state, action) => {
        switch (action.type) {


            case  'INPUT_AUTHOR':

                return {...state, author: action.val};
                break;
            case  'INPUT_TITLE':

                return {...state, title: action.val};
                break;
            case  'INPUT_PRICE':

                return {...state, price: action.val};
                break;


        }


    }

    const init = () => {


        return {author: props.bookObj.author, title: props.bookObj.title, price: props.bookObj.price};

    }


    const [formState, dispatchFormActions] = useReducer(formReducer, initialState, init);


    const AuthorOnChange = (event) => {
        // setAuthorVal((prevAuthor) => {
        //   return  event.target.value
        // });

        dispatchFormActions({type: 'INPUT_AUTHOR', val: event.target.value});
    }

    const TitleOnChange = (event) => {
        // setAuthorVal((prevAuthor) => {
        //   return  event.target.value
        // });

        dispatchFormActions({type: 'INPUT_TITLE', val: event.target.value});
    }

    const PriceOnChange = (event) => {
        // setAuthorVal((prevAuthor) => {
        //   return  event.target.value
        // });

        dispatchFormActions({type: 'INPUT_PRICE', val: event.target.value});
    }

    const submitHandler = (event) => {
        event.preventDefault();

        sendRequest(formState, bookId).then(() => {

            // if(status==='completed'){
            //     console.log(status);
            props.sendRequest(bookId);

            // }

        });


        // updateBook(formState,props.bookId).then(()=>{
        //
        //     props.sendRequest(props.bookId);
        //
        // });


    }

    return (
        <form className={classes.form}
              onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='author'>Author</label>

                <input type='text' id='author' value={formState.author} ref={authorRef} onChange={AuthorOnChange}/>
            </div>

            <div className={classes.control}>
                <label htmlFor='title'>Title</label>

                <input type='text' id='title' value={formState.title} ref={titleRef} onChange={TitleOnChange}/>
            </div>

            <div className={classes.control}>
                <label htmlFor='price'>Price</label>

                <input type='number' id='price' value={formState.price} ref={priceRef} onChange={PriceOnChange}/>
            </div>
            <br/><br/>

            <button className='btn'>Update data</button>


        </form>
    );
}

export default EditBook;