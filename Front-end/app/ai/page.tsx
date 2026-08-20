"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  getAISuggestions,
  sendAIMessage,
} from "../services/ai";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const defaultSuggestions = [
  "Show low stock items",
  "What should I reorder this week?",
  "Summarize today's business",
  "Which products aren't selling?",
  "Show warehouse performance",
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm AIVA, your inventory AI assistant. Ask me anything about your inventory, stock, warehouses, or recommendations.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] =
    useState<string[]>(defaultSuggestions);

  useEffect(() => {
    async function loadSuggestions() {
      try {
        const data = await getAISuggestions();

        if (Array.isArray(data)) {
          setSuggestions(data);
        } else if (Array.isArray(data?.suggestions)) {
          setSuggestions(data.suggestions);
        }
      } catch (error) {
        console.error("Failed to load AI suggestions:", error);
      }
    }

    loadSuggestions();
  }, []);

  const handleSend = async (question?: string) => {
    const message = (question ?? input).trim();

    if (!message || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await sendAIMessage(message);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          result.response ||
          result.error ||
          "I couldn't generate a response. Please try again.",
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("AI request failed:", error);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Unable to connect to AIVA right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="p-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                  <Sparkles size={23} />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-white">
                    AIVA AI Assistant
                  </h1>

                  <p className="text-sm text-zinc-500">
                    AI-powered inventory intelligence
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              {/* Chat */}
              <section className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
                <div className="border-b border-zinc-800 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                      <Bot size={20} />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        AIVA
                      </p>
                      <p className="text-xs text-emerald-400">
                        ● AI Assistant Online
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-5 overflow-y-auto p-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black">
                          <Bot size={17} />
                        </div>
                      )}

                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-white text-black"
                            : "border border-zinc-800 bg-zinc-900 text-zinc-200"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-6">
                          {message.content}
                        </p>

                        {message.role === "assistant" && (
                          <div className="mt-3 flex gap-2 border-t border-zinc-800 pt-2">
                            <button
                              type="button"
                              className="text-zinc-500 transition hover:text-white"
                              title="Helpful"
                            >
                              <ThumbsUp size={14} />
                            </button>

                            <button
                              type="button"
                              className="text-zinc-500 transition hover:text-white"
                              title="Not helpful"
                            >
                              <ThumbsDown size={14} />
                            </button>
                          </div>
                        )}
                      </div>

                      {message.role === "user" && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-white">
                          <User size={17} />
                        </div>
                      )}
                    </div>
                  ))}

                  {loading && (
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
                        <Bot size={17} />
                      </div>

                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-400">
                        AIVA is thinking...
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-zinc-800 p-5">
                  <div className="flex gap-3">
                    <input
                      value={input}
                      onChange={(event) =>
                        setInput(event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSend();
                        }
                      }}
                      placeholder="Ask AIVA about your inventory..."
                      className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
                    />

                    <button
                      type="button"
                      disabled={!input.trim() || loading}
                      onClick={() => handleSend()}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Send size={19} />
                    </button>
                  </div>
                </div>
              </section>

              {/* Suggestions */}
              <aside className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Sparkles
                    size={18}
                    className="text-white"
                  />
                  <h2 className="font-semibold text-white">
                    Suggested Questions
                  </h2>
                </div>

                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion}-${index}`}
                      type="button"
                      disabled={loading}
                      onClick={() => handleSend(suggestion)}
                      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-left text-sm leading-5 text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800 hover:text-white disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-zinc-800 bg-black p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    AIVA can help with
                  </p>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    Low stock, restocking, inventory risks,
                    overstock, warehouse performance and
                    business summaries.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}