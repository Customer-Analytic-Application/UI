import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button } from "@mui/material";

function ChurnTable() {
  const [rows, setRows] = React.useState<any>(null);
  const [columns, setColumns] = React.useState<any>([]);
  React.useEffect(() => {
    axios.get("/api/xai?test_data=true").then((res) => {
      setRows(res.data.rows);
      setColumns(res.data.columns);
    });
  });
  if (!rows) return <p>"loading"</p>;

  return (
    <TableContainer>
      <Table
        size="small"
        aria-label="a dense table"
        sx={{
          width: "max-content",
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((col: any) => (
              <TableCell>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((col: any) => (
                <TableCell>{row[col]}</TableCell>
              ))}
              <TableCell>
                <Button>view</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default React.memo(ChurnTable);
