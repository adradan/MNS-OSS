import { Card } from '@/shared/models/Card';
import CardEnvelope from '@/shared/components/card-envelope';

type Props = {
    cardDetails: Card;
}
export default function CardSubmission({ cardDetails }: Props) {
    return (
        <div className="m-4 flex h-72 w-72 flex-col border-2 border-solid border-black p-2">
            <div className="flex">
                <CardEnvelope />
                <div className="flex px-2 pt-1 font-medium">
                    <div className="cursor-default select-none pr-1">To:</div>
                    <div>{cardDetails.sendTo}</div>
                </div>
            </div>
            <div className={'my-1 grow p-3 ' + cardDetails.color}>
                <div className="h-100 w-100 overflow-hidden font-medium">
                    {cardDetails.message}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="font-bold">
                    <div className="select-none">Cancel</div>
                </div>
                <div className="font-bold">
                    <div className="select-none">Send</div>
                </div>
            </div>
        </div>
    );
}
