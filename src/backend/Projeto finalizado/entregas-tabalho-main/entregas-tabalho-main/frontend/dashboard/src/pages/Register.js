import { useState } from "react";
import axios from "axios";

export default function Register({ onRegistered, goToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/register", {
        username,
        password,
        role,
      });
      setMsg(res.data.msg);
      setError("");
      setTimeout(() => {
        onRegistered(); // volta pra tela de login
      }, 1500);
    } catch (err) {
      setMsg("");
      setError(err.response?.data?.msg || "Erro ao registrar");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-orange-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Criar Conta</h2>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>

        {msg && <p className="text-green-500 text-center mb-3">{msg}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded transition"
        >
          Cadastrar
        </button>

        <p className="text-center mt-4 text-gray-600">
          Já tem conta?{" "}
          <span
            onClick={goToLogin}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            Faça login
          </span>
        </p>
      </form>
    </div>
  );
}
