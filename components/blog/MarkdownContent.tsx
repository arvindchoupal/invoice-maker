import Link from "next/link";

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2];
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return (
          <Link className="font-semibold text-cyan-300 underline-offset-2 hover:underline" href={href} key={index}>
            {link[1]}
          </Link>
        );
      }
      return (
        <a className="font-semibold text-cyan-300 underline-offset-2 hover:underline" href={href} key={index} rel="noreferrer" target="_blank">
          {link[1]}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/);

  return (
    <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-a:text-cyan-300">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith("## ")) {
          return (
            <h2 className="mt-10 text-2xl font-semibold text-white" key={index}>
              {trimmed.slice(3)}
            </h2>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3 className="mt-8 text-xl font-semibold text-white" key={index}>
              {trimmed.slice(4)}
            </h3>
          );
        }

        if (trimmed.startsWith("|")) {
          const rows = trimmed.split("\n").filter((row) => row.trim() && !row.includes("---"));
          return (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10" key={index}>
              <table className="w-full min-w-[480px] text-left text-sm">
                <tbody>
                  {rows.map((row, rowIndex) => {
                    const cells = row.split("|").filter(Boolean).map((cell) => cell.trim());
                    const CellTag = rowIndex === 0 ? "th" : "td";
                    return (
                      <tr className="border-b border-white/10 last:border-0" key={row}>
                        {cells.map((cell, cellIndex) => (
                          <CellTag className={`px-4 py-3 ${rowIndex === 0 ? "font-semibold text-white" : "text-slate-300"}`} key={cellIndex}>
                            {renderInline(cell)}
                          </CellTag>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }

        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").map((line) => line.replace(/^- /, ""));
          return (
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-300" key={index}>
              {items.map((item) => (
                <li key={item}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        if (/^\d+\. /.test(trimmed)) {
          const items = trimmed.split("\n").map((line) => line.replace(/^\d+\. /, ""));
          return (
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-300" key={index}>
              {items.map((item) => (
                <li key={item}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }

        if (trimmed.startsWith("> ")) {
          return (
            <blockquote className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 px-5 py-4 text-slate-200" key={index}>
              {renderInline(trimmed.replace(/^> /gm, ""))}
            </blockquote>
          );
        }

        return (
          <p className="mt-4 text-base leading-8 text-slate-300" key={index}>
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
