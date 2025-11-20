"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import {
  Send,
  Mic,
  Image as ImageIcon,
  Paperclip,
  Smile,
  Camera,
  MoreVertical,
  Bot,
  User,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time?: string;
}

const CHATBOT_API_URL =
  process.env.NEXT_PUBLIC_CHATBOT_API_URL ??
  "https://ehinga-chatbot-api-k5qcd3bmma-uc.a.run.app";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      role: "assistant",
      content:
        "Welcome to the e‑Hinga assistant. How can I help you today? You can ask about market prices, producer availability, or trading centers.",
      time: "09:25",
    },
    // {
    //   id: "m2",
    //   role: "assistant",
    //   content:
    //     "It looks like you have a lot planned this week. If you are preparing a market report, consider fetching the latest coffee and maize prices.",
    //   time: "09:28",
    // },
    // {
    //   id: "m3",
    //   role: "user",
    //   content: "Could you summarize the latest alerts for Kigali markets?",
    //   time: "09:41",
    // },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function getTimeStamp() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      time: getTimeStamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${CHATBOT_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error(
          `Chatbot request failed (${response.status}). Please try again.`
        );
      }

      const data = await response.json();
      const assistantContent =
        typeof data === "string"
          ? data
          : data?.response ?? data?.message ?? "I could not process that.";

      const assistantMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: assistantContent,
        time: getTimeStamp(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const fallbackMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content:
          "Sorry, I could not contact the chatbot service right now. Please try again in a moment.",
        time: getTimeStamp(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred while contacting the chatbot.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden p-6">
          <div className="h-full max-w-4xl mx-auto rounded-xl bg-slate-800/60 border border-slate-700/60 shadow-sm flex flex-col">
            {/* Chat Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-slate-200">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-100 font-semibold">Assistant</div>
                  <div className="text-xs text-slate-400">
                    Last seen just now
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <MoreVertical className="w-5 h-5" />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-900/40">
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={
                      isUser ? "flex justify-end" : "flex justify-start"
                    }
                  >
                    {isUser ? (
                      <div className="flex items-end gap-3 max-w-[80%]">
                        <div className="rounded-xl bg-blue-600 text-white px-4 py-3 shadow-md">
                          <div className="text-xs opacity-80 mb-1 text-white/80">
                            {m.time}
                          </div>
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {m.content}
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <User className="w-4 h-4" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-end gap-3 max-w-[80%]">
                        <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-200">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="rounded-xl bg-slate-800 text-slate-100 px-4 py-3 border border-slate-700/60 shadow-md">
                          <div className="text-xs opacity-80 mb-1">
                            {m.time}
                          </div>
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {m.content}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <div className="px-6 py-4 border-t border-slate-700/60 bg-slate-900/60">
              {error && (
                <div className="mb-2 text-sm text-red-400">{error}</div>
              )}
              {isLoading && !error && (
                <div className="mb-2 text-xs text-slate-400">
                  Assistant is typing…
                </div>
              )}
              <form onSubmit={handleSend} className="flex items-center gap-3">
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full h-11 w-11"
                  disabled={isLoading}
                >
                  <Send className="w-5 h-5" />
                </Button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="...Say something"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 h-11 rounded-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60"
                />
                <div className="flex items-center gap-2 text-slate-300">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
