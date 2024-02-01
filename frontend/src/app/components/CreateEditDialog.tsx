import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Animal } from "../models/Animal";
import { create, ApiError } from "../api/AnimalApi";
import Box from "@mui/material/Box";
import { useState } from "react";

type Props = {
  onClose: () => void;
  onSuccess: (model: Animal) => void;
  onError: (error: Error | ApiError) => void;
};

export default function CreateEditDialog({ onClose, onSuccess, onError }: Props) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [capability, setCabability] = useState("");
  const [extinctSince, setExtinctSince] = useState("");

  const onSubmit = () => {
    let model: Animal = {
      id: undefined,
      name: name,
      weight: parseFloat(weight),
      capability: capability,
      extinctSince: parseInt(extinctSince),
    };
    try {
      create(model).then((res) => {
        if (res instanceof ApiError) {
          onError(res);
        } else {
          onSuccess(res);
        }
        onClose();
      });
    } catch (e) {
      onError(new Error(`ERROR: ${(e as Error).message}`));
    }
  };

  const isInteger = (value: string): boolean => {
    const pattern = new RegExp("^\\d+$");
    if (!value) {
      return true;
    }
    return pattern.test(value);
  };

  const isFloat = (value: string): boolean => {
    const pattern = new RegExp("^\\d+\\.?\\d*$");
    if (!value) {
      return true;
    }
    return pattern.test(value);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Erstellen</DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: 2 }} component="form" autoComplete="off">
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                type="text"
                label="Name"
                value={name}
                error={!name}
                onChange={(e) => setName(e.target.value)}
                fullWidth={true}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="weight"
                type="text"
                label="Gewicht (kg)"
                value={weight}
                error={!isFloat(weight) || !weight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let value = e.target.value;
                  isFloat(value) && setWeight(value);
                }}
                fullWidth={true}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="capability"
                type="text"
                label="Fähigkeit"
                value={capability}
                error={!capability}
                onChange={(e) => setCabability(e.target.value)}
                fullWidth={true}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="extinctSince"
                type="text"
                label="Ausgestorben seit (Jahre)"
                value={extinctSince}
                error={!isInteger(extinctSince) || !extinctSince}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let value = e.target.value;
                  isInteger(value) && setExtinctSince(value);
                }}
                fullWidth={true}
                required
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ marginBottom: 2, marginRight: 1 }}>
          <Button autoFocus onClick={onClose}>
            Abbruch
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!name || !isFloat(weight) || !weight || !capability || !isInteger(extinctSince) || !extinctSince}
          >
            Speichern
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
