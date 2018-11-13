import React, { Component } from 'react';
import Aux from '../Auxillary';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawnClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    SideDrawerToggleHandler = () => {

        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
    }
        )}

render(){
    return (
        <Aux>
            <Toolbar drawerToggleClicked = {this.SideDrawerToggleHandler}/>
            <SideDrawer open={this.state.showSideDrawer}
                closed={this.sideDrawnClosedHandler} />
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
    )
}
}


export default Layout;