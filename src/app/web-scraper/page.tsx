"use client";

import React, { Suspense } from "react";
import LeftNavigation from "@/components/leftNavigation/leftNavigation";
import { Box, CircularProgress } from "@mui/material";
import DashBoardCommonHeader from "@/components/Header/DashBoardCommonHeader";
import WebScraperPage from "@/components/Newsroom/WebScraperPage";

const ScraperAppPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, width: "100%", minHeight: "100vh", gap: { xs: 0, lg: "12px" }, backgroundColor: "background.default" }}>
      <Box sx={{ flexShrink: 0 }}>
        <LeftNavigation />
      </Box>
      <Box sx={{ flexGrow: 1, px: { xs: "14px", md: "20px" }, paddingBottom: "20px" }}>
        <DashBoardCommonHeader />
        <Box sx={{ mx: "auto", width: "100%", maxWidth: "1200px" }}>
          <Suspense fallback={<Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress size={30} /></Box>}>
            <WebScraperPage />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default ScraperAppPage;
