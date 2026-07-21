"use client";

import { Box, Typography } from "@mui/material";
import DashBoardCommonHeader from "@/components/Header/DashBoardCommonHeader";
import LeftNavigation from "@/components/leftNavigation/leftNavigation";
import ReportOverview from "@/components/reports/reportOverview";
import AssignedOverviewReports from "@/components/reports/assignedOverviewReports";
import UnassignedOverviewReports from "@/components/reports/unassignedOverviewReports";

const Reports: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, width: "100%", minHeight: "100vh", gap: { xs: 0, lg: "12px" }, backgroundColor: "background.default" }}>
      <Box sx={{ flexShrink: 0 }}>
        <LeftNavigation />
      </Box>
      <Box sx={{ flexGrow: 1, px: { xs: "14px", md: "20px" }, paddingBottom: "20px", overflowX: "hidden" }}>
        <DashBoardCommonHeader />
        <Box sx={{ mt: "20px", width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ color: "text.primary", fontSize: "1.25rem", fontWeight: 700 }}>
              Reports Analysis
            </Typography>
          </Box>
          <ReportOverview />
          <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: "20px", width: "100%" }}>
            <Box sx={{ flex: 1, minWidth: { xs: "100%", lg: "calc(50% - 12px)" } }}>
              <AssignedOverviewReports />
            </Box>
            <Box sx={{ flex: 1, minWidth: { xs: "100%", lg: "calc(50% - 12px)" } }}>
              <UnassignedOverviewReports />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
