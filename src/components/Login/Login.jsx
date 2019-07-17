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
export const Login = ({ onSuccess, onError }) => {
    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        doPOST(
            getLoginURL(),
            {
                auth: {
                    email: data.get("email"),
                    password: data.get("password")
                }
            },
            data => {
                if (data.data) {
                    setTokenData({
                        token: data.data.attributes.token,
                        token_expires: data.data.attributes.exp
                    });
                    setUserData({
                        user_id: data.included[0].id,
                        ...data.included[0].attributes
                    });
                    onSuccess(data);
                } else {
                    onError(data.errors);
                }
            },
            errors => {
                onError([
                    {
                        title: "Connection error",
                        detail: "There was an error with the server"
                    }
                ]);
            }
        );
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
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
};
