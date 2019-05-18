import React from 'react';


class Profile extends React.Component {
    render() {
        return (
            <div className="content">
                <form>
                    <fieldset>
                        <legend>Información</legend>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="text" readonly="" class="form-control-plaintext" id="staticEmail" value="tester@testing.com" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticName" class="col-sm-2 col-form-label">Nombre</label>
                            <div class="col-sm-10">
                                <input type="text" readonly="" class="form-control-plaintext" id="staticName" value="Tester McTesting" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Universidad</label>
                            <div class="col-sm-10">
                                <input type="text" readonly="" class="form-control-plaintext" id="staticEmail" value="" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Edad</label>
                            <div class="col-sm-10">
                                <input type="text" readonly="" class="form-control-plaintext" id="staticEmail" value="" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Género</label>
                            <div class="col-sm-10">
                                <input type="text" readonly="" class="form-control-plaintext" id="staticEmail" value="" />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}
export default Profile;