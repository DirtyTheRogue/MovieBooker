import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://<TON_BACKEND>/user/login", {
        email,
        password,
      });
      console.log(res.data);
      alert("Connecté !");
      // ici tu peux stocker le token dans localStorage et rediriger si besoin
    } catch (err) {
      setError("Identifiants invalides !");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold text-center">Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        className="border px-4 py-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="border px-4 py-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Se connecter
      </button>
    </form>
  );
}
