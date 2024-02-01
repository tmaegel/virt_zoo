import Snackbar from "@mui/material/Snackbar";

type Props = {
  message: string;
  onClose: () => void;
};

export default function NotificationBar({ onClose, message }: Props) {
  return (
    <Snackbar
      open={true}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      message={message}
      onClose={onClose}
    />
  );
}
