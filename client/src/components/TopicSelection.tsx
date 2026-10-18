import { useNavigate } from "react-router-dom";
import { PATHS } from "../data/lessons";
import stomach from "../assets/stomach.png";
import firstAidKit from "../assets/first-aid-kit.png";
import diabetes from "../assets/diabetes.png";

const iconFor = (pathId: string) => {
    switch (pathId) {
        case "weight-regain": return stomach;
        case "body-composition": return firstAidKit;
        case "appetite-glp1": return diabetes;
        default: return stomach;
    }
};

const TopicSelection = () => {
    const nav = useNavigate();

    return (
        <div className="flex flex-col justify-center h-fit min-h-screen">
            <span className="text-center text-3xl w-full font-bold mb-4">Choose a topic</span>
            <button
                onClick={() => nav("/scoreboard")}
                className="landing-button mx-auto mb-8"
                style={{ backgroundColor: "var(--steer-clay)", color: "#351D1D" }}
            >
                View global scoreboard
            </button>
            <div className="flex justify-center mt-6 gap-8">
                {PATHS.map((path) => (
                    <div
                        key={path.id}
                        className="option-card__container"
                        onClick={() => nav(`/learn/${path.id}`)}
                    >
                        <img src={iconFor(path.id)} alt={`${path.title} icon`} className="option-card__icon" />
                        <span className="option-card__name mt-3 block text-center">{path.title}</span>
                        <p className="mt-3 text-center text-sm text-ink-700 leading-relaxed">{path.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicSelection;