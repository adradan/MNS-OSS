import { Color } from '@/shared/models/Color';
import { getFirestore } from 'firebase-admin/firestore';
import { Card } from '@/shared/models/Card';

class FirestoreDb {
    private firestore;
    private colorList: Record<string, Color> = {};
    private lastColorQuery: Date | undefined;
    constructor() {
        this.firestore = getFirestore();
    }

    async getColors() {
        const currentTimestamp = new Date();
        // Avoid calling db too many times on each call
        if (this.lastColorQuery) {
            const diff =
                currentTimestamp.getTime() - this.lastColorQuery.getTime();
            const HOUR_IN_MS = 3600000;
            if (diff > HOUR_IN_MS) return this.colorList;
        }

        const cardCollection = this.firestore.collection('colors');
        const colors = await cardCollection.get();
        colors.docs.forEach((color) => {
            const data = color.data();
            this.colorList[color.id] = {
                value: data.value,
                displayName: data.displayName,
            };
        });
        this.lastColorQuery = new Date();
        return this.colorList;
    }

    async createCard(card: Card) {
        await this.firestore.collection('cards').add(card);
    }

    async getUserCards(authUid: string) {
        const cards: Card[] = [];
        const query = this.firestore
            .collection('cards')
            .where('author', '==', authUid);
        const cardResults = await query.get();
        cardResults.docs.forEach((card) => {
            const data = card.data() as Card;
            cards.push(data);
        });
        return cards;
    }
}

export default new FirestoreDb();
