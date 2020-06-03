import * as React from 'react';
import {Login} from 'Pages/Login';
import {Main} from 'Pages/Main';
import './App.css';

class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            page: 'Login'
        };
    }

    onLoginClick = () => {
        this.setState({page: 'Main'});
    }

    render() {
        const {page} = this.state;

        let pageElement = null;
        switch (page) {
            case 'Login':
                pageElement = <Login onLoginClick={this.onLoginClick} />;
                break;
            case 'Main':
                pageElement = <Main />;
                break;
            default:
                pageElement = <div style={{backgroundColor: 'red'}}>no such page</div>;
        }

        return pageElement;
    }
}

export {App};

