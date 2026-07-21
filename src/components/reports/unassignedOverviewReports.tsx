"use client";

import { Box, Typography } from "@mui/material";
import React from "react";
import ButtonComponent from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const UnassignedData = [
  { POnumber: "HD-vcv423455", Status: "6", supplier: "Grainger", Date: "03,10,2025", Total: "35,430,00" },
  { POnumber: "HD-dvf0697554", Status: "2", supplier: "Grainger", Date: "03,10,2025", Total: "12,433,00" },
  { POnumber: "HD-svsf4445-455", Status: "9", supplier: "The Wayfair Professional", Date: "03,10,2025", Total: "26,232,09" },
];

const UnassignedOverviewReports: React.FC = () => {
  const router = useRouter();
  const handleUnassignedClick = () => {
    router.push("/purchases/unassigned");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "438px",
        borderRadius: "16px",
        padding: { xs: "16px", md: "24px" },
        gap: "24px",
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", mb: 2 }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "text.primary" }}>
          Unassigned
        </Typography>
      </Box>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Box sx={{ minWidth: "600px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              px: 2,
              mb: 1.5,
            }}
          >
            {["PO Number", "Status", "Supplier", "Date", "Total"].map((col) => (
              <Typography key={col} sx={{ flex: 1, fontWeight: 600, fontSize: 12, color: "text.secondary" }}>
                {col}
              </Typography>
            ))}
          </Box>
          {UnassignedData.map((item) => (
            <Box key={item.POnumber} sx={{ backgroundColor: "action.hover", width: "100%", borderRadius: "12px", mb: 1, px: 2, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography sx={{ flex: 1, fontSize: "13px", color: "text.primary", fontWeight: 500 }}>{item.POnumber}</Typography>
              <Typography sx={{ flex: 1, fontSize: "13px", color: "text.primary" }}>{item.Status}</Typography>
              <Typography sx={{ flex: 1, fontSize: "13px", color: "text.primary" }}>{item.supplier}</Typography>
              <Typography sx={{ flex: 1, fontSize: "13px", color: "text.primary" }}>{item.Date}</Typography>
              <Typography sx={{ flex: 1, fontSize: "13px", color: "text.primary", fontWeight: 600 }}>${item.Total}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row-reverse", margin: "24px" }}>
        <ButtonComponent label="All UnAssigned" onClick={handleUnassignedClick} />
      </Box>
    </Box>
  );
};

export default UnassignedOverviewReports;
