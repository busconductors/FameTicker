import { getTickerMessages } from "@/db";
import TickerForm from "./_components/TickerForm";
import TickerRow from "./_components/TickerRow";

export default async function TickerPage() {
  const messages = await getTickerMessages();

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-dark mb-6" style={{ fontFamily: "var(--font-cormorant-garamond)" }}>
        Breaking Ticker
      </h2>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-text-dark mb-3">Add Message</h3>
        <TickerForm />
      </div>

      <h3 className="text-sm font-medium text-text-dark mb-3">
        Messages ({messages.length})
      </h3>

      {messages.length === 0 ? (
        <p className="text-sm text-text-muted">No ticker messages yet. Add one above.</p>
      ) : (
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium text-text-muted">Message</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-muted w-20">Priority</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-muted w-20">Active</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-muted w-20">Created</th>
                <th className="text-right px-4 py-2.5 font-medium text-text-muted w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <TickerRow key={msg.id} message={msg} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
