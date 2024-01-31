"use client";

import { useState, useEffect } from "react";
import FabCreate from "./components/FabCreate";
import SearchField from "./components/SearchField";
import Spinner from "./components/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { Animal } from "./models/Animal";
import { list } from "./api/AnimalApi";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<Animal[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    list().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if (!data || isLoading) return <Spinner />;

  return (
    <div>
      <SearchField />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Gewicht (kg)</TableCell>
              <TableCell>Fähigkeit</TableCell>
              <TableCell>Ausgestorben seit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((obj) => (
              <TableRow
                key={obj.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
                onClick={() => router.push(`edit/${obj.id}`)}
                hover={true}
              >
                <TableCell component="th" scope="row">
                  {obj.name}
                </TableCell>
                <TableCell align="right">{obj.weight.toString()}</TableCell>
                <TableCell>{obj.capability}</TableCell>
                <TableCell>{moment(obj.extinctSince).format("YYYY/MM/DD")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FabCreate />
    </div>
  );
}
