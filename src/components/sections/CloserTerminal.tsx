import { useState, useRef, useEffect } from "react";
import { Terminal, X, Send, Shield, Minimize2, Maximize2 } from "lucide-react";
import { Badge } from "../ui/Badge";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface CloserTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CloserTerminal({ isOpen, onClose }: CloserTerminalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "ENCLAVE TERMINAL INITIALIZED // AGENTE CLOSER_NOVATRIA ONLINE. Escriba su consulta de arquitectura o riesgo para iniciar el diagnóstico.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to history
    const updatedMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);
    setIsStreaming(true);

    // Placeholder assistant message
    const assistantIndex = updatedMessages.length;
    setMessages([...updatedMessages, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/closer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.filter((m) => m.role !== "system"),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataContent = line.slice(6);
            if (dataContent === "[DONE]") continue;

            try {
              const parsed = JSON.parse(dataContent);
              const token = parsed.choices?.[0]?.delta?.content || "";
              assistantText += token;
              setMessages((prev) => {
                const next = [...prev];
                next[assistantIndex] = { role: "assistant", content: assistantText };
                return next;
              });
            } catch {
              // Raw text chunk fallback
              assistantText += dataContent;
              setMessages((prev) => {
                const next = [...prev];
                next[assistantIndex] = { role: "assistant", content: assistantText };
                return next;
              });
            }
          }
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error de conexión";
      setMessages((prev) => {
        const next = [...prev];
        next[assistantIndex] = {
          role: "assistant",
          content: `[AVISO DE ENCLAVE]: No fue posible conectar con Ollama local (/api/closer: ${errorMessage}). Asegúrese de tener el runtime local levantado en el puerto 11434 con el modelo qwen2.5 o deepseek-r1.`,
        };
        return next;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-200 shadow-2xl ${
        isMaximized
          ? "inset-4 sm:inset-10"
          : "bottom-4 right-4 w-[95vw] sm:w-[500px] h-[580px] max-h-[85vh]"
      }`}
    >
      <div className="flex h-full flex-col rounded-sm border border-white/[0.12] bg-zinc-950/95 backdrop-blur-2xl specular-card">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-blue-950/80 border border-blue-500/30 text-blue-400">
              <Shield className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-200">
                CLOSER_NOVATRIA // HUD
              </span>
              <span className="ml-2 font-mono text-[9px] text-emerald-400">
                [LOCAL STREAMING]
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
              aria-label="Maximize"
            >
              {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-red-400 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Security Banner */}
        <div className="border-b border-white/[0.04] bg-blue-950/20 px-4 py-1.5 font-mono text-[10px] text-blue-300 flex items-center justify-between">
          <span>Zero-Knowledge Pipeline: Cero logs en disco.</span>
          <Badge variant="cobalt" className="text-[9px] px-1.5 py-0">10 req/min/IP</Badge>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs custom-scrollbar">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`rounded-sm p-3 border ${
                m.role === "user"
                  ? "border-blue-500/30 bg-blue-950/30 text-blue-200 ml-6"
                  : m.role === "system"
                  ? "border-white/[0.04] bg-zinc-900/40 text-zinc-400 text-[11px]"
                  : "border-white/[0.06] bg-zinc-900/70 text-zinc-200 mr-6"
              }`}
            >
              <div className="mb-1 text-[9px] uppercase tracking-widest text-zinc-400">
                {m.role === "user" ? "[OPERADOR]" : m.role === "system" ? "[SISTEMA]" : "[CLOSER_NOVATRIA]"}
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
            </div>
          ))}
          {isStreaming && (
            <div className="flex items-center gap-2 font-mono text-xs text-blue-400 animate-pulse">
              <Terminal className="h-3.5 w-3.5" />
              <span>Inferencia en curso...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Command Bar */}
        <form onSubmit={handleSend} className="border-t border-white/[0.08] p-3 bg-zinc-900/40">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-blue-400 pl-1">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isStreaming}
              placeholder="Describa su problema de arquitectura o infraestructura..."
              className="flex-1 bg-transparent font-mono text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-sm bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-500 transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
