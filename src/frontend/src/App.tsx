import { Toaster } from "@/components/ui/sonner";
import { ChatPage } from "./components/ChatPage";
import { LoginPage } from "./components/LoginPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

function AppContent() {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.17 175 / 0.25) 0%, oklch(0.55 0.12 175 / 0.15) 100%)",
              border: "1px solid oklch(0.72 0.17 175 / 0.3)",
            }}
          >
            <div
              className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
              style={{
                borderColor: "oklch(0.72 0.17 175 / 0.6)",
                borderTopColor: "transparent",
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return identity ? <ChatPage /> : <LoginPage />;
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
      <Toaster />
    </LanguageProvider>
  );
}
