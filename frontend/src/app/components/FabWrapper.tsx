"use client";

import { ReactNode } from "react";
import styles from "../styles/Fab.module.css";
import Box from "@mui/material/Box";

type Props = {
  children: ReactNode;
};

export default function FabWrapper({ children }: Props) {
  return <Box className={styles.fabWrapper}>{children}</Box>;
}
