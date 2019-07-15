import { FaTrashAlt } from "react-icons/fa";
import React from "react";
import styles from "./ListItem.module.scss";
import { getItemURL, doDELETE } from "../../utils/utils";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const ItemDelete = ({ id, onDeleteItem, showErrors }) => {
    const onDelete = () => {
        confirmAlert({
            title: "Are you sure?",
            message: `This action will remove #${id} item permanently.`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () =>
                        doDELETE(getItemURL(id), onDeleteItem, showErrors)
                },
                {
                    label: "No"
                }
            ]
        });
    };
    return (
        <div className={styles["delete-container"]} onClick={() => onDelete}>
            <FaTrashAlt />
        </div>
    );
};

export default ItemDelete;
