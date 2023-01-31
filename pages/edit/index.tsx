import Head from "next/head";
import Form from "../../components/Form";

function Edit() {
    return (
        <>
            <Head>
                <title>Edit pet announcement</title>
            </Head>
            <Form method="POST" />
        </>
    )
}

export default Edit;