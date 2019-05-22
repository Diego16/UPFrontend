import React from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from "date-fns/locale/es";
import { students } from "../actions";

registerLocale("es", es);

class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchStudent();
    }
    render() {
        //debugger;
        return (
            <div className="content">
                {this.props.user != null && (
                    <form>
                        <fieldset>
                            <legend>Información</legend>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                <input type="text" readOnly className="form-control-plaintext col-sm-10" id="email" value={this.props.user.username} />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Nombre</label>
                                <input type="text" readOnly className="form-control-plaintext col-sm-10" id="name" value={this.props.user.first_name + " " + this.props.user.last_name} />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-sm-2 col-form-label">Universidad</label>
                                <input type="text" readOnly className="form-control-plaintext col-sm-10" id="" value="" />
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Preferencias</legend>
                            <div className="form-group row">
                                <label htmlFor="start" className="col-sm-4 col-form-label">Empiezo a trabajar a las: </label>
                                <DatePicker
                                    id="start"
                                    locale="es"
                                    className="form-control col-sm-10"
                                    selected={new Date(this.props.student.wakeUpTime)}
                                    onChange={this.handleStartChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeFormat="HH:mm"
                                    dateFormat="HH:mm"
                                    timeCaption="Hora"
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="end" className="col-sm-4 col-form-label">Dejo de trabajar a las:</label>
                                <DatePicker
                                    id="end"
                                    locale="es"
                                    className="form-control col-sm-10"
                                    selected={new Date(this.props.student.sleepTime)}
                                    onChange={this.handleEndChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeFormat="HH:mm"
                                    //dateFormat="HH:mm"
                                    timeCaption="Hora"
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="workTime" className="col-sm-4 col-form-label">Mis periodos de trabajo son de </label>
                                <input type="text" className="form-control col-sm-2" id="workTime" onChange={e => this.setState({ workTime: e.target.value })} value={this.props.student.workTime} />
                                <label htmlFor="workTime" className="col-sm-2 col-form-label">horas </label>
                            </div>
                        </fieldset>
                        <div className="form-group row">
                            <button type="button" className="btn btn-primary">Guardar cambios</button>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        student: state.students.student,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStudent: () => {
            dispatch(students.fetchStudent());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);