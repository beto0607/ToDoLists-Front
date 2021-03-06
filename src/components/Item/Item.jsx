//@author: beto0607
//generated by create_container

import React, { useState } from "react";
import styles from "./Item.module.scss";

import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import {
    getItemResolveURL,
    getItemUnsolveURL,
    getItemURL,
    getListItemsURL,
    doPATCH,
    doDELETE,
    doPOST
} from "../../utils/utils";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const ItemCreate = ({ list_id, onCreate, onError }) => {
    const [form, setForm] = useState({ title: "", valid: "empty" });
    const handleSubmit = e => {
        e.preventDefault();
        if (!form.title.trim()) {
            setForm({ ...form, valid: "invalid" });
            return;
        }
        setForm({ valid: "valid", title: "" });
        doPOST(
            getListItemsURL(list_id),
            { item: { title: form.title } },
            onCreate,
            onError
        );
    };
    return (
        <li>
            <form
                className={
                    styles["new-item-container"] + " " + styles[form.valid]
                }
                onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="description"
                    value={form.title}
                    onChange={e => setForm({ title: e.target.value || "" })}
                />
            </form>
        </li>
    );
};
export const ItemDelete = ({ id, onDeleteItem, onError }) => {
    const onDelete = () => {
        confirmAlert({
            title: "Are you sure?",
            message: `This action will remove #${id} item permanently.`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () =>
                        doDELETE(getItemURL(id), ()=>onDeleteItem(id), onError)
                },
                {
                    label: "No"
                }
            ]
        });
    };
    return (
        <div className={styles["delete-container"]} onClick={onDelete}>
            <FaTrashAlt />
        </div>
    );
};

export const Item = ({ id, attributes, onError, onDeleteItem }) => {
    const { title, status } = attributes;
    const [statusState, setStatus] = useState(status);
    const handleItemClick = () => {
        doPATCH(
            statusState === "DONE"
                ? getItemUnsolveURL(id)
                : getItemResolveURL(id),
            null,
            ({ data }) => {
                setStatus(data.attributes.status);
            },
            onError
        );
    };
    return (
        <li
            className={
                styles["container"] + " " + styles[statusState.toLowerCase()]
            }>
            <div className={styles["status-container"]}>
                {statusState === "DONE" && <FaCheckCircle />}
            </div>
            <span onClick={handleItemClick}>{title}</span>
            <ItemDelete id={id} onError={onError} onDeleteItem={onDeleteItem} />
        </li>
    );
};
