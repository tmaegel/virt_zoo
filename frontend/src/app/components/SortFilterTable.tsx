import { useState } from "react";
import DeleteButton from "./DeleteButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Animal } from "../models/Animal";

type Order = "asc" | "desc";

function descending<K>(a: K, b: K) {
  if (b < a) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}

function compare(a: Animal, b: Animal, orderBy: string) {
  switch (orderBy) {
    case "name":
      return descending(a.name, b.name);
    case "weight":
      return descending(a.weight, b.weight);
    case "capability":
      return descending(a.capability, b.capability);
    case "extinctSince":
      return descending(a.extinctSince, b.extinctSince);
    default:
      return descending(a.name, b.name);
  }
}

function getComparator(order: Order, orderBy: string): (a: Animal, b: Animal) => number {
  return order === "desc" ? (a, b) => compare(a, b, orderBy) : (a, b) => -compare(a, b, orderBy);
}

type SortFilterTableProps = {
  data: Animal[];
  searchTerm: string;
  editHandler: (model: Animal) => void;
  removeHandler: (model: Animal) => void;
};

type SortableTableHeadProps = {
  order: Order;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
};

export default function SortFilterTable({ data, searchTerm, editHandler, removeHandler }: SortFilterTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("name"); // id of tableHeadCells

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (e: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <SortableTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {data
              .slice()
              .filter(
                (obj) =>
                  obj.name.toLowerCase().includes(searchTerm) || obj.capability.toLowerCase().includes(searchTerm),
              )
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((obj) => (
                <TableRow
                  key={obj.id!.toString()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
                  onClick={() => editHandler(obj)}
                  hover={true}
                >
                  <TableCell component="th" scope="row">
                    {obj.name}
                  </TableCell>
                  <TableCell>{obj.weight.toString()}</TableCell>
                  <TableCell>{obj.capability}</TableCell>
                  <TableCell>{obj.extinctSince.toString()}</TableCell>
                  <TableCell align="right">
                    <DeleteButton onRemove={() => removeHandler(obj)} />
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
  );
}

function SortableTableHead({ order, orderBy, onRequestSort }: SortableTableHeadProps) {
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => onRequestSort(event, property);

  const tableHeadCells = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "weight",
      label: "Gewicht (kg)",
    },
    {
      id: "capability",
      label: "Fähigkeit",
    },
    {
      id: "extinctSince",
      label: "Ausgestorben seit (Jahre)",
    },
  ];

  return (
    <TableHead>
      <TableRow>
        {tableHeadCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
