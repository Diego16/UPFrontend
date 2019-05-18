import React, { Component } from "react";
import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";

import { auth } from "../actions";

class Register extends Component {

    state = {
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.register(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <form onSubmit={this.onSubmit} className="content">
                <fieldset>
                    <legend>Regístrate</legend>
                    <div className="form-group">
                        <label htmlFor="firstName">Nombres</label>
                        <input type="name" className="form-control" id="firstName" placeholder="Nombres" onChange={e => this.setState({ firstName: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Apellidos</label>
                        <input type="name" className="form-control" id="lastName" placeholder="Apellidos" onChange={e => this.setState({ lastName: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Correo electrónico</label>
                        <input type="email" className="form-control" id="username" placeholder="Correo electrónico" onChange={e => this.setState({ username: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Contraseña" onChange={e => this.setState({ password: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Registrarme</button>
                    </div>
                    <p>¿Ya estás registrado? <Link to="/login">Ingresa</Link></p>
                </fieldset>
            </form>
        )
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
        register: (username, password, firstName, lastName) => dispatch(auth.register(username, password, firstName, lastName)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
