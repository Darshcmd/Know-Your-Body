import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import TopicSelection from "./components/TopicSelection";
import LessonFlow from "./components/LessonFlow";
import GlobalScoreboard from "./components/GlobalScoreboard";
import ErrorPage from "./components/ErrorPage";
import HomeLayout from "./components/HomeLayout";
import HomeComponent from "./components/HomeComponent";
import PathComponent from "./components/PathComponent";
import LessonComponent from "./components/LessonComponent";
import Research from "./components/Research";
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    SignIn,
    SignUp,
} from "@clerk/clerk-react";

const clerkKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const PublicRoutes = () => (
    <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/topics" element={<TopicSelection />} />
        <Route path="/learn/:pathId" element={<LessonFlow />} />
        <Route path="/scoreboard" element={<GlobalScoreboard />} />

        {/* Clerk-gated legacy experience (account creation required) */}
        <Route
            path="/home"
            element={
                <>
                    <SignedIn>
                        <HomeLayout />
                    </SignedIn>
                    <SignedOut>
                        <RedirectToSignIn />
                    </SignedOut>
                </>
            }
        >
            <Route index element={<HomeComponent />} />
            <Route path="path">
                <Route path=":condition" element={<PathComponent />} />
            </Route>
            <Route path="lesson">
                <Route path=":id" element={<LessonComponent />} />
            </Route>
            <Route path="research" element={<Research />} />
        </Route>

        <Route
            path="/sign-in/*"
            element={
                <div className="flex justify-center align-middle mt-10">
                    <SignIn routing="path" path="/sign-in" redirectUrl="/home" />
                </div>
            }
        />
        <Route
            path="/sign-up/*"
            element={
                <div className="flex justify-center mt-4">
                    <SignUp routing="path" path="/sign-up" redirectUrl="/home" />
                </div>
            }
        />

        <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
);

export default function App() {
    // The Know Your Body public experience runs without Clerk so the demo
    // works from a clean start with no secret keys or account creation.
    // Clerk is only used for the legacy /home experience when a key is present.
    if (clerkKey) {
        return (
            <ClerkProvider publishableKey={clerkKey}>
                <PublicRoutes />
            </ClerkProvider>
        );
    }
    return <PublicRoutes />;
}
