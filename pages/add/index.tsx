import Head from 'next/head';
import Form from '../../components/Form';

function Add() {
    return (
        <>
            <Head>
                <title>Add a pet</title>
            </Head>
            <Form method='POST' />
        </>
    )
}

export default Add;