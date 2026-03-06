import { Sparkles, User } from "lucide-react";
import { motion } from "motion/react";
import type { Message } from "../backend.d";

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`flex gap-3 py-4 px-4 md:px-8 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      initial={isLatest ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.27 0 0)",
              border: "1px solid oklch(0.32 0 0)",
            }}
          >
            <User className="w-4 h-4 text-foreground" />
          </div>
        ) : (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.17 175 / 0.25) 0%, oklch(0.55 0.12 175 / 0.15) 100%)",
              border: "1px solid oklch(0.72 0.17 175 / 0.3)",
            }}
          >
            <Sparkles
              className="w-3.5 h-3.5"
              style={{ color: "oklch(0.72 0.17 175)" }}
            />
          </div>
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] md:max-w-[65%] flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser ? "rounded-tr-sm" : "rounded-tl-sm"
          }`}
          style={
            isUser
              ? {
                  background: "oklch(0.22 0 0)",
                  border: "1px solid oklch(0.28 0 0)",
                  color: "oklch(0.96 0 0)",
                }
              : {
                  background: "oklch(0.165 0 0)",
                  border: "1px solid oklch(0.22 0 0)",
                  color: "oklch(0.92 0 0)",
                }
          }
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <div
      data-ocid="chat.loading_state"
      className="flex gap-3 py-4 px-4 md:px-8"
    >
      {/* AI Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.17 175 / 0.25) 0%, oklch(0.55 0.12 175 / 0.15) 100%)",
          border: "1px solid oklch(0.72 0.17 175 / 0.3)",
        }}
      >
        <Sparkles
          className="w-3.5 h-3.5"
          style={{ color: "oklch(0.72 0.17 175)" }}
        />
      </div>

      {/* Dots */}
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
        style={{
          background: "oklch(0.165 0 0)",
          border: "1px solid oklch(0.22 0 0)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="typing-dot w-2 h-2 rounded-full inline-block"
            style={{
              background: "oklch(0.72 0.17 175)",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
