import React from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from "date-fns/locale/es";
import { tasks } from "../actions";
import { CirclePicker } from 'react-color';

registerLocale("es", es);

class TaskModal extends React.Component {
    state = {
        color: "#B71C1C"
    }
    onSubmit = () => {
        if (this.state.updateTaskId === null) {
            this.props.addTask(document.getElementById("title").value, this.props.start, document.getElementById("description").value, this.props.user.id, this.state.color).then(this.props.onClose);
        } else {
            this.props.updateTask(this.state.updateSensorId, document.getElementById("title").value, this.props.start, document.getElementById("description").value, this.props.user.id, this.state.color).then(this.props.onClose);
        }   
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal-backdrop" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Crear tarea</h5>
                            <button type="button" className="close" onClick={this.props.onClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label" htmlFor="title">Título de la tarea</label>
                                    <input type="text" className="form-control" placeholder="Título de la tarea" id="title" />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label" htmlFor="startDateTime">Fecha de entrega</label>
                                    <DatePicker
                                        locale="es"
                                        className="form-control"
                                        id="startDateTime"
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        dateFormat="MM/dd/yyyy HH:mm"
                                        timeCaption="Hora"
                                        timeIntervals={30}
                                        placeholderText="Fecha y hora"
                                        selectsStart
                                        selected={this.props.start}
                                        onChange={this.props.changeStart}
                                        isClearable={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="colorPicker">Color</label>
                                    <CirclePicker
                                        id="colorPicker"
                                        colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#795548"]}
                                        onChange={(color) => this.setState({ color: color.hex })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Descripción</label>
                                    <textarea className="form-control" id="description" rows="3" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Guardar</button>
                            <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    toggleAllDay = () => {
        this.setState({
            isAllDayChecked: !this.state.isAllDayChecked
        })
    }
    toggleRecurrence = () => {
        this.setState({
            isRecurrent: !this.state.isRecurrent
        })
    }
    handleStartChange = (date) => {
        this.setState({
            startDate: date,
        });
    }
    handleEndChange = (date) => {
        this.setState({
            endDate: date,
        });
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (title, startDate, description, user, color) => dispatch(tasks.addTask(title, startDate, description, user, color))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);