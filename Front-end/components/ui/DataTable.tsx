"use client";

import { ReactNode } from "react";

interface Column<T> {
  key: keyof T;
  title: string;
  render?: (value: unknown, row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function DataTable<T extends { id: number }>({
  columns,
  data,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-zinc-100 dark:bg-zinc-800">

            <tr>

              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-200"
                >
                  {column.title}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>

                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-zinc-500"
                >
                  {emptyMessage}
                </td>

              </tr>

            ) : (

              data.map((row) => (

                <tr
                  key={row.id}
                  className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >

                  {columns.map((column) => (

                    <td
                      key={String(column.key)}
                      className="px-6 py-4 text-sm text-zinc-700 dark:text-zinc-200"
                    >

                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] ?? "")}

                    </td>

                  ))}

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}