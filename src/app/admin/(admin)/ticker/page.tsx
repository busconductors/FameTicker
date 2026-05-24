import { getTickerMessages } from "@/db";
import TickerForm from "./_components/TickerForm";
import TickerRow from "./_components/TickerRow";

export default async function TickerPage() {
  const messages = await getTickerMessages();

  return (
    <div className="max-w-6xl">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Ticker</h1>
          <p className="text-sm text-gray-500 mt-1">{messages.length} messages</p>
        </div>
      </div>

      {/* ── Add Message Card ── */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Add Message
        </h2>
        <TickerForm />
      </div>

      {/* ── Messages Table ── */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {messages.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm text-gray-500">No ticker messages yet. Add one above.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Priority
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-24 hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-24 hidden md:table-cell">
                  Created
                </th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <TickerRow key={msg.id} message={msg} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
