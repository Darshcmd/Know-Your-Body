// Know Your Body - structured learning content
//
// All medical claims are paired with a source record (see SOURCES below).
// Content is deterministic and pre-reviewed. No runtime LLM is used for
// medical answers. No sensitive personal health data is collected.

export type Source = {
  id: string;
  claimId: string;
  claim: string;
  title: string;
  authorOrOrg: string;
  year: number;
  url: string;
  doi?: string;
  locator?: string; // page, section, table or figure
  support: string; // how the source supports the claim
  limitation?: string;
  medicallyReviewed: boolean;
};

export type AnswerOption = {
  id: string;
  text: string;
  feedback: string; // answer-specific educational feedback
  classification: "correct" | "incomplete" | "misconception";
};

export type FlowNode = {
  id: string;
  kind: "question" | "lesson" | "completion";
  // question screens
  question?: string;
  options?: AnswerOption[];
  // shown after an answer is selected
  explanation?: string;
  sourceId?: string;
  takeaway?: string;
  // lesson screens
  title?: string;
  body?: string[];
  // navigation
  next?: string | Record<string, string>; // fixed next id, or option-id -> next id
};

export type LearningPath = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // asset file name
  color: string; // tailwind text color class
  nodes: FlowNode[];
};

// ---------------------------------------------------------------------------
// Source records (evidence & traceability)
// ---------------------------------------------------------------------------

export const SOURCES: Source[] = [
  {
    id: "s-step1",
    claimId: "weight-regain-01",
    claim:
      "After 68 weeks of semaglutide treatment, participants who stopped treatment regained about two-thirds of their prior weight loss over the following year (net weight loss fell from ~17.3% to ~5.6% of starting weight), and most cardiometabolic improvements reverted toward baseline.",
    title:
      "Weight regain and cardiometabolic effects after withdrawal of semaglutide: The STEP 1 trial extension",
    authorOrOrg: "Wilding JPH, Batterham RL, Davies M, et al.",
    year: 2022,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9542252/",
    doi: "10.1111/dom.14725",
    locator: "Abstract - RESULTS and CONCLUSIONS; Diabetes Obes Metab. 2022 Aug;24(8):1553-1564",
    support:
      "Reports that, in the off-treatment extension (n=327), semaglutide participants regained 11.6 percentage points of lost weight by week 120 (net loss 5.6% vs 0.1% for placebo) and that cardiometabolic improvements reverted towards baseline. The authors conclude participants regained roughly two-thirds of prior weight loss and that ongoing treatment is required to maintain improvements. Extension analyses were exploratory.",
    limitation:
      "The extension was exploratory and enrolled a representative subset of sites (Canada, Germany, UK, and top-recruiting US/Japan sites), so results may not generalize to everyone. Follow-up was one year after withdrawal. Individual outcomes vary.",
    medicallyReviewed: false,
  },
  {
    id: "s-biggestloser",
    claimId: "weight-regain-02",
    claim:
      "After intensive weight loss, resting metabolic rate can remain suppressed for years even when much of the weight is regained - in one study it was about 500 kcal/day lower than expected six years later.",
    title:
      "Persistent metabolic adaptation 6 years after The Biggest Loser competition",
    authorOrOrg: "Fothergill E, Guo J, Howard L, et al. (National Institute of Diabetes and Digestive and Kidney Diseases)",
    year: 2016,
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4989512/",
    doi: "10.1002/oby.21538",
    locator: "Abstract - RESULTS and CONCLUSIONS; Obesity (Silver Spring). 2016;24(8):1612-1619",
    support:
      "Measured resting metabolic rate (RMR) and body composition in Biggest Loser competitors at baseline, at the end of the 30-week competition, and 6 years later. Despite substantial weight regain over 6 years, RMR remained at the low level measured at the end of the competition - roughly 500 kcal/day lower than expected for body composition and age - indicating persistent metabolic adaptation.",
    limitation:
      "Small sample (16 competitors; 14 with 6-year data) from a single television competition, so results may not generalize to the broader population.",
    medicallyReviewed: false,
  },
  {
    id: "s-leanmass-1",
    claimId: "body-comp-01",
    claim:
      "Weight loss from GLP-1-based treatment generally reduces both fat mass and lean body mass; the scale alone cannot show how much of each has changed.",
    title:
      "Changes in lean body mass with glucagon-like peptide-1-based therapies and mitigation strategies",
    authorOrOrg: "Diabetes Obes Metab. 2024 Sep",
    year: 2024,
    url: "https://doi.org/10.1111/dom.15728",
    doi: "10.1111/dom.15728",
    locator: "Review; Diabetes Obes Metab. 2024",
    support:
      "A review of GLP-1-based therapies and lean body mass, describing that weight loss with these medicines includes reductions in lean mass as well as fat mass, and discussing strategies to mitigate lean-mass loss.",
    limitation:
      "Review summarizing multiple trials; the proportion of lean-mass loss varies between individuals and studies.",
    medicallyReviewed: false,
  },
  {
    id: "s-leanmass-2",
    claimId: "body-comp-02",
    claim:
      "Adequate protein intake and resistance exercise may help preserve lean body mass and optimize body composition during weight loss, but needs and results vary between individuals.",
    title:
      "Incretin-Based Weight Loss Pharmacotherapy: Can Resistance Exercise Optimize Changes in Body Composition?",
    authorOrOrg: "Diabetes Care. 2024 Oct 1",
    year: 2024,
    url: "https://doi.org/10.2337/dci23-0100",
    doi: "10.2337/dci23-0100",
    locator: "Perspective; Diabetes Care. 2024",
    support:
      "Discusses whether resistance exercise can optimize body-composition changes (including lean mass) during incretin-based weight-loss pharmacotherapy, noting that exercise and nutrition are relevant mitigating factors.",
    limitation:
      "A perspective piece framing research questions; it does not establish that any specific diet or exercise guarantees muscle preservation for everyone.",
    medicallyReviewed: false,
  },
  {
    id: "s-glp1-1",
    claimId: "appetite-01",
    claim:
      "GLP-1 is an incretin gut hormone released in response to food that helps regulate insulin secretion, and GLP-1 receptor agonists act in the brain to suppress appetite, increase satiety, and reduce calorie intake.",
    title:
      "Mechanisms and possible hepatoprotective effects of glucagon-like peptide-1 receptor agonists and other incretin receptor agonists in non-alcoholic fatty liver disease",
    authorOrOrg: "Targher G, Mantovani A, Byrne CD",
    year: 2023,
    url: "https://pubmed.ncbi.nlm.nih.gov/36620987/",
    doi: "10.1016/S2468-1253(22)00338-7",
    locator: "Abstract; Lancet Gastroenterol Hepatol. 2023 Feb;8(2):179-191",
    support:
      "States that GLP-1 is an incretin that stimulates insulin secretion from pancreatic beta cells in response to food, and that GLP-1 receptor agonists signal in the central nervous system to suppress appetite, increase satiety, and thereby decrease calorie intake.",
    limitation:
      "Review focused on NAFLD; the appetite mechanism described is general but the paper's primary topic is liver disease.",
    medicallyReviewed: false,
  },
  {
    id: "s-fda",
    claimId: "appetite-02",
    claim:
      "GLP-1 receptor agonist medicines are prescription medicines with specific approved uses, contraindications (for example, personal or family history of medullary thyroid carcinoma or MEN 2), and warnings (including pancreatitis and gallbladder disease); suitability and any treatment changes should be decided with a qualified healthcare professional.",
    title: "WEGOVY (semaglutide) injection - Prescribing Information",
    authorOrOrg: "U.S. Food and Drug Administration (FDA)",
    year: 2021,
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf",
    locator: "FDA Prescribing Information (revised June 2021)",
    support:
      "Regulatory label for semaglutide 2.4 mg (Wegovy), a GLP-1 receptor agonist, including indication, contraindications, warnings and precautions, and adverse reactions.",
    limitation:
      "Regulatory information for one specific medicine; it does not establish that GLP-1 medicines are appropriate or necessary for everyone.",
    medicallyReviewed: false,
  },
];
// ---------------------------------------------------------------------------
// Learning paths
// ---------------------------------------------------------------------------

export const PATHS: LearningPath[] = [
  {
    id: "weight-regain",
    title: "Understanding weight regain",
    tagline: "Why can weight come back after weight loss?",
    description:
      "Explore the biology of appetite and body-weight regulation, what happens after weight loss, and what research found when semaglutide treatment was stopped.",
    icon: "stomach.png",
    color: "text-rust-700",
    nodes: [
      {
        id: "wr-q1",
        kind: "question",
        title: "Question 1 of 3",
        question:
          "When a person loses weight, what generally happens to the body's appetite signals?",
        options: [
          {
            id: "a",
            text: "They tend to increase, driving hunger back up",
            classification: "correct",
            feedback:
              "That's right. After weight loss, the body often increases hunger signals and reduces fullness signals as part of a natural drive to defend its previous weight.",
          },
          {
            id: "b",
            text: "They turn off completely",
            classification: "misconception",
            feedback:
              "Not quite. Appetite signals don't switch off after weight loss - in many cases they become stronger, which is one reason weight can feel harder to maintain.",
          },
          {
            id: "c",
            text: "They stay exactly the same",
            classification: "incomplete",
            feedback:
              "Not necessarily. Research shows the body's appetite-regulation system often responds to weight loss by trying to restore the lost weight.",
          },
        ],
        explanation:
          "Body weight is regulated by a network of hormones and brain signals (including leptin, ghrelin, insulin and gut hormones such as GLP-1). After weight loss, levels of fullness hormones tend to fall and hunger hormones tend to rise, while metabolism can slow down. These changes are biological, not a lack of willpower.",
        sourceId: "s-biggestloser",
        takeaway:
          "After weight loss, appetite signals often increase and metabolism can slow - normal biology that can make weight regain common, not a personal failure.",
        next: "wr-lesson-1",
      },
      {
        id: "wr-lesson-1",
        kind: "lesson",
        title: "Why weight can come back",
        body: [
          "Losing weight changes the body's biology in ways that encourage regain. Hormones that signal fullness often decrease, hormones that signal hunger often increase, and resting metabolism can become more efficient (burning fewer calories at rest).",
          "These changes can persist for years. In one study of people who lost a large amount of weight, resting metabolic rate was still about 500 calories per day lower than expected six years later, even though much of the weight had returned.",
          "This is why weight regain is common and expected - it reflects physiology, not personal failure.",
        ],
        takeaway:
          "Weight regain is driven by persistent biological changes, so it is common - not a sign of weak willpower.",
        next: "wr-q2",
      },
      {
        id: "wr-q2",
        kind: "question",
        title: "Question 2 of 3",
        question:
          "In a large trial, after people stopped taking semaglutide (a GLP-1 medicine), what happened to their weight over the following year?",
        options: [
          {
            id: "a",
            text: "They kept losing weight steadily",
            classification: "misconception",
            feedback:
              "No. After stopping semaglutide, participants generally regained a substantial portion of the weight they had lost.",
          },
          {
            id: "b",
            text: "They regained about two-thirds of their prior weight loss",
            classification: "correct",
            feedback:
              "That's right. In the STEP 1 trial extension, participants who stopped semaglutide regained roughly two-thirds of their prior weight loss over the next year, and many cardiometabolic improvements moved back toward baseline.",
          },
          {
            id: "c",
            text: "Their weight stayed exactly the same",
            classification: "misconception",
            feedback:
              "Not correct. Weight generally increased after treatment was stopped in the study.",
          },
        ],
        explanation:
          "The STEP 1 trial extension followed people after they stopped once-weekly semaglutide 2.4 mg and lifestyle support. Over the next year, those who had taken semaglutide regained about two-thirds of the weight they had lost (average net loss fell from about 17.3% to 5.6% of starting weight). Improvements in blood pressure, lipids and blood-sugar measures also largely faded. This shows that, for many people, the benefits of these medicines are maintained only while treatment continues.",
        sourceId: "s-step1",
        takeaway:
          "Stopping GLP-1 treatment is often followed by substantial weight regain; whether to start or stop treatment should be discussed with a qualified healthcare professional.",
        next: "wr-lesson-2",
      },
      {
        id: "wr-lesson-2",
        kind: "lesson",
        title: "What the research means for you",
        body: [
          "The STEP 1 results describe what happened, on average, in a specific trial group. They do not predict what will happen to any one person.",
          "Individual outcomes vary widely. Some people regain more, some less, and some maintain their loss with ongoing support and lifestyle changes.",
          "Because weight regulation is biological and individual, decisions about starting or stopping any treatment should be made with a qualified healthcare professional who knows your health history.",
        ],
        takeaway:
          "Trial results show averages, not individual destiny - personal decisions need professional guidance.",
        next: "wr-q3",
      },
      {
        id: "wr-q3",
        kind: "question",
        title: "Question 3 of 3",
        question:
          "Does every person regain the same amount of weight after stopping a weight-loss treatment?",
        options: [
          {
            id: "a",
            text: "Yes, everyone regains the same amount",
            classification: "misconception",
            feedback:
              "No. Regain varies a lot between people based on biology, lifestyle, support and individual circumstances.",
          },
          {
            id: "b",
            text: "No, individual outcomes vary widely",
            classification: "correct",
            feedback:
              "Exactly. Some people regain more, some less, and some maintain their loss. Trial averages do not predict any one person's result.",
          },
          {
            id: "c",
            text: "Only people who stop treatment regain weight",
            classification: "misconception",
            feedback:
              "Not correct. Weight can change for many reasons regardless of treatment, and regain is not limited to people who stop a medicine.",
          },
        ],
        explanation:
          "Weight regain is not uniform. Biology, genetics, environment, access to care, stress, sleep, nutrition and physical activity all influence what happens after weight loss. A study's average result tells us about a group, not about you specifically.",
        sourceId: "s-step1",
        takeaway:
          "Outcomes after stopping treatment vary by individual - there is no single predictable result for everyone.",
        next: "wr-complete",
      },
      {
        id: "wr-complete",
        kind: "completion",
        title: "You've completed: Understanding weight regain",
      },
    ],
  },
  {
    id: "body-composition",
    title: "Understanding muscle and body composition",
    tagline: "What does the scale really measure?",
    description:
      "Learn the difference between fat mass, lean body mass and total weight - and why the scale alone cannot tell you how your body composition has changed.",
    icon: "stomach.png",
    color: "text-clay-700",
    nodes: [
      {
        id: "bc-q1",
        kind: "question",
        title: "Question 1 of 3",
        question:
          "Does the number on a scale tell you exactly how much fat or muscle you have lost?",
        options: [
          {
            id: "a",
            text: "Yes - the scale measures fat and muscle separately",
            classification: "misconception",
            feedback:
              "No. A scale measures total body weight only - it cannot distinguish between fat, muscle, water or other tissues.",
          },
          {
            id: "b",
            text: "No - it measures total weight, not fat versus muscle",
            classification: "correct",
            feedback:
              "Exactly. The scale tells you your total weight, but not whether that weight is fat mass, lean body mass or water.",
          },
          {
            id: "c",
            text: "Only if you weigh yourself every morning",
            classification: "misconception",
            feedback:
              "No. Weighing more often doesn't give the scale the ability to separate fat from muscle.",
          },
        ],
        explanation:
          "Body weight is made up of fat mass (adipose tissue), lean body mass (muscle, organs, bones and body water) and total body weight is the sum. Two people can weigh the same but have very different body compositions. A scale cannot tell you how much of any weight change is fat versus lean tissue.",
        sourceId: "s-leanmass-1",
        takeaway:
          "The scale measures total weight only - it cannot tell you whether weight change came from fat, muscle or water.",
        next: "bc-lesson-1",
      },
      {
        id: "bc-lesson-1",
        kind: "lesson",
        title: "Fat mass vs lean body mass",
        body: [
          "Fat mass is the body's stored adipose tissue. Lean body mass includes muscle, organs, bones and body water - everything that isn't fat. Total body weight combines both.",
          "When people lose weight, the loss usually includes both fat and lean tissue. Research on GLP-1-based weight loss indicates that some of the weight lost is lean body mass, not just fat.",
          "The proportion of fat versus lean mass lost varies between people and depends on factors such as the amount of weight lost, nutrition and physical activity.",
          "Adequate protein and regular resistance activity (such as strength training) can help preserve lean mass during weight loss, but no specific diet or exercise guarantees muscle preservation for everyone.",
        ],
        takeaway:
          "Weight loss usually includes both fat and lean mass; nutrition and activity influence the balance, but results vary by individual.",
        next: "bc-q2",
      },
      {
        id: "bc-q2",
        kind: "question",
        title: "Question 2 of 3",
        question:
          "During weight loss with GLP-1-based treatment, what does research suggest happens to lean body mass?",
        options: [
          {
            id: "a",
            text: "It always increases",
            classification: "misconception",
            feedback:
              "No. Lean body mass does not automatically increase during weight loss.",
          },
          {
            id: "b",
            text: "It can decrease along with fat mass",
            classification: "correct",
            feedback:
              "That's right. Studies indicate that some lean body mass is typically lost along with fat during GLP-1-based weight loss, though the amount varies.",
          },
          {
            id: "c",
            text: "It is completely unaffected",
            classification: "misconception",
            feedback:
              "Not correct. Lean body mass is generally affected by weight loss to some degree.",
          },
        ],
        explanation:
          "Research shows that weight loss with GLP-1-based medicines reduces both fat mass and lean body mass. Because lean mass includes metabolically active tissue such as muscle, preserving it is relevant to health and function. Adequate protein intake and resistance exercise are strategies that may help limit lean-mass loss, but individual needs differ and no single approach works for everyone.",
        sourceId: "s-leanmass-2",
        takeaway:
          "GLP-1-based weight loss can reduce lean mass as well as fat; protein and resistance activity may help, but individual needs vary.",
        next: "bc-lesson-2",
      },
      {
        id: "bc-lesson-2",
        kind: "lesson",
        title: "Preserving lean mass during weight loss",
        body: [
          "Getting enough protein and doing regular resistance activity, such as strength training, can help protect lean body mass while you lose weight.",
          "However, everyone's needs are different. Factors such as age, starting weight, medical conditions and the amount of weight lost all affect how much lean mass a person retains.",
          "There is no single diet or exercise plan that guarantees muscle preservation for every person. A qualified healthcare professional or registered dietitian can help tailor a plan to your needs.",
        ],
        takeaway:
          "Protein and resistance activity may help preserve lean mass, but individual needs vary and no approach works for everyone.",
        next: "bc-q3",
      },
      {
        id: "bc-q3",
        kind: "question",
        title: "Question 3 of 3",
        question:
          "What best describes lean body mass?",
        options: [
          {
            id: "a",
            text: "Just your muscle",
            classification: "misconception",
            feedback:
              "Not quite. Lean body mass includes muscle, but also organs, bones and body water.",
          },
          {
            id: "b",
            text: "Everything in your body that is not fat",
            classification: "correct",
            feedback:
              "That's right. Lean body mass is muscle plus organs, bones and body water - everything except fat mass.",
          },
          {
            id: "c",
            text: "The same as body fat",
            classification: "misconception",
            feedback:
              "No. Lean body mass and fat mass are different components of body weight.",
          },
        ],
        explanation:
          "Lean body mass is everything in the body that is not fat: muscle, organs, bones and body water. The scale alone cannot tell you whether changes in weight come from lean body mass or fat mass, which is why body-composition tools (such as DEXA or bioimpedance) and professional guidance are useful when tracking changes.",
        sourceId: "s-leanmass-1",
        takeaway:
          "Lean body mass is muscle plus organs, bones and water - not just muscle - and the scale can't separate it from fat.",
        next: "bc-complete",
      },
      {
        id: "bc-complete",
        kind: "completion",
        title: "You've completed: Understanding muscle and body composition",
      },
    ],
  },
  {
    id: "appetite-glp1",
    title: "Understanding appetite and GLP-1",
    tagline: "How do appetite signals and GLP-1 work?",
    description:
      "Learn what GLP-1 is, how appetite and fullness signals influence eating, and how GLP-1 medicines relate to the body's own GLP-1 - and their limits.",
    icon: "stomach.png",
    color: "text-ink-800",
    nodes: [
      {
        id: "ag-q1",
        kind: "question",
        title: "Question 1 of 3",
        question: "What is GLP-1?",
        options: [
          {
            id: "a",
            text: "A gut hormone (incretin) released after eating",
            classification: "correct",
            feedback:
              "That's right. GLP-1 (glucagon-like peptide-1) is a hormone released from the gut in response to food that helps regulate insulin and appetite.",
          },
          {
            id: "b",
            text: "A form of insulin",
            classification: "misconception",
            feedback:
              "No. GLP-1 helps regulate insulin secretion, but it is not insulin itself.",
          },
          {
            id: "c",
            text: "A vitamin or mineral",
            classification: "misconception",
            feedback:
              "No. GLP-1 is a peptide hormone, not a vitamin or mineral.",
          },
        ],
        explanation:
          "GLP-1 stands for glucagon-like peptide-1. It is an incretin hormone released from the intestines after eating. It stimulates insulin release in response to food and also acts in the brain to reduce appetite and increase feelings of fullness. The body's own GLP-1 is broken down quickly, so its effects are short-lived.",
        sourceId: "s-glp1-1",
        takeaway:
          "GLP-1 is a natural gut hormone released after eating that helps regulate insulin, appetite and fullness.",
        next: "ag-lesson-1",
      },
      {
        id: "ag-lesson-1",
        kind: "lesson",
        title: "Appetite signals and GLP-1 medicines",
        body: [
          "Eating is guided by a network of appetite and fullness signals between the gut and the brain. Hormones such as GLP-1 help tell the brain when you have eaten enough.",
          "GLP-1 receptor agonist medicines are designed to act on the same receptors as the body's natural GLP-1, but they are modified to last much longer in the body. They can reduce appetite and increase satiety, which is why they are used as treatments for weight management and type 2 diabetes.",
          "These medicines are not appropriate or necessary for everyone. They have specific approved uses, contraindications (such as a personal or family history of medullary thyroid carcinoma or MEN 2), and possible side effects including pancreatitis and gallbladder disease.",
          "Whether a medicine is suitable, and any decision to start or stop it, should be made with a qualified healthcare professional based on your individual health.",
        ],
        takeaway:
          "GLP-1 medicines act on the same appetite pathways as natural GLP-1 but last longer; they are prescription medicines with specific uses and risks.",
        sourceId: "s-glp1-1",
        next: "ag-q2",
      },
      {
        id: "ag-q2",
        kind: "question",
        title: "Question 2 of 3",
        question:
          "Compared with the body's natural GLP-1, GLP-1 receptor agonist medicines generally...",
        options: [
          {
            id: "a",
            text: "Are identical and last the same short time",
            classification: "misconception",
            feedback:
              "No. GLP-1 medicines are modified versions that last longer than natural GLP-1, which is broken down quickly.",
          },
          {
            id: "b",
            text: "Act on the same receptors but are made to last longer",
            classification: "correct",
            feedback:
              "That's right. They target the same receptors as natural GLP-1 but are engineered to remain active longer, giving a stronger, more sustained effect on appetite and blood sugar.",
          },
          {
            id: "c",
            text: "Work through a completely different part of the body",
            classification: "misconception",
            feedback:
              "No. They act on the same GLP-1 receptors, not a different system.",
          },
        ],
        explanation:
          "Natural GLP-1 is broken down within minutes, so its effect is brief. GLP-1 receptor agonist medicines are modified to resist breakdown and stay active for hours or days, producing a sustained reduction in appetite and increase in satiety. This sustained action is what makes them useful as medicines, but it also means their effects (and potential side effects) persist longer than the body's own hormone.",
        sourceId: "s-glp1-1",
        takeaway:
          "GLP-1 medicines target the same receptors as natural GLP-1 but are designed to last longer in the body.",
        next: "ag-lesson-2",
      },
      {
        id: "ag-lesson-2",
        kind: "lesson",
        title: "Therapeutic role and limits of GLP-1 medicines",
        body: [
          "GLP-1 receptor agonists are prescription medicines used for certain people with weight management needs or type 2 diabetes. They are not appropriate or necessary for everyone.",
          "They have specific contraindications, such as a personal or family history of medullary thyroid carcinoma or multiple endocrine neoplasia type 2 (MEN 2), and warnings including pancreatitis and gallbladder disease.",
          "Common side effects can include nausea, vomiting and diarrhoea. Suitability and any decision to start, continue or stop treatment should be discussed with a qualified healthcare professional.",
          "This experience does not recommend any specific medicine, dose or brand.",
        ],
        takeaway:
          "GLP-1 medicines are prescription-only, not for everyone, and require professional guidance for any treatment decision.",
        sourceId: "s-fda",
        next: "ag-q3",
      },
      {
        id: "ag-q3",
        kind: "question",
        title: "Question 3 of 3",
        question:
          "Are GLP-1 receptor agonist medicines appropriate for everyone who wants to manage their weight?",
        options: [
          {
            id: "a",
            text: "Yes, they are appropriate for everyone",
            classification: "misconception",
            feedback:
              "No. These medicines are not appropriate or necessary for everyone and have specific contraindications and possible side effects.",
          },
          {
            id: "b",
            text: "No, they are not appropriate for everyone",
            classification: "correct",
            feedback:
              "That's right. A qualified healthcare professional should assess whether a GLP-1 medicine is suitable for an individual, considering contraindications, side effects and personal health history.",
          },
          {
            id: "c",
            text: "Only people with diabetes can use them",
            classification: "misconception",
            feedback:
              "Not correct. GLP-1 medicines are approved for certain people beyond diabetes, but suitability is individual and must be assessed by a professional.",
          },
        ],
        explanation:
          "GLP-1 receptor agonists have approved uses, but they are not universal. A healthcare professional weighs benefits against risks such as pancreatitis, gallbladder disease and thyroid-related contraindications before prescribing. Treatment decisions are personal and should never be based on a quiz or advertisement.",
        sourceId: "s-fda",
        takeaway:
          "GLP-1 medicines are not for everyone - suitability must be assessed by a qualified healthcare professional.",
        next: "ag-complete",
      },
      {
        id: "ag-complete",
        kind: "completion",
        title: "You've completed: Understanding appetite and GLP-1",
      },
    ],
  }
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function pathById(id: string): LearningPath | undefined {
  return PATHS.find((p) => p.id === id);
}

export function nodeById(pathId: string, nodeId: string): FlowNode | undefined {
  return pathById(pathId)?.nodes.find((n) => n.id === nodeId);
}

export function sourceById(id: string): Source | undefined {
  return SOURCES.find((s) => s.id === id);
}

export function sourceByClaimId(claimId: string): Source | undefined {
  return SOURCES.find((s) => s.claimId === claimId);
}

export type PathSummary = {
  takeaways: string[];
  sources: Source[];
};

export function buildSummary(pathId: string): PathSummary | undefined {
  const path = pathById(pathId);
  if (!path) return undefined;

  const takeaways: string[] = [];
  const sources: Source[] = [];
  const seenSourceIds = new Set<string>();

  for (const node of path.nodes) {
    if (node.takeaway) takeaways.push(node.takeaway);
    if (node.sourceId && !seenSourceIds.has(node.sourceId)) {
      const source = sourceById(node.sourceId);
      if (source) {
        sources.push(source);
        seenSourceIds.add(node.sourceId);
      }
    }
  }

  return { takeaways, sources };
}