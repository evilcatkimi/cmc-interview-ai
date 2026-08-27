export const candidate = {
  name: 'Tran Minh Quan',
  role: 'Senior Frontend Engineer',
  seniority: 'Level 4 · 6 yrs exp',
  location: 'Ha Noi, Vietnam',
  applied: 'CMC Global · Digital Solutions',
  avatar: 'TQ',
  cv: ['React / TypeScript', 'Micro-frontends', 'Node.js', 'AWS', 'Team lead (5)'],
};

export const stages = [
  { id: 1, label: 'Warm-up & Background', weight: 10 },
  { id: 2, label: 'Technical Depth', weight: 35 },
  { id: 3, label: 'System Design', weight: 25 },
  { id: 4, label: 'Behavioral & Culture', weight: 20 },
  { id: 5, label: 'Wrap-up & Q&A', weight: 10 },
];

// Each turn = one interviewer question + the candidate's scripted answer + AI reaction
export const script = [
  {
    stage: 1,
    question:
      'Could you walk me through your background and what you have been focusing on over the last two years?',
    answer:
      "Sure. I have been working as a frontend engineer for about six years, the last three of them at a fintech product company. Over the past two years my focus has shifted from building screens to owning the frontend platform: we migrated a large React codebase to TypeScript, introduced a design system with about ninety shared components, and cut our build time from eleven minutes down to under three. I also lead a squad of five engineers, so a big part of my week is code review, architecture decisions and mentoring the two junior members of the team.",
    delta: { english: 6, technical: 4, communication: 7, structure: 5, confidence: 6, culture: 4 },
    insight: 'Strong opening. Quantified impact without prompting — good signal for ownership.',
    followUps: [
      'You mentioned cutting build time from 11 to 3 minutes — what were the two biggest wins there?',
      'How did you get buy-in from the team for the TypeScript migration?',
      'What does mentoring look like day to day for your two juniors?',
    ],
    next: 'Let us go deeper on the technical side. How do you approach performance optimisation in a large React application?',
  },
  {
    stage: 2,
    question:
      'How do you approach performance optimisation in a large React application?',
    answer:
      "I always start by measuring rather than guessing. We use the React Profiler plus real user monitoring, so we look at Interaction to Next Paint and Largest Contentful Paint from actual sessions, not just lab numbers. Once I know where the cost is, the fixes usually fall into three buckets. First, ship less JavaScript — route level code splitting, dynamic imports for heavy widgets like charts and editors. Second, render less — memoisation where the profiler proves it matters, virtualised lists for anything over a couple of hundred rows, and moving derived state out of render. Third, fetch smarter — request deduplication, cache-first with React Query, and streaming server rendering for the first paint. On our dashboard that combination took INP from around four hundred milliseconds to under one hundred and fifty.",
    delta: { english: 5, technical: 12, communication: 6, structure: 9, confidence: 5, culture: 2 },
    insight: 'Measure-first mindset, structured in three buckets, backed by metrics. Top-decile answer.',
    followUps: [
      'When has memoisation actually made performance worse in your experience?',
      'How do you decide between server-side rendering and client rendering for a new route?',
      'Walk me through how you virtualised that list — did you build or buy?',
    ],
    next: 'Interesting. Let us design something together: how would you architect a real-time collaborative dashboard for a thousand concurrent users?',
  },
  {
    stage: 3,
    question:
      'How would you architect a real-time collaborative dashboard used by a thousand concurrent users?',
    answer:
      "I would split it into three concerns: transport, state and conflict resolution. For transport I would use WebSockets through a managed gateway, with server-sent events as a fallback for restrictive corporate networks. A thousand concurrent connections is comfortable for a single node, but I would still put them behind a pub/sub layer like Redis so we can scale horizontally without sticky sessions. For state, the client keeps an optimistic local store and reconciles against server snapshots — the server stays the source of truth. For conflict resolution, if widgets are independent then last-write-wins per widget is honestly enough, and I would only reach for CRDTs if we need character level co-editing, because the complexity cost is real. I would also add a presence channel, throttle cursor updates to about twenty per second, and batch metric updates into one hundred millisecond windows so we do not melt the browser.",
    delta: { english: 6, technical: 10, communication: 5, structure: 8, confidence: 7, culture: 3 },
    insight: 'Chose the simple solution deliberately and justified the trade-off. Senior-level judgement.',
    followUps: [
      'What happens to the client state when a user is offline for two minutes and reconnects?',
      'How would you load test this before launch?',
      'Where would you put the authorisation checks in that pipeline?',
    ],
    next: 'Thanks. Now something behavioural: tell me about a time you disagreed with a technical decision made by your team.',
  },
  {
    stage: 4,
    question:
      'Tell me about a time you disagreed with a technical decision made by your team.',
    answer:
      "Last year the team wanted to adopt a micro-frontend architecture for a product with only four engineers on it. I felt the operational overhead would outweigh the benefit at that size. Instead of blocking it in a meeting, I asked for two weeks to build a small spike both ways and we compared them on three criteria we agreed on upfront: build and deploy time, onboarding time for a new engineer, and incident debugging. The modular monolith won on all three. What mattered more than being right was that the team owned the decision with data, so nobody felt overruled. We did keep one piece as a separate remote — the reporting module — because a different team owns it, and that boundary was genuine.",
    delta: { english: 5, technical: 4, communication: 9, structure: 7, confidence: 6, culture: 12 },
    insight: 'Disagreed with evidence, not authority. Strong collaboration and pragmatism signal.',
    followUps: [
      'How did the engineer who proposed micro-frontends react afterwards?',
      'Was there a decision where you ran that experiment and turned out to be wrong?',
      'How do you document decisions like that for people who join later?',
    ],
    next: 'Great. Last area — where do you want to grow in the next two years, and what would you want from CMC to get there?',
  },
  {
    stage: 4,
    question:
      'Where do you want to grow in the next two years, and what would you want from us to get there?',
    answer:
      "I want to move from leading a squad to shaping frontend architecture across multiple teams — the staff engineer track rather than people management. Concretely that means owning cross-cutting concerns: a shared component platform, performance budgets that are enforced in CI, and a migration strategy that other teams can actually follow. What I would want from CMC is exposure to larger scale than I have today, and a manager who will push work my way that is slightly beyond what I am comfortable with. I also enjoy the client facing side — I have run workshops with product stakeholders in English for the last two years, and I would like to keep doing that.",
    delta: { english: 7, technical: 3, communication: 8, structure: 6, confidence: 8, culture: 9 },
    insight: 'Clear career direction aligned with an IC track. English confidence in client-facing context.',
    followUps: [
      'What is one thing you tried to learn recently that did not go well?',
      'How comfortable are you presenting to a non-technical client stakeholder?',
      'What would make you turn down an offer from us?',
    ],
    next: 'That is everything from my side. Do you have questions for us about the team or the roadmap?',
  },
  {
    stage: 5,
    question: 'Do you have any questions for us about the team or the roadmap?',
    answer:
      "Yes, three. First, how is the frontend platform work funded — is it a dedicated team or is it borrowed time from product squads? Second, what does the release cadence look like today, and who owns production incidents out of hours? And third, for this role specifically, what would a successful first ninety days look like in your eyes? I ask because the fastest way for me to be useful is to know whether you want me stabilising something existing or opening a new area.",
    delta: { english: 4, technical: 2, communication: 6, structure: 5, confidence: 6, culture: 7 },
    insight: 'Questions focused on ownership and impact rather than perks. Recommend advancing to final round.',
    followUps: [
      'Ask about their notice period and expected compensation range.',
      'Confirm availability for a system design deep dive with the architecture team.',
      'Probe interest in relocation or on-site client work.',
    ],
    next: null,
  },
];

export const competencies = [
  { key: 'english', label: 'English fluency', short: 'English' },
  { key: 'technical', label: 'Technical depth', short: 'Technical' },
  { key: 'communication', label: 'Communication', short: 'Communication' },
  { key: 'structure', label: 'Structured thinking', short: 'Structure' },
  { key: 'confidence', label: 'Confidence', short: 'Confidence' },
  { key: 'culture', label: 'Culture fit', short: 'Culture' },
];

export const baseScores = {
  english: 42, technical: 38, communication: 40, structure: 35, confidence: 44, culture: 40,
};

export const keywordBank = [
  'TypeScript', 'design system', 'React Profiler', 'code splitting', 'INP',
  'WebSocket', 'Redis pub/sub', 'CRDT', 'optimistic UI', 'micro-frontend',
  'performance budget', 'mentoring', 'stakeholder workshop',
];
