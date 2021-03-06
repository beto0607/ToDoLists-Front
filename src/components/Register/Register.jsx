//@author: beto0607
//generated by create_container

import React from "react";
import styles from "./Register.module.scss";
import { doPOST, getUsersURL, setUserData } from "../../utils/utils";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const json_data = {
            user: {
                email: data.get("email"),
                username: data.get("username"),
                password: data.get("password"),
                password_confirmation: data.get("password_confirm")
            }
        };
        doPOST(
            getUsersURL(),
            json_data,
            data => {
                if (data.data) {
                    setUserData({
                        user_id: data.data.id,
                        ...data.data.attributes
                    });
                    this.props.onSuccess(data);
                } else {
                    this.props.onError(data.errors);
                }
            },
            errors => {
                console.log(errors);
                this.props.onError([
                    {
                        title: "Connection error",
                        detail: "There was an error with the server"
                    }
                ]);
            }
        );
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            minLength="6"
                            maxLength="20"
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            minLength="6"
                            maxLength="20"
                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="password_confirm">
                            Password confirm:
                        </label>
                        <input
                            type="password"
                            name="password_confirm"
                            minLength="6"
                            maxLength="20"
                        />
                    </div>
                    <input type="submit" value="Register!" />
                </form>
            </div>
        );
    }
}
export default Register;
