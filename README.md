# CMC AI Interview Copilot — FE demo

Single-page React demo of an AI interview assistant for CMC Global. **Front-end only** — no
backend, no real speech recognition: every transcript, suggestion and score is scripted and
replayed with a token-by-token streaming effect, the way an LLM API response would arrive.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## Demo flow

One button drives the whole session (top of the centre column):

1. **Start Interview** — the interviewer question streams into the transcript.
2. **Capture Candidate Answer** — the candidate's answer streams in word by word while the
   live score, the six competency bars, the trajectory chart, the radar and the signal
   keywords all update in real time.
3. **Ask Next Question** — the copilot's analysis appears (AI read + recommended next
   question + three follow-ups), then moves to the next stage.

Six scripted turns cover all five interview stages and land the candidate around 86/100
("Strong hire"). Any follow-up card can be clicked to push that question into the transcript.
**Reset session** replays from zero.

## Structure

```
src/
  App.jsx                    session state machine + streaming/scoring engine
  data/interviewData.js      candidate, stages, 6 scripted Q&A turns, score deltas
  components/
    Header.jsx               brand bar, session meta, recording state
    CandidatePanel.jsx       profile, interview flow, signal keywords
    Transcript.jsx           streaming transcript + mic bar
    Suggestions.jsx          AI read, next question, follow-ups
    ScorePanel.jsx           gauge, competency bars, trajectory chart, radar
  index.css                  full design system (CMC blue / white)
```

Charts use `recharts`. Fits a single screen from 1280×800 upwards — no page scrolling.
