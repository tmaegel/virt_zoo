"use client";

import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import FabWrapper from "./FabWrapper";

export default function FabCreate() {
  const router = useRouter();

  return (
    <FabWrapper>
      <Fab color="primary" variant="extended" aria-label="add" onClick={() => router.push("/create")}>
        <AddIcon sx={{ mr: 1 }} />
        Hinzufügen
      </Fab>
    </FabWrapper>
  );
}
