"use client";

import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CreateButton from "./components/CreateButton";
import CreateEditDialog from "./components/CreateEditDialog";
import DeleteDialog from "./components/DeleteDialog";
import Grid from "@mui/material/Grid";
import NotificationBar from "./components/NotificationBar";
import SearchField from "./components/SearchField";
import SortFilterTable from "./components/SortFilterTable";
import Spinner from "./components/Spinner";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Animal } from "./models/Animal";
import { list, ApiError } from "./api/AnimalApi";

export default function Home() {
  const [data, setData] = useState<Animal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [search, setSearch] = useState("");
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

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Virtueller Zoo
            </Typography>
            <SearchField searchHandler={setSearch} />
            <CreateButton onCreate={() => setCreate(true)} />
          </Toolbar>
        </AppBar>
      </Box>
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
      <SortFilterTable data={data} searchTerm={search} editHandler={setEdit} removeHandler={setRemove} />
    </div>
  );
}
