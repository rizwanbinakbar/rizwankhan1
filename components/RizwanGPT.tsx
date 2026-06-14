import { FormEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { ArrowLeft, RefreshCcw, SendHorizontal, Sparkles, Trash2 } from "lucide-react";

type ChatRole = "user" | "assistant";
type ChatSource = "gemini" | "fallback";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  source?: ChatSource;
}

const STORAGE_KEY = "rizwangpt-messages";

const suggestedQuestions = [
  "What kind of data roles is Rizwan best suited for?",
  "Summarize Rizwan's strongest projects.",
  "What is his Power BI experience?",
  "How strong is his SQL and ETL background?",
  "Explain the medallion architecture project.",
  "What should a recruiter know about Rizwan?",
];

function isChatSource(source: unknown): source is ChatSource {
  return source === "gemini" || source === "fallback";
}

function createMessage(role: ChatRole, content: string, source?: ChatSource): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    source,
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
        typeof message.content === "string" &&
        (message.source === undefined || isChatSource(message.source)),
    );
  } catch {
    return [];
  }
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-stone-100 px-1.5 py-0.5 text-[0.92em] text-stone-800">
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function MarkdownMessage({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let codeLines: string[] = [];
  let inCode = false;

  function flushList() {
    if (!listItems.length) return;
    blocks.push(
      <ul key={`list-${blocks.length}`} className="my-4 list-disc space-y-2 pl-5">
        {listItems.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  }

  function flushCode() {
    if (!codeLines.length) return;
    blocks.push(
      <pre
        key={`code-${blocks.length}`}
        className="my-4 overflow-x-auto rounded-xl border border-stone-200 bg-stone-950 p-4 text-sm leading-6 text-stone-50"
      >
        <code>{codeLines.join("\n")}</code>
      </pre>,
    );
    codeLines = [];
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushList();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeLines.push(line);
      return;
    }

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
      <p key={`p-${index}`} className="my-4">
        {renderInline(trimmed)}
      </p>,
    );
  });

  flushList();
  flushCode();

  return <>{blocks}</>;
}

export function RizwanGPT() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRequestMessages, setLastRequestMessages] = useState<ChatMessage[] | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading, error]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [input]);

  async function requestReply(nextMessages: ChatMessage[]) {
    setIsLoading(true);
    setError(null);
    setLastRequestMessages(nextMessages);

    try {
      const response = await fetch("/api/rizwangpt", {
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
        throw new Error(data?.reply || "RizwanGPT could not answer right now.");
      }

      setMessages((current) => [
        ...current,
        createMessage("assistant", data.reply, isChatSource(data.source) ? data.source : undefined),
      ]);
      setLastRequestMessages(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "RizwanGPT could not answer right now.");
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
    <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-stone-950">
      <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-[#FDFDFC]/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-stone-600 outline-none transition hover:text-stone-950 focus-visible:ring-2 focus-visible:ring-stone-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </a>
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
            <Sparkles className="h-4 w-4 text-[#C15F3C]" />
            RizwanGPT
          </div>
          <button
            type="button"
            onClick={clearConversation}
            className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-stone-500 outline-none transition hover:text-stone-950 focus-visible:ring-2 focus-visible:ring-stone-400"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-36 pt-10 sm:px-6 sm:pt-14">
          {messages.length === 0 ? (
            <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center py-12">
              <p className="text-sm font-medium text-[#A85A3A]">Rizwan Khan's portfolio assistant</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
                Ask about my data work.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
                RizwanGPT answers from my portfolio context: Power BI, SQL, ETL, dashboards,
                data projects, education, and experience.
              </p>

              <div className="mt-9 grid gap-2 sm:grid-cols-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    disabled={isLoading}
                    className="rounded-xl border border-stone-200 bg-white/70 px-4 py-3 text-left text-sm leading-6 text-stone-700 shadow-sm outline-none transition hover:border-stone-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-stone-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <section className="space-y-10" aria-live="polite">
              {messages.map((message) => (
                <article key={message.id} className={message.role === "user" ? "ml-auto max-w-[85%]" : "max-w-none"}>
                  <div className={message.role === "user" ? "text-right" : ""}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                      {message.role === "user" ? "User" : "RizwanGPT"}
                    </p>
                    {message.role === "assistant" ? (
                      <div className="prose prose-stone max-w-none text-[1.02rem] leading-8 text-stone-800 prose-p:my-4 prose-strong:text-stone-950">
                        <MarkdownMessage content={message.content} />
                      </div>
                    ) : (
                      <div className="inline-block rounded-2xl border border-stone-200 bg-white px-4 py-3 text-left text-[0.98rem] leading-7 text-stone-800 shadow-sm">
                        {message.content}
                      </div>
                    )}
                    {message.role === "assistant" && message.source === "fallback" && (
                      <p className="mt-2 text-xs text-stone-400">Answered from portfolio fallback.</p>
                    )}
                  </div>
                </article>
              ))}

              {isLoading && (
                <article>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">RizwanGPT</p>
                  <div className="flex items-center gap-2 text-sm text-stone-500">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone-400" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone-400 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stone-400 [animation-delay:240ms]" />
                  </div>
                </article>
              )}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <p>{error}</p>
                  {lastRequestMessages && (
                    <button
                      type="button"
                      onClick={() => requestReply(lastRequestMessages)}
                      disabled={isLoading}
                      className="mt-3 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-red-800 outline-none hover:text-red-950 focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Retry
                    </button>
                  )}
                </div>
              )}
              <div ref={endRef} />
            </section>
          )}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 bg-[#FDFDFC]/90 px-4 py-4 backdrop-blur sm:py-5">
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
          <div className="rounded-2xl border border-stone-200 bg-white shadow-md transition focus-within:border-stone-300">
            <label className="sr-only" htmlFor="rizwangpt-input">
              Ask RizwanGPT
            </label>
            <textarea
              ref={textareaRef}
              id="rizwangpt-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Rizwan's data engineering experience..."
              rows={1}
              disabled={isLoading}
              className="max-h-[180px] min-h-[56px] w-full resize-none bg-transparent px-4 py-4 pr-14 text-[0.98rem] leading-7 text-stone-900 outline-none placeholder:text-stone-400 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <div className="flex items-center justify-between border-t border-stone-100 px-3 py-2">
              <p className="text-xs text-stone-400">Temporary session memory. No chat history is stored permanently.</p>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-stone-950 text-white outline-none transition hover:bg-stone-800 focus-visible:ring-2 focus-visible:ring-stone-400 disabled:cursor-not-allowed disabled:bg-stone-200"
                aria-label="Send message"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
