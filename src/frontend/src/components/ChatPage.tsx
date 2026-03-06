import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "../backend.d";
import { useLanguage } from "../contexts/LanguageContext";
import {
  useAddMessage,
  useCreateConversation,
  useDeleteConversation,
  useGetConversation,
  useGetConversations,
  useUpdateConversationTitle,
} from "../hooks/useQueries";
import { TRANSLATIONS } from "../lib/translations";
import { ChatInput } from "./ChatInput";
import { ChatMessage, TypingIndicator } from "./ChatMessage";
import { ChatSidebar } from "./ChatSidebar";

function WelcomeScreen() {
  const { t } = useLanguage();
  return (
    <motion.div
      data-ocid="chat.empty_state"
      className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Glow icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.17 175 / 0.2) 0%, oklch(0.55 0.12 175 / 0.1) 100%)",
          boxShadow: "0 0 60px oklch(0.72 0.17 175 / 0.15)",
          border: "1px solid oklch(0.72 0.17 175 / 0.25)",
        }}
      >
        <Sparkles
          className="w-7 h-7"
          style={{ color: "oklch(0.72 0.17 175)" }}
        />
      </div>
      <div>
        <h2 className="font-cabinet text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
          {t.welcomeTitle}
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          {t.welcomeSubtitle}
        </p>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-lg">
        {[
          "Explain quantum computing",
          "Write a poem about the moon",
          "Help me debug my code",
          "Translate to French",
        ].map((suggestion) => (
          <span
            key={suggestion}
            className="px-3 py-1.5 text-xs rounded-full text-muted-foreground border border-border hover:border-ai-accent hover:text-foreground transition-colors cursor-default"
            style={{ background: "oklch(0.165 0 0)" }}
          >
            {suggestion}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function ChatPage() {
  const { t, language } = useLanguage();
  const [activeConversationId, setActiveConversationId] = useState<
    bigint | null
  >(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: conversations = [] } = useGetConversations();
  const { data: activeConversation } = useGetConversation(activeConversationId);

  const createConversation = useCreateConversation();
  const addMessage = useAddMessage();
  const deleteConversation = useDeleteConversation();
  const updateTitle = useUpdateConversationTitle();

  // Scroll to bottom when messages change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  // Clear optimistic messages when real ones arrive
  useEffect(() => {
    if (activeConversation?.messages?.length) {
      setOptimisticMessages([]);
    }
  }, [activeConversation?.messages]);

  const handleNewChat = useCallback(() => {
    setActiveConversationId(null);
    setOptimisticMessages([]);
    setIsAiTyping(false);
  }, []);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (isAiTyping) return;

      setIsAiTyping(true);

      let convId = activeConversationId;

      try {
        // Create conversation if none exists
        if (convId === null) {
          const title = content.slice(0, 30);
          convId = await createConversation.mutateAsync(title);
          setActiveConversationId(convId);
        }

        // Add user message (optimistic)
        const userMsg: Message = {
          role: "user",
          content,
          timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        };
        setOptimisticMessages((prev) => [...prev, userMsg]);

        // Save user message
        await addMessage.mutateAsync({
          conversationId: convId,
          role: "user",
          content,
        });

        // Auto-title if this is the first message
        const isFirstMsg =
          !activeConversation?.messages?.length &&
          optimisticMessages.length === 0;

        if (isFirstMsg && convId !== null) {
          const title = content.slice(0, 30);
          void updateTitle.mutateAsync({
            conversationId: convId,
            newTitle: title,
          });
        }

        // Simulate AI thinking (1.5-2 seconds)
        const delay = 1500 + Math.random() * 500;
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Generate simulated response
        const aiResponse = TRANSLATIONS[language].aiResponse;

        // Add AI response (optimistic)
        const aiMsg: Message = {
          role: "assistant",
          content: aiResponse,
          timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        };
        setOptimisticMessages((prev) => [...prev, aiMsg]);

        // Save AI message
        await addMessage.mutateAsync({
          conversationId: convId,
          role: "assistant",
          content: aiResponse,
        });
      } catch (err) {
        console.error("Failed to send message:", err);
      } finally {
        setIsAiTyping(false);
      }
    },
    [
      isAiTyping,
      activeConversationId,
      activeConversation,
      optimisticMessages,
      createConversation,
      addMessage,
      updateTitle,
      language,
    ],
  );

  const handleDeleteConversation = useCallback(
    async (id: bigint) => {
      await deleteConversation.mutateAsync(id);
      if (activeConversationId === id) {
        setActiveConversationId(null);
        setOptimisticMessages([]);
      }
    },
    [deleteConversation, activeConversationId],
  );

  const handleSelectConversation = useCallback((id: bigint) => {
    setActiveConversationId(id);
    setOptimisticMessages([]);
    setIsAiTyping(false);
  }, []);

  const displayMessages = activeConversationId
    ? (activeConversation?.messages ?? optimisticMessages)
    : optimisticMessages;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        {/* Top bar (mobile only) */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border flex-shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <span className="font-cabinet font-semibold text-sm text-foreground">
            {activeConversation?.title || t.newChat}
          </span>
        </div>

        {/* Messages area */}
        <div className="flex-1 min-h-0 relative">
          {displayMessages.length === 0 && !isAiTyping ? (
            <WelcomeScreen />
          ) : (
            <ScrollArea className="h-full">
              <div data-ocid="chat.messages.panel" className="pb-4">
                <AnimatePresence mode="sync">
                  {displayMessages.map((msg, idx) => (
                    <ChatMessage
                      key={`${msg.role}-${idx}`}
                      message={msg}
                      isLatest={idx === displayMessages.length - 1}
                    />
                  ))}
                  {isAiTyping && <TypingIndicator key="typing" />}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Input */}
        <div className="flex-shrink-0">
          <ChatInput onSend={handleSendMessage} disabled={isAiTyping} />
        </div>

        {/* Footer */}
        <div className="text-center pb-3 px-4 hidden md:block">
          <p className="text-[11px] text-muted-foreground opacity-40">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
