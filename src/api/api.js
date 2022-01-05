
const FIREBASE_DOMAIN = 'https://react-http-57538-default-rtdb.firebaseio.com';


export async function getAllData(idAuth){
    const response=await fetch(`${FIREBASE_DOMAIN}/books.json`);
    const data= await  response.json();


    if(!response.ok){
        throw new Error(data.message || 'Could note fetch books');

    }

    const transformDataBooks=[];


    for (const key in data) {
        const bookObj = {
            key: key,
            idAuth:data[key].localId,
            ...data[key],
        };


        console.log("key"+bookObj.idAuth);

         if(bookObj.idAuth===idAuth){
             transformDataBooks.push(bookObj);

         }


    }

    console.log(transformDataBooks);


    return transformDataBooks;
}


export async  function getSingleBook(bookId){
    const response = await fetch(`${FIREBASE_DOMAIN}/books/${bookId}.json`);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message|| 'Could not fetch books');
    }


    const loadedBooks={
        key:bookId,
        ...data,
    };

    console.log(loadedBooks);

    return loadedBooks;
}

export async function addNewBook(bookData){
    const response =await fetch(`${FIREBASE_DOMAIN}/books.json`,{
        method:'POST',
        body:JSON.stringify(bookData),
        headers:{
            'Content-Type':'application/json',

        },
    });

    const data=await response.json();
    console.log(data);
}

export async function  updateBook(bookData,bookId){

    // debugger;
    const response = await fetch(`${FIREBASE_DOMAIN}/books/${bookId}.json`,{
        method:'PUT',
        body:JSON.stringify(bookData),
        headers:{
            'Content-Type':'application/json',
        },
    });

    const data=await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not create update data.');
    }

    return null;

}



