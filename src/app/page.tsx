"use client";
import { useState } from "react";
import { ProfileTree } from "@/lib/ProfileTree";
import { RecommendationEngine } from "@/lib/RecommendationEngine";
import { TrieVisualizer } from "@/components/TrieVisualizer";

export default function Home() {
    const [tree] = useState(new ProfileTree());
    const [recs, setRecs] = useState<any[]>([]);
    const [key, setKey] = useState(0); // Para forçar atualização visual da árvore

    const simulateAction = (token: string) => {
        tree.insert(token); // Alimenta a árvore com o interesse [cite: 180]
        setRecs(RecommendationEngine.suggest(tree)); // Atualiza recomendações [cite: 193]
        setKey(k => k + 1); // Atualiza visualizador
    };

    return (
        <main className="p-10 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Buscador Inteligente IFPE</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl border">
                        <h2 className="text-xl font-semibold mb-4 text-indigo-600">Simular Comportamento </h2>
                        <div className="flex flex-wrap gap-2">
                            {["gamer", "tenis", "corrida", "monitor", "roupa", "esporte"].map(tag => (
                                <button key={tag} onClick={() => simulateAction(tag)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                    Pesquisar "{tag}"
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border">
                        <h2 className="text-xl font-semibold mb-4 text-indigo-600">Estrutura da Árvore de Perfil [cite: 210]</h2>
                        <div className="max-h-80 overflow-auto bg-white p-4 border rounded-lg shadow-inner">
                            <TrieVisualizer key={key} node={tree.root} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-600">Recomendações [cite: 203]</h2>
                    <div className="space-y-3">
                        {recs.map(p => (
                            <div key={p.id} className="p-4 bg-indigo-50 rounded-lg flex justify-between border border-indigo-100">
                                <div>
                                    <p className="font-bold text-indigo-900">{p.name}</p>
                                    <p className="text-xs text-indigo-400 italic">{p.tags.join(", ")}</p>
                                </div>
                                <span className="text-xl font-black text-indigo-600">{p.score}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}