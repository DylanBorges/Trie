// src/components/TrieVisualizer.tsx
import React from 'react';
import { TrieNode } from '@/lib/TrieNode';

// Definimos exatamente o que o componente espera receber
interface TrieVisualizerProps {
  node: TrieNode | undefined;
  char?: string;
}

export const TrieVisualizer: React.FC<TrieVisualizerProps> = ({ node, char = "Raiz" }) => {
  // 1. Verificação de segurança: essencial para evitar erros de 'undefined' [cite: 9]
  if (!node) return null;

  // 2. Extraímos as entradas garantindo a tipagem para o .map não falhar
  // Convertemos o Map de filhos em um Array de tuplas [caractere, nó]
  const childrenEntries: [string, TrieNode][] = node.children 
    ? Array.from(node.children.entries()) 
    : [];

  return (
    <div className="ml-4 border-l-2 border-indigo-100 pl-4 my-2">
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100">
          {char}
        </span>
        
        {/* Mostra o peso se for o fim de uma palavra (interesse registrado) [cite: 174, 180] */}
        {node.isEndOfWord && (
          <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            PESO: {node.weight}
          </span>
        )}
      </div>

      {/* 3. Renderização Recursiva: O componente chama a si mesmo para cada filho [cite: 17] */}
      <div className="flex flex-col">
        {childrenEntries.map(([childChar, childNode]) => (
          <TrieVisualizer 
            key={childChar} 
            node={childNode} 
            char={childChar} 
          />
        ))}
      </div>
    </div>
  );
};