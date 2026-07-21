"use client";

import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled,
}) => {
  return (
    <Button
      sx={{
        background: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
        borderRadius: "24px",
        color: (theme) => theme.palette.mode === 'dark' ? '#000' : '#fff',
        paddingX: "20px",
        paddingY: "10px",
        textTransform: "none",
        fontWeight: 600,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 4px 14px 0 rgba(0,0,0,0.1)",
        "&:hover": {
          background: (theme) => theme.palette.mode === 'dark' ? '#eee' : '#333',
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
