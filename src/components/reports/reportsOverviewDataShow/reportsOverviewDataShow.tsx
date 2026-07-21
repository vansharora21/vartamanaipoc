"use client";

import { Box, Typography } from "@mui/material";
import React from "react";
import helpIcon from "@/assets/helpIcon.svg";
import GraphSection from "@/assets/GraphSection.svg";

interface ReportsOverviewDataShowProps {
  Icon?: any;
  Text?: string;
  Number?: number;
  children?: React.ReactNode;
}

const ReportsOverviewDataShow: React.FC<ReportsOverviewDataShowProps> = ({
  Icon,
  Text,
  Number,
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "150px",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "12px",
        padding: { xs: "14px", md: "16px" },
        gap: "16px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          width="36px"
          height="36px"
          src={Icon?.src || Icon}
          style={{
            backgroundColor: "#F2F2F3",
            borderRadius: "10px",
            padding: "8px",
          }}
          alt={Text}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 2, flexGrow: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "text.primary" }}>
              {Text}
            </Typography>
            <img
              src={helpIcon?.src || helpIcon}
              alt="help"
              style={{ width: "16px", height: "16px" }}
            />
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: "1.75rem", md: "2rem" }, color: "text.primary", lineHeight: 1 }}>
            {Number}
          </Typography>
          {children}
        </Box>
        
        <Box sx={{ alignSelf: "center", flexShrink: 0 }}>
          <img
            src={GraphSection?.src || GraphSection}
            alt="graph"
            style={{ height: "56px", width: "auto" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ReportsOverviewDataShow;
