import React, { useState } from "react";
import styles from "./ListItem.module.scss";
import { getListItemsURL, doPOST } from "../../utils/utils";

const ItemCreate = ({ list_id, showErrors, onCreate }) => {
    const [form, setForm] = useState({ title: "", valid: "empty" });
    const handleSubmit = e => {
        e.preventDefault();
        if (form.title.trim().length !== 0) {
            setForm({ valid: "valid", title: "" });
            doPOST(
                getListItemsURL(list_id),
                { item: form },
                data => onCreate(data),
                errors => showErrors(errors)
            );
        } else {
            setForm({ ...form, valid: "invalid" });
        }
    };
    return (
        <form
            className={styles["new-item-container"] + " " + styles[form.valid]}
            onSubmit={handleSubmit}>
            <input
                type="text"
                name="description"
                value={form.title}
                onChange={e => setForm({ title: e.target.value || "" })}
            />
        </form>
    );
};

export default ItemCreate;
