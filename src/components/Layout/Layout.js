import {Fragment} from "react";
import MainNavigator from "./MainNavigator";


const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigator/>
            <main>{props.children}</main>
        </Fragment>
    )
}

export default Layout;