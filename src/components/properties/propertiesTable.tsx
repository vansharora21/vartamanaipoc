"use client";

import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

type Order = "asc" | "desc";
type OrderBy = "poNumber" | "address" | "assigned" | "value";

const PropertiesTable: React.FC<{ purchases: any }> = ({ purchases }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<OrderBy>("poNumber");
  const [selected, setSelected] = useState<string[]>([]);

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = purchases.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const sortedPurchases = React.useMemo(() => {
    return [...purchases].sort((a, b) => {
      const isAsc = order === "asc";
      const valA = a[orderBy === "poNumber" ? "poNumber" : orderBy];
      const valB = b[orderBy === "poNumber" ? "poNumber" : orderBy];

      if (orderBy === "value") {
        const numA = parseFloat(a.total.replace("$", "").replace(",", ""));
        const numB = parseFloat(b.total.replace("$", "").replace(",", ""));
        return isAsc ? numA - numB : numB - numA;
      }

      if (typeof valA === "string") {
        return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return isAsc ? (valA || 0) - (valB || 0) : (valB || 0) - (valA || 0);
    });
  }, [purchases, order, orderBy]);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none", borderRadius: "16px" }}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < purchases.length}
                checked={purchases.length > 0 && selected.length === purchases.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {[
              { id: "poNumber", label: "Name" },
              { id: "address", label: "Address" },
              { id: "assigned", label: "Total assigned", sortable: false },
              { id: "value", label: "Value" },
            ].map((column: any) => (
              <TableCell key={column.id}>
                {column.sortable !== false ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPurchases.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                backgroundColor: selected.includes(row.id) ? "action.selected" : "inherit",
                "&:hover": { backgroundColor: "action.hover" },
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(row.id)}
                  onChange={() => handleSelect(row.id)}
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {row.image ? (
                    <img
                      src={typeof row.image === 'string' ? row.image : (row.image.src || "/placeholder.png")}
                      alt={row.poNumber}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <Box sx={{ 
                      width: "40px", 
                      height: "40px", 
                      bgcolor: "action.hover", 
                      borderRadius: "8px",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'text.secondary'
                    }}>
                      <BusinessIcon fontSize="small" />
                    </Box>
                  )}
                  <span style={{ fontWeight: 600, fontSize: "14px" }}>{row.poNumber}</span>
                </Box>
              </TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.status?.assigned || 0}</TableCell>
              <TableCell>{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropertiesTable;
