
function isInteger(n) {
    return (n | 0) === n;
}


function even() {
    result = [];
    for (let i = 2; i <= 20; i += 2) {
      result.push(i);
    }
    return result;
  }


function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  }


function recSumTo(n) {
  if (n <= 1) return n;
  return n + recSumTo(n - 1);
}


function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}


function isBinary(n) {
  return n > 0 && (n & (n - 1)) === 0;
}


function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
  let storedValue = initialValue;
  return function (newValue) {
    if (typeof operatorFn !== "function") return storedValue;
    storedValue = operatorFn(storedValue, newValue);
    return storedValue;
  };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
  let current = start;
  return function () {
    const result = current;
    current += step;
    return result;
  };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    // Проверка, если оба значения равны и не являются объектами или равны (в т.ч. NaN === NaN)
    if (Object.is(firstObject, secondObject)) return true;
  
    // Если один из них не объект или является null, они не равны
    if (
      typeof firstObject !== "object" ||
      firstObject === null ||
      typeof secondObject !== "object" ||
      secondObject === null
    ) {
      return false;
    }
  
    // Получаем ключи обоих объектов
    const keysA = Object.keys(firstObject);
    const keysB = Object.keys(secondObject);
  
    // Проверка, имеют ли объекты одинаковое количество свойств
    if (keysA.length !== keysB.length) return false;
  
    // Рекурсивно проверяем каждое свойство
    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEqual(firstObject[key], secondObject[key])) {
        return false;
      }
    }
  
    return true;
  }
  
module.exports = {
  isInteger,
  even,
  sumTo,
  recSumTo,
  factorial,
  isBinary,
  fibonacci,
  getOperationFn,
  sequence,
  deepEqual,
};
