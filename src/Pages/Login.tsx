import * as React from 'react';
import { Button, Form,  } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import 'Css/Login.css';

export function Login() {
    const history = useHistory();

    return (
        <div className="login">
            <div
                className="title"
                onClick={() => history.push('/classes')}
            >
                <div className="title-part">Учёт</div>
                <div>&</div>
                <div className="title-part">Контроль</div>
            </div>
        </div>
    );
}

