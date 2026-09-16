import type { Request, Response } from "express";

const VERIFY_TOKEN = "avolvelabs_whatsapp_token_2211";

export async function facebookWebhookHandler(req: Request, res: Response) {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    return res.status(200).send(String(challenge));
  }

  console.log("Verification failed:", { mode, token });
  return res.sendStatus(403);
}

export async function facebookWebhookPostHandler(req: Request, res: Response) {
  const payload = req.body as {
    entry?: Array<{
      changes?: Array<{
        value?: {
          messages?: Array<unknown>;
          statuses?: Array<unknown>;
        };
      }>;
    }>;
  };

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      for (const message of change.value?.messages ?? []) {
        console.log("WhatsApp message received:", message);
      }

      for (const status of change.value?.statuses ?? []) {
        console.log("WhatsApp message status:", status);
      }
    }
  }

  return res.sendStatus(200);
}

// {
//   "object": "whatsapp_business_account",
//   "entry": [
//     {
//       "id": "102290129340398",
//       "changes": [
//         {
//           "value": {
//             "messaging_product": "whatsapp",
//             "metadata": {
//               "display_phone_number": "15550783881",
//               "phone_number_id": "106540352242922"
//             },
//             "contacts": [
//               {
//                 "profile": {
//                   "name": "Sheena Nelson"
//                 },
//                 "wa_id": "16505551234"
//               }
//             ],
//             "messages": [
//               {
//                 "from": "16505551234",
//                 "id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQTRBNjU5OUFFRTAzODEwMTQ0RgA=",
//                 "timestamp": "1749416383",
//                 "type": "text",
//                 "text": {
//                   "body": "Does it come in another color?"
//                 }
//               }
//             ]
//           },
//           "field": "messages"
//         }
//       ]
//     }
//   ]
// }
