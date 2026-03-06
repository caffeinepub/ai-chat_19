import { ArrowUp } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      const el = e.target;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    },
    [],
  );

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="px-4 py-4 md:px-8">
      <div
        className="relative flex items-end gap-3 rounded-2xl p-3 transition-all duration-200"
        style={{
          background: "oklch(0.19 0 0)",
          border: `1px solid ${canSend ? "oklch(0.72 0.17 175 / 0.4)" : "oklch(0.27 0 0)"}`,
          boxShadow: canSend ? "0 0 20px oklch(0.72 0.17 175 / 0.08)" : "none",
        }}
      >
        <textarea
          ref={textareaRef}
          data-ocid="chat.input"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? t.thinking : t.typeMessage}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none leading-relaxed py-1 max-h-48 overflow-y-auto disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "inherit" }}
        />

        <button
          type="button"
          data-ocid="chat.send_button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label={t.send}
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: canSend
              ? "linear-gradient(135deg, oklch(0.72 0.17 175) 0%, oklch(0.62 0.15 195) 100%)"
              : "oklch(0.27 0 0)",
            color: canSend ? "oklch(0.115 0 0)" : "oklch(0.5 0 0)",
          }}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-[11px] text-muted-foreground mt-2 opacity-60">
        AI can make mistakes. Check important info.
      </p>
    </div>
  );
}
