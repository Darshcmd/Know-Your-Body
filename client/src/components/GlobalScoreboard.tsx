import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../data/lessons";
import {
    getPathCorrect,
    getPathTotalQuestions,
    getTotalCorrect,
    getTotalQuestions,
    resetScoreboard,
} from "../lib/scoreboard";

const GlobalScoreboard = () => {
    const nav = useNavigate();
    const [, setRefresh] = useState(0);

    const totalCorrect = getTotalCorrect();
    const totalQuestions = getTotalQuestions();
    const percent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    const handleReset = () => {
        resetScoreboard();
        setRefresh((n) => n + 1);
    };

    return (
        <div className="flex flex-col justify-center min-h-screen p-6">
            <span className="text-center text-3xl w-full font-bold mb-2">Global scoreboard</span>
            <p className="text-center text-ink-700 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Your total correct answers across every learning path. Scores are stored on this
                device only - no account or personal health data required.
            </p>

            {/* Overall score */}
            <div className="option-card__container w-full max-w-xl mx-auto text-center mb-8">
                <span className="text-4xl font-bold text-ink-800">
                    {totalCorrect} / {totalQuestions}
                </span>
                <p className="text-sm text-ink-700 mt-1">questions answered correctly ({percent}%)</p>
                <div className="w-full h-3 bg-ink-100 rounded-full mt-4 overflow-hidden">
                    <div
                        className="h-3 bg-rust-600 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>

            {/* Per-path breakdown */}
            <div className="w-full max-w-xl mx-auto mb-8">
                <h2 className="text-xl font-bold text-ink-700 mb-3 text-left">By learning path</h2>
                <ul className="space-y-4">
                    {PATHS.map((path) => {
                        const correct = getPathCorrect(path.id);
                        const total = getPathTotalQuestions(path.id);
                        const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
                        return (
                            <li key={path.id}>
                                <div className="flex justify-between text-sm text-ink-700 mb-1">
                                    <span>{path.title}</span>
                                    <span>
                                        {correct} / {total}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-ink-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-2 bg-clay-600 rounded-full transition-all"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={() => nav("/topics")} className="landing-button landing-button__login">
                    Choose a topic
                </button>
                <button
                    onClick={() => nav("/")}
                    className="landing-button"
                    style={{ backgroundColor: "var(--steer-clay)", color: "#351D1D" }}
                >
                    Back to start
                </button>
                <button
                    onClick={handleReset}
                    className="landing-button"
                    style={{ backgroundColor: "var(--steer-clay)", color: "#351D1D" }}
                >
                    Reset score
                </button>
            </div>
        </div>
    );
};

export default GlobalScoreboard;
