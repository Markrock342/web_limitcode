"use client";

import { Bot } from "lucide-react";
import { useNovaOracle } from "../store";

export function NovaPersonasPage() {
  const { state, setState } = useNovaOracle();

  function toggle(id: string) {
    setState((s) => ({
      ...s,
      personas: s.personas.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
    }));
  }

  function startEdit(id: string, prompt: string) {
    setState((s) => ({ ...s, editPersonaId: id, draftPrompt: prompt }));
  }

  function savePrompt(id: string) {
    setState((s) => ({
      ...s,
      personas: s.personas.map((p) => (p.id === id ? { ...p, prompt: s.draftPrompt } : p)),
      editPersonaId: null,
      draftPrompt: "",
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-violet-800">Personas</h1>
        <p className="mt-1 text-sm text-slate-600">เปิด/ปิด และแก้ system prompt</p>
      </div>
      <ul className="space-y-3">
        {state.personas.map((p) => (
          <li key={p.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Bot className="size-4 text-violet-600" />
                <p className="font-semibold text-slate-800">{p.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                    p.enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {p.enabled ? "เปิดใช้งาน" : "ปิดอยู่"}
                </button>
                <button
                  type="button"
                  onClick={() => startEdit(p.id, p.prompt)}
                  className="rounded-full bg-violet-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-600"
                >
                  แก้ Prompt
                </button>
              </div>
            </div>
            {state.editPersonaId === p.id ? (
              <div className="mt-3 space-y-2">
                <textarea
                  value={state.draftPrompt}
                  onChange={(e) => setState((s) => ({ ...s, draftPrompt: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-violet-200 bg-violet-50/50 px-3 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-violet-400"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => savePrompt(p.id)}
                    className="rounded-full bg-violet-700 px-3 py-1.5 text-xs font-bold text-white"
                  >
                    บันทึก
                  </button>
                  <button
                    type="button"
                    onClick={() => setState((s) => ({ ...s, editPersonaId: null }))}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2 line-clamp-2 text-xs text-slate-500">{p.prompt}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
