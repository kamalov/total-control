/* eslint-disable */
import * as React from 'react';
import 'Css/Objects.css';
import { find, remove } from 'lodash';
import { Table, Navbar, Nav, Container, Form, Col, Row, Button } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
import {getClasses, getObjects, guid, saveClasses} from 'utils';
import {useReducer, useState} from 'react';
import {EFieldKind, FieldKindLabels} from 'data';
import {Vars} from 'vars';
import {ObjectModal} from 'Pages/ObjectModal';
// import 'bootstrap/dist/css/bootstrap.min.css';


export function Objects() {
    const { classId } = useParams();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const history = useHistory();
    const menuHeight = 56;

    /// handlers

    function handleGotoObject(classId, objectId) {
        Vars.classId = classId;
        Vars.objectId = objectId;
        Vars.objectModalVisible = true;
        forceUpdate();
    }

    function handleCloseObjectModal() {
        Vars.classId = null;
        Vars.objectId = null;
        Vars.objectModalVisible = false;
        forceUpdate();
    }

    function handleRowClick(event) {
        const objectId = event.currentTarget.getAttribute('data-id');
        handleGotoObject(classId, objectId);
    }

    /// render

    function renderObjectsTable() {
        const classes = getClasses();
        const cls = find(classes, { id: classId });
        const objects = getObjects(classId);

        return (
            <Table bordered hover>
                <thead>
                    <tr>
                        {cls.fields.map(field => {
                            return (<th>{field.name}</th>);
                        })}
                    </tr>
                </thead>
                <tbody>
                    {objects.map(obj => {
                        return (
                            <tr
                                onClick={handleRowClick}
                                data-id={obj.id}
                            >
                                {cls.fields.map(field => {
                                    return (<td>{obj[field.id]}</td>);
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    return (
        <>
            {
                Vars.objectModalVisible &&
                <ObjectModal onClose={handleCloseObjectModal} />
            }

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
                    <div className="objects">
                        <div className="objects-table">
                            {renderObjectsTable()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
