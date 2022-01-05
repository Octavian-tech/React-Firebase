import {Fragment, useEffect, useRef, useState} from "react";
import {addNewBook} from "../../api/api";
import classes from './AddBookForm.module.css';
import Card from "../UI/Card";
import {Prompt, useHistory, useRouteMatch} from 'react-router-dom';
import useHttp from "../../hooks/use-hook";
import LoadingSpinner from "../UI/LoadingSpinner";


const AddBookForm = () => {

    const authorInputRef = useRef();
    const titleInputRef = useRef();
    const priceInputRef = useRef();

    const {sendRequest,status}=useHttp(addNewBook);
    const history=useHistory();
    const match=useRouteMatch();

    const localId=localStorage.getItem('localId');


    useEffect(()=>{
        if(status==='completed'){
            history.push(match.path + '/view-data');
        }

    },[status,history])

   const [isEntering,setIsEntering]= useState(false);

    // const authorValue="";
    // const  titleValue="";
    // const priceValue=0;

    const finishEnteringHandler=()=>{
        setIsEntering(false);
    }

    const formFocusedHandler=()=>{
        setIsEntering(true);
    }

    const saveFormData = (event) => {

        event.preventDefault();

        let ObjectData = {
            // id: Date.now(),
            idAuth:localId,
            author: authorInputRef.current.value,
            title: titleInputRef.current.value,
            price: priceInputRef.current.value
        };

        console.log(ObjectData);

        sendRequest(ObjectData);
        // addNewBook(ObjectData);


    }


    return (
        <Fragment>
            <Prompt when={isEntering} message={()=>'Are you sure want to leave all the data will be lost!'} />
            <Card>
                <form onSubmit={saveFormData} onFocus={formFocusedHandler} className={classes.form}>
                    {status==='pending' && (
                        <div className={classes.loading}>
                            <LoadingSpinner />
                        </div>
                    )}

                    <div className={classes.control}>
                        <label htmlFor='author'>Author</label>
                        <input type='text' id='author' ref={authorInputRef}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='title'>Title</label>
                        <input type='text' id='title' ref={titleInputRef}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='price'>Price</label>
                        <input type='number' id='price' ref={priceInputRef}/>
                    </div>
                    <div className={classes.actions}>
                        <button onClick={finishEnteringHandler} className='btn'>Save new book</button>
                    </div>
                </form>
            </Card>
        </Fragment>);
}

export default AddBookForm;