"use client";

import FabCancel from "@/app/components/FabCancel";
import FabSave from "@/app/components/FabSave";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Edit() {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Bearbeiten
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField id="name" label="Name" fullWidth={true} required />
        </Grid>
        <Grid item xs={12}>
          <TextField id="weight" label="Gewicht (kg)" fullWidth={true} required />
        </Grid>
        <Grid item xs={12}>
          <TextField id="capability" label="Fähigkeit" fullWidth={true} required />
        </Grid>
        <Grid item xs={12}>
          <TextField id="extinctSince" label="Ausgestorben seit" fullWidth={true} required />
        </Grid>
        <Grid item xs={6}>
          <FabCancel />
        </Grid>
        <Grid item xs={6}>
          <FabSave />
        </Grid>
      </Grid>
    </Container>
  );
}
