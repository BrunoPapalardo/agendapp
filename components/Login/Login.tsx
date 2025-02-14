// "use client";

// import { signIn } from "next-auth/react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === "authenticated") {
//       router.push("/home");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return <p>Carregando...</p>;
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage("");

//     const result = await signIn("credentials", { email, password, redirect: false });

//     setLoading(false);

//     if (!result?.ok) {
//       setErrorMessage("E-mail ou senha inválidos!");
//     } else {
//       router.push("/home");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <input
//         type="email"
//         placeholder="E-mail"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Senha"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "Entrando..." : "Entrar"}
//       </button>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//     </form>
//   );
// }