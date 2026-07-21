"use client";

import { Box, Typography } from "@mui/material";
import React from "react";
import { LIGHT_GRAY } from "@/assets/colors";

interface PurchaseCardProps {
  icon: React.ReactNode;
  title: string;
  amount: number;
  percentageChange: number;
  iconBackground?: string;
  formatCurrency: (value: number) => string;
  children?: React.ReactNode;
}

const PurchaseCard: React.FC<PurchaseCardProps> = ({ icon, title, amount, children, formatCurrency }) => {
  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "background.paper",
        borderRadius: "12px",
        padding: { xs: "14px", md: "16px" },
        border: "1px solid",
        borderColor: "divider",
        ":hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.25 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
          }}
        >
          {icon}
        </Box>
        <Typography sx={{ color: LIGHT_GRAY }}>{title}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          justifyContent: "left",
          alignItems: "left",
        }}
      >
        <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.625rem" }, fontWeight: "600", color: "text.primary" }}>
          {formatCurrency(amount)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default PurchaseCard;
