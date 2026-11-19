// Identical endpoint in every fork. Input is restricted on the server as well.
export const endpoint = "https://app.hookie.ai/v1/examples/submit";
export const question = "Which event would you like to receive?";
export const topics = ["order.created", "delivery.sent", "invoice.paid"];
export const description =
  "Send a sample event to the public Hookie demo. Only the framework and event type are accepted.";
export function message(result) {
  return result.ok
    ? `Received. Receipt: ${result.submissionId}`
    : (result.fieldErrors?.topic ?? result.error);
}
