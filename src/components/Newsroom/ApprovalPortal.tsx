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
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Pencil,
  Save,
  X,
  Lock,
} from "lucide-react";
import { useNewsroom } from "@/providers/NewsroomProvider";
import { useThemeMode } from "@/providers/MuiProvider";
import { Story, StoryStatus, StoryCategory } from "@/types/newsroom";

const STATUS_COLORS: Record<StoryStatus, { bg: string; text: string }> = {
  draft: { bg: "#F5F5F5", text: "#666" },
  assigned: { bg: "#E3F2FD", text: "#1565C0" },
  pending_review: { bg: "#FFF3E0", text: "#E65100" },
  pending_approval: { bg: "#FFF8E1", text: "#F57F17" },
  approved: { bg: "#E8F5E9", text: "#2E7D32" },
  rejected: { bg: "#FFEBEE", text: "#C62828" },
  published: { bg: "#E0F2F1", text: "#00695C" },
};

const ApprovalPortal: React.FC = () => {
  const { stories, updateStoryStatus, updateStory, permissions, addActivity } = useNewsroom();
  const { mode } = useThemeMode();
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StoryStatus | "all">("all");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editSummary, setEditSummary] = useState("");

  const filteredStories = stories.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openStoryModal = (story: Story) => {
    setSelectedStory(story);
    setEditTitle(story.title);
    setEditBody(story.body);
    setEditSummary(story.aiSummary);
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleApprove = () => {
    if (!selectedStory || !permissions.canApproveNews) return;
    updateStoryStatus(selectedStory.id, "approved");
    addActivity("approved", "Editor", selectedStory.title, "Story approved for publication");
    setModalOpen(false);
    setSelectedStory(null);
  };

  const handleReject = () => {
    if (!selectedStory || !permissions.canRejectNews) return;
    updateStoryStatus(selectedStory.id, "rejected");
    addActivity("rejected", "Editor", selectedStory.title, "Story rejected");
    setModalOpen(false);
    setSelectedStory(null);
  };

  const handleSave = () => {
    if (!selectedStory || !permissions.canEditContent) return;
    updateStory(selectedStory.id, {
      title: editTitle,
      body: editBody,
      aiSummary: editSummary,
    });
    addActivity("edited", "Editor", selectedStory.title, "Story content updated");
    setIsEditing(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
          News Approval Portal
        </Typography>
        <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
          {filteredStories.length} stories
        </Typography>
      </Box>

      {/* Search & Filters */}
      <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", p: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
          <TextField
            placeholder="Search stories..."
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
              minWidth: { xs: "100%", sm: 200 },
              "& .MuiOutlinedInput-root": { borderRadius: "12px", fontSize: "0.8125rem" },
            }}
          />
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
            {(["all", "pending_approval", "pending_review", "approved", "rejected"] as const).map((status) => (
              <Chip
                key={status}
                label={status === "all" ? "All" : status.replace("_", " ")}
                size="small"
                onClick={() => setStatusFilter(status)}
                sx={{
                  fontSize: "0.6875rem",
                  height: 26,
                  fontWeight: statusFilter === status ? 600 : 400,
                  backgroundColor: statusFilter === status ? "text.primary" : "action.hover",
                  color: statusFilter === status ? (mode === "light" ? "#fff" : "#000") : "text.secondary",
                  borderRadius: "8px",
                  textTransform: "capitalize",
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Story Table */}
      <Box sx={{ backgroundColor: "background.paper", borderRadius: "12px", overflow: "hidden", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)", border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid " + (mode === "light" ? "#E5E7EB" : "#333") }}>
                <th style={{ padding: "12px 14px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: mode === "light" ? "#6D6E6F" : "#b0b0b0" }}>Story</th>
                <th style={{ padding: "12px 14px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: mode === "light" ? "#6D6E6F" : "#b0b0b0" }}>Reporter</th>
                <th style={{ padding: "12px 14px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: mode === "light" ? "#6D6E6F" : "#b0b0b0" }}>Category</th>
                <th style={{ padding: "12px 14px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: mode === "light" ? "#6D6E6F" : "#b0b0b0" }}>Status</th>
                <th style={{ padding: "12px 14px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: mode === "light" ? "#6D6E6F" : "#b0b0b0" }}>Date</th>
                <th style={{ padding: "12px 14px", textAlign: "center", fontSize: "0.75rem", fontWeight: 700, color: mode === "light" ? "#6D6E6F" : "#b0b0b0" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStories.map((story) => (
                <tr
                  key={story.id}
                  style={{
                    borderBottom: "1px solid " + (mode === "light" ? "#f0f0f0" : "#222"),
                    cursor: "pointer",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = mode === "light" ? "#f9fafb" : "#1a1a1a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  onClick={() => openStoryModal(story)}
                >
                  <td style={{ padding: "12px 14px", fontSize: "0.8125rem", fontWeight: 500, maxWidth: 300 }}>
                    <Box sx={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {story.title}
                    </Box>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: "0.8125rem", color: mode === "light" ? "#6D6E6F" : "#b0b0b0" }}>{story.reporter}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <Chip label={story.category} size="small" sx={{ fontSize: "0.625rem", height: 20, backgroundColor: "action.hover", borderRadius: "6px" }} />
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <Chip
                      label={story.status.replace("_", " ")}
                      size="small"
                      sx={{
                        fontSize: "0.625rem",
                        height: 22,
                        fontWeight: 600,
                        backgroundColor: STATUS_COLORS[story.status].bg,
                        color: STATUS_COLORS[story.status].text,
                        borderRadius: "6px",
                        textTransform: "capitalize",
                      }}
                    />
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: "0.75rem", color: mode === "light" ? "#6D6E6F" : "#b0b0b0" }}>
                    {new Date(story.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <Button
                      size="small"
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "none",
                        color: "text.primary",
                        "&:hover": { backgroundColor: "action.hover" },
                      }}
                      onClick={(e) => { e.stopPropagation(); openStoryModal(story); }}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>

      {/* Approval Modal */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setSelectedStory(null); setIsEditing(false); }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "calc(100vw - 32px)",
            maxWidth: 720,
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
          {selectedStory && (
            <>
              {/* Modal Header */}
              <Box sx={{ p: { xs: 2, sm: 3 }, pb: 2, borderBottom: "1px solid", borderColor: "divider", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box sx={{ flex: 1, pr: 2 }}>
                  {isEditing ? (
                    <TextField
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { fontSize: "1.125rem", fontWeight: 600 } }}
                    />
                  ) : (
                    <Typography sx={{ fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.3 }}>
                      {selectedStory.title}
                    </Typography>
                  )}
                  <Box sx={{ display: "flex", gap: 0.75, mt: 1, flexWrap: "wrap" }}>
                    <Chip label={selectedStory.category} size="small" sx={{ fontSize: "0.625rem", height: 20, backgroundColor: "action.hover", borderRadius: "6px" }} />
                    <Chip
                      label={selectedStory.status.replace("_", " ")}
                      size="small"
                      sx={{
                        fontSize: "0.625rem",
                        height: 22,
                        fontWeight: 600,
                        backgroundColor: STATUS_COLORS[selectedStory.status].bg,
                        color: STATUS_COLORS[selectedStory.status].text,
                        borderRadius: "6px",
                        textTransform: "capitalize",
                      }}
                    />
                  </Box>
                </Box>
                <IconButton onClick={() => { setModalOpen(false); setSelectedStory(null); setIsEditing(false); }} size="small">
                  <X size={18} />
                </IconButton>
              </Box>

              {/* Modal Body */}
              <Box sx={{ p: { xs: 2, sm: 3 }, overflowY: "auto", flex: 1 }}>
                <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
                  <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
                    <strong>Reporter:</strong> {selectedStory.reporter}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
                    <strong>Date:</strong> {new Date(selectedStory.createdAt).toLocaleString()}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8125rem", color: "text.secondary" }}>
                    <strong>Priority:</strong> {selectedStory.priority}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.8125rem", mb: 1, color: "text.secondary" }}>Article Body</Typography>
                  {isEditing ? (
                    <TextField
                      multiline
                      rows={4}
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.8125rem" } }}
                    />
                  ) : (
                    <Typography sx={{ fontSize: "0.8125rem", lineHeight: 1.6, color: "text.primary" }}>
                      {selectedStory.body}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ mb: 3, p: 2, backgroundColor: mode === "light" ? "#f8f9fa" : "#1a1a1a", borderRadius: "8px" }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.8125rem", mb: 1, color: "text.secondary" }}>
                    AI Summary
                  </Typography>
                  {isEditing ? (
                    <TextField
                      multiline
                      rows={2}
                      value={editSummary}
                      onChange={(e) => setEditSummary(e.target.value)}
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "0.8125rem" } }}
                    />
                  ) : (
                    <Typography sx={{ fontSize: "0.8125rem", lineHeight: 1.6, color: "text.primary" }}>
                      {selectedStory.aiSummary}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ p: 2, backgroundColor: mode === "light" ? "#f0f0ff" : "#1a1a2e", borderRadius: "8px" }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.8125rem", mb: 0.5, color: "text.secondary" }}>
                    AI Suggested Headline
                  </Typography>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, fontStyle: "italic", color: "text.primary" }}>
                    {selectedStory.aiSuggestedHeadline}
                  </Typography>
                </Box>
              </Box>

              {/* Modal Footer */}
              <Box sx={{ p: { xs: 2, sm: 3 }, pt: 2, borderTop: "1px solid", borderColor: "divider", display: "flex", gap: 1.5, justifyContent: "flex-end", flexWrap: "wrap" }}>
                {isEditing ? (
                  <>
                    <Tooltip title={!permissions.canEditContent ? "No permission" : ""}>
                      <Box>
                        <Button
                          variant="contained"
                          startIcon={<Save size={14} />}
                          onClick={handleSave}
                          disabled={!permissions.canEditContent}
                          sx={{
                            backgroundColor: "#3498db",
                            color: "#fff",
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.8125rem",
                            "&:hover": { backgroundColor: "#2980b9" },
                          }}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </Tooltip>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                      sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600, fontSize: "0.8125rem" }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Tooltip title={!permissions.canApproveNews ? "No permission" : ""}>
                      <Box>
                        <Button
                          variant="contained"
                          startIcon={<CheckCircle size={14} />}
                          onClick={handleApprove}
                          disabled={!permissions.canApproveNews || selectedStory.status === "approved" || selectedStory.status === "rejected" || selectedStory.status === "published"}
                          sx={{
                            backgroundColor: "#28a745",
                            color: "#fff",
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.8125rem",
                            "&:hover": { backgroundColor: "#218838" },
                            "&.Mui-disabled": {
                              backgroundColor: mode === "light" ? "#f5f5f5" : "#333",
                              color: "text.secondary",
                            },
                          }}
                        >
                          Approve
                        </Button>
                      </Box>
                    </Tooltip>
                    <Tooltip title={!permissions.canRejectNews ? "No permission" : ""}>
                      <Box>
                        <Button
                          variant="contained"
                          startIcon={<XCircle size={14} />}
                          onClick={handleReject}
                          disabled={!permissions.canRejectNews || selectedStory.status === "approved" || selectedStory.status === "rejected" || selectedStory.status === "published"}
                          sx={{
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.8125rem",
                            "&:hover": { backgroundColor: "#c82333" },
                            "&.Mui-disabled": {
                              backgroundColor: mode === "light" ? "#f5f5f5" : "#333",
                              color: "text.secondary",
                            },
                          }}
                        >
                          Reject
                        </Button>
                      </Box>
                    </Tooltip>
                    <Tooltip title={!permissions.canEditContent ? "No permission" : ""}>
                      <Box>
                        <Button
                          variant="outlined"
                          startIcon={<Pencil size={14} />}
                          onClick={() => setIsEditing(true)}
                          disabled={!permissions.canEditContent || selectedStory.status === "approved" || selectedStory.status === "rejected" || selectedStory.status === "published"}
                          sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.8125rem",
                            borderColor: "divider",
                            color: "text.primary",
                            "&:hover": { borderColor: "text.primary" },
                            "&.Mui-disabled": {
                              borderColor: "divider",
                              color: "text.secondary",
                            },
                          }}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Tooltip>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ApprovalPortal;
