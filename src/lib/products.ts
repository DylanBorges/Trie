export interface Product {
    id: number;
    name: string;
    category: string;
    tags: string[];
}

export const CATALOG: Product[] = [
    { id: 1, name: "Mouse Gamer Pro", category: "Eletrônicos", tags: ["gamer", "mouse", "rgb"] },
    { id: 2, name: "Tênis Ultra Boost", category: "Calçados", tags: ["tenis", "corrida", "esporte"] },
    { id: 3, name: "Monitor 4K 144hz", category: "Eletrônicos", tags: ["gamer", "monitor", "video"] },
    { id: 4, name: "Camiseta Dry Fit", category: "Roupas", tags: ["esporte", "academia", "roupa"] },
    { id: 5, name: "Teclado Mecânico", category: "Eletrônicos", tags: ["gamer", "teclado", "rgb"] },
];