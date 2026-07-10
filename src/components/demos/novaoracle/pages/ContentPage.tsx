"use client";

import { Plus } from "lucide-react";
import { useNovaOracle } from "../store";

export function NovaContentPage() {
  const { state, setState } = useNovaOracle();

  function createArticle() {
    const title = state.newTitle.trim();
    if (!title) return;
    setState((s) => ({
      ...s,
      articles: [{ id: `a${Date.now()}`, title, status: "draft" }, ...s.articles],
      newTitle: "",
    }));
  }

  function toggleStatus(id: string) {
    setState((s) => ({
      ...s,
      articles: s.articles.map((a) =>
        a.id === id ? { ...a, status: a.status === "draft" ? "published" : "draft" } : a,
      ),
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-violet-800">คอนเทนต์ CMS</h1>
        <p className="mt-1 text-sm text-slate-600">สร้าง Draft และสลับสถานะเผยแพร่</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <input
          value={state.newTitle}
          onChange={(e) => setState((s) => ({ ...s, newTitle: e.target.value }))}
          placeholder="ชื่อบทความใหม่…"
          className="min-w-[12rem] flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-violet-400"
        />
        <button
          type="button"
          onClick={createArticle}
          className="inline-flex items-center gap-1 rounded-full bg-violet-700 px-4 py-2 text-xs font-bold text-white hover:bg-violet-600"
        >
          <Plus className="size-3.5" /> สร้าง Draft
        </button>
      </div>
      <ul className="space-y-3">
        {state.articles.map((a) => (
          <li
            key={a.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="font-semibold text-slate-800">{a.title}</p>
            <button
              type="button"
              onClick={() => toggleStatus(a.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                a.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"
              }`}
            >
              {a.status === "published" ? "Published" : "Draft"} · สลับ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
