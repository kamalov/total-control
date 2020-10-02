/* eslint-disable */

import {EFieldKind} from 'data';

export function getClasses() {
    const classesStr = localStorage.getItem('classes');
    return classesStr ? JSON.parse(classesStr) : [];
}

export function saveClasses(classes) {
    localStorage.setItem('classes', JSON.stringify(classes));
}

export function getObjects(classId) {
    const classesStr = localStorage.getItem('objects_' + classId);
    return classesStr ? JSON.parse(classesStr) : [];
}

export function saveObjects(classId, objects) {
    localStorage.setItem('objects_' + classId, JSON.stringify(objects));
}

export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
