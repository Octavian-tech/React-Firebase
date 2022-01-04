import ViewListBooks from "./ViewListBooks";
import {useCallback, useEffect, useState} from "react";
import {getAllData} from "../../api/api";
import useHttp from "../../hooks/use-hook";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../UI/NoQuotesFound";

const Dummy_data = [{id: 'q1', author: 'Max', title: 'Five hundred meters', price: 20}, {
    id: 'q2',
    author: 'Jules verne',
    title: '80 days around the earth',
    price: 20
},
    {id: 'q3', author: 'Alexandre Duma', title: 'Count monte cristo', price: 20},
    {
    id: 'q4',
    author: 'Nicolae Dabija',
    title: 'Tema pentru acasa',
    price: 20
}];

const ViewBooks = () => {



    const {sendRequest,status,data:loadedBooks,error}=useHttp(getAllData,true);

    useEffect(()=>{
        sendRequest();
    },[sendRequest]);

    if(status==='pending'){
        return (<LoadingSpinner/>);
    }

    if(error){
        return <p>{error}</p>
    }

    if (status === 'completed' && (!loadedBooks || loadedBooks.length === 0)) {
        return <NoQuotesFound/>;
    }




    // const [books,setBooks]=useState([]);
    // const [isLoading,setIsLoading]=useState(false);
    // const [error,setError]=useState(null);
    //
    // const fetchBooksHandler=useCallback(async ()=>{
    //     setIsLoading(true);
    //     setError(null);
    //
    //     try{
    //         const loadedMovies=await  getAllData();
    //
    //         setBooks(loadedMovies);
    //
    //     }catch (error){
    //         setError(error.message)
    //     }
    //     setIsLoading(false);
    // },[])
    //
    //
    //
    //
    //
    // useEffect(()=>{
    //     fetchBooksHandler()
    //
    //
    //
    //
    //
    //
    //
    // },[fetchBooksHandler]);

    return (
        <ViewListBooks books={loadedBooks}/>
    );
}

export default ViewBooks;