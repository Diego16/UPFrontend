import React from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from "date-fns/locale/es";

registerLocale("es", es);

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllDayChecked: false,
            isRecurrent: false,
            startDate: this.props.start,
            endDate: new Date()
        };
    }
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="modal-backdrop">
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
                                <div className="form-group" hidden={!this.state.isRecurrent}>
                                    <label className="col-form-label" htmlFor="rrule">Frecuencia</label>
                                    <div class="btn-group btn-group-toggle" id="rrule" data-toggle="buttons">
                                        <label className="btn btn-primary active">
                                            <input type="checkbox" checked="" autocomplete="off"/>Lunes
                                        </label>
                                        <label className="btn btn-primary active">
                                            <input type="checkbox" autocomplete="off" />Martes
                                        </label>
                                        <label className="btn btn-primary active">
                                            <input type="checkbox" autocomplete="off" />Miércoles
                                        </label>
                                        <label className="btn btn-primary active">
                                            <input type="checkbox" autocomplete="off" />Jueves
                                        </label>
                                        <label className="btn btn-primary active">
                                            <input type="checkbox" autocomplete="off" />Viernes
                                        </label>
                                        <label className="btn btn-primary active">
                                            <input type="checkbox" autocomplete="off" />Sábado
                                        </label>
                                        <label className="btn btn-primary active">
                                            <input type="checkbox" autocomplete="off" />Domingo
                                        </label>
                                    </div>
                                </div>
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
                                            selected={this.state.startDate}
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onChange={this.handleStartChange}
                                            isClearable={true}
                                        />
                                    </div>
                                    <div hidden={!this.state.isAllDayChecked}>
                                        <DatePicker
                                            locale="es"
                                            className="form-control"
                                            id="startDate"
                                            selectsStart
                                            selected={this.state.endDate}
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onChange={this.handleStartChange}
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={this.createEvent}>Guardar</button>
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

    createEvent = () => {
        return fetch('http://localhost:8000/create_event', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify({
                'title': document.getElementById("title").value,
                'start': new Date(this.state.startDate),
                'end': new Date(this.state.endDate),
                'allDay': this.state.isAllDayChecked
            }),
        })
            .then(response => response.json())
            .then(response => {
                console.log('Success:', JSON.stringify(response))
                if (this.state.isAllDayChecked)
                    this.toggleCheck()
                this.props.onClose()
            });
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    start: PropTypes.instanceOf(Date),
    show: PropTypes.bool,
    children: PropTypes.node,
};

export default Modal;
