"use client";

import { useState, useEffect } from "react";
import CreateButton from "./components/CreateButton";
import CreateEditDialog from "./components/CreateEditDialog";
import DeleteButton from "./components/DeleteButton";
import DeleteDialog from "./components/DeleteDialog";
import Grid from "@mui/material/Grid";
import NotificationBar from "./components/NotificationBar";
import Paper from "@mui/material/Paper";
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
import TablePagination from "@mui/material/TablePagination";

export default function Home() {
  const [data, setData] = useState<Animal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    setData(data.map((obj) => (obj.id === model.id ? { ...model } : obj)));
    setNotification("Erfolgreich bearbeitet!");
  };

  const onRemove = (model: Animal) => {
    setData(data.filter((obj: Animal) => obj.id != model.id));
    setNotification("Erfolgreich gelöscht!");
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      {edit && (
        <CreateEditDialog
          model={edit}
          onClose={() => setEdit(null)}
          onSuccess={onEdit}
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
          <Paper>
            <TableContainer>
              <Table>
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
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((obj) => (
                    <TableRow
                      key={obj.id!.toString()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
                      onClick={() => setEdit(obj)}
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
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />{" "}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
