import React from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from "date-fns/locale/es";
import { events } from "../actions";
import ReactRRuleGenerator, { translations } from "./react-rrule-generator";
import { CirclePicker } from 'react-color';

registerLocale("es", es);

class EventModal extends React.Component {
    state = {
        isAllDayChecked: false,
        isRecurrent: false,
        endDate: new Date(),
        rrule: null,
        frequency: "",
        color: "#325d88"
    }
    onSubmit = () => {
        this.props.addEvent(document.getElementById("title").value, this.props.start, this.state.endDate, this.state.isAllDayChecked, this.state.rrule, document.getElementById("description").value, this.props.user.id, this.state.color).then(this.props.onClose);
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
                            <h5 className="modal-title">Crear evento</h5>
                            <button type="button" className="close" onClick={this.props.onClose} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label" htmlFor="title">Título del evento</label>
                                    <input type="text" className="form-control" placeholder="Título del evento" id="title" />
                                </div>
                                <div className="form-group form-inline">
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input form-control" id="allDay" onChange={this.toggleAllDay} checked={this.state.isAllDayChecked} />
                                        <label className="custom-control-label" htmlFor="allDay">Todo el día</label>
                                    </div>
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input form-control" id="recurrence" onChange={this.toggleRecurrence} checked={this.state.isRecurrent} />
                                        <label className="custom-control-label" htmlFor="recurrence">Repetición</label>
                                    </div>
                                </div>
                                <div hidden={!this.state.isRecurrent}>
                                    <ReactRRuleGenerator
                                        config={{
                                            hideStart: false,
                                            repeat: ['Monthly', 'Weekly', 'Daily'],
                                            weekStartsOnSunday: true,
                                            hideError: true,
                                        }}
                                        onChange={(rrule) => {this.setState({ rrule: rrule });console.log(rrule)}}
                                        translations={translations.spanish}
                                    />
                                </div>
                                <div hidden={this.state.isRecurrent}>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="startDate">Inicio del evento</label>
                                        <div hidden={this.state.isAllDayChecked}>
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
                                                startDate={this.props.start}
                                                endDate={this.state.endDate}
                                                onChange={this.props.changeStart}
                                                isClearable={true}
                                            />
                                        </div>
                                        <div hidden={!this.state.isAllDayChecked}>
                                            <DatePicker
                                                locale="es"
                                                className="form-control"
                                                id="startDate"
                                                selectsStart
                                                selected={this.props.start}
                                                startDate={this.props.start}
                                                endDate={this.state.endDate}
                                                onChange={this.props.changeStart}
                                                isClearable={true}
                                                placeholderText="Fecha"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="endDate">Fin del evento</label>
                                        <div hidden={this.state.isAllDayChecked}>
                                            <DatePicker
                                                locale="es"
                                                className="form-control"
                                                id="endDateTime"
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                dateFormat="MM/dd/yyyy HH:mm"
                                                timeCaption="Hora"
                                                timeIntervals={30}
                                                placeholderText="Fecha y hora"
                                                selectsEnd
                                                selected={this.state.endDate}
                                                startDate={this.state.startDate}
                                                endDate={this.state.endDate}
                                                onChange={this.handleEndChange}
                                                isClearable={true}
                                            />
                                        </div>
                                        <div hidden={!this.state.isAllDayChecked}>
                                            <DatePicker
                                                locale="es"
                                                className="form-control"
                                                id="endDate"
                                                selectsEnd
                                                selected={this.state.endDate}
                                                startDate={this.state.startDate}
                                                endDate={this.state.endDate}
                                                onChange={this.handleEndChange}
                                                isClearable={true}
                                                placeholderText="Fecha"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="colorPicker">Color</label>
                                    <CirclePicker
                                        id="colorPicker"
                                        colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#795548"]}
                                        onChange={(color) => {this.setState({ color: color.hex }); console.log(this.state.color)}}
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
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onClose}>Cancelar</button>
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
        addEvent: (title, startDate, endDate, allDay, rrule, description, user, color) => dispatch(events.addEvent(title, startDate, endDate, allDay, rrule, description, user, color))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventModal);
