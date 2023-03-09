import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import CardEnvelope from '@/shared/components/card-envelope';
import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Card } from '@/shared/models/Card';

function Submit() {
    const authUser = useAuthUser();
    const [color, setColor] = useState('bg-slate-200');
    const availableColors = [
        'bg-white',
        'bg-slate-200',
        'bg-slate-400',
        'bg-red-200',
        'bg-red-400',
        'bg-pink-400',
        'bg-red-500',
        'bg-sky-300',
        'bg-sky-500',
    ];
    let placeholderColor = '';
    if (color == 'bg-slate-400')
        placeholderColor = 'placeholder:text-slate-100';

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        sendTo: Yup.string().max(12, 'Too long!').trim().required(),
        message: Yup.string().max(120, 'Too long!').trim().required(),
        color: Yup.string().lowercase().required(),
    });

    const submitCard = async (values: Card, helpers: FormikHelpers<Card>) => {
        const author = authUser.id;
        const newCard = {
            ...values,
            author,
        };
        const resp = await fetch('/api/cards', {
            method: 'POST',
            headers: {
                Authorization: (await authUser.getIdToken()) || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCard),
        });
        if (resp.status == 200) {
            helpers.resetForm();
            setColor('bg-slate-200');
            helpers.setFieldValue('color', 'bg-slate-200');
        }
    };

    return (
        <div className="w-100 h-100 p-4">
            <div className="w-100 title-text text-center">
                submit a message.
            </div>
            <div className="m-4 flex justify-around">
                <Formik
                    initialValues={
                        {
                            sendTo: '',
                            message: '',
                            color: 'bg-slate-200',
                        } as Card
                    }
                    onSubmit={(values, helpers) => {
                        submitCard(values, helpers);
                    }}
                    validationSchema={validationSchema}
                >
                    {(props) => (
                        <Form>
                            {/* Card */}
                            <div className="flex flex-col items-center">
                                <div className="flex h-72 w-72 flex-col border-2 border-solid border-black p-2">
                                    {/* Card Header */}
                                    <div className="flex">
                                        <CardEnvelope />
                                        <div className="flex px-2 pt-1 font-medium">
                                            <div className="cursor-default select-none pr-1">
                                                To:
                                            </div>
                                            <Field
                                                name="sendTo"
                                                placeholder="enter a name."
                                                maxLength={12}
                                            />
                                        </div>
                                    </div>
                                    {/* Message */}
                                    <div className={'my-1 grow p-3 ' + color}>
                                        <Field
                                            as="textarea"
                                            className={
                                                'h-100 w-100 resize-none overflow-hidden bg-inherit font-medium focus:outline-none ' +
                                                placeholderColor
                                            }
                                            name="message"
                                            placeholder="write your message."
                                            maxLength={120}
                                        />
                                    </div>
                                    {/* Footer */}
                                    <div className="flex justify-between">
                                        <div className="font-bold">
                                            <button
                                                onClick={() => router.push('/')}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="font-bold">
                                            <button
                                                disabled={!props.isValid}
                                                className={
                                                    (props.isValid
                                                        ? 'text-black'
                                                        : 'text-slate-200') +
                                                    ' select-none '
                                                }
                                                type="submit"
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-2">
                                <div className="mb-1 font-medium">
                                    pick a color.
                                </div>
                                <div>
                                    {availableColors.map((color) => (
                                        <button
                                            key={color}
                                            className={
                                                color + ' color-option border-2'
                                            }
                                            value={color}
                                            onClick={() => {
                                                props.setFieldValue(
                                                    'color',
                                                    color
                                                );
                                                setColor(color);
                                            }}
                                            type="button"
                                        />
                                    ))}
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default withAuthUser({
    whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    authPageURL: '/login',
})(Submit);
