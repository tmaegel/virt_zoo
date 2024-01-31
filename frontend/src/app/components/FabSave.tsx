"use client";

import { useRouter } from "next/navigation";
import SaveIcon from "@mui/icons-material/Save";
import Fab from "@mui/material/Fab";
import FabWrapper from "./FabWrapper";

export default function FabSave() {
  const router = useRouter();

  return (
    <FabWrapper>
      <Fab color="primary" variant="extended" aria-label="add" onClick={() => router.push("/create")}>
        <SaveIcon sx={{ mr: 1 }} />
        Speichern
      </Fab>
    </FabWrapper>
  );
}
