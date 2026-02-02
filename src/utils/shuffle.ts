export function shuffleNumbers(count: number) {
  const numbers = Array.from({ length: count }, (_, i) => i + 1)
  for (let i = numbers.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = numbers[i]
    numbers[i] = numbers[j]
    numbers[j] = temp
  }
  return numbers
}
