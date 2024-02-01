"use client";

import { useState, useEffect } from "react";
import SearchField from "./components/SearchField";
import Spinner from "./components/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Animal } from "./models/Animal";
import { list, ApiError } from "./api/AnimalApi";
import { useRouter } from "next/navigation";
import DeleteDialog from "./components/DeleteDialog";
import DeleteButton from "./components/DeleteButton";
import NotificationBar from "./components/NotificationBar";
import CreateButton from "./components/CreateButton";
import Grid from "@mui/material/Grid";
import CreateEditDialog from "./components/CreateEditDialog";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<Animal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [create, setCreate] = useState(false);
  const [remove, setRemove] = useState<Animal | null>(null);
  const [edit, setEdit] = useState<Animal | null>(null);

  useEffect(() => {
    list().then((res) => {
      if (res instanceof ApiError) {
        setNotification(res.message);
        setLoading(false);
      } else {
        setData(res);
        setLoading(false);
      }
    });
  }, []);

  if (!data || loading) return <Spinner />;

  const onCreate = (model: Animal) => {
    setData([...data, model]);
    setNotification("Erfolgreich angelegt!");
  };

  const onEdit = (model: Animal) => {
    setNotification("Erfolgreich bearbeitet!");
  };

  const onRemove = (model: Animal) => {
    setData(data.filter((obj: Animal) => obj.id != model.id));
    setNotification("Erfolgreich gelöscht!");
  };

  return (
    <div>
      {notification && <NotificationBar message={notification} onClose={() => setNotification(null)} />}
      {create && (
        <CreateEditDialog
          onClose={() => setCreate(false)}
          onSuccess={onCreate}
          onError={(error) => setNotification(error.message)}
        />
      )}
      {remove && (
        <DeleteDialog
          model={remove}
          onClose={() => setRemove(null)}
          onSuccess={onRemove}
          onError={(error) => setNotification(error.message)}
        />
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CreateButton onCreate={() => setCreate(true)} />
        </Grid>
        <Grid item xs={12}>
          <SearchField />
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Gewicht (kg)</TableCell>
                  <TableCell>Fähigkeit</TableCell>
                  <TableCell>Ausgestorben seit (Jahre)</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((obj) => (
                  <TableRow
                    key={obj.id!.toString()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
                    onClick={() => onEdit(obj)}
                    hover={true}
                  >
                    <TableCell component="th" scope="row">
                      {obj.name}
                    </TableCell>
                    <TableCell align="right">{obj.weight.toString()}</TableCell>
                    <TableCell>{obj.capability}</TableCell>
                    <TableCell>{obj.extinctSince.toString()}</TableCell>
                    <TableCell align="right">
                      <DeleteButton onRemove={() => setRemove(obj)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
