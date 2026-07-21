"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import LeftNavigation from "@/components/leftNavigation/leftNavigation";
import DashBoardCommonHeader from "@/components/Header/DashBoardCommonHeader";
import UsefulButton from "@/components/Button/usefulButton";
import CompaniesTable from "./CompaniesTable";
import { usePersistentData } from "@/hooks/usePersistentData";
import AddCompanyModal from "./AddCompanyModal";

const initialCompanies = [
  {
    id: "1",
    name: "Deerwoods Real Estate Management",
    address: "123 Management Way, Denver, CO",
    properties: 12,
    users: 45,
    status: "Active",
    email: "contact@deerwoods.com",
  },
];

const Companies: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: companies, addItem } = usePersistentData("companies", initialCompanies);

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, width: "100%", minHeight: "100vh", gap: { xs: 0, lg: "12px" }, backgroundColor: "background.default" }}>
      <Box sx={{ flexShrink: 0 }}>
        <LeftNavigation />
      </Box>
      <Box sx={{ flexGrow: 1, px: { xs: "14px", md: "20px" }, paddingBottom: "20px" }}>
        <DashBoardCommonHeader />
        <Box sx={{ mt: "24px", width: "100%", maxWidth: "1100px", mx: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "24px" }}>
            <Typography sx={{ color: "text.primary", fontSize: "1.125rem", fontWeight: 600 }}>
              Companies
            </Typography>
            <Box sx={{ display: "flex", gap: "16px" }}>
              <UsefulButton 
                label="+ New Company" 
                textColor="#FFFFFF" 
                backgroundColor="#000000" 
                onClick={() => setModalOpen(true)}
              />
            </Box>
          </Box>
          <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", padding: { xs: "14px", md: "18px" }, mb: "20px" }}>
             <CompaniesTable data={companies} />
          </Box>
        </Box>
      </Box>
      <AddCompanyModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={addItem} />
    </Box>
  );
};

export default Companies;
