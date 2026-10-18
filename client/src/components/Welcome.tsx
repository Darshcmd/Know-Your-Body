import { useNavigate } from "react-router-dom";
import babyLion from "../assets/baby-lion.png";
import "../css/Landing.css";

const Welcome = () => {
    const navigate = useNavigate()

    return (
        <div className="landing-container">
            <div className="landing-container__left">
                <h1 className="landing-title">Know Your Body</h1>
                <p className="landing-message">
                    Understand the science behind appetite, weight, and metabolic health.
                </p>
                <p className="landing-message" style={{ marginTop: "1rem", opacity: 0.9 }}>
                    Explore evidence-based answers to questions about your body, one short lesson at a time.
                </p>
                <p className="landing-message" style={{ marginTop: "1.5rem", fontSize: "1rem", opacity: 0.85 }}>
                    Educational information, not a medical diagnosis or treatment recommendation.
                </p>
            </div>
            <div className="landing-container__right">
                <img className="landing-image" src={babyLion} alt="Know Your Body" />
                <div className="landing__buttons-container">
                    <button onClick={() => navigate('/topics')} className="landing-button landing-button__login">
                        Start learning
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;