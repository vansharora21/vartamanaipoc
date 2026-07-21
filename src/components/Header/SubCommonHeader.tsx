"use client";

import { Box, Typography } from "@mui/material";
import UsefulButton from "@/components/Button/usefulButton";

const SubCommonHeader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: { xs: "100%", lg: "1203px" },
        maxWidth: "1203px",
        height: "48px",
      }}
    >
      <Typography
        sx={{ width: "63px", height: "24px", fontSize: "14px", fontWeight: 600, color: "#1A1A1A" }}
      >
        Overview
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "448px",
          height: "48px",
          alignItems: "center",
        }}
      >
        <Typography>1d</Typography>
        <Typography>7d</Typography>
        <Typography>1M</Typography>
        <Typography>6M</Typography>
        <Typography>1Y</Typography>
        <UsefulButton label="Custom" textColor="#6D6E6F" />
      </Box>
    </Box>
  );
};

export default SubCommonHeader;
