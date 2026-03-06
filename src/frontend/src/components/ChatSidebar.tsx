import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  Globe,
  LogOut,
  MessageSquare,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Conversation } from "../backend.d";
import { useLanguage } from "../contexts/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { LANGUAGES, type LanguageCode } from "../lib/translations";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: bigint | null;
  onNewChat: () => void;
  onSelectConversation: (id: bigint) => void;
  onDeleteConversation: (id: bigint) => void;
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(
  timestamp: bigint,
  today: string,
  yesterday: string,
): string {
  // timestamp is in nanoseconds
  const ms = Number(timestamp / BigInt(1_000_000));
  const date = new Date(ms);
  const now = new Date();
  const diffDays = Math.floor(
    (now.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0)) / 86_400_000,
  );
  if (diffDays === 0) return today;
  if (diffDays === 1) return yesterday;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(ms));
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  const { t, language, setLanguage } = useLanguage();
  const { clear } = useInternetIdentity();
  const [hoveredId, setHoveredId] = useState<bigint | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const sorted = [...conversations].sort((a, b) =>
    Number(b.createdAt - a.createdAt),
  );

  const filtered = searchQuery
    ? sorted.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : sorted;

  const currentLang = LANGUAGES.find((l) => l.code === language);

  const sidebarContent = (
    <div
      data-ocid="sidebar.panel"
      className="flex flex-col h-full w-64 bg-sidebar border-r border-sidebar-border"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-4">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.17 175 / 0.3) 0%, oklch(0.55 0.12 175 / 0.2) 100%)",
          }}
        >
          <Sparkles
            className="w-3.5 h-3.5"
            style={{ color: "oklch(0.72 0.17 175)" }}
          />
        </div>
        <span className="font-cabinet font-bold text-sm text-sidebar-foreground">
          AI Chat
        </span>
      </div>

      {/* New Chat Button */}
      <div className="px-3 mb-3">
        <Button
          data-ocid="chat.new_button"
          onClick={() => {
            onNewChat();
            onClose();
          }}
          variant="outline"
          className="w-full h-9 text-xs font-medium gap-2 rounded-lg justify-start border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.newChat}
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 mb-3">
        <input
          type="text"
          placeholder={t.searchConversations}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-8 px-3 text-xs rounded-lg bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 px-2">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-xs text-muted-foreground px-4"
            >
              <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-40" />
              {t.noConversations}
            </motion.div>
          ) : (
            filtered.map((conv, index) => {
              const isActive =
                activeConversationId !== null &&
                conv.id === activeConversationId;
              const isHovered = hoveredId === conv.id;
              const dateLabel = formatDate(
                conv.createdAt,
                t.today,
                t.yesterday,
              );

              return (
                <motion.div
                  key={conv.id.toString()}
                  data-ocid={`conversation.item.${index + 1}`}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredId(conv.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    onClose();
                  }}
                  className={`group relative flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer mb-0.5 transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate leading-tight">
                      {conv.title || "New Chat"}
                    </p>
                    <p className="text-[10px] opacity-50 mt-0.5">{dateLabel}</p>
                  </div>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.button
                        data-ocid={`conversation.delete_button.${index + 1}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.12 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conv.id);
                        }}
                        title={t.deleteConversation}
                        className="flex-shrink-0 p-1 rounded hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* Bottom Controls */}
      <div className="px-3 pb-4 pt-2 border-t border-sidebar-border space-y-2">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              data-ocid="language.select"
              variant="ghost"
              size="sm"
              className="w-full h-8 text-xs justify-between text-muted-foreground hover:text-foreground hover:bg-sidebar-accent px-2"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                {currentLang?.nativeLabel ?? t.selectLanguage}
              </span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-48 max-h-64 overflow-y-auto"
          >
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code as LanguageCode)}
                className={`text-xs cursor-pointer ${
                  language === lang.code ? "text-ai-accent font-medium" : ""
                }`}
              >
                <span className="mr-2">{lang.nativeLabel}</span>
                <span className="text-muted-foreground ml-auto">
                  {lang.label}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sign Out */}
        <Button
          onClick={clear}
          variant="ghost"
          size="sm"
          className="w-full h-8 text-xs justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2 px-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full">{sidebarContent}</div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
            />
            <motion.div
              key="sidebar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed left-0 top-0 bottom-0 z-50 md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
