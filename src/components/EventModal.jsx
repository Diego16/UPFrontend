import React from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from "date-fns/locale/es";
import { events } from "../actions";
import ReactRRuleGenerator, { translations } from "./react-rrule-generator";
import { CirclePicker } from 'react-color';

registerLocale("es", es);

class EventModal extends React.Component {
    onSubmit = () => {
        if (this.props.updateEventId === null) {
            this.props.addEvent(document.getElementById("title").value, this.props.start, this.props.end, this.props.isAllDayChecked, this.props.rrule, document.getElementById("description").value, this.props.user.id, this.props.color).then(this.props.onClose);
        } else {
            this.props.updateEvent(this.props.updateEventId, document.getElementById("title").value, this.props.start, this.props.end, this.props.isAllDayChecked, this.props.rrule, document.getElementById("description").value, this.props.user.id, this.props.color).then(this.props.onClose);
        }
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal-backdrop" >
                <div className="modal-dialog-scrollable">
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
                                    <input type="text" className="form-control" placeholder="Título del evento" id="title" value={this.props.title} onChange={e => this.props.changeTitle(e.target.value)} />
                                </div>
                                <div className="form-group form-inline">
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input form-control" id="allDay" onChange={this.props.toggleAllDay} checked={this.props.isAllDayChecked} />
                                        <label className="custom-control-label" htmlFor="allDay">Todo el día</label>
                                    </div>
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input form-control" id="recurrence" onChange={this.props.toggleRecurrence} checked={this.props.isRecurrent} />
                                        <label className="custom-control-label" htmlFor="recurrence">Repetición</label>
                                    </div>
                                </div>
                                <div hidden={!this.props.isRecurrent}>
                                    <ReactRRuleGenerator
                                        config={{
                                            hideStart: false,
                                            repeat: ['Monthly', 'Weekly', 'Daily'],
                                            weekStartsOnSunday: true,
                                            hideError: true,
                                        }}
                                        onChange={(rrule) => this.props.changeRRule(rrule)}
                                        translations={translations.spanish}
                                        value={this.props.rrule}
                                    />
                                </div>
                                <div hidden={this.props.isRecurrent}>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="startDate">Inicio del evento</label>
                                        <div hidden={this.props.isAllDayChecked}>
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
                                                endDate={this.props.end}
                                                onChange={this.props.changeStart}
                                                isClearable={true}
                                            />
                                        </div>
                                        <div hidden={!this.props.isAllDayChecked}>
                                            <DatePicker
                                                locale="es"
                                                className="form-control"
                                                id="startDate"
                                                selectsStart
                                                selected={this.props.start}
                                                startDate={this.props.start}
                                                endDate={this.props.end}
                                                onChange={this.props.changeStart}
                                                isClearable={true}
                                                placeholderText="Fecha"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="endDate">Fin del evento</label>
                                        <div hidden={this.props.isAllDayChecked}>
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
                                                selected={this.props.end}
                                                startDate={this.props.start}
                                                endDate={this.props.end}
                                                onChange={this.props.changeEnd}
                                                isClearable={true}
                                            />
                                        </div>
                                        <div hidden={!this.props.isAllDayChecked}>
                                            <DatePicker
                                                locale="es"
                                                className="form-control"
                                                id="endDate"
                                                selectsEnd
                                                selected={this.props.end}
                                                startDate={this.props.start}
                                                endDate={this.props.end}
                                                onChange={this.props.changeEnd}
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
                                        onChange={(color) => this.props.changeColor(color.hex)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Descripción</label>
                                    <textarea className="form-control" id="description" rows="3" value={this.props.description} onChange={e => this.props.changeDescription(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Guardar</button>
                            {this.props.updateEventId !== null && (
                                <button type="button" className="btn btn-danger" onClick={()=>{if (window.confirm("¿Desea eliminar el evento " +this.props.title+ " de su calendario?"))this.props.deleteEvent(this.props.updateEventId);}}>Eliminar</button>
                            )}
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEvent: (title, startDate, endDate, allDay, rrule, description, user, color) => dispatch(events.addEvent(title, startDate, endDate, allDay, rrule, description, user, color)),
        updateEvent: (id, title, startDate, endDate, allDay, rrule, description, user, color) => dispatch(events.updateEvent(id, title, startDate, endDate, allDay, rrule, description, user, color)),
        deleteEvent: (id) => dispatch(events.deleteEvent(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventModal);
