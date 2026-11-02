/** Utilidades para turnos simulados (agenda determinística, sin backend) */
export type Day = { date: Date; key: string; dow: string; num: number; month: string; closed: boolean }

const DOW = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MON = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export function nextDays(n = 14, closedDows: number[] = [0]): Day[] {
  const out: Day[] = []
  const base = new Date()
  base.setHours(0, 0, 0, 0)
  for (let i = 0; i < n; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    out.push({
      date: d,
      key: d.toISOString().slice(0, 10),
      dow: i === 0 ? 'Hoy' : i === 1 ? 'Mañ' : DOW[d.getDay()],
      num: d.getDate(),
      month: MON[d.getMonth()],
      closed: closedDows.includes(d.getDay()),
    })
  }
  return out
}

/** Genera horarios y marca algunos como ocupados (pseudoaleatorio estable por día) */
export function slotsFor(dayKey: string, from = 9, to = 20, stepMin = 30, seed = 1) {
  const slots: { time: string; taken: boolean }[] = []
  let h = hash(dayKey) + seed * 97
  const now = new Date()
  const isToday = dayKey === new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  for (let m = from * 60; m < to * 60; m += stepMin) {
    h = (h * 1103515245 + 12345) & 0x7fffffff
    const past = isToday && m <= now.getHours() * 60 + now.getMinutes() + 30
    slots.push({ time: `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`, taken: past || h % 100 < 35 })
  }
  return slots
}

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export const longDate = (d: Date) => {
  const s = d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })
  return s.charAt(0).toUpperCase() + s.slice(1)
}
