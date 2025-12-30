import { TrieNode } from "./TrieNode";

export class ProfileTree {
    public root: TrieNode; // Raiz da árvore

    constructor() {
        this.root = new TrieNode();
    }

    // Método manual de inserção de tokens de interesse [cite: 180]
    public insert(interest: string): void {
        let node = this.root;
        const word = interest.toLowerCase();

        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }
        
        node.isEndOfWord = true;
        node.weight += 1; // Incrementa o peso para tokens frequentes [cite: 196, 209]
    }

    // Coleta todos os interesses para comparação com o catálogo [cite: 194]
    public getAllInterests(): { token: string, weight: number }[] {
        const results: { token: string, weight: number }[] = [];
        this.traverse(this.root, "", results);
        return results;
    }

    private traverse(node: TrieNode, currentWord: string, results: any[]) {
        if (node.isEndOfWord) {
            results.push({ token: currentWord, weight: node.weight });
        }
        node.children.forEach((child, char) => {
            this.traverse(child, currentWord + char, results);
        });
    }
    // src/lib/ProfileTree.ts

public remove(interest: string): void {
    const word = interest.toLowerCase();
    this.removeNode(this.root, word, 0);
}

private removeNode(current: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
        if (!current.isEndOfWord) return false;
        current.isEndOfWord = false;
        current.weight = 0; // Zera a relevância
        return current.children.size === 0;
    }
    const char = word[index];
    const node = current.children.get(char);
    if (!node) return false;

    const shouldDeleteChild = this.removeNode(node, word, index + 1);

    if (shouldDeleteChild) {
        current.children.delete(char);
        return current.children.size === 0 && !current.isEndOfWord;
    }
    return false;
}
}