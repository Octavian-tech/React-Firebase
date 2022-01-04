import {useRouteMatch,useParams} from "react-router-dom";
import {Fragment, useEffect} from "react";
import HighlightedBook from "./HighlightedBook";
import useHttp from "../../hooks/use-hook";
import {getSingleBook, updateBook} from "../../api/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import EditBook from "./EditBook";

const BookDetails = () => {


    console.log("BookDetails")

    const match=useRouteMatch();
    const params=useParams();
    const {bookId}=params;




   const {sendRequest,status,data:loadedBook,error} =  useHttp(getSingleBook,true);


   useEffect(()=>{
       sendRequest(bookId);
   },[sendRequest,bookId]);


   if(status==='pending'){
       return (<div>
           <LoadingSpinner/>
       </div>);
   };

   if(error){
       return <p>{error}</p>;
   }



   if(!loadedBook){
       return <p>No qoute found!</p>;
   }

    return (<Fragment>
        <HighlightedBook text={loadedBook.title} author={loadedBook.author} />
        <EditBook bookObj={loadedBook} bookId={bookId} sendRequest={sendRequest} />

    </Fragment>);

}

export default BookDetails;