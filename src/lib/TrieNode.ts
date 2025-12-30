export class TrieNode {
    // Cada nó tem um Map de filhos (caractere -> próximo nó)
    public children: Map<string, TrieNode>;
    // Marca se uma palavra termina neste nó
    public isEndOfWord: boolean;
    // Peso para medir a relevância/frequência do interesse 
    public weight: number;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.isEndOfWord = false;
        this.weight = 0;
    }
}