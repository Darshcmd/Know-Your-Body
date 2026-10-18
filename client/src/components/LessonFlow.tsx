import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LessonHeader from "./LessonHeader";
import {
  pathById,
  buildSummary,
  sourceById,
  LearningPath,
  FlowNode,
  Source,
} from "../data/lessons";
import { recordCorrect } from "../lib/scoreboard";

const LessonFlow = () => {
    const { pathId } = useParams<{ pathId: string }>();
    const nav = useNavigate();

    const [nodeIndex, setNodeIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // Reset selection when moving to a new node
    useEffect(() => {
        setSelectedOptionId(null);
        setShowFeedback(false);
    }, [nodeIndex]);

    const path: LearningPath | undefined = pathId ? pathById(pathId) : undefined;
    if (!path) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <h1 className="text-3xl font-bold text-ink-700 mb-4">Topic not found</h1>
                <button
                    onClick={() => nav("/topics")}
                    className="landing-button landing-button__login mt-4"
                >
                    Choose a topic
                </button>
            </div>
        );
    }

    const node: FlowNode | undefined = path.nodes[nodeIndex];
    const isLast = nodeIndex === path.nodes.length - 1;

    const selectedOption =
        node?.kind === "question" && selectedOptionId
            ? node.options?.find((o) => o.id === selectedOptionId)
            : undefined;

    const resolveNextId = (): string | undefined => {
        if (!node) return undefined;
        if (typeof node.next === "string") return node.next;
        if (typeof node.next === "object" && node.next !== null && selectedOptionId) {
            return (node.next as Record<string, string>)[selectedOptionId];
        }
        return undefined;
    };

    const goToNode = (targetId: string) => {
        const nextIndex = path.nodes.findIndex((n) => n.id === targetId);
        if (nextIndex >= 0) {
            setNodeIndex(nextIndex);
        }
    };

    const handleContinue = () => {
        if (node?.kind === "question" && !selectedOptionId) return;
        const nextId = resolveNextId();
        if (nextId) {
            goToNode(nextId);
        } else {
            const nextIndex = nodeIndex + 1;
            if (nextIndex < path.nodes.length) setNodeIndex(nextIndex);
        }
    };

    const handleBack = () => {
        if (nodeIndex > 0) setNodeIndex(nodeIndex - 1);
    };

    const handleSelect = (id: string) => {
        setSelectedOptionId(id);
        setShowFeedback(true);
        const chosen =
            node?.kind === "question" ? node.options?.find((o) => o.id === id) : undefined;
        if (chosen?.classification === "correct" && path && node) {
            recordCorrect(path.id, node.id);
        }
    };

    const restart = () => {
        setNodeIndex(0);
        setSelectedOptionId(null);
        setShowFeedback(false);
    };

    const classificationColor = (classification: string) => {
        switch (classification) {
            case "correct": return "text-green-700 bg-green-100 border-green-300";
            case "incomplete": return "text-amber-700 bg-amber-50 border-amber-200";
            case "misconception": return "text-rose-700 bg-rose-50 border-rose-200";
            default: return "text-ink-700 bg-cream border-ink-200";
        }
    };

    if (!node) return null;
    // ---------- COMPLETION SCREEN (Screen G) ----------
    if (node.kind === "completion") {
        const summary = buildSummary(path.id);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <h1 className="text-3xl font-bold text-ink-700 mb-2">{node.title}</h1>
                <p className="text-ink-700 mb-8">
                    You've explored "{path.title}". Here is what you learned.
                </p>

                <div className="w-full max-w-lg mb-8">
                    <h2 className="text-xl font-bold text-ink-700 mb-3 text-left">Key takeaways</h2>
                    <ul className="text-left text-ink-700 space-y-3">
                        {(summary?.takeaways ?? []).map((t, i) => (
                            <li key={i} className="flex gap-2">
                                <span className="flex-shrink-0 text-rust-600 font-bold">✓</span>
                                <span>{t}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full max-w-lg mb-8">
                    <h2 className="text-xl font-bold text-ink-700 mb-3 text-left">Sources & further reading</h2>
                    <ul className="text-left space-y-3">
                        {(summary?.sources ?? []).map((s: Source) => (
                            <li key={s.id} className="text-sm">
                                <a
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-rust-600 hover:underline hover:text-rust-700"
                                >
                                    {s.title} ({s.year})
                                </a>
                                <p className="text-xs text-ink-600 mt-1">{s.authorOrOrg}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs text-ink-500 mt-4">
                        This content is educational and is not medical advice. Please discuss
                        personal health decisions with a qualified healthcare professional.
                    </p>
                </div>

                <div className="flex gap-4 justify-center">
                    <button onClick={() => nav("/scoreboard")} className="landing-button landing-button__login">
                        View scoreboard
                    </button>
                    <button onClick={() => nav("/topics")} className="landing-button landing-button__login">
                        Explore another topic
                    </button>
                    <button onClick={restart} className="landing-button" style={{ backgroundColor: "var(--steer-clay)", color: "#351D1D" }}>
                        Restart this topic
                    </button>
                </div>
            </div>
        );
    }

    // ---------- QUESTION / LESSON SCREENS (Screens C, D, E, F) ----------
    return (
        <div className="flex flex-col min-h-screen p-4 md:p-8">
            <LessonHeader number={nodeIndex + 1} numQuestions={path.nodes.length} />

            <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto">
                <div className="w-full mb-6 text-center">
                    <h2 className="text-2xl font-bold text-ink-700 mb-2">{node.title}</h2>
                    {path.tagline && (
                        <p className="text-sm text-ink-500">{path.tagline}</p>
                    )}
                </div>
                {node.kind === "question" ? (
                    <div className="w-full">
                        <p className="text-xl text-ink-700 font-semibold mb-6 text-center leading-relaxed">
                            {node.question}
                        </p>
                        <div className="space-y-3">
                            {node.options?.map((option) => {
                                const isSelected = selectedOptionId === option.id;
                                const isDisabled = showFeedback;
                                const base =
                                    "w-full px-6 py-4 rounded-lg border text-xl font-medium text-left transition-all text-ink-700";
                                const selectedCls = isSelected
                                    ? "border-rust-500 bg-rust-50"
                                    : "border-ink-200 bg-white hover:border-clay-300 hover:bg-cream";
                                const disabledCls = isDisabled && !isSelected ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => !isDisabled && handleSelect(option.id)}
                                        disabled={isDisabled}
                                        className={`${base} ${selectedCls} ${disabledCls}`}
                                        aria-pressed={isSelected}
                                    >
                                        {option.text}
                                    </button>
                                );
                            })}
                        </div>

                        {showFeedback && selectedOption && (
                            <div className="mt-6 p-5 rounded-xl border text-left">
                                <div className="flex items-start gap-3 mb-3">
                                    <span className={`flex-shrink-0 font-bold ${classificationColor(selectedOption.classification)}`}>
                                        {selectedOption.classification === "correct"
                                            ? "Correct!"
                                            : selectedOption.classification === "incomplete"
                                            ? "Partially right"
                                            : "Not quite"}
                                    </span>
                                    <p className="text-ink-700 leading-relaxed">{selectedOption.feedback}</p>
                                </div>
                                {node.explanation && (
                                    <div className="mt-4 pt-4 border-t border-ink-100">
                                        <p className="text-sm font-bold text-ink-700 mb-2">The science</p>
                                        <p className="text-ink-700 leading-relaxed">{node.explanation}</p>
                                        {node.sourceId && (
                                            <p className="mt-3">
                                                <a
                                                    href={sourceById(node.sourceId)?.url || "#"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-rust-600 text-sm hover:underline"
                                                >
                                                    View source →
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                )}

                                {node.takeaway && (
                                    <div className="mt-4 pt-3 border-t border-ink-100 bg-cream/50 rounded p-3">
                                        <p className="text-sm font-bold text-ink-700 mb-1">Takeaway</p>
                                        <p className="text-sm text-ink-700">{node.takeaway}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-8 flex justify-between w-full">
                            {nodeIndex > 0 && (
                                <button
                                    onClick={handleBack}
                                    disabled={showFeedback}
                                    className="landing-button" style={{ backgroundColor: "var(--steer-clay)", color: "#351D1D" }}
                                >
                                    Back
                                </button>
                            )}
                            <button
                                onClick={handleContinue}
                                disabled={
                                    node.kind === "question" && (!selectedOptionId || !showFeedback)
                                }
                                className="landing-button landing-button__login"
                            >
                                {showFeedback ? "Continue" : "Check answer"}
                            </button>
                        </div>
                    </div>
                ) : (
                    // ---------- LESSON SCREEN ----------
                    <div className="w-full text-left">
                        {node.body?.map((para, i) => (
                            <p key={i} className="text-ink-700 leading-relaxed mb-5 text-lg">
                                {para}
                            </p>
                        ))}
                        {node.takeaway && (
                            <div className="mt-6 p-4 rounded-lg bg-cream border border-ink-100">
                                <p className="text-sm font-bold text-ink-700 mb-1">Takeaway</p>
                                <p className="text-sm text-ink-700">{node.takeaway}</p>
                            </div>
                        )}
                        {node.sourceId && (
                            <p className="mt-4">
                                <a
                                    href={sourceById(node.sourceId)?.url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-rust-600 text-sm hover:underline"
                                >
                                    View source →
                                </a>
                            </p>
                        )}

                        <div className="mt-10 flex justify-between w-full">
                            {nodeIndex > 0 && (
                                <button
                                    onClick={handleBack}
                                    className="landing-button" style={{ backgroundColor: "var(--steer-clay)", color: "#351D1D" }}
                                >
                                    Back
                                </button>
                            )}
                            <button
                                onClick={handleContinue}
                                className="landing-button landing-button__login"
                            >
                                {isLast ? "Finish" : "Continue"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonFlow;
