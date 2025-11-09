import { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    nome: "Juliana (Ju)",
    email: "ju@ilonnac.com",
    cargo: "Analista de Dados",
    empresa: "Ilonnac",
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mt-6">
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">
        Meu Perfil 
      </h3>

      <div className="flex items-center gap-6">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ju"
          alt="Avatar"
          className="w-28 h-28 rounded-full border-4 border-pink-400 shadow-md"
        />
        <div>
          <p className="text-xl font-semibold text-gray-800">{user.nome}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">
            {user.cargo} • {user.empresa}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">
          Configurações ⚙️
        </h4>
        <button
          onClick={() => alert("Função de editar perfil em breve! ✨")}
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          Editar Perfil
        </button>
      </div>
    </div>
  );
}
