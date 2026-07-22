"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  Modal,
  InputAdornment,
  useTheme,
  IconButton,
  Tabs,
  Tab,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Search,
  CheckCircle,
  XCircle,
  Pencil,
  Eye,
  Play,
  Sparkles,
  Lock,
  RotateCcw,
  LayoutGrid,
  List,
} from "lucide-react";
import { useNewsroom } from "@/providers/NewsroomProvider";
import { useThemeMode } from "@/providers/MuiProvider";
import { AIContent } from "@/types/newsroom";

const YoutubeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#FF0000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function YouTubeAIReview() {
  const { aiContent, updateAIContentStatus, updateAIContentCaption, permissions, addActivity } = useNewsroom();
  const { mode } = useThemeMode();
  const theme = useTheme();

  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [tab, setTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContent, setSelectedContent] = useState<AIContent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCaption, setEditCaption] = useState("");

  const youtubeContent = aiContent.filter((c) => c.platform === "YouTube");

  const filteredContent = youtubeContent.filter((c) => {
    const matchesSearch =
      c.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.campaign.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = tab === "all" || c.status === tab;
    return matchesSearch && matchesTab;
  });

  const openPreview = (item: AIContent) => {
    setSelectedContent(item);
    setEditCaption(item.caption);
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleApprove = () => {
    if (!selectedContent || !permissions.canApproveSocialContent) return;
    updateAIContentStatus(selectedContent.id, "approved");
    addActivity("approved", "Digital Team", `YouTube AI Video: ${selectedContent.campaign}`, "Video script and metadata approved");
    setModalOpen(false);
  };

  const handleReject = () => {
    if (!selectedContent || !permissions.canApproveSocialContent) return;
    updateAIContentStatus(selectedContent.id, "rejected");
    addActivity("rejected", "Digital Team", `YouTube AI Video: ${selectedContent.campaign}`, "Video script rejected");
    setModalOpen(false);
  };

  const handleSaveCaption = () => {
    if (!selectedContent || !permissions.canApproveSocialContent) return;
    updateAIContentCaption(selectedContent.id, editCaption);
    addActivity("edited", "Digital Team", `YouTube script for ${selectedContent.campaign}`, "Script updated");
    setIsEditing(false);
  };

  const pendingCount = youtubeContent.filter((c) => c.status === "pending").length;
  const approvedCount = youtubeContent.filter((c) => c.status === "approved").length;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 2 }}>
      {/* Platform Screen Header Banner */}
      <Box
        sx={{
          p: 2.5,
          borderRadius: "16px",
          backgroundColor: mode === "light" ? "#FFF5F5" : "#1A0505",
          border: "1px solid",
          borderColor: mode === "light" ? "#FFE0E0" : "#3D0A0A",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              backgroundColor: "#FF0000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(255, 0, 0, 0.3)",
            }}
          >
            <YoutubeIcon size={24} color="#FFFFFF" />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1.25rem", color: mode === "light" ? "#111827" : "#FFFFFF" }}>
              YouTube AI Review Portal
            </Typography>
            <Typography sx={{ fontSize: "0.8125rem", color: mode === "light" ? "#6B7280" : "#9CA3AF" }}>
              AI-generated video titles, scripts & thumbnail descriptions for channel publishing
            </Typography>
          </Box>
        </Box>

        {/* Key Metrics & View Mode Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Box sx={{ px: 1.75, py: 0.75, borderRadius: "10px", backgroundColor: mode === "light" ? "#FFF" : "#260808", border: "1px solid #FFCDD2", textAlign: "center" }}>
              <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", fontWeight: 500 }}>Total</Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#D32F2F" }}>{youtubeContent.length}</Typography>
            </Box>
            <Box sx={{ px: 1.75, py: 0.75, borderRadius: "10px", backgroundColor: mode === "light" ? "#FFF" : "#260808", border: "1px solid #FFCDD2", textAlign: "center" }}>
              <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", fontWeight: 500 }}>Pending</Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#E65100" }}>{pendingCount}</Typography>
            </Box>
          </Box>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, val) => val && setViewMode(val)}
            size="small"
            sx={{
              height: 38,
              "& .MuiToggleButton-root": {
                px: 1.25,
                borderRadius: "8px",
                borderColor: "#FFCDD2",
                "&.Mui-selected": {
                  backgroundColor: "#FF0000",
                  color: "#FFF",
                  "&:hover": { backgroundColor: "#CC0000" },
                },
              },
            }}
          >
            <ToggleButton value="cards">
              <Tooltip title="Cards View"><Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><LayoutGrid size={15} /><Typography sx={{ fontSize: "0.75rem", textTransform: "none", fontWeight: 600 }}>Cards</Typography></Box></Tooltip>
            </ToggleButton>
            <ToggleButton value="list">
              <Tooltip title="List View"><Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><List size={15} /><Typography sx={{ fontSize: "0.75rem", textTransform: "none", fontWeight: 600 }}>List</Typography></Box></Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Control Bar: Search & Status Tabs */}
      <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 1.75, border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <TextField
            placeholder="Search YouTube scripts & campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} style={{ color: "#6D6E6F" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: 260 },
              "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "0.8125rem", height: 38 },
            }}
          />

          <Tabs
            value={tab}
            onChange={(_, val) => setTab(val)}
            sx={{
              minHeight: 38,
              "& .MuiTab-root": { minHeight: 38, textTransform: "none", fontWeight: 600, fontSize: "0.8125rem", px: 2 },
            }}
          >
            <Tab label="All Videos" value="all" />
            <Tab label={`Pending (${pendingCount})`} value="pending" />
            <Tab label="Approved" value="approved" />
            <Tab label="Rejected" value="rejected" />
          </Tabs>
        </Box>
      </Box>

      {/* VIEW MODE 1: CARDS VIEW */}
      {viewMode === "cards" && (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 2.5 }}>
          {filteredContent.map((item) => (
            <Box
              key={item.id}
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": { transform: "translateY(-2px)", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)" },
              }}
            >
              {/* Thumbnail Preview with Video Badge */}
              <Box sx={{ position: "relative", width: "100%", height: 160, backgroundColor: "#000" }}>
                <img
                  src={item.imageUrl}
                  alt="Thumbnail"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 0, 0, 0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                    cursor: "pointer",
                  }}
                  onClick={() => openPreview(item)}
                >
                  <Play size={20} color="#FFF" style={{ marginLeft: 2 }} />
                </Box>
                <Chip
                  label={`Confidence ${Math.round(item.confidenceScore * 100)}%`}
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    backgroundColor: "rgba(0,0,0,0.75)",
                    color: "#FFF",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    backdropFilter: "blur(4px)",
                  }}
                />
                <Chip
                  label={item.status}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor:
                      item.status === "approved"
                        ? "#2E7D32"
                        : item.status === "rejected"
                        ? "#C62828"
                        : "#F57F17",
                    color: "#FFF",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    textTransform: "capitalize",
                  }}
                />
              </Box>

              {/* Content Details */}
              <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.25, flex: 1 }}>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#FF0000", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {item.campaign}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.caption}
                </Typography>

                <Box sx={{ mt: "auto", pt: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => openPreview(item)}
                    startIcon={<Eye size={14} />}
                    sx={{ borderRadius: "8px", textTransform: "none", fontSize: "0.75rem", borderColor: "#FFCDD2", color: "#D32F2F" }}
                  >
                    Review Script
                  </Button>
                  {item.status === "pending" && permissions.canApproveSocialContent && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        updateAIContentStatus(item.id, "approved");
                        addActivity("approved", "Digital Team", `YouTube AI Video: ${item.campaign}`, "Video approved");
                      }}
                      sx={{ borderRadius: "8px", textTransform: "none", fontSize: "0.75rem", backgroundColor: "#FF0000", "&:hover": { backgroundColor: "#CC0000" } }}
                    >
                      Approve
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* VIEW MODE 2: LIST VIEW TABLE */}
      {viewMode === "list" && (
        <TableContainer component={Paper} sx={{ borderRadius: "12px", border: "1px solid", borderColor: "divider" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: mode === "light" ? "#FFF5F5" : "#260808" }}>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Thumbnail</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Campaign / Topic</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Video Script Title</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>AI Confidence</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.75rem" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id} hover onClick={() => openPreview(item)} sx={{ cursor: "pointer" }}>
                  <TableCell>
                    <Box sx={{ width: 60, height: 40, borderRadius: "6px", overflow: "hidden" }}>
                      <img src={item.imageUrl} alt="Thumb" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#D32F2F" }}>{item.campaign}</TableCell>
                  <TableCell sx={{ fontSize: "0.8125rem", fontWeight: 600, maxWidth: 280 }}>{item.caption}</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>{Math.round(item.confidenceScore * 100)}%</TableCell>
                  <TableCell>
                    <Chip label={item.status} size="small" sx={{ fontSize: "0.65rem", fontWeight: 700 }} />
                  </TableCell>
                  <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                      <Button size="small" variant="outlined" onClick={() => openPreview(item)} sx={{ borderRadius: "6px", textTransform: "none", fontSize: "0.7rem" }}>Inspect</Button>
                      {item.status === "pending" && permissions.canApproveSocialContent && (
                        <Button size="small" variant="contained" onClick={() => updateAIContentStatus(item.id, "approved")} sx={{ borderRadius: "6px", textTransform: "none", fontSize: "0.7rem", backgroundColor: "#FF0000" }}>Approve</Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Review Modal */}
      {selectedContent && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90vw", sm: 540 },
              maxHeight: "85vh",
              backgroundColor: "background.paper",
              borderRadius: "16px",
              p: 3,
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <YoutubeIcon size={22} color="#FF0000" />
                <Typography sx={{ fontWeight: 700, fontSize: "1.125rem" }}>
                  YouTube Script Review
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setModalOpen(false)}>
                <XCircle size={20} />
              </IconButton>
            </Box>

            <Box sx={{ borderRadius: "12px", overflow: "hidden", height: 200, backgroundColor: "#000" }}>
              <img src={selectedContent.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700, color: "text.secondary" }}>
                Title & Description Script
              </Typography>
              {isEditing ? (
                <TextField
                  multiline
                  rows={4}
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "0.875rem" } }}
                />
              ) : (
                <Typography sx={{ fontSize: "0.875rem", lineHeight: 1.5, p: 1.5, borderRadius: "10px", backgroundColor: mode === "light" ? "#f9fafb" : "#222" }}>
                  {selectedContent.caption}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end", mt: 1 }}>
              {isEditing ? (
                <Button variant="contained" size="small" onClick={handleSaveCaption} sx={{ borderRadius: "8px" }}>
                  Save Script
                </Button>
              ) : (
                <Button variant="outlined" size="small" onClick={() => setIsEditing(true)} startIcon={<Pencil size={14} />} sx={{ borderRadius: "8px" }}>
                  Edit Script
                </Button>
              )}
              {selectedContent.status === "pending" && permissions.canApproveSocialContent && (
                <>
                  <Button variant="outlined" color="error" size="small" onClick={handleReject} startIcon={<XCircle size={14} />} sx={{ borderRadius: "8px" }}>
                    Reject
                  </Button>
                  <Button variant="contained" color="success" size="small" onClick={handleApprove} startIcon={<CheckCircle size={14} />} sx={{ borderRadius: "8px" }}>
                    Approve Script
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
