/**
 * @param {string} password
 * @return {number}
 */


const repeatingCharSteps = (password) => {
  let repeatingChars = password.match(/(.)\1{2,}/g);
  let steps = 0;
  if(repeatingChars){
    repeatingChars.map(item => {
      if(item.length > 5){
        steps = Math.floor(item.length/3);
        if(steps > 6){
          steps = 6;
        }
      }
      else{
        steps = 1;
      }
      return steps;
    })
  }
  return steps;
}

const repeatingCharType = (password) => {
  let lowerCase = password.match(/([a-z])\1{2,}/g);
  let upperCase = password.match(/([A-Z])\1{2,}/g);
  let num = password.match(/([0-9])\1{2,}/g);
  if(lowerCase && !upperCase && !num){
    return ["lowerCase"];
  }
  else if (upperCase && !lowerCase && !num){
    return ["upperCase"];
  }
  else if (num && !lowerCase && !upperCase){
    return ["num"];
  }
  else if (lowerCase && upperCase && !num){
    return ["lowerCase", "upperCase"];
  }
  else if (lowerCase && num && !upperCase){
    return ["lowerCase", "num"];
  }
  else if (upperCase && num && !lowerCase){
    return ["upperCase", "num"];
  }
  else if (upperCase && num && lowerCase){
    return ["lowerCase", "upperCase", "num"];
  }
  else{
    return [];
  }
}

var strongPasswordChecker = function(password) {
  let steps = 0;
  if(password.length <= 3){
    steps = 6-password.length;
    if(/(.)\1{2,}/.test(password)){
      steps++;
    }
  }
  else if(password.length === 4){
    steps = 2;
    if(/(.)\1{2,}/.test(password)){
      steps++;
    }
  }
  else if(password.length === 5){
    steps = 1;
  }
  else{
    if((password.length >= 6) && (password.length <= 20)){
      steps = 0;
    }
    else{ //password.length > 20
      steps = password.length-20;
    }
    let repCharSteps = repeatingCharSteps(password);
    let repCharType = repeatingCharType(password);
    // if(repCharSteps > 0 && !(repCharType.includes("lowerCase") || repCharType.includes("upperCase") || repCharType.includes("num"))){
    //   steps--;
    // }
    let charSteps = 0;
    if(!/[a-z]/.test(password)){
      charSteps++;
    }
    if(!/[A-Z]/.test(password)){
      charSteps++;
    }
    if(!/[0-9]/.test(password)){
      charSteps++;
    }
    console.log("String length:", password.length)
    console.log("missing char type:", charSteps)
    console.log("repeating pattern:", repCharSteps)
    console.log("steps:", steps)
    if(charSteps >= repCharSteps){
      steps += charSteps;
    }
    else{
      steps += repCharSteps;
    }
  }
  return steps;
};

console.log(strongPasswordChecker("####AS##"));
