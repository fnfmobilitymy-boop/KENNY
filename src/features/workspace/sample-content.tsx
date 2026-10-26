/** Deliberately limited formatting: React escapes all text; no HTML, links, images or script execution. */
export function SampleContent({ content }: { content: string }) {
  const sections = content.split(/```/);
  return (
    <div className="sample-content">
      {sections.map((part, index) =>
        index % 2 ? (
          <pre key={index}>
            <code>{part.replace(/^\w*\n/, "")}</code>
          </pre>
        ) : (
          <div key={index}>
            {part.split("\n").map((line, i) =>
              line.startsWith("## ") ? (
                <h3 key={i}>{line.slice(3)}</h3>
              ) : line.startsWith("- ") ? (
                <p className="sample-bullet" key={i}>
                  <span aria-hidden="true">•</span>
                  {line.slice(2)}
                </p>
              ) : line ? (
                <p key={i}>
                  {line
                    .split(/(\*\*[^*]+\*\*)/g)
                    .map((text, j) =>
                      text.startsWith("**") ? (
                        <strong key={j}>{text.slice(2, -2)}</strong>
                      ) : (
                        text
                      ),
                    )}
                </p>
              ) : (
                <div className="sample-paragraph-gap" key={i} />
              ),
            )}
          </div>
        ),
      )}
    </div>
  );
}
