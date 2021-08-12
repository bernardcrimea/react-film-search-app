import React, { Component } from "react";
import classes from "./Auth.scss";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите коректный email.",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "current-password",
        label: "Пароль",
        errorMessage: "Введите коректный пароль.",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler(event, controlName) {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  }

  redirectToPage(link) {
    this.props.history.push(link);
  }

  submitHandler(event) {
    event.preventDefault();
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      const isInValid = (valid, touched, validation) => {
        if (!valid && touched && !!validation) {
          return (
            <div className="error-text">
              {control.errorMessage || "Введите верное значение"}
            </div>
          );
        }
      };

      return (
        <div className="mb-3" key={(controlName + index).toString()}>
          <label className="form-label">{control.label}</label>
          <input
            type={control.type}
            value={control.value}
            valid={control.valid.toString()}
            touched={control.touched.toString()}
            errormessage={control.errorMessage}
            shouldvalidate={control.validation.toString()}
            className="form-control"
            onChange={(event) => this.onChangeHandler(event, controlName)}
          />
          {isInValid(control.valid, control.touched, control.validation)}
        </div>
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <h1 className="auth-title m-5">Авторизация</h1>
        <div className="auth-form d-flex justify-content-center flex-column">
          <form className="reg-form m-5" onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <div className="btn-controls">
              <button
                className="btn btn-success me-2 mt-2"
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >
                Войти
              </button>
              <button
                className="btn btn-primary mt-2"
                onClick={this.registerHandler}
                disabled={!this.state.isFormValid}
              >
                Регистрация
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
