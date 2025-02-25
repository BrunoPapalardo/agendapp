"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import Header from '../../../components/Header/Header';

const RegisterCompany = () => {
  const router = useRouter();
  const [form, setForm] = useState(
    { 
        name: "", 
        email: "", 
        address: "", 
        category: "", 
        telephone: "",
        cnpj: ""
    });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Atualiza os campos dinamicamente
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "telephone") {
      formattedValue = value.replace(/\D/g, "").slice(0, 11); // Remove tudo que não for número e limita a 11 dígitos
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      } else if (formattedValue.length > 6) {
        formattedValue = formattedValue.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
      } else if (formattedValue.length > 2) {
        formattedValue = formattedValue.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
      }
    }

    setForm({ ...form, [name]: formattedValue });
  };

  // Validação dos campos
  const validateFields = () => {
    if (!form.name || !form.address || !form.category || !form.telephone) {
      return "Todos os campos são obrigatórios!";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return "E-mail inválido!";
    }
    if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(form.telephone)) {
      return "Telefone inválido!";
    }
    return null;
  };

  // Envia o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationError = validateFields();
    if (validationError) return setError(validationError);

    setLoading(true);
    const res = await fetch("/api/register/company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push("/home");
    } else {
      setError(data.message || "Erro ao criar a conta.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <Header/>
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        {/* <h2 className="text-3xl font-bold text-gray-900 text-center">Cadastre seu Estabelecimento</h2> */}
        <h1 className="text-3xl font-bold text-gray-900 text-center">
            <span className="block">Cadastre seu </span>
            <span className="block text-purple-600">Estabelecimento</span>
        </h1>
        <p className="text-gray-600 text-center mt-2">Preencha os campos abaixo:</p>

        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome*</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CNPJ</label>
            <input
              type="text"
              name="name"
              value={form.cnpj}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Endereço*</label>
            <input
              type="text"
              name="name"
              value={form.address}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone*</label>
            <input
              type="text"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
              maxLength={15}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoria*</label>
            <input
              type="text"
              name="telephone"
              value={form.category}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              required
              maxLength={15}
            />
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center items-center px-4 py-3 text-white font-bold rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Cadastrar Estabelecimento"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Preciso de ajuda?{" "}
          <Link href="/contact" className="text-purple-600 hover:underline">
            Entrar em contato
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterCompany;
