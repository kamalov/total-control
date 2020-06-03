import * as React from 'react';
import 'Css/Main.css';
import { Districts, Project_kinds, Executors } from 'data';

function get_random_int(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function get_random_element_from_array(arr) {
    return arr[get_random_int(arr.length - 1)];
}

class Main extends React.Component<any, any> {

    data;

    constructor(props) {
        super(props);
        this.data = [];
        for (let i = 0; i < 50; i++) {
            const district = get_random_element_from_array(Districts);
            const town = get_random_element_from_array(Districts);
            const project_kind = get_random_element_from_array(Project_kinds);
            const executor = get_random_element_from_array(Executors);
            this.data.push({district, town, project_kind, executor});
        }
    }

    componentDidMount(){
        // document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        // document.removeEventListener("keydown", this.handleKeyDown);
    }

    render_table() {
        return (
            <table className="main-table">
                <thead>
                    <tr>
                        <td className="header first">Район</td>
                        <td className="header">Населенный пункт</td>
                        <td className="header">Проект</td>
                        <td className="header last">Исполнитель</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.data.map((stage, i) =>
                            <tr key={i}>
                                <td className="first">{stage.district} район</td>
                                <td>{stage.town}</td>
                                <td>{stage.project_kind}</td>
                                <td className="last">{stage.executor}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="main">
                {this.render_table()}
            </div>
        );
    }
}

export {Main}