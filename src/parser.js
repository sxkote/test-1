function parseCSVData(content, removeFirstRowsCount = 0) {
  const data = content.split('\n').map((row) => row.split('|').map((cell) => cell.trim()));

  if (removeFirstRowsCount > 0) {
    data.splice(0, removeFirstRowsCount);
  }

  return data;
}

export default parseCSVData;
