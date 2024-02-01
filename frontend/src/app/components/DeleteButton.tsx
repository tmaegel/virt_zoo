import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  onRemove: () => void;
};

export default function DeleteButton({ onRemove }: Props) {
  const onClick = (event: React.MouseEvent<HTMLElement | SVGSVGElement>) => {
    onRemove();
    event.stopPropagation();
  };

  return (
    <IconButton aria-label="delete" onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
}
