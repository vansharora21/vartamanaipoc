"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

interface StockChipProps {
  containerStyle?: React.CSSProperties;
  percentageTextColor?: string;
  descriptionColor?: string;
  icon?: React.ReactNode;
  percentageText?: string;
  description?: string;
}

const StockChip: React.FC<StockChipProps> = ({
  containerStyle,
  percentageTextColor,
  descriptionColor,
  icon,
  percentageText,
  description,
}) => {
  return (
    <Box>
      <Box sx={containerStyle}>
        <Typography
          sx={{
            color: percentageTextColor,
            fontWeight: 600,
            fontSize: "0.875rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {icon}
          {percentageText}
        </Typography>
      </Box>
      <Typography sx={{ color: descriptionColor, fontSize: "0.875rem" }}>
        {description}
      </Typography>
    </Box>
  );
};

export default StockChip;
