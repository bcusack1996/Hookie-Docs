<script setup>
import { ref } from "vue";
import { submitForm } from "@hookieai/forms";
import { description, endpoint, message, question, topics } from "../shared/demo.mjs";
const sending = ref(false),
  receipt = ref("");
async function send(event) {
  sending.value = true;
  try {
    receipt.value = message(await submitForm(endpoint, new FormData(event.currentTarget)));
  } finally {
    sending.value = false;
  }
}
</script>
<template>
  <main>
    <h1>Send a sample event</h1>
    <p>{{ description }}</p>
    <form :action="endpoint" method="post" @submit.prevent="send">
      <input type="hidden" name="framework" value="vue" /><input hidden name="_gotcha" />
      <label for="topic">{{ question }}</label>
      <select id="topic" name="topic">
        <option v-for="topic in topics" :key="topic">{{ topic }}</option>
      </select>
      <button :disabled="sending">Send sample</button>
    </form>
    <output aria-live="polite">{{ receipt }}</output>
  </main>
</template>
