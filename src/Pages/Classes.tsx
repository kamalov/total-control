/* eslint-disable */
import * as React from 'react';
import 'Css/Classes.css';
import { find, remove } from 'lodash';
import { Navbar, Nav, Container, Form, Col, Row, Button } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
import {getClasses, guid, saveClasses} from 'utils';
import {useReducer, useState} from 'react';
import {EFieldKind, FieldKindLabels} from 'data';
import {Vars} from 'vars';
import {ObjectModal} from 'Pages/ObjectModal';
// import 'bootstrap/dist/css/bootstrap.min.css';


export function Classes() {
    const { classId } = useParams();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const history = useHistory();
    const menuHeight = 56;

    /// handlers

    function handleClick(classId) {
        history.push('/classes/' + classId);
    }

    function handleGotoObject(classId) {
        Vars.classId = classId;
        Vars.objectModalVisible = true;
        forceUpdate();
        //history.push(`/object/${classId}`);
    }

    function handleGotoObjects(classId) {
        history.push(`/objects/${classId}`);
    }

    function handleCloseObjectModal() {
        Vars.classId = '';
        Vars.objectModalVisible = false;
        forceUpdate();
    }

    function handleAddNewClass() {
        const classes = getClasses();
        const cls = {
            id: guid(),
            name: 'NewClass' + (classes.length + 1),
            fields: [
                {
                    id: guid(),
                    name: '',
                    kind: EFieldKind.String
                }
            ]
        };
        classes.push(cls);
        saveClasses(classes);

        history.push('/classes/' + cls.id);
    }

    function handleAddNewField(classId) {
        const classes = getClasses();
        const cls = find(classes, { id: classId });
        cls.fields.push(
            {
                id: guid(),
                name: '',
                kind: EFieldKind.String
            }
        );
        saveClasses(classes);
        forceUpdate();
    }

    function handleDeleteClass(classId) {
        const classes = getClasses();
        remove(classes, {id: classId});
        saveClasses(classes);
        history.push('/classes');
    }

    function handleClassNameChange(event, classId) {
        const classes = getClasses();
        const cls = find(classes, { id: classId });
        let value = event.target.value;
        cls.name = value;
        saveClasses(classes);
        forceUpdate();
    }

    function handleFieldNameChange(event, classId, fieldId) {
        const classes = getClasses();
        const value = event.target.value;
        const cls = find(classes, { id: classId });
        const field = find(cls.fields, { id: fieldId });
        field.name = value;
        saveClasses(classes);
        forceUpdate();
    }

    function handleFieldKindChange(event, classId, fieldId) {
        const classes = getClasses();
        const value = event.target.value;
        const cls = find(classes, { id: classId });
        const field = find(cls.fields, { id: fieldId });
        field.kind = value;
        saveClasses(classes);
        forceUpdate();
    }

    /// render

    function renderClassList() {
        return (
            <div className="d-flex flex-column h-100">
                <h3>Классы</h3>
                <div className="flex-grow-1 overflow-auto">
                    {
                        getClasses().map(_ => {
                            const selected = _.id === classId;
                            return (
                                <div>
                                    <div
                                        className={`cls ${selected && 'bg-primary'}`}
                                        onClick={() => handleClick(_.id)}
                                    >
                                        {_.name}
                                    </div>
                                    {/* {
                                        selected &&
                                        <Button variant="danger" onClick={() => handleDeleteClass(_.name)}>
                                            Удалить
                                        </Button>
                                    } */}
                                </div>);
                        }
                        )
                    }
                </div>
                <div>
                    <Button
                        variant="warning"
                        onClick={handleAddNewClass}
                    >
                        Добавить класс
                    </Button>
                </div>
            </div>
        );
    }

    function renderClassBody() {
        if (!classId) {
            return 'no class';
        }

        const cls = find(getClasses(), { id: classId });
        return (
            <Form>
                <Form.Group>
                    <div>
                        <h3>Имя класса</h3>
                    </div>

                    <Form.Row>
                        <Col xs={6}>
                            <Form.Control
                                type="text"
                                placeholder="Имя класса"
                                value={cls.name}
                                onChange={(event) => handleClassNameChange(event, cls.id)}
                            />
                        </Col>
                        <Col xs={6}>
                            <Button
                                variant="warning"
                                onClick={() => handleGotoObject(cls.id)}
                            >
                                Объект
                            </Button>

                            <Button
                                variant="warning"
                                onClick={() => handleGotoObjects(cls.id)}
                            >
                                Таблица
                            </Button>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <br />

                <h3>Поля</h3>
                {renderFields(cls)}
                <Button
                    variant="warning"
                    onClick={() => handleAddNewField(cls.id)}
                >
                    Добавить поле
                </Button>
            </Form>
        );
    }

    function renderFields(cls) {
        return cls.fields.map(field => {
            return (
                <Form.Group>
                    <Form.Row>
                        <Col xs={6}>
                            <Form.Control
                                placeholder="Имя поля"
                                value={field.name}
                                onChange={(event) => handleFieldNameChange(event, cls.id, field.id)}
                            />
                        </Col>
                        <Col xs={3}>
                            <Form.Control
                                as="select"
                                placeholder="Поле"
                                onChange={(event) => handleFieldKindChange(event, cls.id, field.id)}
                                value={field.kind}
                            >
                                {
                                    FieldKindLabels.map(({kind, label}) =>
                                        <option value={kind}>{label}</option>
                                    )
                                }
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form.Group>
            );
        })
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
                    <div className="classes">
                        <div className="class-list">
                            {renderClassList()}
                        </div>

                        <div className="class-body">
                            {renderClassBody()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
