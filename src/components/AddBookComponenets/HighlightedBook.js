import classes from './HighlightedBook.module.css';

const HighlightedBook = (props) => {
  return (
    <figure className={classes.book}>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
    </figure>
  );
};

export default HighlightedBook;
