  var number = '';
  var miniDispTemp = [];
  var miniDisp = "";
  var result = null;
  $(document).ready(function() {
      $("button").on('click', function() {
          var userInput = $(this).text();

          if (number.length < 9) {
              if (isValidInput(userInput)) {
                  number += userInput;
                  $('#display').val(number);
              }
          }

          if (userInput.match(/=|\+|-|\*|\/$/)) {

              // if user pressed an operator other than equal sign
              if (userInput !== "=") {
                  // don't add an empty number to the display array
                  if (number !== "")
                      miniDispTemp.push(number);
                  // don't add consectuiive operators to the array because it will break
                  // eval function but rather change the operator into the new operator
                  // chosen by replacing it in the array
                  if (!isNaN(miniDispTemp.slice(-1)[0]))
                      miniDispTemp.push(userInput);
                  else
                      miniDispTemp[miniDispTemp.length - 1] = userInput;

                  // Merge array of numbers and operators into a string
                  // and display it
                  miniDisp = miniDispTemp.join("");
                  $('#mini-display').text(miniDisp);
              } else {
                  miniDispTemp.push(number);
                  miniDisp = miniDispTemp.join("");

                  result = (eval(miniDisp));
                  $('#display').val(result);
                  miniDispTemp = [result];
                  $('#mini-display').text("");
              }

              number = "";
          }
          // reset calculator
          if (userInput === "C") {
              number = "";
              miniDispTemp = [];
              miniDisp = "";
              $('#mini-display').text("");
              $('#display').val(0);
              result =null;
          }
          if (userInput === "." && result!=null) {
              number = "0.";
              miniDispTemp = [];
              miniDisp = number;
              $('#mini-display').text(miniDispTemp);
              $('#display').val(number);
              result=null;
          }
      });
  });

  // When inputing a number prevent userInputs var from being
  // added to the temporary number and prevent multiple commas in userInputs
  function isValidInput(numberut) {
      return !isNaN(numberut) || numberut === "." && !number.includes(".");
  }
