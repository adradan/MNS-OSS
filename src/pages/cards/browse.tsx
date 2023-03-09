import { useEffect, useState } from 'react';
import CardsService from '@/shared/services/cards';
import { Card } from '@/shared/models/Card';
import CardSubmission from '@/shared/components/card-submission/card-submission';

function Browse() {
    const [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
        const shuffle = (array: Card[]) => {
            let currIdx = array.length,
                randomIdx;
            while (currIdx != 0) {
                randomIdx = Math.floor(Math.random() * currIdx);
                currIdx--;
                [array[currIdx], array[randomIdx]] = [
                    array[randomIdx],
                    array[currIdx],
                ];
            }
            return array;
        };
        const randomCards = async () => {
            const service = CardsService.getInstance();
            let newCards = await service.getRandomCards();
            if (cards.length || !newCards) return;
            newCards = shuffle(newCards);
            setCards(newCards);
        };
        randomCards();
    }, []);

    return (
        <div className="w-100 h-100 p-4">
            <div className="w-100 title-text mb-6 text-center">
                are these for you?
            </div>
            <div className="flex flex-wrap justify-center">
                {cards.map((card, idx) => (
                    <CardSubmission cardDetails={card} key={idx} />
                ))}
            </div>
        </div>
    );
}

export default Browse;
