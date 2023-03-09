import {
    collection,
    CollectionReference,
    doc,
    DocumentData,
    documentId,
    Firestore,
    getDocs,
    getFirestore,
    limit,
    query,
    where,
} from '@firebase/firestore';
import { getApp } from '@firebase/app';
import { Card } from '@/shared/models/Card';

class CardsService {
    private static instance: CardsService;
    private readonly firestore: Firestore;
    public cards: Card[] = [];
    private readonly CARD_LIMIT = 15;

    constructor() {
        this.firestore = getFirestore(getApp());
    }

    static getInstance(): CardsService {
        if (!CardsService.instance) {
            CardsService.instance = new CardsService();
        }
        return CardsService.instance;
    }

    async getRandomCards() {
        this.cards = [];
        const cardsCollection = collection(this.firestore, 'cards');
        const randomId = doc(cardsCollection).id;
        const cards = await getDocs(
            query(
                cardsCollection,
                where(documentId(), '>=', randomId),
                limit(this.CARD_LIMIT)
            )
        );
        cards.forEach((card) => {
            const data = card.data() as Card;
            this.cards.push(data);
        });
        if (this.cards.length) {
            return this.cards;
        }
        return await this.getEdgeCase(cardsCollection);
    }

    async getEdgeCase(cardsCollection: CollectionReference<DocumentData>) {
        const randomId = doc(cardsCollection).id;
        const cards = await getDocs(
            query(
                cardsCollection,
                where(documentId(), '<', randomId),
                limit(this.CARD_LIMIT)
            )
        );
        cards.forEach((card) => {
            const data = card.data() as Card;
            this.cards.push(data);
        });
        return this.cards;
    }
}

export default CardsService;
