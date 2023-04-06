const SPECIAL_CHARS = ` !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;

const MIN = 8;
const MAX = 128;

// Assignment Code
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

// A Shuffle function that I grabbed off of stack overflow for shuffling strings
// https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
function shuffle(string) {
  let a = string.split(''),
    n = a.length;

  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join('');
}

function addCharacters(start, end, fromCharCode = false, fromArray = null) {
  let string = '';
  const incrementor = Math.ceil(Math.random() * 3);

  if (fromCharCode) {
    start = start.charCodeAt(0);
    end = end.charCodeAt(0);
  }

  for (let i = start; i <= end; i += incrementor) {
    fromCharCode
      ? (string += String.fromCharCode(i))
      : (string += fromArray ? fromArray[i] : i);
  }

  return string;
}

function generatePassword() {
  let passwordLength = Number(prompt('Password Length: (MIN:8, MAX:128)'));

  while (!passwordLength || passwordLength < MIN || passwordLength > MAX) {
    passwordLength = Number(
      prompt('Must Be a number, less than 128 and greater than 8'),
    );
  }

  const charTypes = {
    lowercase: confirm('Include Lower Case Characters?'),
    uppercase: confirm('Include Upper Case Characters?'),
    numeric: confirm('Include Numeric Characters?'),
    specialChars: confirm('Include Special Characters?'),
  };

  let isValid = false;

  Object.keys(charTypes).map((key) => {
    if (charTypes[key]) isValid = true;
  });
  if (!isValid) {
    alert('Must Have at least one Character Type confirmed');
    generatePassword();
  }

  function makePassword() {
    let string = '';

    if (charTypes.lowercase) {
      const incrementor = Math.ceil(Math.random() * 3);

      for (
        let i = 'a'.charCodeAt(0);
        i <= 'z'.charCodeAt(0);
        i += incrementor
      ) {
        string += String.fromCharCode(i);
      }
    }
    if (charTypes.uppercase) {
      const incrementor = Math.ceil(Math.random() * 3);

      for (
        let i = 'A'.charCodeAt(0);
        i <= 'Z'.charCodeAt(0);
        i += incrementor
      ) {
        string += String.fromCharCode(i);
      }
    }
    if (charTypes.numeric) {
      const incrementor = Math.ceil(Math.random() * 3);

      for (let i = 0; i <= 9; i += incrementor) {
        string += i;
      }
    }
    if (charTypes.specialChars) {
      const incrementor = Math.ceil(Math.random() * 3);

      for (let i = 0; i <= SPECIAL_CHARS.length; i += incrementor) {
        string += SPECIAL_CHARS[i];
      }
    }
    return string;
  }

  let randomPasword = shuffle(makePassword());

  while (randomPasword.length < passwordLength) {
    randomPasword += shuffle(makePassword());
  }

  return shuffle(randomPasword).slice(0, passwordLength);
}
