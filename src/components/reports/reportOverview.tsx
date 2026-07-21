"use client";

import { Box, Typography } from "@mui/material";
import React from "react";
import ReportsOverviewDataShow from "./reportsOverviewDataShow/reportsOverviewDataShow";
import ArrowIcon from "@/assets/ArrowIcon.svg";
import CostIcon from "@/assets/CostReportIcon.svg";
import CustomerIcon from "@/assets/CustomerIcon.svg";
import UsefulButton from "@/components/Button/usefulButton";
import StockChip from "@/components/Overview/StockChip";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ReportOverview: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: "background.paper",
        borderRadius: "12px",
        padding: { xs: "14px", md: "18px" },
        gap: "18px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          width: "100%",
          gap: 1.5,
        }}
      >
        <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
          Overview
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
            width: { xs: "100%", sm: "auto" },
            alignItems: "center",
            gap: { xs: 1.25, sm: 2 },
            flexWrap: "wrap",
          }}
        >
          {["1d", "7d", "1M", "6M", "1Y"].map((period) => (
            <Typography key={period} sx={{ fontSize: "0.8125rem", fontWeight: 600, color: "text.secondary", cursor: "pointer", ":hover": { color: "text.primary" } }}>
              {period}
            </Typography>
          ))}
          <UsefulButton label="Custom" textColor="#6D6E6F" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          width: "100%",
          gap: "14px",
        }}
      >
        <ReportsOverviewDataShow Icon={CostIcon as any} Number={23} Text="Cost Center">
          <StockChip
            containerStyle={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
              width: "78px", borderRadius: "8px",
              border: "1.5px solid rgba(0, 166, 86, 0.15)",
              background: "rgba(0, 166, 86, 0.05)",
            }}
            icon={<ArrowUpwardIcon style={{ height: "20px" }} />}
            percentageText="36.8%"
            description="vs last month"
            percentageTextColor="#00A656"
            descriptionColor="#637381"
          />
        </ReportsOverviewDataShow>
        <ReportsOverviewDataShow Icon={CustomerIcon as any} Number={152} Text="Properties">
          <StockChip
            containerStyle={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
              width: "78px", borderRadius: "8px",
              border: "1.5px solid rgba(238, 38, 12, 0.05)",
              background: "rgba(255, 106, 85, 0.05)",
            }}
            icon={<ArrowDownwardIcon style={{ height: "20px" }} />}
            percentageText="36.8%"
            description="vs last month"
            percentageTextColor="#FF6A55"
            descriptionColor="#637381"
          />
        </ReportsOverviewDataShow>
        <ReportsOverviewDataShow Icon={ArrowIcon as any} Number={26} Text="Management Company">
          <StockChip
            containerStyle={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
              width: "78px", borderRadius: "8px",
              border: "1.5px solid rgba(0, 166, 86, 0.15)",
              background: "rgba(0, 166, 86, 0.05)",
            }}
            icon={<ArrowUpwardIcon style={{ height: "20px" }} />}
            percentageText="36.8%"
            description="vs last month"
            percentageTextColor="#00A656"
            descriptionColor="#637381"
          />
        </ReportsOverviewDataShow>
      </Box>
    </Box>
  );
};

export default ReportOverview;
