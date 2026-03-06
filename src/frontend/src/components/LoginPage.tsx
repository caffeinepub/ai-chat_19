import { Button } from "@/components/ui/button";
import { LogIn, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.17 175) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.15 200) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 p-8 text-center max-w-sm w-full"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.17 175 / 0.25) 0%, oklch(0.55 0.12 175 / 0.15) 100%)",
            boxShadow: "0 0 40px oklch(0.72 0.17 175 / 0.2)",
            border: "1px solid oklch(0.72 0.17 175 / 0.3)",
          }}
        >
          <Sparkles
            className="w-8 h-8"
            style={{ color: "oklch(0.72 0.17 175)" }}
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="space-y-2"
        >
          <h1 className="font-cabinet text-3xl font-bold text-foreground tracking-tight">
            {t.loginTitle}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t.loginSubtitle}
          </p>
        </motion.div>

        {/* Login button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="w-full"
        >
          <Button
            data-ocid="login.primary_button"
            onClick={login}
            disabled={isLoggingIn || isInitializing}
            className="w-full h-11 text-sm font-semibold gap-2 rounded-xl transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.17 175) 0%, oklch(0.62 0.15 195) 100%)",
              color: "oklch(0.115 0 0)",
              border: "none",
            }}
          >
            {isLoggingIn ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                {t.loginButton}...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                {t.loginButton}
              </>
            )}
          </Button>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-muted-foreground"
        >
          Powered by Internet Identity
        </motion.p>
      </motion.div>
    </div>
  );
}
