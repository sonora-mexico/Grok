//#region node_modules/.nitro/vite/services/ssr/assets/focus--nkvlx1D.js
var NICHE_NAME = "Desarrollo personal y motivación";
var BRAND = "MexiSonora";
var PAGE_BIO = "Desarrollo personal y motivación. Carácter, hábitos y criterio. Contexto, no promesa.";
var NETWORKS = [
	{
		id: "instagram",
		name: "Instagram",
		handle: "@mexisonora",
		connected: true,
		format: "Reel vertical"
	},
	{
		id: "youtube",
		name: "YouTube",
		handle: "MexiSonora",
		connected: true,
		format: "Short o video de 60–90 s"
	},
	{
		id: "facebook",
		name: "Facebook",
		handle: "MexiSonora",
		connected: false,
		format: "El mismo guion"
	},
	{
		id: "tiktok",
		name: "TikTok",
		handle: "MexiSonora",
		connected: false,
		format: "El mismo reel"
	},
	{
		id: "threads",
		name: "Threads",
		handle: "MexiSonora",
		connected: false,
		format: "Gancho + cierre"
	},
	{
		id: "x",
		name: "X",
		handle: "MexiSonora",
		connected: false,
		format: "Gancho en una frase"
	}
];
var PRINCIPLES = [
	{
		name: "Paciencia",
		lesson: "esperar sin convertir la espera en ansiedad",
		practice: "Anota el impulso y no actúes en la primera hora. Mañana lo miras otra vez.",
		screen: "ESPERAR TAMBIÉN ES TRABAJO"
	},
	{
		name: "Criterio",
		lesson: "decidir con una frase tuya, no con el ruido del día",
		practice: "Escribe en una línea qué es tuyo y qué es solo un titular. Si no cabe, todavía no decides.",
		screen: "UNA FRASE, O NO ES TUYO"
	},
	{
		name: "Hábitos",
		lesson: "repetir un paso corto cuando no hay ganas",
		practice: "Diez minutos hoy, mal y cortos. Mañana los mismos diez. El ánimo no firma la lista.",
		screen: "EL HÁBITO FIRMA. EL ÁNIMO NO"
	},
	{
		name: "Miedo",
		lesson: "dar el paso chico con el susto todavía encima",
		practice: "Nombra el miedo en voz alta y haz solo la primera pieza. El resto puede esperar.",
		screen: "EL MIEDO SE QUEDA. TÚ AVANZAS"
	},
	{
		name: "Identidad",
		lesson: "portarte como la persona que dices que eres",
		practice: "Elige una conducta de hoy que esa persona no negociaría. Cúmplela antes del anochecer.",
		screen: "NO ES UN ÁNIMO. ES UNA CONDUCTA"
	},
	{
		name: "Disciplina",
		lesson: "cumplir lo acordado aunque nadie esté mirando",
		practice: "Deja el acuerdo por escrito esta noche. Mañana no lo renegocies con el humor.",
		screen: "LO ACORDADO NO SE RENEGOCIA"
	},
	{
		name: "Enfoque",
		lesson: "proteger una sola cosa de todo lo demás",
		practice: "Tacha dos pendientes que pueden esperar y deja uno solo encima de la mesa.",
		screen: "UNA COSA. EL RESTO ESPERA"
	},
	{
		name: "Carácter",
		lesson: "volver mañana sin necesitar un discurso",
		practice: "No busques una frase que te encienda. Haz la repetición pequeña y cierra el día.",
		screen: "MAÑANA, SIN DISCURSO"
	}
];
var MONEY = /oro|plata|inflaci|cripto|d[oó]lar|peso|invers|mercado|bitso|etoro|sat\b|dinero|finanza|bolsa|acci[oó]n|ahorro|deuda|quiebra|bitcoin/i;
var HASHTAGS = [
	"#DesarrolloPersonal",
	"#Motivacion",
	"#MexiSonora",
	"#Habitos",
	"#Mentalidad"
];
function hash(text) {
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) {
		h ^= text.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function chooseSlot(existing) {
	const count = existing.length;
	const nicheCount = existing.filter((item) => item.slot === "nicho").length;
	const preferred = count % 4 === 3 ? "varios" : "nicho";
	if (preferred === "varios" && nicheCount / (count + 1) < .749) return "nicho";
	return preferred;
}
function mixStats(items) {
	const total = items.length;
	const nicho = items.filter((item) => item.slot === "nicho").length;
	return {
		total,
		nicho,
		varios: total - nicho,
		ratio: total === 0 ? 0 : nicho / total
	};
}
function nextSlotLabel(existing) {
	const slot = chooseSlot(existing);
	const place = existing.length % 4 + 1;
	if (slot === "nicho") return `Siguiente cupo: nicho (${place} de 4). Tres de cada cuatro videos son de desarrollo personal.`;
	return `Siguiente cupo: temas varios (${place} de 4). Este se queda en el tema pedido, sin volverlo nicho.`;
}
function clean(topic) {
	const text = topic.trim().replace(/\s+/g, " ");
	return text.length > 0 ? text : "este tema";
}
function lead(topic) {
	const text = clean(topic);
	return text.charAt(0).toUpperCase() + text.slice(1);
}
function soft(topic) {
	return clean(topic).charAt(0).toLowerCase() + clean(topic).slice(1);
}
function moneyNote(topic) {
	if (!MONEY.test(topic)) return null;
	return "No es consejo de inversión ni asesoría. Contexto, no promesa.";
}
function quotaNote(existingCount, slot) {
	const place = existingCount % 4 + 1;
	if (slot === "nicho") return `Cupo ${place} de 4. Entra al 75%: el video es de desarrollo personal y motivación. El tema pedido solo es el espejo.`;
	return `Cupo ${place} de 4. Entra al 25% de temas varios. El video trata el tema pedido, no desarrollo personal.`;
}
function compose(requested, slot, salt, existingCount) {
	const topic = clean(requested);
	const principle = PRINCIPLES[(hash(topic) + salt) % PRINCIPLES.length];
	const variant = salt % 3;
	const disclaimer = moneyNote(topic);
	const note = quotaNote(existingCount, slot);
	if (slot === "nicho") return nicheDraft(topic, principle, variant, note, disclaimer);
	return variousDraft(topic, variant, note, disclaimer);
}
function nicheDraft(topic, principle, variant, quotaNoteText, disclaimer) {
	const titles = [
		`${lead(topic)} no es el tema. ${principle.name} sí.`,
		`Lo que ${soft(topic)} le pide a tu ${principle.name.toLowerCase()}`,
		`${principle.name}, con ${soft(topic)} de espejo`
	];
	const hooks = [
		`${lead(topic)} puede ser el pretexto. El trabajo es ${principle.lesson}.`,
		`No vine a hablar de ${soft(topic)}. Vine a hablar de cómo te portas.`,
		`Si ${soft(topic)} te está moviendo el día, mira la conducta, no el ruido.`
	];
	const title = titles[variant];
	const hook = hooks[variant];
	const beats = [
		{
			label: "Gancho",
			time: "0–4 s",
			spoken: hook,
			screen: principle.screen
		},
		{
			label: "Giro",
			time: "4–18 s",
			spoken: `Esta página no explica ${soft(topic)} para que colecciones datos. Desarrollo personal es ${principle.lesson}. Si el tema se queda en anécdota, el video falló.`,
			screen: principle.name.toUpperCase()
		},
		{
			label: "Práctica",
			time: "18–40 s",
			spoken: principle.practice,
			screen: "HOY, NO EN TEORÍA"
		},
		{
			label: "Cierre",
			time: "40–55 s",
			spoken: `Motivación de un rato no alcanza. ${closeFor(principle.name)} Soy ${BRAND}.`,
			screen: "CARÁCTER, NO PROMESA"
		}
	];
	return pack({
		requested: topic,
		slot: "nicho",
		principle: principle.name,
		title,
		angle: `«${lead(topic)}» entra como espejo. El video es de ${principle.name.toLowerCase()}, dentro de desarrollo personal y motivación. No es una pieza suelta del tema pedido.`,
		quotaNote: quotaNoteText,
		hook,
		beats,
		disclaimer,
		duration: "Reel 35–45 s · YouTube 60–75 s"
	});
}
function variousDraft(topic, variant, quotaNoteText, disclaimer) {
	const titles = [
		lead(topic),
		`Sobre ${soft(topic)}`,
		`${lead(topic)}, tal cual`
	];
	const hooks = [
		`${lead(topic)}.`,
		`Esto es ${soft(topic)}. Nada más.`,
		`${lead(topic)}, tal como se ve.`
	];
	const title = titles[variant];
	const hook = hooks[variant];
	const beats = [
		{
			label: "Gancho",
			time: "0–4 s",
			spoken: hook,
			screen: lead(topic).slice(0, 42)
		},
		{
			label: "Tema",
			time: "4–22 s",
			spoken: `Se ve así, sin adorno: ${soft(topic)}. Luz, ruido o silencio. Nada de consejo.`,
			screen: "SIN ADORNO"
		},
		{
			label: "Detalle",
			time: "22–42 s",
			spoken: "Un plano alcanza. Si le pones una moraleja, ya no es este video.",
			screen: "SIN MORALEJA"
		},
		{
			label: "Cierre",
			time: "42–55 s",
			spoken: `Soy ${BRAND}.`,
			screen: lead(topic)
		}
	];
	return pack({
		requested: topic,
		slot: "varios",
		principle: "Tema vario",
		title,
		angle: `Pieza del 25%. «${lead(topic)}» se graba como tema vario: no se reescribe como desarrollo personal ni como motivación.`,
		quotaNote: quotaNoteText,
		hook,
		beats,
		disclaimer,
		duration: "Reel 35–50 s · YouTube 60–90 s"
	});
}
function pack(input) {
	const spoken = input.beats.map((beat) => beat.spoken).join(" ");
	const tail = input.disclaimer ? `\n\n${input.disclaimer}` : "\n\nContexto, no promesa.";
	const tags = (input.slot === "nicho" ? HASHTAGS : ["#MexiSonora", "#TemaVario"]).join(" ");
	const captionIg = `${input.hook}\n\n${input.beats[2].spoken}\n\n${input.beats[3].spoken}${tail}\n\n${tags}`;
	const captionYt = `${input.title}\n\n${spoken}${tail}\n\n${input.slot === "nicho" ? `Nicho de la página: ${NICHE_NAME}. El 75% de los videos vive ahí.` : "Tema vario. No forma parte del 75% de desarrollo personal."}\n${BRAND}.\n\n${tags}`;
	return {
		...input,
		captionIg,
		captionYt,
		hashtags: input.slot === "nicho" ? [...HASHTAGS] : ["#MexiSonora", "#TemaVario"],
		readAloud: `${spoken}${input.disclaimer ? ` ${input.disclaimer}` : " Contexto, no promesa."}`
	};
}
function closeFor(name) {
	return {
		Paciencia: "La prisa se disfraza de oportunidad.",
		Criterio: "Si no cabe en una frase, todavía no es tuyo.",
		Hábitos: "La motivación es humo. La repetición es la página.",
		Miedo: "El susto puede venir. La decisión ya está tomada.",
		Identidad: "No colecciones frases. Porta la conducta.",
		Disciplina: "Lo que acordaste anoche no se vota por la mañana.",
		Enfoque: "Todo lo demás puede ser cierto y seguir esperando.",
		Carácter: "Volver mañana es el video entero."
	}[name] ?? "Vuelve mañana.";
}
function planDrafts(existing, requested, count, salt) {
	const trail = existing.map((item) => ({ slot: item.slot }));
	const drafts = [];
	for (let index = 0; index < count; index++) {
		const slot = chooseSlot(trail);
		drafts.push(compose(requested, slot, salt + index, trail.length));
		trail.push({ slot });
	}
	return drafts;
}
var NICHE_MIRRORS = [
	"la prisa de la mañana",
	"el mensaje que no contestas",
	"la promesa de anoche",
	"el pendiente que dejas para el lunes",
	"compararte en silencio",
	"el teléfono encima de la mesa",
	"empezar con el susto encima",
	"la hora en que ya no hay ganas",
	"decidir sin pedir permiso",
	"el comentario que te calentó",
	"dejar la tarea a la mitad",
	"la lista que crece y no se cumple",
	"esperar el ánimo para empezar",
	"hablar de más y hacer de menos",
	"el domingo que se esfuma",
	"volver mañana sin discurso"
];
var VARIOUS_TOPICS = [
	"el atardecer sobre el desierto de Sonora",
	"una tortilla en el comal",
	"el calor de Hermosillo a las tres",
	"el mezquite después de la lluvia",
	"el mercado un sábado por la mañana",
	"la carne asada del domingo",
	"una calle de adobe al mediodía",
	"el cielo de Sonora antes de la tormenta",
	"el café de olla en la mañana",
	"la carretera vacía hacia el valle",
	"la sombra bajo un palo verde",
	"el polvo que levanta el viento"
];
function inventTopic(slot, used, salt) {
	const bank = slot === "nicho" ? NICHE_MIRRORS : VARIOUS_TOPICS;
	const taken = new Set(used.map((item) => item.toLowerCase()));
	const fresh = bank.filter((item) => !taken.has(item.toLowerCase()));
	const pool = fresh.length > 0 ? fresh : bank;
	return pool[Math.abs(salt) % pool.length];
}
function dueIdea(existing, salt) {
	const slot = chooseSlot(existing);
	return {
		slot,
		topic: inventTopic(slot, existing.map((item) => item.requested), salt)
	};
}
function planInvented(existing, count, salt) {
	const trail = existing.map((item) => ({
		slot: item.slot,
		requested: item.requested
	}));
	const drafts = [];
	for (let index = 0; index < count; index++) {
		const slot = chooseSlot(trail);
		const topic = inventTopic(slot, trail.map((item) => item.requested), salt + index * 17);
		drafts.push(compose(topic, slot, salt + index, trail.length));
		trail.push({
			slot,
			requested: topic
		});
	}
	return drafts;
}
function firstSentence(text) {
	return (text.split(/(?<=[.!?])\s/)[0] ?? text).trim();
}
function wordCount(text) {
	return text.split(/\s+/).filter(Boolean).length;
}
function corteHablado(draft) {
	const hook = firstSentence(draft.hook).replace(/[.!?]+$/, "");
	const second = firstSentence(draft.slot === "nicho" ? draft.beats[2]?.spoken ?? "" : draft.beats[1]?.spoken ?? "").replace(/[.!?]+$/, "");
	let body = wordCount(`${hook} ${second}`) <= 18 ? `${hook}. ${second}` : hook;
	if (draft.disclaimer && wordCount(body) <= 14) body = `${body}. No es consejo de inversión`;
	return `${body}. Soy ${BRAND}.`;
}
function reelPrompt(draft) {
	const speech = corteHablado(draft).replaceAll("\"", "'");
	const card = (draft.beats[0]?.screen ?? "MEXISONORA").replaceAll("\"", "'");
	if (draft.slot === "varios") return [
		"Vertical photoreal 9:16 documentary short.",
		`The whole image is ${draft.requested}, filmed in Sonora, Mexico, natural late-afternoon light.`,
		"No logos, no watermark, no English, no self-help poster, no smiling influencer.",
		`A calm Mexican male voice, low and adult, speaks only this Spanish, word for word: "${speech}"`,
		"Large cream captions in Spanish appear in sync with that speech.",
		"Last frame, centered cream capitals: MEXISONORA."
	].join(" ");
	return [
		"Vertical photoreal 9:16 short.",
		"A calm Mexican man about 35, short black hair, sand linen shirt, stands by an adobe wall in Hermosillo at late afternoon, dust in warm light.",
		"He looks into the camera. No stock smile, no gym, no neon, no English, no watermark.",
		`He speaks only this Spanish, word for word, in a low serious voice: "${speech}"`,
		`On screen, large cream capital letters read: ${card}.`,
		"Last frame, centered cream capitals: MEXISONORA."
	].join(" ");
}
//#endregion
export { corteHablado as a, nextSlotLabel as c, reelPrompt as d, PAGE_BIO as i, planDrafts as l, NETWORKS as n, dueIdea as o, NICHE_NAME as r, mixStats as s, BRAND as t, planInvented as u };
