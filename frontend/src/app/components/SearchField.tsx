"use client";

import styles from "../styles/SearchField.module.css";
import TextField from "@mui/material/TextField";

export default function SearchField() {
  return <TextField className={styles.searchField} type="text" fullWidth={true} placeholder="Suche ..." />;
}
