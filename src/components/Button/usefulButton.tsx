"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

interface UsefulButtonProps {
  label?: string;
  textColor?: string;
  backgroundColor?: string;
  Icon?: React.ElementType;
  onClick?: () => void;
}

const UsefulButton: React.FC<UsefulButtonProps> = ({
  Icon,
  label,
  textColor,
  backgroundColor,
  onClick,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255,255,255,0.1)" : "#E2E2E2",
        width: "auto",
        minWidth: "78px",
        height: "40px",
        borderRadius: "32px",
        gap: "8px",
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        backgroundColor: backgroundColor || "transparent",
        "&:hover": { 
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255,255,255,0.05)" : "#f9f9f9",
          transform: "scale(1.05)",
          borderColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255,255,255,0.3)" : "#bbb",
        },
        "&:active": {
          transform: "scale(0.95)",
        },
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          color: textColor,
          fontWeight: 600,
          fontSize: "0.8125rem",
          textAlign: "center",
          width: "100%",
        }}
      >
        {label || (Icon && <Icon />)}
      </Typography>
    </Box>
  );
};

export default UsefulButton;
