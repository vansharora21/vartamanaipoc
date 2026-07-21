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
  Collapse,
  IconButton,
  TableSortLabel,
  Chip,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from "@mui/icons-material";

type Order = "asc" | "desc";
type OrderBy = "poNumber" | "supplier" | "date" | "total";

interface RowProps {
  row: any;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const Row: React.FC<RowProps> = ({ row, isSelected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect(row.id);
    if (!isSelected) {
      setSelectedItems(row.items.map((_: any, index: number) => index));
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: isSelected ? "action.selected" : "inherit",
          "&:hover": { backgroundColor: "action.hover" },
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox checked={isSelected} onChange={(e: any) => handleClick(e)} />
        </TableCell>
        <TableCell>
          <span style={{ fontWeight: 600, fontSize: "14px" }}>{row.poNumber}</span>
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label={row.status.assigned}
              size="small"
              sx={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}
            />
            <Chip
              label={row.status.unassigned}
              size="small"
              sx={{ backgroundColor: "#FFE0B2", color: "#E65100" }}
            />
          </Box>
        </TableCell>
        <TableCell>{row.supplier}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.total}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.length === row.items.length}
                        indeterminate={
                          selectedItems.length > 0 &&
                          selectedItems.length < row.items.length
                        }
                        onChange={(event) => {
                          if (event.target.checked) {
                            setSelectedItems(row.items.map((_: any, index: number) => index));
                          } else {
                            setSelectedItems([]);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Property</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((item: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.includes(index)}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedItems([...selectedItems, index]);
                            } else {
                              setSelectedItems(selectedItems.filter((i) => i !== index));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <img
                            src={item.product.image.src || item.product.image}
                            alt={item.product.name}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                          <span style={{ fontWeight: 600, fontSize: "14px" }}>
                            {item.product.name}
                          </span>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            backgroundColor:
                              item.status === "Assigned" ? "#E8F5E9" : "#FFE0B2",
                            color: item.status === "Assigned" ? "#2E7D32" : "#E65100",
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.receipt || item.purchaser}</TableCell>
                      <TableCell>{item.property}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const UsersTable: React.FC<{ users: any }> = ({ users }) => {
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
      const newSelected = users.map((n: any) => n.id);
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

  const sortedUsers = React.useMemo(() => {
    return [...users].sort((a, b) => {
      const isAsc = order === "asc";
      if (orderBy === "total") {
        const valA = parseFloat(a[orderBy].replace("$", "").replace(",", ""));
        const valB = parseFloat(b[orderBy].replace("$", "").replace(",", ""));
        return isAsc ? valA - valB : valB - valA;
      }
      return isAsc
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    });
  }, [users, order, orderBy]);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none", borderRadius: "16px" }}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < users.length}
                checked={users.length > 0 && selected.length === users.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {[
              { id: "poNumber", label: "PO Number" },
              { id: "status", label: "Status", sortable: false },
              { id: "supplier", label: "Supplier" },
              { id: "date", label: "Date" },
              { id: "total", label: "Total" },
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((row) => (
            <Row
              key={row.id}
              row={row}
              isSelected={selected.includes(row.id)}
              onSelect={handleSelect}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
