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

/**
 * Simplified function for adding the characters to the password depending on the allowed character types
 *
 * @param start - the Starting index of the for loop
 * @param end - the Ending index of the for loop
 * @param fromCharCode - if this is true it converts the start and end variables in to their charCode equivilent
 * @param fromArray - if this is specified then it will grab the values its adding from an array/string
 */
function addCharacters(start, end, fromCharCode = false, fromArray = null) {
  let string = '';
  // made to randomly go through each list at a set increment
  const incrementor = Math.ceil(Math.random() * 3);

  if (fromCharCode) {
    start = start.charCodeAt(0);
    end = end.charCodeAt(0);
  }

  for (let i = start; i <= end; i += incrementor) {
    // checks if fromCharCode is true if it is then is converts i back to its letter equivelent
    // if its false it now checks if it's grabbing the data from and array or not if not it just returns i
    fromCharCode
      ? (string += String.fromCharCode(i))
      : (string += fromArray ? fromArray[i] : i);
  }

  return string;
}

// The main function for generating the password
function generatePassword() {
  // length of at least 8 characters and no more than 128 characters
  // Grabbing the Password Length defined by the user input
  // I used the Number constructor here so that if they didnt give me a number it would throw an NaN
  let passwordLength = Number(prompt('Password Length: (MIN:8, MAX:128)'));

  //Then I am going to check the passwordLength given
  //First I want to check if the User gave me a valid Number so !passwordLength will check if its empty and if it is NaN
  // Then I wanted to make sure it matched the criteria so I am using and or block to check if its larger than the MIN
  // and smaller than the MAX only after the passwordLength has been checked for being a number.
  while (!passwordLength || passwordLength < MIN || passwordLength > MAX) {
    passwordLength = Number(
      prompt('Must Be a number, less than 128 and greater than 8'),
    );
  }

  // Here I set a charTypes object that holds all the valid character types that we will be asking for
  // the keys for the object are the types we will be asking for and the values are determined by the user once they go through each prompt
  const charTypes = {
    lowercase: confirm('Include Lower Case Characters?'),
    uppercase: confirm('Include Upper Case Characters?'),
    numeric: confirm('Include Numeric Characters?'),
    specialChars: confirm('Include Special Characters?'),
  };

  // Now Im setting a boolean to set to false if the user doesnt pass the required conditions
  let isValid = false;

  //Here I am using the Object Constructor with the keys function to get all the keys of my charTypes object
  // into an array then I am going to map over each key in that array.
  Object.keys(charTypes).map((key) => {
    //Then I am going to check the charTypes object with the key specified
    //if any of them are true then isValid gets changed to true.
    //but if none of them are true then is valid stays false.
    if (charTypes[key]) isValid = true;
  });

  // Now after I've checked all the charTypes if none of them are true then
  // I am going to alert the user that they need to pick at least 1
  // and then restart the generatePassword function
  if (!isValid) {
    alert('Must Have at least one Character Type confirmed');
    generatePassword();
  }

  // This function now uses all the info above to construct the password for the use based off their criteria
  function makePassword() {
    // making a local string variable so im not mutating data from outside
    let string = '';

    // Now Im going to check against each of the charTypes and see which ones were selected
    // If the charType is selected then go ahead and add letters of that charType to the string

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

  // Now I'm setting a random password variable to the makePassword function to get the value back
  // Also giving the password a little shuffle while im at it to add more randomness
  let randomPasword = shuffle(makePassword());

  //Here I just want to make sure that I'm giving the user the correct length they asked for
  // so I am checking the randomPasswords length against the user specified passwordLength
  // and if the randomPassword is smaller than the passwordLength then add another shuffled makePassword string onto it
  // keep doing this till its bigger than the passwordLength
  while (randomPasword.length < passwordLength) {
    // Also giving the password a little shuffle while im at it to add more randomness
    randomPasword += shuffle(makePassword());
  }

  // Also another shuffle for even more randomness and also one last length security and if the randomPassword has too many
  // letters I want to slice the randomPassword at exactly the length that the user specified.
  // and now we know its gonna be over the passwordLength because we kept adding more letters to it if it wasn't
  return shuffle(randomPasword).slice(0, passwordLength);
}
