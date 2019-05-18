import React from 'react';
import { connect } from 'react-redux';
import { auth } from "../actions";
import DatePicker, { registerLocale } from 'react-datepicker';
import es from "date-fns/locale/es";
import { Link } from 'react-router-dom';

registerLocale("es", es);

class Preferences extends React.Component {
    componentDidMount() {
        this.props.loadUser();
    }
    state = {
        workTime: 2,
        startTime: new Date(),
        endTime: new Date(),
    };
    render() {
        return (
            <div className="content">
                <form>
                    <fieldset>
                        <legend>Preferencias</legend>
                        <div className="form-group row">
                            <label for="start" className="col-sm-4 col-form-label">Empiezo a trabajar a las: </label>
                            <div className="col-sm-10">
                                <DatePicker
                                    locale="es"
                                    className="form-control"
                                    selected={this.state.startTime}
                                    onChange={this.handleStartChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    dateFormat="HH:mm"
                                    timeCaption="Hora"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="end" className="col-sm-4 col-form-label">Dejo de trabajar a las:</label>
                            <div className="col-sm-10">
                                <DatePicker
                                    locale="es"
                                    className="form-control"
                                    selected={this.state.endTime}
                                    onChange={this.handleEndChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    dateFormat="HH:mm"
                                    timeCaption="Hora"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="workTime" className="col-sm-3 col-form-label">Mis periodos de trabajo son de </label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" id="workTime" onChange={e => this.setState({ workTime: e.target.value })} defaultValue={this.state.workTime}/>
                            </div>
                            <label for="workTime" className="col-sm-2 col-form-label">horas </label>
                        </div>
                    </fieldset>
                    <button type="button" className="btn btn-primary">Guardar cambios</button>
                    <p><Link className="btn btn-primary" to="/profile">Perfil</Link></p>
                </form>
            </div >
        );
    }
    handleStartChange = (date) => {
        this.setState({
            startTime: date,
        });
    }
    handleEndChange = (date) => {
        this.setState({
            endTime: date,
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
        loadUser: () => {
            return dispatch(auth.loadUser());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Preferences);