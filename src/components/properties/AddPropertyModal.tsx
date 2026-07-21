"use client";

import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

interface AddPropertyModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (property: any) => void;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;

    onAdd({
      id: Date.now().toString(),
      poNumber: name,
      address: address,
      status: { assigned: 0, unassigned: 0 },
      total: "$0.00",
    });
    setName("");
    setAddress("");
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
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Add New Property</Typography>
        <TextField
          label="Property Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}>
            Add Property
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPropertyModal;
