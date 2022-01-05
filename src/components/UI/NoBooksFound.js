import classes from './NoBooksFound.module.css';
import {Link} from "react-router-dom";

const NoBooksFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No books found!</p>
      <Link className='btn'  to='/profile/add-book'>
        Add a book
      </Link>
    </div>
  );
};

export default NoBooksFound;
