"use client";

import { useState, useEffect } from "react";
import CreateButton from "./components/CreateButton";
import CreateEditDialog from "./components/CreateEditDialog";
import DeleteDialog from "./components/DeleteDialog";
import Grid from "@mui/material/Grid";
import NotificationBar from "./components/NotificationBar";
import SearchField from "./components/SearchField";
import SortFilterTable from "./components/SortFilterTable";
import Spinner from "./components/Spinner";
import { Animal } from "./models/Animal";
import { list, ApiError } from "./api/AnimalApi";

export default function Home() {
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
    setData(data.map((obj) => (obj.id === model.id ? { ...model } : obj)));
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
          <SortFilterTable data={data} editHandler={setEdit} removeHandler={setRemove} />
        </Grid>
      </Grid>
    </div>
  );
}
