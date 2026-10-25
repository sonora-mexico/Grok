import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as corteHablado, c as nextSlotLabel, i as PAGE_BIO, l as planDrafts, n as NETWORKS, o as dueIdea, r as NICHE_NAME, s as mixStats, t as BRAND, u as planInvented } from "./focus--nkvlx1D.mjs";
import { a as Copy, i as Lock, n as Trash2, o as Clapperboard, r as Sparkles, s as Check } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-KWmrSQVc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
}).handler(createSsrRpc("5bf4ca8e8c743b329dfa9580c6aa8d4b7c792d9a4de54c7db03cca8202e15a51"));
function clip(value, max) {
	return String(value ?? "").trim().slice(0, max);
}
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
}).handler(createSsrRpc("6b282cdf0318c9f7e9123bd598d3ce1d465aaa1a1b8c399601e86f44b8ecf5ea"));
var pollReel = createServerFn({ method: "POST" }).validator((input) => {
	const requestId = clip(input?.requestId, 80);
	if (!/^[a-zA-Z0-9-]{8,80}$/.test(requestId)) throw new Error("Pedido inválido.");
	return { requestId };
}).handler(createSsrRpc("9202382f7162cc50f2856b96e8b4b18cca737fca88d77d9ebbb2e9a22fca3ee9"));
function withSpoken(brief, title, lines) {
	const beats = brief.beats.map((beat, index) => ({
		...beat,
		spoken: lines[index]?.trim() || beat.spoken
	}));
	const hook = beats[0]?.spoken ?? brief.hook;
	const spoken = beats.map((beat) => beat.spoken).join(" ");
	const tail = brief.disclaimer ? `\n\n${brief.disclaimer}` : "\n\nContexto, no promesa.";
	const tags = brief.hashtags.join(" ");
	return {
		...brief,
		title: title.trim() || brief.title,
		hook,
		beats,
		readAloud: `${spoken}${brief.disclaimer ? ` ${brief.disclaimer}` : " Contexto, no promesa."}`,
		captionIg: `${hook}\n\n${beats[2]?.spoken ?? ""}\n\n${beats[3]?.spoken ?? ""}${tail}\n\n${tags}`,
		captionYt: `${title.trim() || brief.title}\n\n${spoken}${tail}\n\nNicho de la página: Desarrollo personal y motivación. El 75% de los videos vive ahí.\nMexiSonora.\n\n${tags}`
	};
}
function stamp(drafts) {
	return drafts.map((draft) => ({
		...draft,
		id: crypto.randomUUID(),
		createdAt: Date.now(),
		status: "idea",
		production: null
	}));
}
var useStudio = create()(persist((set, get) => ({
	briefs: [],
	activeId: null,
	focus: (topic, count) => {
		const current = get().briefs;
		const created = stamp(planDrafts(current.map((brief) => ({ slot: brief.slot })), topic, count, Date.now() % 997));
		set({
			briefs: [...current, ...created],
			activeId: created[0]?.id ?? get().activeId
		});
		return created[0]?.id ?? null;
	},
	invent: (count) => {
		const current = get().briefs;
		const created = stamp(planInvented(current.map((brief) => ({
			slot: brief.slot,
			requested: brief.requested
		})), count, current.length * 13 + 3));
		set({
			briefs: [...current, ...created],
			activeId: created[0]?.id ?? get().activeId
		});
		return created[0]?.id ?? null;
	},
	select: (id) => set({ activeId: id }),
	setStatus: (id, status) => set({ briefs: get().briefs.map((brief) => brief.id === id ? {
		...brief,
		status
	} : brief) }),
	setProduction: (id, production) => set({ briefs: get().briefs.map((brief) => brief.id === id ? {
		...brief,
		production
	} : brief) }),
	remove: (id) => {
		const briefs = get().briefs.filter((brief) => brief.id !== id);
		set({
			briefs,
			activeId: get().activeId === id ? briefs.at(-1)?.id ?? null : get().activeId
		});
	},
	applySpoken: (id, title, lines) => set({ briefs: get().briefs.map((brief) => brief.id === id ? withSpoken(brief, title, lines) : brief) })
}), { name: "sala-videoia-nicho-v1" }));
var SUGGESTIONS = [
	"el oro",
	"la inflación",
	"el miedo a empezar",
	"una noticia del día",
	"la disciplina de la mañana",
	"compararte con otros",
	"el dinero de la quincena",
	"soltar un hábito"
];
var STATUS = [
	{
		id: "idea",
		label: "Idea"
	},
	{
		id: "listo",
		label: "Para grabar"
	},
	{
		id: "grabado",
		label: "Video listo"
	}
];
function SalaApp() {
	const briefs = useStudio((state) => state.briefs);
	const activeId = useStudio((state) => state.activeId);
	const focus = useStudio((state) => state.focus);
	const select = useStudio((state) => state.select);
	const setStatus = useStudio((state) => state.setStatus);
	const setProduction = useStudio((state) => state.setProduction);
	const invent = useStudio((state) => state.invent);
	const remove = useStudio((state) => state.remove);
	const applySpoken = useStudio((state) => state.applySpoken);
	const [topic, setTopic] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)("");
	const [bioCopied, setBioCopied] = (0, import_react.useState)(false);
	const [polishing, setPolishing] = (0, import_react.useState)(false);
	const [polishError, setPolishError] = (0, import_react.useState)("");
	const [produceError, setProduceError] = (0, import_react.useState)("");
	const [starting, setStarting] = (0, import_react.useState)(false);
	const [watch, setWatch] = (0, import_react.useState)(0);
	const active = briefs.find((brief) => brief.id === activeId) ?? briefs.at(-1) ?? null;
	const stats = mixStats(briefs);
	const percent = briefs.length === 0 ? 75 : Math.round(stats.ratio * 100);
	const trimmed = topic.trim();
	const salt = briefs.length * 13 + 3;
	const due = dueIdea(briefs.map((brief) => ({
		slot: brief.slot,
		requested: brief.requested
	})), salt);
	const running = briefs.find((brief) => brief.production?.status === "rodando") ?? null;
	(0, import_react.useEffect)(() => {
		if (!active?.id) return;
		document.getElementById("guion-activo")?.scrollIntoView({ block: "start" });
	}, [active?.id]);
	(0, import_react.useEffect)(() => {
		const requestId = running?.production?.requestId;
		const briefId = running?.id;
		if (!requestId || !briefId) return;
		let cancelled = false;
		async function waitForCut() {
			for (let attempt = 0; attempt < 48 && !cancelled; attempt++) {
				await new Promise((resolve) => setTimeout(resolve, attempt === 0 ? 3e3 : 5e3));
				if (cancelled) return;
				try {
					const result = await pollReel({ data: { requestId } });
					if (cancelled) return;
					if (result.status === "listo") {
						setProduction(briefId, {
							requestId,
							status: "listo",
							videoUrl: result.videoUrl,
							error: null
						});
						setStatus(briefId, "grabado");
						return;
					}
					if (result.status === "fallo") {
						setProduction(briefId, {
							requestId,
							status: "fallo",
							videoUrl: null,
							error: result.error
						});
						return;
					}
				} catch {}
			}
		}
		waitForCut();
		return () => {
			cancelled = true;
		};
	}, [
		running?.id,
		running?.production?.requestId,
		setProduction,
		setStatus,
		watch
	]);
	function submit(count) {
		setPolishError("");
		setProduceError("");
		if (trimmed.length >= 2) {
			focus(trimmed, count);
			return;
		}
		invent(count);
	}
	async function produce(existing) {
		if (running || starting) return;
		setPolishError("");
		setProduceError("");
		setStarting(true);
		const brief = existing ?? takeNextBrief();
		if (!brief) {
			setStarting(false);
			return;
		}
		await roll(brief);
		setStarting(false);
	}
	function takeNextBrief() {
		const id = trimmed.length >= 2 ? focus(trimmed, 1) : invent(1);
		if (!id) return null;
		return useStudio.getState().briefs.find((item) => item.id === id) ?? null;
	}
	async function roll(brief) {
		const started = await startReel({ data: {
			slot: brief.slot,
			requested: brief.requested,
			title: brief.title,
			hook: brief.hook,
			card: brief.beats[0]?.screen ?? "MEXISONORA",
			scene: brief.beats[1]?.spoken ?? "",
			practice: brief.beats[2]?.spoken ?? "",
			disclaimer: brief.disclaimer
		} }).catch(() => ({
			ok: false,
			error: "No se pudo pedir el rodaje. El guion queda."
		}));
		if (!started.ok) {
			const failed = {
				requestId: "",
				status: "fallo",
				videoUrl: null,
				error: started.error
			};
			setProduction(brief.id, failed);
			setProduceError(started.error);
			return;
		}
		setProduction(brief.id, {
			requestId: started.requestId,
			status: "rodando",
			videoUrl: null,
			error: null
		});
		setStatus(brief.id, "listo");
	}
	async function copyText(key, value) {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(key);
		} catch {
			setCopied("");
		}
	}
	async function polish(brief) {
		setPolishing(true);
		setPolishError("");
		try {
			const result = await polishBrief({ data: {
				requested: brief.requested,
				slot: brief.slot,
				principle: brief.principle,
				title: brief.title,
				readAloud: brief.readAloud,
				disclaimer: brief.disclaimer
			} });
			if (!result.ok) {
				setPolishError(result.error);
				return;
			}
			applySpoken(brief.id, result.title, result.lines);
		} catch {
			setPolishError("No se pudo pulir. El guion enfocado se queda como está.");
		} finally {
			setPolishing(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-ink text-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-widest text-brass uppercase",
					children: BRAND
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl leading-none text-cream",
					children: "Sala VideoIA"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-sm text-cream-dim",
					children: "La sala idea el cupo que toca, escribe el guion y rueda el corte."
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[18rem_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-line bg-panel p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-brass",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									className: "size-4",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide uppercase",
									children: "Nicho de página"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display mt-3 text-2xl leading-tight text-cream",
								children: NICHE_NAME
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-cream-dim",
								children: PAGE_BIO
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-4 min-h-11 w-full rounded-xl border border-line bg-panel-2 px-3 text-sm text-cream",
								onClick: () => {
									navigator.clipboard.writeText(PAGE_BIO).then(() => {
										setBioCopied(true);
									});
								},
								children: bioCopied ? "Bio copiada" : "Copiar bio para las redes"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-line bg-panel p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-cream-dim uppercase",
								children: "Mezcla"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display mt-2 text-5xl leading-none text-brass",
								children: [percent, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-cream-dim",
								children: briefs.length === 0 ? "Meta: 75% nicho y 25% temas varios." : `${stats.nicho} de nicho · ${stats.varios} varios · ${stats.total} en cola.`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-4 grid grid-cols-4 gap-2",
								children: [
									"N",
									"N",
									"N",
									"V"
								].map((mark, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: mark === "N" ? "rounded-lg bg-brass py-2 text-center text-xs font-semibold text-inktext" : "rounded-lg bg-sage-deep py-2 text-center text-xs font-semibold text-sage",
									children: mark === "N" ? "Nicho" : "Varios"
								}, mark + index))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-cream-dim",
								children: nextSlotLabel(briefs)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-cream-dim",
								children: "El corte de producción dura 8 segundos, vertical, con voz. Descárgalo aquí: el enlace caduca. Buffer sigue guardando el guion cada hora; el archivo hay que pasarlo a mano."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-line bg-panel p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-cream-dim uppercase",
							children: "Redes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 flex flex-col gap-3",
							children: NETWORKS.map((network) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-cream",
									children: network.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-cream-dim",
									children: network.handle
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 rounded-full border border-line px-2 py-1 text-xs text-brass",
									children: network.connected ? "Conectada" : "Misma regla"
								})]
							}, network.id))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-line bg-panel p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-cream",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, {
									className: "size-5 text-terra",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: "El video que toca"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm leading-relaxed text-cream-dim",
								children: "Si dejas el tema en blanco, la sala inventa el que corresponde: tres de nicho y uno de temas varios. Luego escribe el guion y rueda el corte."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-4 flex flex-col gap-3",
								onSubmit: (event) => {
									event.preventDefault();
									produce();
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm text-cream",
										htmlFor: "tema",
										children: "Tema, si ya lo tienes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "tema",
										value: topic,
										onChange: (event) => setTopic(event.target.value),
										placeholder: "O déjalo vacío y la sala lo idea",
										className: "min-h-12 rounded-xl border border-line bg-ink px-4 text-base text-cream outline-none placeholder:text-cream-dim"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-cream-dim",
										children: trimmed.length >= 2 ? `Se produce el tema escrito, en el cupo de ${due.slot === "nicho" ? "nicho" : "temas varios"}.` : `Sin tema, toca ${due.slot === "nicho" ? "nicho" : "varios"}: ${due.topic}.`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2 sm:flex-row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: Boolean(running) || starting,
											className: "min-h-11 rounded-xl bg-terra px-4 text-sm font-semibold text-cream disabled:opacity-50",
											children: starting ? "Pidiendo el rodaje…" : running ? "Hay un video rodando" : "Guionizar y producir"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: Boolean(running) || starting,
											onClick: () => submit(4),
											className: "min-h-11 rounded-xl border border-line bg-panel-2 px-4 text-sm text-cream disabled:opacity-50",
											children: "Solo guiones · tanda de 4"
										})]
									})
								]
							}),
							produceError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-brass",
								children: produceError
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 flex flex-wrap gap-2",
								children: SUGGESTIONS.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setTopic(suggestion),
									className: "min-h-11 rounded-full border border-line px-3 text-sm text-cream-dim",
									children: suggestion
								}) }, suggestion))
							})
						]
					}),
					active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefSheet, {
						brief: active,
						copied,
						polishing,
						polishError,
						onCopy: copyText,
						onPolish: () => void polish(active),
						onProduce: () => void produce(active),
						onConsult: () => setWatch((value) => value + 1),
						rolling: Boolean(running) || starting,
						onStatus: (status) => setStatus(active.id, status),
						onRemove: () => remove(active.id)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-dashed border-line px-5 py-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-cream",
							children: "La cola está vacía."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-lg text-sm leading-relaxed text-cream-dim",
							children: "El primero entra como nicho. La sala puede idearlo sola: desarrollo personal, o un tema vario cuando toca el cuarto."
						})]
					}),
					briefs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Cola de rodaje"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-2",
						children: [...briefs].reverse().map((brief, index) => {
							const number = briefs.length - index;
							const selected = brief.id === active?.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => select(brief.id),
								className: selected ? "flex w-full min-h-11 items-start gap-3 rounded-xl border border-brass bg-panel px-3 py-3 text-left" : "flex w-full min-h-11 items-start gap-3 rounded-xl border border-line bg-panel px-3 py-3 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display w-8 shrink-0 text-lg text-cream-dim",
									children: number
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotMark, { slot: brief.slot }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-cream-dim",
											children: brief.principle
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-sm text-cream",
										children: brief.title
									})]
								})]
							}) }, brief.id);
						})
					})] }) : null
				]
			})]
		})]
	});
}
function ProductionCut({ production, rolling, onProduce, onConsult }) {
	if (production?.status === "listo" && production.videoUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide uppercase",
				children: "Video de producción"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: production.videoUrl,
				controls: true,
				playsInline: true,
				className: "mt-2 aspect-[9/16] w-full max-w-xs rounded-xl bg-ink"
			}, production.videoUrl),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: production.videoUrl,
				target: "_blank",
				rel: "noreferrer",
				className: "mt-3 inline-flex min-h-11 items-center rounded-xl bg-ink px-3 text-sm text-cream",
				children: "Abrir y guardar el video"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-terra-deep",
				children: "Corte vertical con voz. Guárdalo pronto: el enlace es temporal y no se publica solo."
			})
		]
	});
	if (production?.status === "rodando") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 rounded-xl border border-sheet-line bg-cream p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Rodando el corte…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed",
				children: "Puede tardar un par de minutos. El guion ya está. No pidas otro video mientras este sigue."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onConsult,
				className: "mt-3 min-h-11 rounded-xl border border-sheet-line px-3 text-sm",
				children: "Seguir esperando"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5",
		children: [production?.status === "fallo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-sm leading-relaxed text-terra-deep",
			children: production.error
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onProduce,
			disabled: rolling,
			className: "min-h-11 rounded-xl bg-ink px-3 text-sm font-semibold text-cream disabled:opacity-50",
			children: production?.status === "fallo" ? "Volver a rodar este guion" : "Rodar este guion"
		})]
	});
}
function SlotMark({ slot }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: slot === "nicho" ? "rounded-full bg-brass px-2 py-0.5 text-xs font-semibold text-inktext" : "rounded-full bg-sage-deep px-2 py-0.5 text-xs font-semibold text-sage",
		children: slot === "nicho" ? "Nicho 75%" : "Varios 25%"
	});
}
function BriefSheet({ brief, copied, polishing, polishError, rolling, onCopy, onPolish, onProduce, onConsult, onStatus, onRemove }) {
	const production = brief.production ?? null;
	const corte = corteHablado(brief);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: "guion-activo",
		className: "scroll-mt-4 rounded-2xl bg-sheet p-4 text-inktext sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotMark, { slot: brief.slot }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium tracking-wide uppercase text-terra-deep",
					children: brief.principle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-3 text-3xl leading-tight",
				children: brief.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed",
				children: brief.angle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-terra-deep",
				children: brief.quotaNote
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs font-medium tracking-wide uppercase",
				children: "Tema de este video"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: brief.requested
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs font-medium tracking-wide uppercase",
				children: "Corte de 8 segundos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed",
				children: corte
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductionCut, {
				production,
				rolling,
				onProduce,
				onConsult
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 flex flex-col gap-3",
				children: brief.beats.map((beat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-sheet-line bg-cream p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-wide uppercase",
								children: beat.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-terra-deep",
								children: beat.time
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: beat.spoken
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-lg leading-tight",
							children: beat.screen
						})
					]
				}, beat.label))
			}),
			brief.disclaimer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed",
				children: brief.disclaimer
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm",
				children: "Contexto, no promesa."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-terra-deep",
				children: brief.duration
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: STATUS.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onStatus(status.id),
					className: brief.status === status.id ? "min-h-11 rounded-full bg-ink px-3 text-sm text-cream" : "min-h-11 rounded-full border border-sheet-line px-3 text-sm",
					children: brief.status === status.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-3.5",
							"aria-hidden": "true"
						}), status.label]
					}) : status.label
				}, status.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onCopy("guion", brief.readAloud),
						className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-terra px-3 text-sm font-semibold text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							className: "size-4",
							"aria-hidden": "true"
						}), copied === "guion" ? "Guion copiado" : "Copiar guion"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onCopy("ig", brief.captionIg),
						className: "min-h-11 rounded-xl border border-sheet-line px-3 text-sm",
						children: copied === "ig" ? "Instagram copiado" : "Texto de Instagram"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onCopy("yt", brief.captionYt),
						className: "min-h-11 rounded-xl border border-sheet-line px-3 text-sm",
						children: copied === "yt" ? "YouTube copiado" : "Texto de YouTube"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onPolish,
						disabled: polishing,
						className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-sheet-line px-3 text-sm disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "size-4",
							"aria-hidden": "true"
						}), polishing ? "Puliendo…" : "Pulir con Grok"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onRemove,
						className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm text-terra-deep",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							className: "size-4",
							"aria-hidden": "true"
						}), "Quitar"]
					})
				]
			}),
			polishError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-terra-deep",
				children: polishError
			}) : null
		]
	});
}
var SplitComponent = SalaApp;
//#endregion
export { SplitComponent as component };
