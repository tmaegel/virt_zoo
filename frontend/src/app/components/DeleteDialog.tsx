import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Animal } from "../models/Animal";
import { remove, ApiError } from "../api/AnimalApi";

type Props = {
  model: Animal;
  onClose: () => void;
  onSuccess: (model: Animal) => void;
  onError: (error: Error | ApiError) => void;
};

export default function DeleteDialog({ model, onClose, onSuccess, onError }: Props) {
  const handleConfirm = () => {
    if (model.id) {
      remove(model).then((res) => {
        if (res instanceof ApiError) {
          onError(res);
        } else {
          onSuccess(model);
        }
      });
    } else {
      onError(new Error("ERROR: Undefined id"));
    }
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Löschen</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>Hologramm löschen?</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Nein
        </Button>
        <Button onClick={handleConfirm}>Ja</Button>
      </DialogActions>
    </Dialog>
  );
}
