export type LanguageCode =
  | "en"
  | "hi"
  | "es"
  | "fr"
  | "de"
  | "ar"
  | "zh"
  | "ja"
  | "pt"
  | "ru"
  | "ko"
  | "it"
  | "tr"
  | "nl"
  | "bn";

export interface Translations {
  newChat: string;
  searchConversations: string;
  selectLanguage: string;
  typeMessage: string;
  send: string;
  deleteConversation: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  thinking: string;
  loginTitle: string;
  loginSubtitle: string;
  loginButton: string;
  noConversations: string;
  aiResponse: string;
  you: string;
  assistant: string;
  today: string;
  yesterday: string;
}

export const LANGUAGES: {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "es", label: "Spanish", nativeLabel: "Español" },
  { code: "fr", label: "French", nativeLabel: "Français" },
  { code: "de", label: "German", nativeLabel: "Deutsch" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية" },
  { code: "zh", label: "Chinese", nativeLabel: "中文" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português" },
  { code: "ru", label: "Russian", nativeLabel: "Русский" },
  { code: "ko", label: "Korean", nativeLabel: "한국어" },
  { code: "it", label: "Italian", nativeLabel: "Italiano" },
  { code: "tr", label: "Turkish", nativeLabel: "Türkçe" },
  { code: "nl", label: "Dutch", nativeLabel: "Nederlands" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
];

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    newChat: "New Chat",
    searchConversations: "Search conversations...",
    selectLanguage: "Language",
    typeMessage: "Message AI Assistant...",
    send: "Send",
    deleteConversation: "Delete conversation",
    welcomeTitle: "How can I help you today?",
    welcomeSubtitle: "Ask me anything — I'm here to assist you.",
    thinking: "Thinking...",
    loginTitle: "Welcome to AI Chat",
    loginSubtitle: "Sign in with Internet Identity to start chatting",
    loginButton: "Sign In",
    noConversations: "No conversations yet",
    aiResponse:
      "I understand your question. This is a demo response — in a real implementation, this would be powered by an AI model to give you accurate, helpful answers.",
    you: "You",
    assistant: "Assistant",
    today: "Today",
    yesterday: "Yesterday",
  },
  hi: {
    newChat: "नई चैट",
    searchConversations: "बातचीत खोजें...",
    selectLanguage: "भाषा",
    typeMessage: "AI सहायक को संदेश भेजें...",
    send: "भेजें",
    deleteConversation: "बातचीत हटाएं",
    welcomeTitle: "आज मैं आपकी कैसे मदद कर सकता हूं?",
    welcomeSubtitle: "कुछ भी पूछें — मैं आपकी सहायता के लिए यहां हूं।",
    thinking: "सोच रहा हूं...",
    loginTitle: "AI चैट में आपका स्वागत है",
    loginSubtitle: "चैट शुरू करने के लिए साइन इन करें",
    loginButton: "साइन इन करें",
    noConversations: "अभी तक कोई बातचीत नहीं",
    aiResponse:
      "मैं आपका प्रश्न समझता हूं। यह एक डेमो उत्तर है — वास्तविक कार्यान्वयन में, यह एक AI मॉडल द्वारा संचालित होगा।",
    you: "आप",
    assistant: "सहायक",
    today: "आज",
    yesterday: "कल",
  },
  es: {
    newChat: "Nueva Conversación",
    searchConversations: "Buscar conversaciones...",
    selectLanguage: "Idioma",
    typeMessage: "Escribe un mensaje al Asistente IA...",
    send: "Enviar",
    deleteConversation: "Eliminar conversación",
    welcomeTitle: "¿Cómo puedo ayudarte hoy?",
    welcomeSubtitle: "Pregúntame lo que quieras — estoy aquí para ayudarte.",
    thinking: "Pensando...",
    loginTitle: "Bienvenido al Chat IA",
    loginSubtitle: "Inicia sesión para comenzar a chatear",
    loginButton: "Iniciar Sesión",
    noConversations: "Aún no hay conversaciones",
    aiResponse:
      "Entiendo tu pregunta. Esta es una respuesta de demostración — en una implementación real, estaría impulsada por un modelo de IA.",
    you: "Tú",
    assistant: "Asistente",
    today: "Hoy",
    yesterday: "Ayer",
  },
  fr: {
    newChat: "Nouvelle conversation",
    searchConversations: "Rechercher des conversations...",
    selectLanguage: "Langue",
    typeMessage: "Message à l'Assistant IA...",
    send: "Envoyer",
    deleteConversation: "Supprimer la conversation",
    welcomeTitle: "Comment puis-je vous aider aujourd'hui ?",
    welcomeSubtitle:
      "Posez-moi n'importe quelle question — je suis là pour vous aider.",
    thinking: "Je réfléchis...",
    loginTitle: "Bienvenue sur le Chat IA",
    loginSubtitle: "Connectez-vous pour commencer à chatter",
    loginButton: "Se connecter",
    noConversations: "Aucune conversation pour l'instant",
    aiResponse:
      "Je comprends votre question. Ceci est une réponse de démonstration — dans une vraie implémentation, elle serait alimentée par un modèle d'IA.",
    you: "Vous",
    assistant: "Assistant",
    today: "Aujourd'hui",
    yesterday: "Hier",
  },
  de: {
    newChat: "Neues Gespräch",
    searchConversations: "Gespräche suchen...",
    selectLanguage: "Sprache",
    typeMessage: "Nachricht an KI-Assistent...",
    send: "Senden",
    deleteConversation: "Gespräch löschen",
    welcomeTitle: "Wie kann ich Ihnen heute helfen?",
    welcomeSubtitle: "Fragen Sie mich alles — ich bin hier, um zu helfen.",
    thinking: "Denke nach...",
    loginTitle: "Willkommen beim KI-Chat",
    loginSubtitle: "Melden Sie sich an, um zu chatten",
    loginButton: "Anmelden",
    noConversations: "Noch keine Gespräche",
    aiResponse:
      "Ich verstehe Ihre Frage. Dies ist eine Demo-Antwort — in einer echten Implementierung würde dies von einem KI-Modell angetrieben.",
    you: "Sie",
    assistant: "Assistent",
    today: "Heute",
    yesterday: "Gestern",
  },
  ar: {
    newChat: "محادثة جديدة",
    searchConversations: "البحث في المحادثات...",
    selectLanguage: "اللغة",
    typeMessage: "أرسل رسالة إلى مساعد الذكاء الاصطناعي...",
    send: "إرسال",
    deleteConversation: "حذف المحادثة",
    welcomeTitle: "كيف يمكنني مساعدتك اليوم؟",
    welcomeSubtitle: "اسألني أي شيء — أنا هنا للمساعدة.",
    thinking: "أفكر...",
    loginTitle: "مرحباً بك في دردشة الذكاء الاصطناعي",
    loginSubtitle: "سجّل الدخول لبدء المحادثة",
    loginButton: "تسجيل الدخول",
    noConversations: "لا توجد محادثات بعد",
    aiResponse:
      "أفهم سؤالك. هذا رد تجريبي — في تطبيق حقيقي، سيكون مدعوماً بنموذج ذكاء اصطناعي.",
    you: "أنت",
    assistant: "المساعد",
    today: "اليوم",
    yesterday: "أمس",
  },
  zh: {
    newChat: "新对话",
    searchConversations: "搜索对话...",
    selectLanguage: "语言",
    typeMessage: "向AI助手发送消息...",
    send: "发送",
    deleteConversation: "删除对话",
    welcomeTitle: "今天我能帮您做什么？",
    welcomeSubtitle: "尽管提问 — 我随时为您服务。",
    thinking: "思考中...",
    loginTitle: "欢迎使用AI聊天",
    loginSubtitle: "登录开始聊天",
    loginButton: "登录",
    noConversations: "暂无对话",
    aiResponse:
      "我理解您的问题。这是一个演示回复 — 在实际实现中，将由AI模型提供准确有用的答案。",
    you: "您",
    assistant: "助手",
    today: "今天",
    yesterday: "昨天",
  },
  ja: {
    newChat: "新しいチャット",
    searchConversations: "会話を検索...",
    selectLanguage: "言語",
    typeMessage: "AIアシスタントにメッセージを送る...",
    send: "送信",
    deleteConversation: "会話を削除",
    welcomeTitle: "今日はどのようにお手伝いできますか？",
    welcomeSubtitle: "何でも聞いてください — お役に立てます。",
    thinking: "考え中...",
    loginTitle: "AIチャットへようこそ",
    loginSubtitle: "チャットを始めるにはサインインしてください",
    loginButton: "サインイン",
    noConversations: "まだ会話がありません",
    aiResponse:
      "ご質問を理解しました。これはデモの回答です — 実際の実装ではAIモデルによって正確で有用な回答が提供されます。",
    you: "あなた",
    assistant: "アシスタント",
    today: "今日",
    yesterday: "昨日",
  },
  pt: {
    newChat: "Nova Conversa",
    searchConversations: "Pesquisar conversas...",
    selectLanguage: "Idioma",
    typeMessage: "Mensagem para o Assistente IA...",
    send: "Enviar",
    deleteConversation: "Excluir conversa",
    welcomeTitle: "Como posso ajudá-lo hoje?",
    welcomeSubtitle: "Pergunte qualquer coisa — estou aqui para ajudar.",
    thinking: "Pensando...",
    loginTitle: "Bem-vindo ao Chat IA",
    loginSubtitle: "Entre para começar a conversar",
    loginButton: "Entrar",
    noConversations: "Nenhuma conversa ainda",
    aiResponse:
      "Entendo sua pergunta. Esta é uma resposta de demonstração — em uma implementação real, seria alimentada por um modelo de IA.",
    you: "Você",
    assistant: "Assistente",
    today: "Hoje",
    yesterday: "Ontem",
  },
  ru: {
    newChat: "Новый чат",
    searchConversations: "Поиск разговоров...",
    selectLanguage: "Язык",
    typeMessage: "Сообщение AI-ассистенту...",
    send: "Отправить",
    deleteConversation: "Удалить разговор",
    welcomeTitle: "Как я могу помочь вам сегодня?",
    welcomeSubtitle: "Спросите меня о чём угодно — я здесь, чтобы помочь.",
    thinking: "Думаю...",
    loginTitle: "Добро пожаловать в AI Чат",
    loginSubtitle: "Войдите, чтобы начать общение",
    loginButton: "Войти",
    noConversations: "Пока нет разговоров",
    aiResponse:
      "Я понимаю ваш вопрос. Это демонстрационный ответ — в реальной реализации он будет создан моделью ИИ.",
    you: "Вы",
    assistant: "Ассистент",
    today: "Сегодня",
    yesterday: "Вчера",
  },
  ko: {
    newChat: "새 대화",
    searchConversations: "대화 검색...",
    selectLanguage: "언어",
    typeMessage: "AI 어시스턴트에게 메시지 보내기...",
    send: "보내기",
    deleteConversation: "대화 삭제",
    welcomeTitle: "오늘 무엇을 도와드릴까요?",
    welcomeSubtitle: "무엇이든 물어보세요 — 도움을 드리겠습니다.",
    thinking: "생각 중...",
    loginTitle: "AI 채팅에 오신 것을 환영합니다",
    loginSubtitle: "채팅을 시작하려면 로그인하세요",
    loginButton: "로그인",
    noConversations: "아직 대화가 없습니다",
    aiResponse:
      "질문을 이해했습니다. 이것은 데모 응답입니다 — 실제 구현에서는 AI 모델이 정확하고 유용한 답변을 제공합니다.",
    you: "당신",
    assistant: "어시스턴트",
    today: "오늘",
    yesterday: "어제",
  },
  it: {
    newChat: "Nuova Conversazione",
    searchConversations: "Cerca conversazioni...",
    selectLanguage: "Lingua",
    typeMessage: "Messaggio all'Assistente IA...",
    send: "Invia",
    deleteConversation: "Elimina conversazione",
    welcomeTitle: "Come posso aiutarti oggi?",
    welcomeSubtitle: "Chiedimi qualsiasi cosa — sono qui per aiutarti.",
    thinking: "Sto pensando...",
    loginTitle: "Benvenuto nella Chat IA",
    loginSubtitle: "Accedi per iniziare a chattare",
    loginButton: "Accedi",
    noConversations: "Nessuna conversazione ancora",
    aiResponse:
      "Capisco la tua domanda. Questa è una risposta dimostrativa — in un'implementazione reale, sarebbe alimentata da un modello di IA.",
    you: "Tu",
    assistant: "Assistente",
    today: "Oggi",
    yesterday: "Ieri",
  },
  tr: {
    newChat: "Yeni Sohbet",
    searchConversations: "Sohbet ara...",
    selectLanguage: "Dil",
    typeMessage: "AI Asistana mesaj gönder...",
    send: "Gönder",
    deleteConversation: "Sohbeti sil",
    welcomeTitle: "Bugün size nasıl yardımcı olabilirim?",
    welcomeSubtitle: "Her şeyi sorabilirsiniz — yardım etmek için buradayım.",
    thinking: "Düşünüyorum...",
    loginTitle: "AI Sohbete Hoş Geldiniz",
    loginSubtitle: "Sohbet etmeye başlamak için giriş yapın",
    loginButton: "Giriş Yap",
    noConversations: "Henüz sohbet yok",
    aiResponse:
      "Sorunuzu anlıyorum. Bu bir demo yanıtıdır — gerçek bir uygulamada, bir yapay zeka modeli tarafından desteklenecektir.",
    you: "Siz",
    assistant: "Asistan",
    today: "Bugün",
    yesterday: "Dün",
  },
  nl: {
    newChat: "Nieuw Gesprek",
    searchConversations: "Gesprekken zoeken...",
    selectLanguage: "Taal",
    typeMessage: "Bericht aan AI-assistent...",
    send: "Versturen",
    deleteConversation: "Gesprek verwijderen",
    welcomeTitle: "Hoe kan ik u vandaag helpen?",
    welcomeSubtitle: "Stel me gerust vragen — ik ben hier om te helpen.",
    thinking: "Nadenken...",
    loginTitle: "Welkom bij AI Chat",
    loginSubtitle: "Log in om te beginnen met chatten",
    loginButton: "Inloggen",
    noConversations: "Nog geen gesprekken",
    aiResponse:
      "Ik begrijp uw vraag. Dit is een demo-antwoord — in een echte implementatie zou dit worden aangedreven door een AI-model.",
    you: "U",
    assistant: "Assistent",
    today: "Vandaag",
    yesterday: "Gisteren",
  },
  bn: {
    newChat: "নতুন চ্যাট",
    searchConversations: "কথোপকথন খুঁজুন...",
    selectLanguage: "ভাষা",
    typeMessage: "AI সহকারীকে বার্তা পাঠান...",
    send: "পাঠান",
    deleteConversation: "কথোপকথন মুছুন",
    welcomeTitle: "আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    welcomeSubtitle: "যেকোনো কিছু জিজ্ঞেস করুন — আমি সাহায্য করতে এখানে আছি।",
    thinking: "ভাবছি...",
    loginTitle: "AI চ্যাটে স্বাগতম",
    loginSubtitle: "চ্যাট শুরু করতে সাইন ইন করুন",
    loginButton: "সাইন ইন",
    noConversations: "এখনও কোনো কথোপকথন নেই",
    aiResponse:
      "আমি আপনার প্রশ্ন বুঝতে পেরেছি। এটি একটি ডেমো উত্তর — একটি বাস্তব বাস্তবায়নে, এটি একটি AI মডেল দ্বারা চালিত হবে।",
    you: "আপনি",
    assistant: "সহকারী",
    today: "আজ",
    yesterday: "গতকাল",
  },
};
