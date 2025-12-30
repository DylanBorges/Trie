import { ProfileTree } from "./ProfileTree";
import { CATALOG, Product } from "./products";

export class RecommendationEngine {
    // Sugere produtos baseados na afinidade com a árvore [cite: 195]
    public static suggest(profile: ProfileTree): (Product & { score: number })[] {
        const userInterests = profile.getAllInterests();

        return CATALOG.map(product => {
            let score = 0;
            product.tags.forEach(tag => {
                const match = userInterests.find(i => i.token === tag);
                if (match) {
                    score += match.weight; // Soma o peso da árvore ao score 
                }
            });
            return { ...product, score };
        })
        .filter(p => p.score > 0)
        .sort((a, b) => b.score - a.score); // Ordena por relevância [cite: 196]
    }
}