import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// propuesta-notify — notifica por Telegram una propuesta cerrada desde el
// formulario del paso 9 de la guía comercial (WHITEMOON-PROPUESTA-COMERCIAL-).
// El lead ya se inserta en leads_web desde el cliente
// (sector='propuesta-comercial', origen='propuesta-comercial'); esta función
// SOLO envía la notificación vía Telegram Bot API, manteniendo el token
// EXCLUSIVAMENTE server-side.
//
// Recibe (POST JSON):
//   { nombre, empresa, cif, pack, telefono, email,
//     direccion, cp, ciudad, provincia, sector, origen }
//
// El cliente llama con navigator.sendBeacon y Content-Type
// "text/plain;charset=UTF-8" (evita el preflight CORS que descarta el POST);
// el body sigue siendo JSON y se parsea igual.
//
// Secrets usados (nunca en cliente):
//   - TELEGRAM_BOT_TOKEN : token del bot de Telegram
//   - TELEGRAM_CHAT_ID   : chat destino del aviso
//
// Regla del proyecto: si el envío falla → console.warn, nunca interrumpe nada.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    payload = {};
  }

  const data = (payload.args ?? payload) as Record<string, unknown>;
  const str = (v: unknown) => String(v ?? "").trim();

  const nombre = str(data.nombre);
  const empresa = str(data.empresa);
  const cif = str(data.cif);
  // `interes` se acepta como alias de `pack`: es el nombre que lleva la
  // columna en leads_web, así que el cliente puede mandar cualquiera de los dos.
  const pack = str(data.pack ?? data.interes);
  const telefono = str(data.telefono);
  const email = str(data.email);
  const direccion = str(data.direccion);
  const cp = str(data.cp);
  const ciudad = str(data.ciudad);
  const provincia = str(data.provincia);
  const sector = str(data.sector) || "propuesta-comercial";
  const origen = str(data.origen) || "propuesta-comercial";

  // Guard de lead incompleto — estándar WhiteMoon.
  // Un lead solo es válido con nombre Y teléfono: sin ambos no se avisa.
  if (!nombre || !telefono) {
    return json({ ok: false, error: "lead incompleto" }, 400);
  }

  const message =
    `🎯 PROPUESTA CERRADA · ${sector}\n` +
    `Contacto: ${nombre}\n` +
    `Empresa: ${empresa || "-"} · CIF: ${cif || "-"}\n` +
    `Pack: ${pack || "-"}\n` +
    `Móvil: ${telefono} · Email: ${email || "-"}\n` +
    `Dirección: ${direccion || "-"}, ${cp} ${ciudad} (${provincia})`;

  let notified = false;
  try {
    const tgToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const tgChat = Deno.env.get("TELEGRAM_CHAT_ID");
    if (tgToken && tgChat) {
      const r = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text: message }),
      });
      notified = r.ok;
      if (!r.ok) {
        console.warn("[propuesta-notify] Telegram falló:", r.status, await r.text());
      }
    } else {
      console.warn("[propuesta-notify] sin TELEGRAM_BOT_TOKEN/CHAT_ID, mensaje:", message);
    }
  } catch (e) {
    console.warn("[propuesta-notify] error enviando Telegram:", e);
  }

  return json({ ok: true, notified });
});
