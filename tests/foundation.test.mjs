import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
function rgb(hex) {
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  return hex
    .match(/\w\w/g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
}
function luminance(hex) {
  const [r, g, b] = rgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
const css = fs.readFileSync("src/design-tokens/tokens.css", "utf8");
for (const [index, block] of css.split("}").slice(0, 2).entries()) {
  const tokens = Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*#([a-f0-9]{3,6})\b/g)].map((m) => [
      m[1],
      m[2],
    ]),
  );
  test(`${index === 0 ? "dark" : "light"} theme: text and status contrast`, () => {
    for (const fg of ["text", "muted", "accent", "pink", "success"])
      for (const bg of ["bg", "surface", "raised"])
        assert.ok(
          contrast(tokens[fg], tokens[bg]) >= 4.5,
          `${fg} on ${bg} must reach 4.5:1`,
        );
  });
  test(`${index === 0 ? "dark" : "light"} theme: gradient button endpoints`, () => {
    const gradient = [
      ...block.matchAll(
        /--gradient:\s*linear-gradient\(\s*115deg,\s*#([a-f0-9]{6}),\s*#([a-f0-9]{6})/g,
      ),
    ][0];
    assert.ok(gradient);
    for (const endpoint of gradient.slice(1))
      assert.ok(contrast(tokens["on-accent"], endpoint) >= 4.5);
  });
}
