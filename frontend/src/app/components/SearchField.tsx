import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  searchHandler: (value: string) => void;
};

export default function SearchField({ searchHandler }: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => searchHandler(value), 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <TextField type="text" placeholder="Suchen" fullWidth={true} value={value} onChange={onChange} />;
}
