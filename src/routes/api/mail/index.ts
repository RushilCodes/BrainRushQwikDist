import { type RequestHandler } from "@builder.io/qwik-city";

const RESEND_API_KEY = import.meta.env.PUBLIC_RESEND_API_KEY;

export const onPost: RequestHandler = async ({ json, request }) => {
  const body = await request.json();

  if (!RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    json(500, { error: "Server misconfiguration" });
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "BrainRush <noreply@brainrush.fun>",
        to: body.email,
        subject: body.subject,
        ...(body.html
          ? { html: body.html }
          : { text: body.text ?? "No content provided" }),
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend error:", errorText);
      json(500, { error: "Failed to send email" });
      return;
    }

    const data = await res.json();
    json(200, { success: true, id: data.id });
  } catch (err) {
    console.error("Unexpected error:", err);
    json(500, { error: "Unexpected error while sending email" });
  }
};
