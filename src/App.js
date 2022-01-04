import React, {useContext} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
// import './App.css';
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from './store/auth-context';
import BookDetails from "./components/AddBookComponenets/BookDetails";


function App() {


    const authCtx = useContext(AuthContext);


    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <HomePage/>
                </Route>

                {/*<Route path='/book-details/:bookId'>*/}
                {/*    <BookDetails/>*/}
                {/*</Route>*/}
                {!authCtx.isLoggedIn && <Route path='/auth'>
                    <AuthPage/>
                </Route>}
                {authCtx.isLoggedIn &&
                <Route path='/profile'>
                    <ProfilePage/>
                </Route>
                }
                <Route path='*'>
                    <Redirect to='/'/>
                </Route>

            </Switch>

        </Layout>
    );
}

export default App;
