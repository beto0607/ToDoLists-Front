//@author: beto0607
//generated by create_container

import React from "react";
import styles from "./List.module.scss";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import ListItem from "../ListItem";
import LoadingSpinner from "../LoadingSpinner";
import {
    doGET,
    getListItemsURL,
    doDELETE,
    getListURL
} from "../../utils/utils";
import {
    FaExpandArrowsAlt,
    FaCompressArrowsAlt,
    FaTrashAlt
} from "react-icons/fa";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            loadingItems: false
        };
        this.items = null;
        this.close = this.close.bind(this);
        this.handleClickDiv = this.handleClickDiv.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleLoadItemsSuccess = this.handleLoadItemsSuccess.bind(this);
        this.handleLoadItemsError = this.handleLoadItemsError.bind(this);
        this.handleRemoveListSuccess = this.handleRemoveListSuccess.bind(this);
        this.handleRemoveListError = this.handleRemoveListError.bind(this);
    }
    handleClickDiv(e) {
        this.props.closeLists();
        if (
            !e.target.closest("." + styles["delete-container"]) && //Not pressed delete-container or child
            (!this.state.opened || //List is close
                e.target.closest("." + styles["icon-container"])) //Not pressed icon-container or child
        ) {
            if (!this.items || this.items.length === 0) {
                this.loadItems();
            } else {
                this.setState({ opened: !this.state.opened });
            }
        }
    }
    handleLoadItemsSuccess(data) {
        if (data.data) {
            this.items = data.data || [];
            this.setState({ loadingItems: false });
        } else if (data.errors) {
            this.showErrors(data.errors);
        }
    }
    handleLoadItemsError(err) {
        console.log(err);
    }
    loadItems() {
        this.setState({ loadingItems: true, opened: true });
        doGET(
            getListItemsURL(this.props.id),
            this.handleLoadItemsSuccess,
            this.handleLoadItemsError
        );
    }
    handleDeleteClick(e) {
        confirmAlert({
            title: "Are you sure?",
            message: `This action will remove #${
                this.props.id
            } list permanently.`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => this.removeList()
                },
                {
                    label: "No"
                }
            ]
        });
    }
    handleRemoveListSuccess(data) {
        if (data.status === 204) {
            this.props.listRemoved(this.props.id);
        } else if (data.status === 401) {
            this.props.showErrors([
                { title: "Unauthorized", detail: "Error with Authentication" }
            ]);
        }
    }
    handleRemoveListError(err) {
        console.log(err);
    }
    removeList() {
        doDELETE(
            getListURL(this.props.id),
            this.handleRemoveListSuccess,
            this.handleRemoveListError
        );
    }
    close() {
        this.setState({
            opened: false
        });
    }
    render() {
        const {
            title,
            due_date,
            description,
            items_done_count,
            items_count
        } = this.props.attributes;
        return (
            <div
                className={
                    styles["list-container"] +
                    " " +
                    (this.state.opened && styles["opened"])
                }
                onClick={this.handleClickDiv}>
                <div className={styles["icon-container"]}>
                    {this.state.opened ? (
                        <FaCompressArrowsAlt />
                    ) : (
                        <FaExpandArrowsAlt />
                    )}
                </div>

                <div
                    className={styles["delete-container"]}
                    onClick={this.handleDeleteClick}>
                    <FaTrashAlt />
                </div>

                <strong>{title}</strong>

                <span>
                    Due date:
                    {" " +
                        (due_date
                            ? new Date(due_date).toDateString()
                            : "<empty>")}
                </span>

                <span>Items: {`${items_done_count}/${items_count}`}</span>

                {description && (
                    <p>
                        Description:{" "}
                        {description.substr(0, 120) +
                            (description.length > 120 && "...")}
                    </p>
                )}

                {this.state.opened && (
                    <div>
                        <LoadingSpinner isShowing={this.state.loadingItems} />
                        <ul>
                            {(this.items || []).map(element => (
                                <ListItem
                                    key={`List#${this.props.id}_Item#${
                                        element.id
                                    }`}
                                    {...element}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}
export default List;
