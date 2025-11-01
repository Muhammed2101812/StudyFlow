/**
 * Calculate net score from correct and wrong answers
 * @param {number} correct - Number of correct answers
 * @param {number} wrong - Number of wrong answers
 * @param {boolean} penaltyEnabled - Whether wrong answers reduce the score
 * @returns {number} Net score
 */
export function calculateNet(correct, wrong, penaltyEnabled = true) {
  if (!penaltyEnabled) {
    return correct;
  }

  const net = correct - wrong / 4;
  return Math.max(0, parseFloat(net.toFixed(2)));
}

/**
 * Calculate total net from multiple question sets
 * @param {Array} questionSets - Array of question set objects
 * @returns {number} Total net score
 */
export function calculateTotalNet(questionSets) {
  return questionSets.reduce((total, set) => {
    return total + calculateNet(set.correct, set.wrong, set.penaltyEnabled);
  }, 0);
}

/**
 * Calculate success rate percentage
 * @param {number} correct - Number of correct answers
 * @param {number} total - Total number of questions
 * @returns {number} Success rate as percentage
 */
export function calculateSuccessRate(correct, total) {
  if (total === 0) return 0;
  return parseFloat(((correct / total) * 100).toFixed(2));
}
