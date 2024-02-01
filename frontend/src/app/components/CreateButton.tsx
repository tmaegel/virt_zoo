import Button from "@mui/material/Button";

type Props = {
  onCreate: () => void;
};

export default function CreateButton({ onCreate }: Props) {
  return (
    <Button variant="outlined" onClick={onCreate}>
      Erstellen
    </Button>
  );
}
