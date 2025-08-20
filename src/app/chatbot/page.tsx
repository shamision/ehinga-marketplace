"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { Send, Mic, Image as ImageIcon, Paperclip, Smile, Camera, MoreVertical, Bot, User } from 'lucide-react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  time?: string
}

export default function ChatbotPage() {
  const apiBaseUrl = useMemo(
    () => process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? 'https://e-hinga-chatbot-production.up.railway.app',
    []
  )

  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      content:
        'Welcome to the e‑Hinga assistant. How can I help you today? You can ask about market prices, producer availability, or trading centers.',
      time: '09:25',
    },
  ])

  const [input, setInput] = useState('')

  useEffect(() => {
    // Basic health check (non-blocking)
    const controller = new AbortController()
    const check = async () => {
      try {
        setApiStatus('checking')
        const res = await fetch(`${apiBaseUrl}/health`, { cache: 'no-store', signal: controller.signal })
        setApiStatus(res.ok ? 'online' : 'offline')
      } catch {
        setApiStatus('offline')
      }
    }
    void check()
    return () => controller.abort()
  }, [apiBaseUrl])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isSending) return

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
      time: now,
    }

    const pendingAssistant: ChatMessage = {
      id: `a-${Date.now() + 1}`,
      role: 'assistant',
      content: 'Thinking…',
      time: now,
    }

    setMessages((prev) => [...prev, userMessage, pendingAssistant])
    setInput('')
    setIsSending(true)

    try {
      const res = await fetch(`${apiBaseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      })

      let replyText = ''
      const contentType = res.headers.get('content-type') ?? ''
      if (contentType.includes('application/json')) {
        const data = await res.json()
        // Accept several possible shapes from the API
        replyText =
          data?.reply ??
          data?.message ??
          data?.content ??
          data?.response ??
          data?.text ??
          (typeof data === 'string' ? data : JSON.stringify(data))
      } else {
        // Try to parse text payloads that actually contain JSON
        const raw = await res.text()
        try {
          const asJson = JSON.parse(raw)
          replyText = asJson?.response ?? asJson?.reply ?? asJson?.message ?? asJson?.content ?? raw
        } catch {
          replyText = raw
        }
      }

      if (!res.ok) {
        throw new Error(replyText || 'Request failed')
      }

      setMessages((prev) =>
        prev.map((m) => (m.id === pendingAssistant.id ? { ...m, content: replyText || 'No response' } : m))
      )
    } catch (err: unknown) {
      const fallback = err instanceof Error ? err.message : 'Failed to reach assistant service.'
      setMessages((prev) =>
        prev.map((m) => (m.id === pendingAssistant.id ? { ...m, content: `Error: ${fallback}` } : m))
      )
      setApiStatus('offline')
    } finally {
      setIsSending(false)
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
                    {apiStatus === 'checking' && 'Checking connection…'}
                    {apiStatus === 'online' && 'Online'}
                    {apiStatus === 'offline' && 'Offline'}
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
                const isUser = m.role === 'user'
                return (
                  <div key={m.id} className={isUser ? 'flex justify-end' : 'flex justify-start'}>
                    {isUser ? (
                      <div className="flex items-end gap-3 max-w-[80%]">
                        <div className="rounded-xl bg-blue-600 text-white px-4 py-3 shadow-md">
                          <div className="text-xs opacity-80 mb-1 text-white/80">{m.time}</div>
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</div>
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
                          <div className="text-xs opacity-80 mb-1">{m.time}</div>
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Composer */}
            <div className="px-6 py-4 border-t border-slate-700/60 bg-slate-900/60">
              <form onSubmit={handleSend} className="flex items-center gap-3">
                <Button type="submit" size="icon" className="rounded-full h-11 w-11" disabled={isSending}>
                  <Send className="w-5 h-5" />
                </Button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="...Say something"
                  className="flex-1 px-4 py-2 h-11 rounded-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isSending}
                />
                <div className="flex items-center gap-2 text-slate-300">
                  <button type="button" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button type="button" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Camera className="w-5 h-5" />
                  </button>
                  <button type="button" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button type="button" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button type="button" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


