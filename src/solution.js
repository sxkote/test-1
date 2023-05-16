import _ from 'lodash';
import parseCSVData from './parser.js';

function addTagCount(result, tag) {
  const value = tag.toLowerCase().trim();
  const item = result.find((i) => i[0] === value);
  if (item !== undefined) item[1] += 1;
  else result.push([value, 1]);
}

function getMaxTag(result) {
  const maxValue = result.reduce((res, cur) => (res > cur[1] ? res : cur[1]), 0);
  return result.filter((i) => i[1] === maxValue)[0];
}

function solution(content) {
  const data = parseCSVData(content, 2)
    .map((i) => {
      // eslint-disable-next-line no-param-reassign
      i[1] = _.capitalize(i[1].trim());
      return i;
    })
    .sort((a, b) => (a[1] < b[1] ? -1 : 1));

  console.log('1. Количество растений: \t', data.length);

  console.log('2. Список растений: ');
  console.log(data.map((i) => i[1]).join(', '));

  const dangerCount = data.filter((i) => i[5].toLowerCase() === 'да').length;
  const notDangerCount = data.filter((i) => i[5].toLowerCase() === 'нет').length;

  console.log(
    '3. Опасных растений: \t',
    Math.round((dangerCount * 100.0) / data.length, 2),
    '\n',
    '  Неопасных растений: \t',
    Math.round((notDangerCount * 100.0) / data.length, 2),
  );

  const forestItems = data.filter((i) => i[2].toLowerCase().indexOf('лес') >= 0);
  const forestValues = forestItems.map((i) => {
    const match = i[4].match(/\d+/g);
    return match.length > 1 ? (Number(match[0]) + Number(match[1])) / 2.0 : Number(match[0]);
  });

  console.log(
    '4. Среднее время жизни лесных растений: \t',
    Math.round(_.sum(forestValues) / forestValues.length, 2),
  );

  const dangerPlaces = [];
  data
    .filter((i) => i[5].toLowerCase() === 'да')
    .forEach((i) => {
      i[2].split(',').forEach((t) => addTagCount(dangerPlaces, t));
    });
  const badPlace = getMaxTag(dangerPlaces);

  console.log('5. Опасные растения чаще обитают в: \t', badPlace[0], badPlace[1]);
}

export default solution;
