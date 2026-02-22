import { useState } from "react";

const apiBase = import.meta.env.VITE_API_BASE_URL as string;

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [info, setInfo] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setInfo("");

    try {
      const resp = await fetch(`${apiBase}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        setStatus("error");
        setInfo(data?.error ?? "Falha ao enviar");
        return;
      }

      setStatus("ok");
      setInfo("Enviado com sucesso.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setInfo("Erro de rede.");
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Formulário</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Nome
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={80}
          />
        </label>

        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            maxLength={254}
          />
        </label>

        <label>
          Mensagem
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            maxLength={2000}
            rows={5}
          />
        </label>

        <button disabled={status === "loading"} type="submit">
          {status === "loading" ? "Enviando..." : "Enviar"}
        </button>

        {info ? <p>{info}</p> : null}
      </form>
    </div>
  );
}
