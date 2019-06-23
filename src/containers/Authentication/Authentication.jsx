//@author: beto0607
//generated by create_container

import React from "react";
import { Redirect } from 'react-router-dom'

import styles from "./Authentication.module.scss";

import Login from "../../components/Login";
import Register from "../../components/Register";

class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: "login",
      base_url: "http://localhost:3001/",
      messageClass: styles["no-messages"],
      message: null,
      redirect_target: null,
      redirect: false
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);

    this.loginSuccess = this.loginSuccess.bind(this);
    this.loginError = this.loginError.bind(this);
    this.registerSuccess = this.registerSuccess.bind(this);
    this.registerError = this.registerError.bind(this);

    this.redirect = this.redirect.bind(this);
  }
  redirect(to){
    this.setState({
        redirect: true,
        redirect_target: to
    });
  }
  loginSuccess(data){
    this.setState({
        messageClass: styles['success-message'],
        message: `Welcome back ${data.included[0].attributes.name || "@"+data.included[0].attributes.username}!`
    });
    setTimeout(()=>{
        this.redirect('/dashboard');
    }, 700, this);
  }
  loginError(errors){
    let titles = errors.map((e)=>e.title).join(" ");
    let details = errors.map((e)=>e.details).join(" ");
    this.setState({
        messageClass: styles['error-message'],
        message: data
    });
  }
  registerSuccess(data){

  }
  registerError(data){

  }
  handleLoginClick() {
    this.setState({ showing: "login" });
  }
  handleRegisterClick() {
    this.setState({ showing: "register" });
  }
  render() {
    return (
      <div className={styles.container}>
        {this.state.redirect ? <Redirect to={this.state.redirect_target} /> : null}

        <div className={styles["options-selector"]}>
          <a
            href="#login"
            onClick={this.handleLoginClick}
            className={this.state.showing === "login" ? styles.active : null}>
            Login
          </a>
          <a
            href="#register"
            onClick={this.handleRegisterClick}
            className={
              this.state.showing === "register" ? styles.active : null
            }>
            Register
          </a>
        </div>
        <div className={styles["options-container"]}>
            <div>
                <span className={this.state.messageClass}>{this.state.message}</span>
            </div>
          {this.state.showing === "login" && 
            <Login 
                base_url={this.state.base_url} 
                onSuccess={this.loginSuccess}
                onError={this.loginError}
            />}
          {this.state.showing === "register" && <Register base_url={this.state.base_url}/>}
        </div>
      </div>
    );
  }
}
export default Authentication;
