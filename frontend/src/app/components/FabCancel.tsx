"use client";

import { useRouter } from "next/navigation";
import ClearIcon from "@mui/icons-material/Clear";
import Fab from "@mui/material/Fab";
import FabWrapper from "./FabWrapper";

export default function FabCancel() {
  const router = useRouter();

  return (
    <FabWrapper>
      <Fab variant="extended" aria-label="cancel" onClick={() => router.push("/")}>
        <ClearIcon sx={{ mr: 1 }} />
        Abbrechen
      </Fab>
    </FabWrapper>
  );
}
