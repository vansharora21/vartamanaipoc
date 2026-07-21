"use client";

import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

interface AddCompanyModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (company: any) => void;
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onAdd({
      id: Date.now().toString(),
      name: name,
      address: "TBD Address",
      properties: 0,
      users: 0,
      status: "Active",
      email: email,
    });
    setName("");
    setEmail("");
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
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Add New Company</Typography>
        <TextField
          label="Company Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Contact Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: "#000", "&:hover": { bgcolor: "#333" } }}>
            Add Company
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCompanyModal;
