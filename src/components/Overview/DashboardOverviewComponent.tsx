"use client";

import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon
} from "@mui/icons-material";
import TotalPurchasesIcon from "@/assets/Purchases.png";
import TotalPurchasesAssignedIcon from "@/assets/TotalPurchasesIcon.svg";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PurchaseCard from "./PurchaseCard";
import StockChip from "./StockChip";
import { LIGHT_GRAY } from "@/assets/colors";

const data = [
  { name: "Apr", value: 10000 },
  { name: "May", value: 50000 },
  { name: "Jun", value: 15000 },
  { name: "Jul", value: 30000 },
  { name: "Aug", value: 65000 },
  { name: "Sep", value: 20000 },
];

const getInitialStats = () => {
  if (typeof window === "undefined") {
    return { total: 22542.23, assigned: 15632.45 };
  }

  const storedPurchases = localStorage.getItem("purchases");
  if (!storedPurchases) {
    return { total: 22542.23, assigned: 15632.45 };
  }

  try {
    const purchases = JSON.parse(storedPurchases);
    const total = purchases.reduce((acc: number, p: any) => acc + parseFloat(p.total.replace("$", "").replace(",", "")), 0);
    const assigned = parseFloat((total * 0.7).toFixed(2));
    return { total, assigned };
  } catch {
    return { total: 22542.23, assigned: 15632.45 };
  }
};

const DashboardOverviewComponent: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [stats] = useState(getInitialStats);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: { xs: "14px", md: "18px" },
        position: "relative",
        mx: "auto",
        width: "100%",
        maxWidth: "1100px",
        borderRadius: "14px",
        backgroundColor: "background.paper",
        marginTop: "18px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 2.5,
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "1.125rem", color: "text.primary" }}>
          Overview
        </Typography>
        <Box>
          <IconButton
            onClick={handleClick}
            sx={{
              border: `1px solid ${LIGHT_GRAY}`,
              borderRadius: "12px",
              minHeight: 38,
              padding: "6px 12px",
            }}
          >
            <Typography sx={{ fontWeight: 600, mr: 1, color: "text.primary", fontSize: "0.875rem" }}>31 days</Typography>
            <KeyboardArrowDownIcon sx={{ color: "text.primary" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  backgroundColor: "background.paper",
                },
              },
            }}
          >
            <MenuItem onClick={handleClose}>7 days</MenuItem>
            <MenuItem onClick={handleClose}>14 days</MenuItem>
            <MenuItem onClick={handleClose}>31 days</MenuItem>
            <MenuItem onClick={handleClose}>1 year</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 2,
          width: "100%",
          backgroundColor: "transparent",
          borderRadius: "14px",
        }}
      >
        <PurchaseCard
          amount={stats.total}
          percentageChange={36.8}
          iconBackground="#E9FBF0"
          formatCurrency={formatCurrency}
          title="Total Purchases"
          icon={
            <img
              src={TotalPurchasesIcon.src || TotalPurchasesIcon as any}
              alt="Total Purchases Icon"
              style={{ width: "24px" }}
            />
          }
        >
          <StockChip
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              width: "78px",
              borderRadius: "8px",
              border: "1.5px solid rgba(238, 38, 12, 0.05)",
              background: "rgba(255, 106, 85, 0.05)",
            }}
            icon={<ArrowDownwardIcon style={{ height: "20px" }} />}
            percentageText="36.8%"
            description="vs last month"
            percentageTextColor="#FF6A55"
            descriptionColor="#637381"
          />
        </PurchaseCard>
        <PurchaseCard
          amount={stats.assigned}
          percentageChange={36.8}
          iconBackground="#E9FBF0"
          formatCurrency={formatCurrency}
          title="Total Purchases Assigned"
          icon={
            <img
              src={TotalPurchasesAssignedIcon.src || (TotalPurchasesAssignedIcon as any)}
              alt="Total Purchases Icon"
              style={{ width: "24px" }}
            />
          }
        >
          <StockChip
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              width: "78px",
              borderRadius: "8px",
              border: "1.5px solid rgba(0, 166, 86, 0.15)",
              background: "rgba(0, 166, 86, 0.05)",
            }}
            icon={<ArrowUpwardIcon style={{ height: "20px" }} />}
            percentageText="36.8%"
            description="vs last month"
            percentageTextColor="#00A656"
            descriptionColor="#637381"
          />
        </PurchaseCard>
      </Box>
      <Box sx={{ mt: 3, height: { xs: 220, md: 260 }, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#54D62C" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#54D62C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#54D62C"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default DashboardOverviewComponent;
