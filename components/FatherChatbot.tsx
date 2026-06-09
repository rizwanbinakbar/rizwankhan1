import { FormEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { ArrowLeft, Bot, RefreshCcw, Send, Trash2, UserRound } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const STORAGE_KEY = "father-chatbot-messages";

const suggestedQuestions = [
  "What does Akbar Khan do?",
  "What is Evacify?",
  "What type of maps does he design?",
  "How did he enter this profession?",
  "Where did he work previously?",
  "What are his main responsibilities?",
  "How many years of experience does he have?",
  "Does he work with international clients?",
];

const technologyTags = ["AI", "Gemini", "Vercel", "Serverless"];

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
  };
}

function loadMessages() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (message): message is ChatMessage =>
        typeof message?.id === "string" &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string",
    );
  } catch {
    return [];
  }
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <span key={index}>{part}</span>;
  });
}

function MarkdownMessage({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (!listItems.length) return;
    blocks.push(
      <ul key={`list-${blocks.length}`} className="chat-markdown-list">
        {listItems.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      listItems.push(bullet[1]);
      return;
    }

    flushList();
    blocks.push(
      <p key={`p-${index}`} className="chat-markdown-paragraph">
        {renderInline(trimmed)}
      </p>,
    );
  });

  flushList();

  return <>{blocks}</>;
}

export function FatherChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequestMessages, setLastRequestMessages] = useState<ChatMessage[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  async function requestReply(nextMessages: ChatMessage[]) {
    setIsLoading(true);
    setError(null);
    setLastRequestMessages(nextMessages);

    try {
      const response = await fetch("/api/father-chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.slice(-10).map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.reply) {
        throw new Error(data?.reply || "The chatbot could not answer right now.");
      }

      setMessages((current) => [...current, createMessage("assistant", data.reply)]);
      setLastRequestMessages(null);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "The chatbot could not answer right now.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    const userMessage = createMessage("user", trimmed);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    requestReply(nextMessages);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  }

  function clearConversation() {
    setMessages([]);
    setInput("");
    setError(null);
    setLastRequestMessages(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="father-chatbot-page">
      <aside className="father-sidebar" aria-label="Chatbot project sidebar">
        <div>
          <a href="/" className="father-brand">
            Rizwan Khan
          </a>
          <a href="/" className="father-back-link">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </a>
        </div>

        <nav className="father-sidebar-nav" aria-label="Chatbot navigation">
          <span className="father-nav-item">Father Profession Chatbot</span>
        </nav>

        <section className="father-sidebar-section">
          <h2>About this project</h2>
          <p>
            A university AI assignment about Akbar Khan, his profession, and his work as a design consultant.
          </p>
        </section>

        <section className="father-sidebar-section">
          <h2>Technology</h2>
          <div className="father-tag-list">
            {technologyTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        <p className="father-privacy-note">Messages are temporary and are not permanently stored.</p>

        <Button variant="outline" onClick={clearConversation} className="w-full">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Conversation
        </Button>
      </aside>

      <main className="father-chat-main">
        <header className="father-mobile-header">
          <a href="/" className="father-back-link">
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </a>
          <Button variant="outline" size="sm" onClick={clearConversation}>
            Clear
          </Button>
        </header>

        <section className="father-chat-shell" aria-label="Father profession chatbot">
          <div className="father-chat-header">
            <div>
              <Badge className="mb-3 border-orange bg-orange-soft text-accent-orange hover:bg-orange-soft">
                Live AI Demo
              </Badge>
              <h1>Ask About My Father&apos;s Profession</h1>
              <p>An AI course project by Rizwan Khan</p>
            </div>
          </div>

          <div className="father-conversation" aria-live="polite">
            {messages.length === 0 ? (
              <div className="father-welcome">
                <Bot className="h-8 w-8 text-accent-orange" />
                <h2>Ask me about Akbar Khan&apos;s profession, experience, work, or responsibilities.</h2>
                <div className="father-suggestions">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendMessage(question)}
                      disabled={isLoading}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="father-message-list">
                {messages.map((message) => (
                  <article key={message.id} className={`father-message-row ${message.role}`}>
                    <div className="father-avatar" aria-hidden="true">
                      {message.role === "user" ? <UserRound className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className="father-message-bubble">
                      {message.role === "assistant" ? (
                        <MarkdownMessage content={message.content} />
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </div>
                  </article>
                ))}

                {isLoading && (
                  <article className="father-message-row assistant">
                    <div className="father-avatar" aria-hidden="true">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="father-message-bubble father-loading">
                      <span />
                      <span />
                      <span />
                    </div>
                  </article>
                )}
              </div>
            )}

            {error && (
              <div className="father-error" role="alert">
                <p>{error}</p>
                {lastRequestMessages && (
                  <Button variant="outline" size="sm" onClick={() => requestReply(lastRequestMessages)} disabled={isLoading}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Retry
                  </Button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="father-input-area" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="father-chat-input">
              Ask about Akbar Khan&apos;s profession
            </label>
            <textarea
              id="father-chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Akbar Khan's profession..."
              rows={1}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
