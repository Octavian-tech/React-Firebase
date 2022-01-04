import classes from "./Card.module.css";

const ProfilePosition=(props)=>{

    return <div className={classes.profilePosition}>{props.children}</div>;

}

export default ProfilePosition;