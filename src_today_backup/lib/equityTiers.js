export default {};

// ── Added: 8 free-access tiers (Agrarian removed per brand rules) ─
export const EQUITY_TIERS = [
  { id:'hope-scholar',  name:'Hope Scholar',                emoji:'🎓',  desc:'Below poverty line / BPL card holders',         requiresDoc:true  },
  { id:'divyang',       name:'Divyang Warrior',             emoji:'♿',  desc:'UDID verified — full accessibility + Pro',       requiresDoc:true  },
  { id:'swachhta',      name:'Swachhta Warrior',            emoji:'🧹',  desc:'Sanitation workers & their families',            requiresDoc:true  },
  { id:'veer-nari',     name:"Veer Nari / Martyr's Family", emoji:'🕊️', desc:'Defence & police martyr families',               requiresDoc:true  },
  { id:'transgender',   name:'Transgender Youth',           emoji:'🏳️‍⚧️', desc:'Full access, no questions asked',             requiresDoc:false },
  { id:'military',      name:'Active Military',             emoji:'🪖',  desc:'Serving personnel — 30% discount',               requiresDoc:true  },
  { id:'asha',          name:'ASHA/Anganwadi Worker',       emoji:'🌾',  desc:'Healthcare frontline workers',                   requiresDoc:true  },
  { id:'first-gen',     name:'First-Generation Learner',    emoji:'📚',  desc:'First in family pursuing higher education',      requiresDoc:false },
]
