//@author: beto0607
//generated by create_container

import React from "react";
import { Redirect } from "react-router-dom";

import Layout from "../../layouts/Layout";
import { List } from "../../components/List";
import ListNew from "../../components/ListNew";
import styles from "./Dashboard.module.scss";

import NotificationSystem from "../../components/NotificationSystem";
import { FaPlus } from "react-icons/fa";

import {
    checkIfUserLoggedIn,
    doGET,
    getUserListsURL,
    getUserId
} from "../../utils/utils";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showListNew: false,
            messages: [],
            lists: [],
            redirect_target: "",
            redirect: false
        };
        if (!checkIfUserLoggedIn())
            this.state = { redirect_target: "/auth", redirect: true };
        this.showErrors = this.showErrors.bind(this);
    }
    redirect(to = "/auth") {
        this.setState({ redirect: true, redirect_target: to });
    }
    componentDidMount() {
        if (this.state.redirect) return;
        doGET(
            getUserListsURL(getUserId()),
            data => {
                if (data.data) {
                    this.setState({ lists: data.data });
                } else {
                    this.showErrors(data.errors);
                }
            },
            errors => {
                if (errors === 401) {
                    this.redirect("/auth");
                } else {
                    this.showErrors(errors);
                }
            }
        );
    }
    showErrors(errors) {
        errors.forEach(element => (element.type = "error"));
        this.setState({ messages: errors });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect_target} />;
        }
        return (
            <Layout header_props={{ title: "Dashboard" }}>
                <div className={styles["dashboard-container"]}>
                    <NotificationSystem messages={this.state.messages} />
                    <div
                        className={styles["add-button-container"]}
                        onClick={() => this.setState({ showListNew: true })}>
                        <FaPlus />
                    </div>
                    {this.state.showListNew && (
                        <ListNew
                            base_url={this.props.base_url}
                            close={() => {
                                this.setState({ showListNew: false });
                            }}
                            listAdded={data => {
                                this.setState({
                                    lists: [...this.state.lists, data.data],
                                    messages: [
                                        {
                                            title: "New list:",
                                            detail:
                                                "Created list #" + data.data.id,
                                            type: "good"
                                        }
                                    ],
                                    showListNew: false
                                });
                            }}
                            authorization_header={this.authorization_header}
                            showErrors={this.showErrors}
                        />
                    )}
                    <div className={styles["lists-container"]}>
                        {this.state.lists.map((element, index) => (
                            <List
                                key={`list#${index}`}
                                {...element}
                                onListDeleted={id => {
                                    this.setState({
                                        lists: this.state.lists.filter(
                                            e => e.id !== id
                                        )
                                    });
                                }}
                                onError={this.showErrors}
                            />
                        ))}
                    </div>
                </div>
            </Layout>
        );
    }
}
export default Dashboard;
