export const calculateDeviation = (target: string, actual: string): string => {
  if (!target || !actual) return "";
  
  const targetNum = parseFloat(target);
  const actualNum = parseFloat(actual);
  
  if (isNaN(targetNum) || isNaN(actualNum) || targetNum === 0) return "";
  
  const deviation = ((actualNum - targetNum) / targetNum) * 100;
  return deviation.toFixed(2);
};