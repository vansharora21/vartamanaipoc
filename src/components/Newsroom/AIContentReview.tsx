"use client";

import {
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  Modal,
  InputAdornment,
  useTheme,
  useMediaQuery,
  IconButton,
  Tabs,
  Tab,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Pencil,
  Eye,
  Image,
  X,
  Sparkles,
  Lock,
} from "lucide-react";
import { useNewsroom } from "@/providers/NewsroomProvider";
import { useThemeMode } from "@/providers/MuiProvider";
import { AIContent, AIContentStatus, Platform } from "@/types/newsroom";

const PLATFORM_COLORS: Record<Platform, string> = {
  YouTube: "#FF0000",
  Instagram: "#E4405F",
  "X (Twitter)": "#000000",
  Facebook: "#1877F2",
  LinkedIn: "#0A66C2",
};

const STATUS_COLORS: Record<AIContentStatus, { bg: string; text: string }> = {
  pending: { bg: "#FFF8E1", text: "#F57F17" },
  approved: { bg: "#E8F5E9", text: "#2E7D32" },
  rejected: { bg: "#FFEBEE", text: "#C62828" },
};

const AIContentReview: React.FC = () => {
  const { aiContent, updateAIContentStatus, updateAIContentCaption, permissions, addActivity } = useNewsroom();
  const { mode } = useThemeMode();
  const theme = useTheme();

  const [tab, setTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContent, setSelectedContent] = useState<AIContent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editCaption, setEditCaption] = useState("");

  const filteredContent = aiContent.filter((c) => {
    const matchesSearch =
      c.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.campaign.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = tab === "all" || c.status === tab;
    return matchesSearch && matchesTab;
  });

  const openPreview = (content: AIContent) => {
    setSelectedContent(content);
    setEditCaption(content.caption);
    setIsEditingCaption(false);
    setModalOpen(true);
  };

  const handleApprove = () => {
    if (!selectedContent || !permissions.canApproveSocialContent) return;
    updateAIContentStatus(selectedContent.id, "approved");
    addActivity("approved", "Digital Team", `AI post for ${selectedContent.platform}`, "Content approved for publishing");
    setModalOpen(false);
  };

  const handleReject = () => {
    if (!selectedContent || !permissions.canApproveSocialContent) return;
    updateAIContentStatus(selectedContent.id, "rejected");
    addActivity("rejected", "Digital Team", `AI post for ${selectedContent.platform}`, "Content rejected");
    setModalOpen(false);
  };

  const handleSaveCaption = () => {
    if (!selectedContent || !permissions.canApproveSocialContent) return;
    updateAIContentCaption(selectedContent.id, editCaption);
    addActivity("edited", "Digital Team", `AI caption for ${selectedContent.platform}`, "Caption updated");
    setIsEditingCaption(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Sparkles size={20} color="#9b59b6" />
          <Typography sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
            AI Content Review
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
          {filteredContent.length} items
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            minHeight: 42,
            "& .MuiTab-root": { minHeight: 42, textTransform: "none", fontWeight: 500, fontSize: "0.8125rem", minWidth: "auto", px: { xs: 1.5, sm: 2 } },
          }}
        >
          <Tab label={`All (${aiContent.length})`} value="all" />
          <Tab label={`Pending (${aiContent.filter((c) => c.status === "pending").length})`} value="pending" />
          <Tab label={`Approved (${aiContent.filter((c) => c.status === "approved").length})`} value="approved" />
          <Tab label={`Rejected (${aiContent.filter((c) => c.status === "rejected").length})`} value="rejected" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            fullWidth
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
              "& .MuiOutlinedInput-root": { borderRadius: "12px", fontSize: "0.8125rem" },
            }}
          />
        </Box>
      </Box>

      {/* Content Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 2 }}>
        {filteredContent.map((content) => (
          <Box
            key={content.id}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
              border: "1px solid",
              borderColor: "divider",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": { transform: "translateY(-2px)", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)" },
            }}
          >
            {/* Image */}
            <Box
              sx={{
                height: 160,
                backgroundColor: "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                "&:hover .overlay": { opacity: 1 },
              }}
              onClick={() => { setLightboxImage(content.imageUrl); setLightboxOpen(true); }}
            >
              <img
                src={content.imageUrl}
                alt={content.caption}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.2s",
                }}
              >
                <Eye size={28} color="#fff" />
              </Box>
            </Box>

            {/* Content */}
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                <Chip
                  label={content.platform}
                  size="small"
                  sx={{
                    fontSize: "0.625rem",
                    height: 20,
                    fontWeight: 600,
                    backgroundColor: PLATFORM_COLORS[content.platform] + "15",
                    color: PLATFORM_COLORS[content.platform],
                    borderRadius: "6px",
                  }}
                />
                <Chip
                  label={content.status}
                  size="small"
                  sx={{
                    fontSize: "0.625rem",
                    height: 20,
                    fontWeight: 600,
                    backgroundColor: STATUS_COLORS[content.status].bg,
                    color: STATUS_COLORS[content.status].text,
                    borderRadius: "6px",
                    textTransform: "capitalize",
                  }}
                />
              </Box>

              <Typography sx={{ fontSize: "0.8125rem", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {content.caption}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>
                  {content.campaign}
                </Typography>
                <Chip
                  label={`${content.confidenceScore}%`}
                  size="small"
                  sx={{
                    fontSize: "0.625rem",
                    height: 20,
                    fontWeight: 600,
                    backgroundColor: content.confidenceScore >= 85 ? "#E8F5E9" : content.confidenceScore >= 70 ? "#FFF8E1" : "#FFEBEE",
                    color: content.confidenceScore >= 85 ? "#2E7D32" : content.confidenceScore >= 70 ? "#F57F17" : "#C62828",
                    borderRadius: "6px",
                  }}
                />
              </Box>

              <Typography sx={{ fontSize: "0.6875rem", color: "text.secondary" }}>
                {new Date(content.generatedAt).toLocaleDateString()}
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 0.75, mt: 0.5 }}>
                <Tooltip title={!permissions.canApproveSocialContent ? "No permission" : ""}>
                  <Box sx={{ flex: 1 }}>
                    <Button
                      fullWidth
                      size="small"
                      startIcon={<Eye size={14} />}
                      onClick={() => openPreview(content)}
                      sx={{
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        textTransform: "none",
                        color: "text.primary",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "6px",
                        py: 0.5,
                        "&:hover": { borderColor: "text.primary" },
                      }}
                    >
                      Preview
                    </Button>
                  </Box>
                </Tooltip>
                <Tooltip title={!permissions.canApproveSocialContent ? "No permission" : ""}>
                  <Box>
                    <IconButton
                      size="small"
                      disabled={!permissions.canApproveSocialContent || content.status === "approved"}
                      onClick={() => {
                        updateAIContentStatus(content.id, "approved");
                        addActivity("approved", "Digital Team", `AI post for ${content.platform}`);
                      }}
                      sx={{
                        border: "1px solid",
                        borderColor: content.status === "approved" ? "#28a745" : "divider",
                        borderRadius: "6px",
                        p: 0.5,
                        "&:hover": { backgroundColor: "#E8F5E9" },
                      }}
                    >
                      <CheckCircle size={16} color={content.status === "approved" ? "#28a745" : "#999"} />
                    </IconButton>
                  </Box>
                </Tooltip>
                <Tooltip title={!permissions.canApproveSocialContent ? "No permission" : ""}>
                  <Box>
                    <IconButton
                      size="small"
                      disabled={!permissions.canApproveSocialContent || content.status === "rejected"}
                      onClick={() => {
                        updateAIContentStatus(content.id, "rejected");
                        addActivity("rejected", "Digital Team", `AI post for ${content.platform}`);
                      }}
                      sx={{
                        border: "1px solid",
                        borderColor: content.status === "rejected" ? "#dc3545" : "divider",
                        borderRadius: "6px",
                        p: 0.5,
                        "&:hover": { backgroundColor: "#FFEBEE" },
                      }}
                    >
                      <XCircle size={16} color={content.status === "rejected" ? "#dc3545" : "#999"} />
                    </IconButton>
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {filteredContent.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6, color: "text.secondary" }}>
          <Typography sx={{ fontSize: "0.875rem" }}>No content matches your filters</Typography>
        </Box>
      )}

      {/* Preview Modal */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setSelectedContent(null); setIsEditingCaption(false); }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "calc(100vw - 32px)",
            maxWidth: 640,
            maxHeight: "calc(100vh - 48px)",
            bgcolor: "background.paper",
            borderRadius: "16px",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
            overflow: "hidden",
            outline: "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {selectedContent && (
            <>
              <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>Content Preview</Typography>
                <IconButton size="small" onClick={() => { setModalOpen(false); setSelectedContent(null); setIsEditingCaption(false); }}>
                  <X size={18} />
                </IconButton>
              </Box>

              <Box sx={{ p: { xs: 2, sm: 3 }, overflowY: "auto", flex: 1 }}>
                <Box sx={{ mb: 2, borderRadius: "8px", overflow: "hidden", backgroundColor: "action.hover" }}>
                  <img
                    src={selectedContent.imageUrl}
                    alt={selectedContent.caption}
                    style={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                  <Chip
                    label={selectedContent.platform}
                    size="small"
                    sx={{ fontSize: "0.6875rem", fontWeight: 600, backgroundColor: PLATFORM_COLORS[selectedContent.platform] + "15", color: PLATFORM_COLORS[selectedContent.platform], borderRadius: "6px" }}
                  />
                  <Chip
                    label={selectedContent.status}
                    size="small"
                    sx={{ fontSize: "0.6875rem", fontWeight: 600, backgroundColor: STATUS_COLORS[selectedContent.status].bg, color: STATUS_COLORS[selectedContent.status].text, borderRadius: "6px", textTransform: "capitalize" }}
                  />
                  <Chip
                    label={`${selectedContent.confidenceScore}% confidence`}
                    size="small"
                    sx={{ fontSize: "0.6875rem", fontWeight: 600, backgroundColor: selectedContent.confidenceScore >= 85 ? "#E8F5E9" : "#FFF8E1", color: selectedContent.confidenceScore >= 85 ? "#2E7D32" : "#F57F17", borderRadius: "6px" }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.8125rem", color: "text.secondary" }}>Caption</Typography>
                    {permissions.canApproveSocialContent && selectedContent.status === "pending" && (
                      <Button
                        size="small"
                        startIcon={isEditingCaption ? null : <Pencil size={14} />}
                        onClick={() => setIsEditingCaption(!isEditingCaption)}
                        sx={{ fontSize: "0.6875rem", textTransform: "none", fontWeight: 600 }}
                      >
                        {isEditingCaption ? "Cancel" : "Edit"}
                      </Button>
                    )}
                  </Box>
                  {isEditingCaption ? (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <TextField
                        multiline
                        rows={2}
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        fullWidth
                        size="small"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.8125rem" } }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleSaveCaption}
                        sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600, fontSize: "0.75rem", alignSelf: "flex-start" }}
                      >
                        Save
                      </Button>
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>
                      {selectedContent.caption}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                    <strong>Campaign:</strong> {selectedContent.campaign}
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                    <strong>Generated:</strong> {new Date(selectedContent.generatedAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ p: { xs: 2, sm: 2 }, borderTop: "1px solid", borderColor: "divider", display: "flex", gap: 1.5, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <Tooltip title={!permissions.canApproveSocialContent ? "No permission" : ""}>
                  <Box>
                    <Button
                      variant="contained"
                      startIcon={<CheckCircle size={14} />}
                      onClick={handleApprove}
                      disabled={!permissions.canApproveSocialContent || selectedContent.status !== "pending"}
                      sx={{
                        backgroundColor: "#28a745",
                        color: "#fff",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.8125rem",
                        "&:hover": { backgroundColor: "#218838" },
                        "&.Mui-disabled": { backgroundColor: mode === "light" ? "#f5f5f5" : "#333", color: "text.secondary" },
                      }}
                    >
                      Approve
                    </Button>
                  </Box>
                </Tooltip>
                <Tooltip title={!permissions.canApproveSocialContent ? "No permission" : ""}>
                  <Box>
                    <Button
                      variant="contained"
                      startIcon={<XCircle size={14} />}
                      onClick={handleReject}
                      disabled={!permissions.canApproveSocialContent || selectedContent.status !== "pending"}
                      sx={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.8125rem",
                        "&:hover": { backgroundColor: "#c82333" },
                        "&.Mui-disabled": { backgroundColor: mode === "light" ? "#f5f5f5" : "#333", color: "text.secondary" },
                      }}
                    >
                      Reject
                    </Button>
                  </Box>
                </Tooltip>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Lightbox */}
      <Modal open={lightboxOpen} onClose={() => setLightboxOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none",
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={lightboxImage}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: "8px" }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default AIContentReview;
