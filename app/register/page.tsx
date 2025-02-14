// app/register/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Usar o hook `useRouter` do Next.js 13+

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificação simples dos campos
    if (!name || !email || !password || !telephone) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    // Envia os dados para a API de registro
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, telephone }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/login"); // Redireciona para a tela de login após sucesso
    } else {
      setError(data.message || "Erro ao criar a conta.");
    }
  };

  return (
    <div>
      <h1>Registrar Conta</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone</label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
};

export default Register;
