"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Download, Search } from "lucide-react";

export interface Column<T> {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
}

export interface FilterDef<T> {
  label: string;
  options: string[];
  match: (row: T, value: string) => boolean;
}

/**
 * ตารางกลางของระบบ — ค้นหา / กรอง / เรียง / แบ่งหน้า / export placeholder
 */
export function DataTable<T extends { id?: string }>({
  columns,
  rows,
  searchKeys,
  filters,
  pageSize = 10,
  onRowClick,
  footer,
}: {
  columns: Column<T>[];
  rows: T[];
  searchKeys?: (row: T) => string;
  filters?: FilterDef<T>[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
  footer?: ReactNode;
}) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    let out = rows;
    if (q && searchKeys) {
      const needle = q.toLowerCase();
      out = out.filter((r) => searchKeys(r).toLowerCase().includes(needle));
    }
    if (filters) {
      for (const f of filters) {
        const v = filterValues[f.label];
        if (v && v !== "ทั้งหมด") out = out.filter((r) => f.match(r, v));
      }
    }
    if (sortKey) {
      const col = columns.find((c) => c.key === sortKey);
      if (col) {
        const val = col.sortValue ?? ((r: T) => String((r as Record<string, unknown>)[col.key] ?? ""));
        out = [...out].sort((a, b) => {
          const va = val(a);
          const vb = val(b);
          if (typeof va === "number" && typeof vb === "number") return (va - vb) * sortDir;
          return String(va).localeCompare(String(vb), "th") * sortDir;
        });
      }
    }
    return out;
  }, [rows, q, searchKeys, filters, filterValues, sortKey, sortDir, columns]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages - 1);
  const pageRows = filtered.slice(safePage * pageSize, (safePage + 1) * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === 1 ? -1 : 1));
    else {
      setSortKey(key);
      setSortDir(1);
    }
  };

  return (
    <div className="card overflow-hidden">
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
        {searchKeys ? (
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(0);
              }}
              placeholder="ค้นหา..."
              className="input w-56 !py-1.5 pl-8"
            />
          </div>
        ) : null}
        {filters?.map((f) => (
          <select
            key={f.label}
            className="input w-auto !py-1.5"
            value={filterValues[f.label] ?? "ทั้งหมด"}
            onChange={(e) => {
              setFilterValues((v) => ({ ...v, [f.label]: e.target.value }));
              setPage(0);
            }}
          >
            <option>ทั้งหมด</option>
            {f.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] text-slate-400">{filtered.length.toLocaleString()} รายการ</span>
          <button className="btn-ghost !px-2 !py-1.5 text-[11px]" title="Export (demo)">
            <Download size={13} />
            Export
          </button>
        </div>
      </div>

      {/* table */}
      <div className="thin-scroll overflow-x-auto">
        <table className="erp-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={c.align === "right" ? "!text-right" : c.align === "center" ? "!text-center" : ""}
                >
                  {c.sortable ? (
                    <button
                      onClick={() => toggleSort(c.key)}
                      className="inline-flex items-center gap-1 hover:text-brand-600"
                    >
                      {c.label}
                      {sortKey === c.key ? (
                        sortDir === 1 ? (
                          <ArrowUp size={11} />
                        ) : (
                          <ArrowDown size={11} />
                        )
                      ) : (
                        <ArrowUpDown size={11} className="text-slate-300" />
                      )}
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="!py-10 text-center text-slate-400">
                  ไม่พบข้อมูลตามเงื่อนไข
                </td>
              </tr>
            ) : (
              pageRows.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={onRowClick ? "cursor-pointer" : ""}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={
                        c.align === "right"
                          ? "!text-right"
                          : c.align === "center"
                            ? "!text-center"
                            : ""
                      }
                    >
                      {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5">
        <span className="text-[11px] text-slate-400">
          หน้า {safePage + 1} / {pages}
        </span>
        <div className="flex items-center gap-1">
          <button
            className="btn-ghost !p-1.5"
            disabled={safePage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            <ChevronLeft size={15} />
          </button>
          <button
            className="btn-ghost !p-1.5"
            disabled={safePage >= pages - 1}
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
      {footer}
    </div>
  );
}
