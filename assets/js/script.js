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
      string += addCharacters('a', 'z', true);
    }
    if (charTypes.uppercase) {
      string += addCharacters('A', 'Z', true);
    }
    if (charTypes.numeric) {
      string += addCharacters(0, 9);
    }
    if (charTypes.specialChars) {
      string += addCharacters(
        0,
        SPECIAL_CHARS.length - 1,
        false,
        SPECIAL_CHARS,
      );
    }
    return string;
  }

  let randomPasword = shuffle(makePassword());

  while (randomPasword.length < passwordLength) {
    randomPasword += shuffle(makePassword());
  }

  return shuffle(randomPasword).slice(0, passwordLength);
}
