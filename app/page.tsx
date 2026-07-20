"use client";

import { useMemo, useState } from "react";

type ToolId = "grammar" | "calculator" | "words" | "characters" | "case" | "password" | "percentage" | "json";
type Tool = { id: ToolId; name: string; description: string; category: string; icon: string; accent: string };

const tools: Tool[] = [
  { id: "grammar", name: "Grammar checker", description: "Catch common writing mistakes and polish your text.", category: "Writing", icon: "✓", accent: "blue" },
  { id: "calculator", name: "Calculator", description: "Handle quick everyday calculations.", category: "Math", icon: "+", accent: "blue" },
  { id: "words", name: "Word counter", description: "Count words, sentences, and reading time instantly.", category: "Writing", icon: "Aa", accent: "coral" },
  { id: "characters", name: "Character counter", description: "Track characters with and without spaces.", category: "Writing", icon: "42", accent: "mint" },
  { id: "case", name: "Case converter", description: "Switch text between six useful letter cases.", category: "Writing", icon: "aA", accent: "lavender" },
  { id: "password", name: "Password generator", description: "Create strong, customizable passwords locally.", category: "Security", icon: "✦", accent: "yellow" },
  { id: "percentage", name: "Percentage calculator", description: "Solve everyday percentage questions quickly.", category: "Math", icon: "%", accent: "blue" },
  { id: "json", name: "JSON formatter", description: "Format, validate, and minify JSON in your browser.", category: "Developer", icon: "{ }", accent: "pink" },
];



export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);

  const filtered = useMemo(() => tools.filter((tool) =>
    (category === "All" || tool.category === category) &&
    `${tool.name} ${tool.description}`.toLowerCase().includes(query.toLowerCase())
  ), [query, category]);

  const launch = (id: ToolId) => {
    setActiveTool(id);
    window.setTimeout(() => document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  return <main className="app-shell" id="top">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">T</span><span>Tiny Tools</span></a><p>Simple tools. Better work.</p><span className="privacy">● Private by default</span></header>
    <div className="app-layout">
      <aside className="sidebar" id="tools">
        <div className="sidebar-head"><span>Toolbox</span><small>{tools.length} tools</small></div>
        <label className="search"><span className="sr-only">Search tools</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tools" /></label>
        <div className="filters">{["All", "Writing", "Math", "Developer", "Security"].map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
        <div className="tool-list">{filtered.map(tool => <button key={tool.id} className={activeTool === tool.id ? "selected" : ""} onClick={() => launch(tool.id)}><span className="list-icon">{tool.icon}</span><span><strong>{tool.name}</strong><small>{tool.category}</small></span><i>›</i></button>)}</div>
      </aside>

      <section className="content">
        <div className="intro"><p className="eyebrow">Free online utilities</p><h1>Get the little things<br />done <span>beautifully.</span></h1><p>Quick, private tools for writing, numbers, passwords, and code. Nothing to install, nothing uploaded.</p></div>
        <section className="grammar-hero" aria-labelledby="grammar-title">
          <div className="feature-head"><span className="feature-icon">✓</span><div><small>Featured tool</small><h2 id="grammar-title">Grammar checker</h2></div><span className="free-pill">Free</span></div>
          <GrammarChecker />
        </section>
        {activeTool && activeTool !== "grammar" && <section className="workspace" id="workspace" aria-live="polite"><div className="workspace-head"><div><p className="eyebrow">Your selected tool</p><h2>{tools.find(t => t.id === activeTool)?.name}</h2></div><button className="close" onClick={() => setActiveTool(null)} aria-label="Close tool">×</button></div><ToolWorkspace id={activeTool} /></section>}
        <div className="benefits"><div><span>01</span><strong>Private</strong><p>Your content stays in your browser.</p></div><div><span>02</span><strong>Instant</strong><p>No accounts or waiting around.</p></div><div><span>03</span><strong>Free</strong><p>Useful tools without a paywall.</p></div></div>
      </section>
    </div>
    <footer><span>© 2026 Tiny Tools</span><span>Made for focused work.</span></footer>
  </main>;
}

function ToolWorkspace({ id }: { id: ToolId }) {
  if (id === "grammar") return <GrammarChecker />;
  if (id === "calculator") return <Calculator />;
  if (id === "words" || id === "characters") return <TextCounter characters={id === "characters"} />;
  if (id === "case") return <CaseConverter />;
  if (id === "password") return <PasswordGenerator />;
  if (id === "percentage") return <PercentageCalculator />;
  return <JsonFormatter />;
}

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);
  const calculate = (a: number, b: number, op: string) => op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : b === 0 ? NaN : a / b;
  const digit = (value: string) => { setDisplay(current => fresh || current === "0" ? value : current + value); setFresh(false); };
  const chooseOperator = (next: string) => { const value = Number(display); if (stored !== null && operator && !fresh) { const result = calculate(stored, value, operator); setStored(result); setDisplay(String(result)); } else setStored(value); setOperator(next); setFresh(true); };
  const equals = () => { if (stored === null || !operator) return; const result = calculate(stored, Number(display), operator); setDisplay(Number.isFinite(result) ? String(Number(result.toFixed(10))) : "Error"); setStored(null); setOperator(null); setFresh(true); };
  const clear = () => { setDisplay("0"); setStored(null); setOperator(null); setFresh(true); };
  const press = (key: string) => { if (/^\d$/.test(key)) digit(key); else if (key === "." && !display.includes(".")) { setDisplay(fresh ? "0." : display + "."); setFresh(false); } else if (["+", "−", "×", "÷"].includes(key)) chooseOperator(key); else if (key === "=") equals(); else if (key === "C") clear(); else if (key === "±") setDisplay(String(Number(display) * -1)); else if (key === "%") setDisplay(String(Number(display) / 100)); };
  const keys = ["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "="];
  return <div className="calculator" onKeyDown={e => { const map: Record<string, string> = { Enter: "=", Escape: "C", "/": "÷", "*": "×", "-": "−" }; const key = map[e.key] || e.key; if (/^\d$/.test(key) || [".", "+", "−", "×", "÷", "=", "C"].includes(key)) { e.preventDefault(); press(key); } }} tabIndex={0} aria-label="Calculator keypad">
    <div className="calculator-screen"><small>{stored !== null && operator ? `${stored} ${operator}` : "Ready"}</small><output aria-live="polite">{display}</output></div>
    <div className="calculator-grid">{keys.map(key => <button key={key} className={`${["÷", "×", "−", "+", "="].includes(key) ? "operator" : ""} ${key === "0" ? "zero" : ""}`} onClick={() => press(key)} aria-label={key === "C" ? "Clear" : key}>{key}</button>)}</div>
  </div>;
}

function GrammarChecker() {
  const [text, setText] = useState("This is a really good tool. it help you write better.");
  const [checked, setChecked] = useState(false);
  const issues = checked ? [
    { find: "really good", replace: "effective", note: "Try a more precise phrase." },
    { find: "it help", replace: "It helps", note: "Capitalize the sentence and match the verb to its subject." },
  ].filter(issue => text.toLowerCase().includes(issue.find.toLowerCase())) : [];
  const apply = (find: string, replace: string) => setText(current => current.replace(new RegExp(find, "i"), replace));
  return <div className="grammar-tool"><label htmlFor="grammar-text">Paste your writing</label><textarea id="grammar-text" value={text} onChange={e => { setText(e.target.value); setChecked(false); }} placeholder="Type or paste text to check..." /><div className="grammar-actions"><span>{text.trim() ? text.trim().split(/\s+/).length : 0} words</span><button onClick={() => setChecked(true)}>Check my writing <span>→</span></button></div>{checked && <div className="suggestions"><div className="suggestion-title"><strong>{issues.length ? `${issues.length} suggestions` : "Looking good"}</strong><span>{issues.length ? "Review the improvements below." : "No common issues found."}</span></div>{issues.map(issue => <div className="suggestion" key={issue.find}><p><del>{issue.find}</del> <span>→</span> <ins>{issue.replace}</ins></p><small>{issue.note}</small><button onClick={() => apply(issue.find, issue.replace)}>Accept</button></div>)}</div>}</div>;
}

function TextCounter({ characters }: { characters: boolean }) {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  return <div className="tool-panel"><label className="field-label" htmlFor="counter-text">Paste or type your text</label><textarea id="counter-text" value={text} onChange={e => setText(e.target.value)} placeholder="Start typing here..." autoFocus />
    <div className="stats"><div><strong>{characters ? text.length : words}</strong><span>{characters ? "Characters" : "Words"}</span></div><div><strong>{characters ? text.replace(/\s/g, "").length : sentences}</strong><span>{characters ? "Without spaces" : "Sentences"}</span></div><div><strong>{Math.max(0, Math.ceil(words / 200))}</strong><span>Min. read</span></div></div></div>;
}

function CaseConverter() {
  const [text, setText] = useState("");
  const title = (s: string) => s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  const sentence = (s: string) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
  return <div className="tool-panel"><label className="field-label" htmlFor="case-text">Your text</label><textarea id="case-text" value={text} onChange={e => setText(e.target.value)} placeholder="Type something to transform..." autoFocus /><div className="action-row"><button onClick={() => setText(text.toUpperCase())}>UPPERCASE</button><button onClick={() => setText(text.toLowerCase())}>lowercase</button><button onClick={() => setText(title(text))}>Title Case</button><button onClick={() => setText(sentence(text))}>Sentence case</button></div></div>;
}

function PasswordGenerator() {
  const [length, setLength] = useState(16); const [symbols, setSymbols] = useState(true); const [password, setPassword] = useState("");
  const generate = () => { const chars = `ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789${symbols ? "!@#$%&*?" : ""}`; const bytes = new Uint32Array(length); crypto.getRandomValues(bytes); setPassword(Array.from(bytes, n => chars[n % chars.length]).join("")); };
  return <div className="tool-panel password-panel"><div className="result-box">{password || "Click generate to begin"}</div><div className="range-row"><label htmlFor="password-length">Length <strong>{length}</strong></label><input id="password-length" type="range" min="8" max="40" value={length} onChange={e => setLength(Number(e.target.value))} /></div><label className="check"><input type="checkbox" checked={symbols} onChange={e => setSymbols(e.target.checked)} /> Include symbols</label><button className="generate" onClick={generate}>Generate secure password ✦</button></div>;
}

function PercentageCalculator() {
  const [percent, setPercent] = useState("20"); const [value, setValue] = useState("150"); const answer = (Number(percent) / 100) * Number(value);
  return <div className="tool-panel"><div className="formula"><label><span>What is</span><input aria-label="Percentage" type="number" value={percent} onChange={e => setPercent(e.target.value)} /><span>% of</span><input aria-label="Value" type="number" value={value} onChange={e => setValue(e.target.value)} /><span>?</span></label></div><div className="answer"><span>Answer</span><strong>{Number.isFinite(answer) ? answer.toLocaleString(undefined, { maximumFractionDigits: 4 }) : "—"}</strong></div></div>;
}

function JsonFormatter() {
  const [input, setInput] = useState('{"tiny":true,"tools":["fast","private","free"]}'); const [output, setOutput] = useState(""); const [error, setError] = useState("");
  const transform = (minify = false) => { try { setOutput(JSON.stringify(JSON.parse(input), null, minify ? 0 : 2)); setError(""); } catch { setError("That JSON isn't valid yet. Check commas, quotes, and brackets."); setOutput(""); } };
  const copyOutput = () => { if (output) navigator.clipboard.writeText(output); };
  return <div className="tool-panel json-panel"><div className="json-columns"><label><span className="field-label">Input</span><textarea value={input} onChange={e => setInput(e.target.value)} spellCheck={false} /></label><label><span className="field-label">Output</span><textarea value={output} readOnly placeholder="Your formatted JSON will appear here." /></label></div>{error && <p className="error" role="alert">{error}</p>}<div className="action-row"><button onClick={() => transform(false)}>Format JSON</button><button onClick={() => transform(true)}>Minify</button><button onClick={copyOutput}>Copy output</button><button onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</button></div></div>;
}