/* eslint-disable */
import * as React from 'react';
import 'Css/Object.css';
import { find, remove } from 'lodash';
import { Navbar, Nav, Container, Form, Col, Row, Button } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
import {getClasses, guid, saveClasses} from 'utils';
import {useReducer, useState} from 'react';
import {EFieldKind, FieldKindLabels} from 'data';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

export function Obj() {
    const { classId, objectId } = useParams();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [startDate, setStartDate] = useState(new Date());
    const history = useHistory();
    const menuHeight = 56;

    /// handlers

   /// render

    function renderObjectProps() {
        const cls = find(getClasses(), { id: classId });
        return (
            <div className="d-flex flex-column h-100">
                {cls.name}
            </div>
        );
    }

    function renderObjectBody() {
        const cls = find(getClasses(), { id: classId });
        return (
            <Form>
                <h3>{cls.name}</h3>
                {renderFields(cls)}
            </Form>
        );
    }

    function renderField(field) {
        switch (field.kind) {
            case EFieldKind.Date:
                return (
                    <DatePicker
                        locale="ru"
                        dateFormat="dd.MM.yyyy"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                    />
                );
            case EFieldKind.Boolean:
                return (
                    <Form.Check type="checkbox">
                    </Form.Check>
                );
            case EFieldKind.Ref:
                return (
                    <Form.Control as="select">
                    </Form.Control>
                );
            default:
                return (
                    <Form.Control>
                    </Form.Control>
                );
        }
    }

    function renderFields(cls) {
        return cls.fields.map(field => {
            return (
                <Form.Group as={Row}>
                    <Form.Label column xs={3}>
                        {field.name}
                    </Form.Label>
                    <Col xs={6}>
                        {renderField(field)}
                    </Col>
                </Form.Group>
            );
        })
    }

    return (
        <div className="page">
            <div className="page-menu" style={{ height: menuHeight }}>
                <Navbar variant="dark" bg="dark" expand="sm">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Login</Nav.Link>
                        <Nav.Link href="/main">Main</Nav.Link>
                        <Nav.Link href={'/classes'}>Classes</Nav.Link>
                    </Nav>
                </Navbar>
            </div>

            <div className="page-body" style={{ top: menuHeight }}>
                <div className="object">
                    <div className="object-props">
                        {renderObjectProps()}
                    </div>

                    <div className="object-body">
                        {renderObjectBody()}
                    </div>
                </div>
            </div>
        </div>
    );
}
