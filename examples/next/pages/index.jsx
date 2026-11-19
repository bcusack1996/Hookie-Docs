import Head from "next/head";
import Form from "../../shared/ReactForm.jsx";

export default function Page() {
  return (
    <>
      <Head><title>Hookie Next.js form</title></Head>
      <Form framework="next" />
    </>
  );
}
