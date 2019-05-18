import React from 'react';

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-3">¡Esta página no existe!</h1>
            <p className="lead">La página a la que has intentado acceder no existe o el contenido fue eliminado.</p>
            <hr className="my-4" />
            <p>Puedes comunicarte con nosotros si tienes alguna duda acerca de este error.</p>
            <p className="lead">
                <Link className="btn btn-primary btn-lg" to="/" role="button">Volver al inicio</Link>
            </p>
        </div>
    )
}

export default NotFound