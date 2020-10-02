/* eslint-disable */
import * as React from 'react';
import 'Css/ObjectModal.css';
import { find, findIndex, remove } from 'lodash';
import { Navbar, Nav, Container, Form, Col, Row, Button, Modal } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
import {getClasses, getObjects, guid, saveClasses, saveObjects} from 'utils';
import {useReducer, useState} from 'react';
import {EFieldKind, FieldKindLabels} from 'data';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import {Vars} from 'vars';
registerLocale('ru', ru);

export function ObjectModal(props: any) {
    const { classId, objectId } = Vars;
    const classes = getClasses();
    const objects = getObjects(classId);
    const cls = find(classes, { id: classId });

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [startDate, setStartDate] = useState(new Date());

    const initialObject = objectId ? find(objects, { id: objectId }) : {id: guid()};
    let [obj, setObj] = useState<{id?: any}>({...initialObject});

    /// handlers
    function handleClose() {
        props.onClose();
    }

    function handleSave() {
        if (objectId) {
            const index = findIndex(objects, { id: objectId });
            objects[index] = {...objects[index], ...obj};
        } else {
            obj.id = guid();
            objects.push(obj);
        }

        saveObjects(classId, objects);
        props.onClose();
    }

    function handleChangeField(event, field) {
        const value = event.target.value;
        const newObj = {...obj};
        newObj[field.id] = value;
        setObj(newObj);
    }

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
                    <Form.Control
                        value={obj[field.id]}
                        onChange={(event) => handleChangeField(event, field)}
                    >
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
                    <Col xs={9}>
                        {renderField(field)}
                    </Col>
                </Form.Group>
            );
        })
    }

    if (!cls) {
        return null;
    }

    return (
        <Modal
            show={true}
            onHide={handleClose}
            size="lg"
            dialogClassName="object-modal"
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{cls.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="object">
                        <Row>
                            <Col
                                xs={3}
                                className="object-props"
                            >
                                {renderObjectProps()}
                            </Col>

                            <Col
                                xs={9}
                                className="object-body"
                            >
                                {renderObjectBody()}
                            </Col>
                        </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
