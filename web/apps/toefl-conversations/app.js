/* Conversation Listening: short campus and daily-life conversations read by two voices. */
(function () {
  'use strict';
  const KIND = 'conversation';
  const items = (data) => SK.listeningItems(data.listening.filter((x) => x.kind === KIND));
  const TIPS = [['Listen for the problem', 'Most campus conversations start with a problem: a deadline, a form, a noise.'], ['Listen for the solution', 'The answer to "what will the student do next?" usually comes near the end.'], ['Notice who says what', 'Questions often ask what one speaker suggests or offers.']];
  const App = {
    about: 'Listen to original conversations between students, staff and professors, read aloud by two different computer voices, and answer questions on the problem, the details and what happens next.',
    how: ['Choose two different voices in the Voices section of the Listen and Choose a Response app, or use the defaults.', 'In **Practice**, press Play and listen before reading the questions.', 'After answering, open "Show what was said" to read the conversation.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { const all = items(ctx.data); SK.quizStarter(el, { title: 'Conversations', sizes: [2, 4, 8], make: (t, n, s) => SK.takeGroups(SK.rng(s), all, n), seconds: (n) => n * 60 }); } },
      { id: 'tips', label: 'Tips', render(el) { el.appendChild(SK.card('Listening for conversations', SK.table(['Tip', 'Why'], TIPS, false), SK.voicePicker())); } },
    ],
    items,
    checks: { 'every question carries the conversation lines': (data, assert) => { const all = items(data); assert.ok(all.length >= 6); for (const it of all) { assert.ok(it.audio.lines.length >= 4); assert.deepEqual(SK.validateItem(it), []); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
