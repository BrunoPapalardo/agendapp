"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // Inicia o carregamento
    setErrorMessage(""); // Reseta a mensagem de erro antes de tentar o login

    // Chama o signIn do NextAuth
    const result = await signIn("credentials", { email, password, redirect: false });

    console.log("Resultado do signIn:", result); // Para depuração

    setLoading(false); // Finaliza o carregamento

    // Se houver erro, exibe
    if (result?.error) {
      setErrorMessage("Erro ao fazer login: " + result.error);
    } else {
      // Redireciona apenas se não houver erro
      window.location.href = "/"; // Redireciona após login bem-sucedido
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Exibe erro na tela */}
    </form>
  );
}
