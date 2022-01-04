import UserProfile from "../components/Profile/UserProfile";
import {Link, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import ProfileNavigator from "../components/Layout/ProfileNavigator";
import Layout from "../components/Layout/Layout";
import {Fragment} from "react";
import ViewListBooks from "../components/Profile/ViewListBooks";
import ViewBooks from "../components/Profile/ViewBooks";
import AddBookForm from "../components/AddBookComponenets/AddBookForm";
import BookDetails from "../components/AddBookComponenets/BookDetails";
import classes from "./ProfilePage.module.css";
import ProfilePosition from "../components/UI/ProfilePosition";


const ProfilePage = () => {

    const match = useRouteMatch();


    return (


        <div className={classes.profilePage}>
            <ProfileNavigator/>

            <ProfilePosition>

                <Switch>
                    <Route path={match.path+'/'}exact>
                        <Redirect to={match.path + '/view-data'}/>
                    </Route>
                    <Route path={match.path + '/edit-data'}>
                        <UserProfile/>

                    </Route>
                    <Route path={match.path + '/view-data'}>
                        <ViewBooks/>

                    </Route>
                    <Route path={match.path + '/book-details/:bookId'}>
                        <BookDetails/>

                    </Route>
                    <Route path={match.path + '/add-book'}>
                        <AddBookForm/>

                    </Route>


                </Switch>

            </ProfilePosition>


        </div>)

    // <UserProfile/>;
}

export default ProfilePage;