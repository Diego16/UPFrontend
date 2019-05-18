import React, { Component } from "react";
import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";

import { auth } from "../actions";

class Login extends Component {

    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <form onSubmit={this.onSubmit} className="content">
                <fieldset>
                    <legend>UPlanner</legend>
                    {this.props.errors.length > 0 && (
                        <ul>
                            {this.props.errors.map(error => (
                                <li key={error.field}>{error.message}</li>
                            ))}
                        </ul>
                    )}
                    <div className="form-group">
                        <label htmlFor="username">Correo electrónico</label>
                        <input type="email" className="form-control" id="username" onChange={e => this.setState({ username: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" id="password" onChange={e => this.setState({ password: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Ingresar</button>
                    </div>
                    <p>¿No estás registrado? <Link to="/register">Regístrate</Link></p>
                </fieldset>
            </form>
        );
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return { field, message: state.auth.errors[field] };
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
