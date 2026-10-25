import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { d as reelPrompt } from "./focus--nkvlx1D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produce-DubFMLk_.js
function clip(value, max) {
	return String(value ?? "").trim().slice(0, max);
}
var startReel_createServerFn_handler = createServerRpc({
	id: "6b282cdf0318c9f7e9123bd598d3ce1d465aaa1a1b8c399601e86f44b8ecf5ea",
	name: "startReel",
	filename: "src/lib/produce.ts"
}, (opts) => startReel.__executeServer(opts));
var startReel = createServerFn({ method: "POST" }).validator((input) => {
	const slot = input?.slot;
	if (slot !== "nicho" && slot !== "varios") throw new Error("Cupo inválido.");
	const requested = clip(input.requested, 180);
	if (requested.length < 2) throw new Error("Falta el tema del video.");
	return {
		slot,
		requested,
		title: clip(input.title, 180),
		hook: clip(input.hook, 400),
		card: clip(input.card, 80),
		scene: clip(input.scene, 400),
		practice: clip(input.practice, 400),
		disclaimer: input.disclaimer ? clip(input.disclaimer, 180) : null
	};
}).handler(startReel_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "El rodaje no está disponible en esta sala."
	};
	const prompt = reelPrompt({
		slot: data.slot,
		requested: data.requested,
		hook: data.hook,
		disclaimer: data.disclaimer,
		beats: [
			{
				label: "Gancho",
				time: "0–4 s",
				spoken: data.hook,
				screen: data.card || "MEXISONORA"
			},
			{
				label: "Tema",
				time: "4–18 s",
				spoken: data.scene,
				screen: ""
			},
			{
				label: "Práctica",
				time: "18–40 s",
				spoken: data.practice,
				screen: ""
			},
			{
				label: "Cierre",
				time: "40–55 s",
				spoken: "Soy MexiSonora.",
				screen: "MEXISONORA"
			}
		]
	});
	const res = await fetch("https://api.x.ai/v1/videos/generations", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		signal: AbortSignal.timeout(45e3),
		body: JSON.stringify({
			model: "grok-imagine-video-1.5",
			prompt,
			duration: 8,
			aspect_ratio: "9:16",
			resolution: "720p",
			generate_audio: true
		})
	});
	if (!res.ok) return {
		ok: false,
		error: await failureText(res)
	};
	const requestId = (await res.json()).request_id?.trim() ?? "";
	if (!requestId) return {
		ok: false,
		error: "El rodaje no devolvió un pedido. El guion queda."
	};
	return {
		ok: true,
		requestId
	};
});
var pollReel_createServerFn_handler = createServerRpc({
	id: "9202382f7162cc50f2856b96e8b4b18cca737fca88d77d9ebbb2e9a22fca3ee9",
	name: "pollReel",
	filename: "src/lib/produce.ts"
}, (opts) => pollReel.__executeServer(opts));
var pollReel = createServerFn({ method: "POST" }).validator((input) => {
	const requestId = clip(input?.requestId, 80);
	if (!/^[a-zA-Z0-9-]{8,80}$/.test(requestId)) throw new Error("Pedido inválido.");
	return { requestId };
}).handler(pollReel_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		status: "fallo",
		error: "El rodaje no está disponible."
	};
	const res = await fetch(`https://api.x.ai/v1/videos/${data.requestId}`, {
		headers: { Authorization: `Bearer ${apiKey}` },
		signal: AbortSignal.timeout(2e4)
	});
	if (res.status === 404) return {
		status: "fallo",
		error: "Ese rodaje ya no está en cola."
	};
	if (!res.ok) {
		if (res.status === 429 || res.status >= 500) return { status: "rodando" };
		return {
			status: "fallo",
			error: await failureText(res)
		};
	}
	const body = await res.json();
	const status = (body.status ?? "").toLowerCase();
	const videoUrl = body.video?.url?.trim() ?? "";
	if (videoUrl && (status === "done" || status === "completed" || status === "succeeded" || status === "")) return {
		status: "listo",
		videoUrl
	};
	if (status === "failed" || status === "error" || status === "expired" || status === "cancelled") return {
		status: "fallo",
		error: (typeof body.error === "string" ? body.error : body.error?.message ?? body.message ?? "El rodaje no se completó.").slice(0, 180)
	};
	return { status: "rodando" };
});
async function failureText(res) {
	if (res.status === 402) return "No hay crédito de video. El guion queda listo; el corte se rueda cuando la cuenta tenga saldo.";
	if (res.status === 429) return "La sala está ocupada. El guion queda. Intenta el video en un momento.";
	if (res.status === 401 || res.status === 403) return "El rodaje no tiene permiso en esta sala.";
	return "No se pudo rodar el video. El guion queda en la cola.";
}
//#endregion
export { pollReel_createServerFn_handler, startReel_createServerFn_handler };
