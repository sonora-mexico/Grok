import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/polish-DARxpVgX.js
var polishBrief_createServerFn_handler = createServerRpc({
	id: "5bf4ca8e8c743b329dfa9580c6aa8d4b7c792d9a4de54c7db03cca8202e15a51",
	name: "polishBrief",
	filename: "src/lib/polish.ts"
}, (opts) => polishBrief.__executeServer(opts));
var polishBrief = createServerFn({ method: "POST" }).validator((input) => {
	const requested = String(input?.requested ?? "").trim().slice(0, 180);
	if (requested.length < 2) throw new Error("Escribe un tema antes de pulir.");
	if (input?.slot !== "nicho" && input?.slot !== "varios" && input?.slot !== "puente") throw new Error("Cupo inválido.");
	return {
		requested,
		slot: input.slot,
		principle: String(input.principle ?? "").slice(0, 40),
		title: String(input.title ?? "").slice(0, 180),
		readAloud: String(input.readAloud ?? "").slice(0, 2500),
		disclaimer: input.disclaimer ? String(input.disclaimer).slice(0, 180) : null
	};
}).handler(polishBrief_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "La voz de Grok no está disponible en esta sala."
	};
	const slotRule = data.slot === "varios" || data.slot === "puente" ? "Es el 25% de temas varios. El video trata el tema pedido tal cual. Prohibido convertirlo en desarrollo personal o motivación." : "El video ES de desarrollo personal y motivación. El tema pedido solo es un espejo: no des una clase del tema.";
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .6,
			max_tokens: 700,
			response_format: { type: "json_object" },
			messages: [{
				role: "system",
				content: "Eres el editor de Sala VideoIA para MexiSonora. Español de México, frases cortas, sin euforia, sin emojis, sin 'tú puedes con todo'. Nicho fijo de la página: desarrollo personal y motivación. Devuelve solo JSON con las llaves title (string) y lines (array de exactamente 4 strings hablados, en orden: gancho, giro o hecho, práctica o referencia, cierre). El cierre dice Soy MexiSonora. Si el tema toca dinero, oro, cripto o mercados, la última línea incluye: No es consejo de inversión ni asesoría."
			}, {
				role: "user",
				content: `Tema pedido: ${data.requested}
Cupo: ${data.slot}
Principio: ${data.principle}
Título actual: ${data.title}
Borrador: ${data.readAloud}
Regla: ${slotRule}
Reescribe el título y las 4 líneas para que se puedan decir en cámara.`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "No se pudo pulir el guion. El borrador se queda."
	};
	const raw = (await res.json()).choices?.[0]?.message?.content ?? "";
	try {
		const parsed = JSON.parse(raw);
		const lines = Array.isArray(parsed.lines) ? parsed.lines.map((line) => String(line).trim()).filter(Boolean).slice(0, 4) : [];
		if (lines.length !== 4) return {
			ok: false,
			error: "El pulido no cerró las cuatro líneas. Se conserva el borrador."
		};
		return {
			ok: true,
			title: String(parsed.title ?? data.title).trim().slice(0, 180) || data.title,
			lines
		};
	} catch {
		return {
			ok: false,
			error: "El pulido llegó ilegible. Se conserva el borrador."
		};
	}
});
//#endregion
export { polishBrief_createServerFn_handler };
