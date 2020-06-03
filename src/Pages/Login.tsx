import * as React from 'react';
import 'Css/Login.css';

class Login extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        //document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        //document.removeEventListener("keydown", this.handleKeyDown);
    }

    render() {
        const {onLoginClick} = this.props;

        return (
            <div className="login">
                <div
                    className="title"
                    onClick={onLoginClick}
                >
                    <div className="title-part">Учёт</div>
                    <div>&</div>
                    <div className="title-part">Контроль</div>
                </div>
            </div>
        );
    }
}

export {Login}

