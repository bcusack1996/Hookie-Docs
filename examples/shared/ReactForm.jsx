import React from "react";
import { useHookieForm } from "@hookieai/forms/react";
import { description, endpoint, message, question, topics } from "./demo.mjs";

export default function ReactForm({ framework }) {
  const { submit, status, result } = useHookieForm(endpoint);
  return (
    <main>
      <h1>Send a sample event</h1>
      <p>{description}</p>
      <form action={endpoint} method="post" onSubmit={submit}>
        <input type="hidden" name="framework" value={framework} />
        <input hidden name="_gotcha" />
        <label htmlFor="topic">{question}</label>
        <select id="topic" name="topic">
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
        <button disabled={status === "submitting"}>Send sample</button>
      </form>
      <output aria-live="polite">{result && message(result)}</output>
    </main>
  );
}
