export type ResponsePayload = {
  forgivenessAnswer: "yes" | "wait" | null;
  foodChoices: string[];
};

/**
 * Fires once, quietly, the moment she unlocks the site — before she's
 * answered anything. Uses the same endpoint as sendResponse() so there's
 * only one Formspree form to set up; the "type" field tells them apart
 * in your inbox.
 */
export async function notifySiteOpened(): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (!endpoint) return;

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        type: "site_opened",
        message: "She opened the site.",
        opened_at: new Date().toLocaleString(),
      }),
    });
  } catch {
    // Silent by design — this is a nice-to-know, not critical, so it
    // should never interrupt or announce itself to her either way.
  }
}

/**
 * Sends the collected response to whatever form endpoint is configured via
 * NEXT_PUBLIC_FORM_ENDPOINT (see .env.local.example). If it isn't set,
 * this quietly no-ops so the site still works locally before you've set
 * up collection — the person just won't see anything different either way.
 */
export async function sendResponse(
  payload: ResponsePayload
): Promise<{ sent: boolean }> {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  if (!endpoint) {
    console.warn(
      "NEXT_PUBLIC_FORM_ENDPOINT is not set — response was not sent anywhere. See README.md."
    );
    return { sent: false };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        type: "forgiveness_response",
        forgiveness_answer:
          payload.forgivenessAnswer === "yes"
            ? "Yes ❤️"
            : payload.forgivenessAnswer === "wait"
              ? "I Need Time"
              : "(no answer given)",
        food_choices: payload.foodChoices.length
          ? payload.foodChoices.join(", ")
          : "(nothing selected)",
        submitted_at: new Date().toLocaleString(),
      }),
    });
    return { sent: res.ok };
  } catch {
    return { sent: false };
  }
}
