"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

interface NavigationLabelProps {
  logo: any;
  label: string;
  onClick?(): void;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  isActive?: boolean;
  collapsed?: boolean;
  subMenuItems?: { label: string; path: string }[];
}

const NavigationLabel: React.FC<NavigationLabelProps> = ({
  logo,
  label,
  onClick,
  hasSubmenu,
  isSubmenuOpen,
  isActive,
  collapsed,
  subMenuItems,
}) => {
  const isReactElement = React.isValidElement(logo);

  return (
    <Box>
      <Box
        onClick={onClick}
        sx={{
          padding: collapsed ? "9px 0" : "9px 10px",
          margin: "2px 0",
          width: "100%",
          height: "40px",
          display: "flex",
          flexDirection: "row",
          justifyContent: collapsed ? "center" : "left",
          alignItems: "center",
          backgroundColor: isActive ? "action.selected" : "transparent",
          borderRadius: "8px",
          cursor: "pointer",
          border: "1px",
          transition: "all 0.15s ease",
          ":hover": { backgroundColor: "action.hover" },
        }}
      >
        {isReactElement ? (
          <Box
            sx={{
              width: "20px",
              height: "20px",
              mr: collapsed ? 0 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isActive ? "text.primary" : "text.secondary",
              "& svg": { width: 20, height: 20 },
            }}
          >
            {logo}
          </Box>
        ) : (
          <img
            src={logo?.src || logo}
            alt={`${label} icon`}
            style={{
              width: "20px",
              height: "20px",
              marginRight: collapsed ? 0 : "8px",
              filter: isActive ? "none" : "grayscale(100%)",
            }}
          />
        )}
        {!collapsed && (
          <Typography
            sx={{
              color: isActive ? "text.primary" : "text.secondary",
              fontWeight: isActive ? 600 : 400,
              fontSize: "0.875rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              ":hover": { color: "text.primary" },
            }}
          >
            {label}
          </Typography>
        )}
      </Box>
      {!collapsed && hasSubmenu && isSubmenuOpen && subMenuItems && (
        <Box sx={{ ml: 6 }}>
          {subMenuItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: "8px",
                marginLeft: "16px",
                cursor: "pointer",
                color: "#6D6E6F",
                ":hover": {
                  backgroundColor: "#F7F7F7",
                  borderRadius: "8px",
                  color: "#000",
                },
              }}
            >
              <Typography>{item.label}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default NavigationLabel;
