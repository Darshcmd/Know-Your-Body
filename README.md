# Know Your Body

### Making metabolic health easier to understand, one interaction at a time.

I built **Know Your Body** to make learning about metabolic health feel less like reading a medical textbook and more like exploring something that directly affects our everyday lives.

Health information can be difficult to understand, especially when it is filled with unfamiliar terminology, complicated explanations, and conflicting advice. I wanted to create an experience that breaks these concepts down into something approachable, interactive, and useful - not just for adults, but also for kids and young learners who are beginning to understand their bodies.

The goal is simple: **make health education easier to access, easier to understand, and easier to remember.**

---

## What is Know Your Body?

Know Your Body is an interactive health education experience focused on metabolic health. Instead of overwhelming users with long articles or presenting information all at once, I designed the experience around exploration, questions, and feedback.

Users can explore health concerns, answer questions, learn from common myths, and receive a summary that helps them make sense of what they have learned.

I wanted the experience to feel welcoming to someone who knows very little about health science while still providing explanations that are grounded in evidence.

## What can you do with it?

- **Explore health concerns:** Follow interactive learning paths based on the topics or concerns that interest you.
- **Learn through questions:** Answer questions along the way and receive feedback that helps explain the reasoning behind each answer.
- **Understand health myths:** Explore common misconceptions and learn what the available evidence actually says.
- **Get a personalized learning summary:** Review the topics covered and the key takeaways from your learning journey.
- **Follow visual learning paths:** Move through information in a more structured, engaging way instead of navigating walls of text.
- **Explore evidence-linked explanations:** Understand the reasoning behind health information and where supporting evidence comes from.
- **Learn at your own pace:** The experience is designed to be accessible to beginners, including younger audiences.

## Designed for more than just adults

One of the things I cared about while building this was making health education approachable for younger users.

Kids should be able to start learning about their bodies without needing to understand medical terminology first. I wanted the experience to encourage curiosity, make concepts less intimidating, and give users a reason to keep exploring.

That does not mean oversimplifying important health information or turning medical topics into entertainment without context. It means presenting information in a way that people can actually understand.

I see this as an important part of making health literacy more accessible.

## How the experience works

The core experience follows a simple learning flow:

1. **Explore** - Start with a health topic or concern.
2. **Interact** - Move through questions and guided learning paths.
3. **Understand** - Receive explanations and feedback that put the information into context.
4. **Reflect** - Review the key takeaways through a personalized learning summary.
5. **Continue learning** - Use the experience to identify topics worth exploring further.

I designed this flow to make learning feel progressive rather than overwhelming.

## Interaction tracking and device coverage

This table documents what is tracked (or verified) for each key flow, where it is intended to work, how completion is detected, what triggers it, what value is recorded, and where the user goes next.

| Flow / Screen | Target Device / Browser | Completion Status | Trigger | Value | Next Step |
|---|---|---|---|---|---|
| Welcome `/` - Start learning | Mobile-first (iOS Safari, Android Chrome) + Desktop (Chrome, Safari, Firefox, Edge) | ✅ Implemented | Click `Start learning` (`Welcome.tsx` → `navigate('/topics')`) | No value stored - entry navigation only | Go to `/topics` |
| Topic selection `/topics` - Choose a topic | Mobile-first + Desktop (same as above, HashRouter build works on Netlify + GitHub Pages `/docs`) | ✅ Implemented | Click topic card (`TopicSelection.tsx` → `nav('/learn/:pathId')`) for `weight-regain`, `body-composition`, `appetite-glp1` | Selected `pathId` in route param | Go to `/learn/:pathId` (`LessonFlow.tsx`) |
| Topic selection `/topics` - View scoreboard | Mobile-first + Desktop | ✅ Implemented | Click `View global scoreboard` → `nav('/scoreboard')` | No value stored | Go to `/scoreboard` |
| Learning path `/learn/:pathId` - Question node | Mobile-first + Desktop | ✅ Implemented | Select answer option (`handleSelect(id)` in `LessonFlow.tsx`) | `recordCorrect(path.id, node.id)` → `localStorage['kyb.scoreboard.v1']` as `{ pathId: [questionId] }` only when `classification === 'correct'`; otherwise feedback only (`correct` / `partially right` / `not quite`) | Show feedback + explanation + `View source →`, then `Continue` / `Check answer` |
| Learning path `/learn/:pathId` - Lesson node | Mobile-first + Desktop | ✅ Implemented | Click `Continue` / `Finish` (`handleContinue()` → `resolveNextId()` or sequential `nodeIndex + 1`) | No score stored - `takeaway` + optional `sourceId` collected later via `buildSummary(pathId)` | Advance to next node or completion screen if `isLast` |
| Completion screen (`kind: completion`) | Mobile-first + Desktop | ✅ Implemented | Reach last node (`wr-complete`, `bc-complete`, `ag-complete`) | `buildSummary(pathId)` → `takeaways[]` + `sources[]` (title, author/org, year, URL/DOI, locator) rendered on screen | `View scoreboard` → `/scoreboard`, `Explore another topic` → `/topics`, `Restart this topic` → `nodeIndex 0` |
| Global scoreboard `/scoreboard` | Mobile-first + Desktop | ✅ Implemented | Open route; reads `getTotalCorrect()` / `getTotalQuestions()` + per-path `getPathCorrect()` / `getPathTotalQuestions()` | Displayed value `totalCorrect / totalQuestions` + percent + per-path bars; device-only, no backend | `Choose a topic` → `/topics`, `Back to start` → `/`, `Reset score` → `resetScoreboard()` clears `kyb.scoreboard.v1` |
| Legacy gated experience `/home`, `/home/path/:condition`, `/home/lesson/:id`, `/home/research` (Clerk) | Desktop + Mobile (requires `VITE_REACT_APP_CLERK_PUBLISHABLE_KEY`; otherwise redirects to sign-in) | ⚠️ Legacy / partially maintained | `SignedIn` → `HomeLayout`; node click (`PathComponent`) → `navigate('../../lesson/:id')` or `research`; `LessonComponent checkAnswer()` | `localStorage['lessons-completed']` (`;`-separated ids) + confetti on `isCompleted`; question bank from `dbexample.json` | Lesson completion → `/home`; resource node `5` → `research` links (Pitt+Me, ClinicalTrials.gov, ResearchMatch) |
| Auth `/sign-in`, `/sign-up` | Mobile-first + Desktop | ✅ Implemented (only when Clerk key present) | Clerk `<SignIn routing='path' path='/sign-in' redirectUrl='/home' />` | Clerk session (external, not tracked in README table values) | Redirect to `/home` |
| Fallback `*` - Not found | Mobile-first + Desktop | ✅ Implemented | Unknown route → `<ErrorPage errorCode={404} />` (`https://http.cat/404`) | No value stored | User navigates back via browser or app links |

Notes:

- Scores are stored in `localStorage` on the device only (`kyb.scoreboard.v1`). No backend, no account, and no sensitive personal health data is collected.
- The public experience (`/`, `/topics`, `/learn/:pathId`, `/scoreboard`) runs without Clerk or API keys. Clerk is only used for the legacy `/home` experience when a publishable key is configured.
- Routing uses `HashRouter` with Vite `base: './'` so deep links and refreshes work on static hosts (Netlify via `netlify.toml`, GitHub Pages via `/docs` branch deploy).
- Responsive layout is mobile-first with Tailwind (`p-4 md:p-8`, `max-w-xl` containers) and is intended to be verified on iOS Safari, Android Chrome, and desktop Chrome/Safari/Firefox/Edge.

## Design approach

I wanted the interface to feel warm, clear, and approachable rather than clinical or intimidating.

The design uses a restrained palette of cream, rust, maroon, and muted earthy tones, supported by editorial typography and a mobile-first layout. The aim was to make the interface feel closer to an accessible learning experience than a conventional medical dashboard.

A few principles guided the design:

- **Clarity over clutter:** Keep the focus on the information that matters.
- **Interaction over information overload:** Break learning into manageable steps.
- **Accessibility over assumed knowledge:** Do not expect users to arrive with a background in health science.
- **Evidence over sensationalism:** Health information should be explained responsibly, without exaggerated claims.
- **Mobile-first usability:** Make the experience comfortable to use on smaller screens.

## Tech stack

I built the application using:

- **React** - Component-based user interface.
- **TypeScript** - Type safety and more maintainable code.
- **Vite** - Development server and build tooling.
- **Local JSON data** - Structured content for the interactive learning experience.

The application is designed to run without requiring users to create an account or configure a database.

## Running it locally

You will need [Node.js](https://nodejs.org/) and npm installed.

Clone the repository:

```bash
git clone https://github.com/Darshcmd/Know-Your-Body.git
cd Know-Your-Body
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in your terminal to explore the application.

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Health information and responsible use

Know Your Body is an educational project, not a diagnostic tool or a substitute for professional medical advice.

The experience is intended to support general health literacy and help users understand concepts more clearly. It should not be used to diagnose a condition, determine individual medical risk, or make treatment decisions.

I believe that making health information accessible also means being careful about how that information is presented. Medical claims should be communicated with appropriate context, and supporting evidence should be traceable wherever possible.

## What I want to build on next

I see Know Your Body as a starting point for making health education more interactive and accessible.

There is room to expand the learning paths, improve personalization, introduce more visual explanations, and make it easier for users to continue learning about topics they find relevant.

More broadly, I am interested in how technology can help bridge the gap between complex scientific knowledge and the people who could benefit from understanding it.

For me, the challenge is not simply putting information online. It is making that information understandable and useful without losing the science behind it.

---

## Built by

**Darsh Soni**

- [GitHub](https://github.com/Darshcmd)
- [Portfolio](https://darsh.is-a.dev)

Built as part of the **Steer Hackathon - Problem Statement 1**.

