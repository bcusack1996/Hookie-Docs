<script>
  import { submitForm } from "@hookieai/forms";
  import { description, endpoint, message, question, topics } from "../shared/demo.mjs";
  let sending = $state(false), receipt = $state("");
  async function send(event) {
    event.preventDefault();
    sending = true;
    try { receipt = message(await submitForm(endpoint, new FormData(event.currentTarget))); }
    finally { sending = false; }
  }
</script>
<main><h1>Send a sample event</h1><p>{description}</p>
<form action={endpoint} method="post" onsubmit={send}>
  <input type="hidden" name="framework" value="svelte"><input hidden name="_gotcha">
  <label for="topic">{question}</label>
  <select id="topic" name="topic">{#each topics as topic}<option>{topic}</option>{/each}</select>
  <button disabled={sending}>Send sample</button>
</form><output aria-live="polite">{receipt}</output></main>
