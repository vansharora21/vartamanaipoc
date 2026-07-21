"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import {
  Story,
  AIContent,
  PlatformEngagement,
  ActivityItem,
  Notification,
  Reporter,
  UserRole,
  RolePermissions,
  ROLE_PERMISSIONS,
  StoryStatus,
  AIContentStatus,
  ActivityAction,
  NotificationType,
} from "@/types/newsroom";
import {
  generateAndStoreData,
  loadData,
  saveData,
  resetData,
  NewsroomData,
} from "@/data/demoData";

interface NewsroomContextType {
  // Data
  stories: Story[];
  aiContent: AIContent[];
  engagement: PlatformEngagement[];
  activity: ActivityItem[];
  notifications: Notification[];
  reporters: Reporter[];

  // Role
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  permissions: RolePermissions;

  // Story actions
  updateStoryStatus: (storyId: string, status: StoryStatus) => void;
  updateStory: (storyId: string, updates: Partial<Story>) => void;
  assignStory: (storyId: string) => void;

  // AI Content actions
  updateAIContentStatus: (contentId: string, status: AIContentStatus) => void;
  updateAIContentCaption: (contentId: string, caption: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;

  // Activity
  addActivity: (action: ActivityAction, actor: string, target: string, details?: string) => void;

  // Reset
  resetDemo: () => void;

  // Computed metrics
  metrics: {
    storiesPending: number;
    storiesApproved: number;
    storiesRejected: number;
    aiGeneratedPosts: number;
    pendingAIApproval: number;
    publishedToday: number;
  };
}

const NewsroomContext = createContext<NewsroomContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = "newsroom_role";

export function NewsroomProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<NewsroomData | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>("admin");
  const [mounted, setMounted] = useState(false);

  // Initialize data
  useEffect(() => {
    const stored = loadData();
    if (stored) {
      setData(stored);
    } else {
      setData(generateAndStoreData());
    }
    const savedRole = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole;
    if (savedRole) {
      setCurrentRole(savedRole);
    }
    setMounted(true);
  }, []);

  // Persist role
  const setRole = useCallback((role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  }, []);

  // Persist data whenever it changes
  useEffect(() => {
    if (data && mounted) {
      saveData(data);
    }
  }, [data, mounted]);

  const permissions = ROLE_PERMISSIONS[currentRole];

  // ─── Story Actions ────────────────────────────────────────────────────────
  const updateStoryStatus = useCallback((storyId: string, status: StoryStatus) => {
    setData((prev) => {
      if (!prev) return prev;
      const stories = prev.stories.map((s) =>
        s.id === storyId ? { ...s, status, updatedAt: new Date().toISOString() } : s
      );
      return { ...prev, stories };
    });
  }, []);

  const updateStory = useCallback((storyId: string, updates: Partial<Story>) => {
    setData((prev) => {
      if (!prev) return prev;
      const stories = prev.stories.map((s) =>
        s.id === storyId ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
      );
      return { ...prev, stories };
    });
  }, []);

  const assignStory = useCallback((storyId: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const stories = prev.stories.map((s) =>
        s.id === storyId ? { ...s, status: "pending_approval" as StoryStatus, updatedAt: new Date().toISOString() } : s
      );
      return { ...prev, stories };
    });
  }, []);

  // ─── AI Content Actions ──────────────────────────────────────────────────
  const updateAIContentStatus = useCallback((contentId: string, status: AIContentStatus) => {
    setData((prev) => {
      if (!prev) return prev;
      const aiContent = prev.aiContent.map((c) =>
        c.id === contentId ? { ...c, status } : c
      );
      return { ...prev, aiContent };
    });
  }, []);

  const updateAIContentCaption = useCallback((contentId: string, caption: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const aiContent = prev.aiContent.map((c) =>
        c.id === contentId ? { ...c, caption } : c
      );
      return { ...prev, aiContent };
    });
  }, []);

  // ─── Notifications ──────────────────────────────────────────────────────
  const markNotificationRead = useCallback((id: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const notifications = prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return { ...prev, notifications };
    });
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setData((prev) => {
      if (!prev) return prev;
      const notifications = prev.notifications.map((n) => ({ ...n, read: true }));
      return { ...prev, notifications };
    });
  }, []);

  const unreadCount = data?.notifications.filter((n) => !n.read).length ?? 0;

  // ─── Activity ──────────────────────────────────────────────────────────
  const addActivity = useCallback((action: ActivityAction, actor: string, target: string, details?: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const newItem: ActivityItem = {
        id: `a-${Date.now()}`,
        action,
        actor,
        target,
        timestamp: new Date().toISOString(),
        details,
      };
      return { ...prev, activity: [newItem, ...prev.activity] };
    });
  }, []);

  // ─── Reset ────────────────────────────────────────────────────────────
  const resetDemo = useCallback(() => {
    setData(resetData());
    setCurrentRole("admin");
    localStorage.setItem(ROLE_STORAGE_KEY, "admin");
  }, []);

  // ─── Metrics ─────────────────────────────────────────────────────────
  const metrics = (() => {
    if (!data) {
      return {
        storiesPending: 0,
        storiesApproved: 0,
        storiesRejected: 0,
        aiGeneratedPosts: 0,
        pendingAIApproval: 0,
        publishedToday: 0,
      };
    }
    const today = new Date().toDateString();
    return {
      storiesPending: data.stories.filter((s) => ["pending_review", "pending_approval", "assigned"].includes(s.status)).length,
      storiesApproved: data.stories.filter((s) => s.status === "approved").length,
      storiesRejected: data.stories.filter((s) => s.status === "rejected").length,
      aiGeneratedPosts: data.aiContent.length,
      pendingAIApproval: data.aiContent.filter((c) => c.status === "pending").length,
      publishedToday: data.stories.filter((s) => s.status === "published" && new Date(s.updatedAt).toDateString() === today).length,
    };
  })();

  if (!mounted || !data) return null;

  return (
    <NewsroomContext.Provider
      value={{
        stories: data.stories,
        aiContent: data.aiContent,
        engagement: data.engagement,
        activity: data.activity,
        notifications: data.notifications,
        reporters: data.reporters,
        currentRole,
        setRole,
        permissions,
        updateStoryStatus,
        updateStory,
        assignStory,
        updateAIContentStatus,
        updateAIContentCaption,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,
        addActivity,
        resetDemo,
        metrics,
      }}
    >
      {children}
    </NewsroomContext.Provider>
  );
}

export function useNewsroom() {
  const context = useContext(NewsroomContext);
  if (!context) {
    throw new Error("useNewsroom must be used within a NewsroomProvider");
  }
  return context;
}
