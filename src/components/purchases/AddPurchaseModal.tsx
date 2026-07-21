"use client";

import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

interface AddPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (purchase: any) => void;
}

const AddPurchaseModal: React.FC<AddPurchaseModalProps> = ({ open, onClose, onAdd }) => {
  const [poNumber, setPoNumber] = useState("");
  const [supplier, setSupplier] = useState("");
  const [total, setTotal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poNumber || !supplier || !total) return;

    onAdd({
      id: Date.now().toString(),
      poNumber: poNumber,
      supplier: supplier,
      date: new Date().toLocaleDateString("en-GB").replace(/\//g, "."),
      status: { assigned: 0, unassigned: 1 },
      total: `$${parseFloat(total).toLocaleString()}`,
      items: [],
    });
    setPoNumber("");
    setSupplier("");
    setTotal("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "16px",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Add New Purchase</Typography>
        <TextField
          label="PO Number"
          fullWidth
          value={poNumber}
          onChange={(e) => setPoNumber(e.target.value)}
        />
        <TextField
          label="Supplier"
          fullWidth
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        />
        <TextField
          label="Total Amount"
          type="number"
          fullWidth
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}>
            Create Purchase
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPurchaseModal;
