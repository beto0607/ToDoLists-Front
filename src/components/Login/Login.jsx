//@author: beto0607
//generated by create_container

import React from "react";
import {
    doPOST,
    getLoginURL,
    setTokenData,
    setUserData
} from "../../utils/utils";
import styles from "./Login.module.scss";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
    }
    handleLoginSuccess(data) {
        if (data.data) {
            setTokenData({
                token: data.data.attributes.token,
                token_expires: data.data.attributes.exp
            });
            setUserData({
                user_id: data.included[0].id,
                ...data.included[0].attributes
            });
            if (this.props.onSuccess) this.props.onSuccess(data);
        } else {
            this.props.onError(data.errors);
        }
    }
    handleLoginError(err) {
        this.props.onError([
            {
                title: "Connection error",
                detail: "There was an error with the server"
            }
        ]);
    }
    handleSubmit(e) {
        console.log(e);
        e.preventDefault();
        const data = new FormData(e.target);
        const json_data = {
            auth: {
                email: data.get("email"),
                password: data.get("password")
            }
        };
        doPOST(
            getLoginURL(),
            json_data,
            this.handleLoginSuccess,
            this.handleLoginError
        );
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="login-email"
                            required={true}
                            tabIndex="1"
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            minLength="6"
                            maxLength="20"
                            required={true}
                            id="login-password"
                            tabIndex="2"
                        />
                    </div>
                    <input type="submit" value="Login" tabIndex="3" />
                </form>
            </div>
        );
    }
}
export default Login;
