export default {};

// ── Added: game config + question generation + XP calc ────────────
const _GAME_CONFIGS = {
  'math-blitz': { duration:60, questionCount:10, baseReward:10 },
  'word-rush':  { duration:60, questionCount:10, baseReward:10 },
  'gk-burst':   { duration:60, questionCount:10, baseReward:10 },
}

export function getGameConfig(gameId) {
  return _GAME_CONFIGS[gameId] || _GAME_CONFIGS['math-blitz']
}

export function getGameQuestions(gameId, level = 1, count) {
  const cfg = getGameConfig(gameId)
  const n = count || cfg.questionCount

  if (gameId === 'word-rush') {
    const bank = [
      { q:'Choose the correctly spelt word:', options:['Definitely','Definately','Definitly','Defenitely'], answer:'Definitely' },
      { q:'Choose the correctly spelt word:', options:['Necessary','Neccessary','Necesary','Neccesary'], answer:'Necessary' },
      { q:'Antonym of "Ancient":', options:['Modern','Old','Historic','Past'], answer:'Modern' },
      { q:'Synonym of "Happy":', options:['Joyful','Sad','Angry','Tired'], answer:'Joyful' },
    ]
    return Array.from({length:n}, (_,i) => ({ id:`wr_${i}`, ...bank[i % bank.length] }))
  }

  if (gameId === 'gk-burst') {
    const bank = [
      { q:'Capital of India?', options:['New Delhi','Mumbai','Kolkata','Chennai'], answer:'New Delhi' },
      { q:'National bird of India?', options:['Peacock','Sparrow','Eagle','Crow'], answer:'Peacock' },
      { q:'Who is known as Father of the Nation?', options:['Mahatma Gandhi','Nehru','Bose','Patel'], answer:'Mahatma Gandhi' },
      { q:'Longest river in India?', options:['Ganga','Yamuna','Godavari','Narmada'], answer:'Ganga' },
    ]
    return Array.from({length:n}, (_,i) => ({ id:`gk_${i}`, ...bank[i % bank.length] }))
  }

  // default: math-blitz
  return Array.from({length:n}, (_,i) => {
    const a = Math.floor(Math.random()*50)+1, b = Math.floor(Math.random()*50)+1
    const ops = ['+','-','×']
    const op = ops[Math.floor(Math.random()*ops.length)]
    const answer = op==='+' ? a+b : op==='-' ? a-b : a*b
    const wrongs = [answer+1, answer-1, answer+2].filter(w=>w!==answer)
    const options = [answer, ...wrongs.slice(0,3)].sort(()=>Math.random()-0.5)
    return { id:`mb_${i}`, q:`${a} ${op} ${b} = ?`, options, answer }
  })
}

export function calcGameXP({ correct = 0, total = 10, timeLeft = 0 } = {}) {
  const accuracy = total > 0 ? correct / total : 0
  const baseXP = correct * 5
  const speedBonus = Math.round(timeLeft / 2)
  const perfectBonus = accuracy === 1 ? 20 : 0
  return baseXP + speedBonus + perfectBonus
}
