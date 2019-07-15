//@author: beto0607
//generated by create_container

import React from "react";
import styles from "./ListNew.module.scss";
import { doPOST, getUserListsURL, getUserId } from "../../utils/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ListNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = { due_date: new Date() };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleListNewSuccess = this.handleListNewSuccess.bind(this);
        this.handleListNewError = this.handleListNewError.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }
    handleChangeDate(date) {
        this.setState({
            due_date: date
        });
    }
    handleListNewSuccess(data) {
        this.props.listAdded(data);
    }
    handleListNewError(err) {
        console.log(err);
        this.props.showErrors(err);
    }
    handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        const title = formData.get("title");
        let data = {
            title: title
        };
        //const due_date = formData.get("due_date");
        const due_date = this.state.due_date;
        if (due_date) {
            data["due_date"] = due_date;
        }
        const description = formData.get("description");
        if (description) {
            data["description"] = description;
        }
        doPOST(
            getUserListsURL(getUserId()),
            { list: data },
            this.handleListNewSuccess,
            this.handleListNewError
        );
    }
    render() {
        return (
            <div className={styles["add-list-container"]}>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles["input-container"]}>
                        <h2>New List</h2>
                    </div>
                    <hr />
                    <div className={styles["input-container"]}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="title">Due date:</label>
                        <DatePicker
                            selected={this.state.due_date}
                            onChange={this.handleChangeDate}
                            showTimeSelect
                            dateFormat="Pp"

                        />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" />
                    </div>
                    <input type="submit" value="Create" />
                    <button onClick={this.props.close}>Cancel</button>
                </form>
            </div>
        );
    }
}
export default ListNew;
