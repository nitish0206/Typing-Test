let time = 0;
let words = 0;

let para =
  "In this story, an old man sets out to ask an African king to dig some wells in his village when their water runs dry. But first, he teaches the king a lesson in humility by showing him how all people help each other. Read the story to see how the clever old man gets the king to do as he asks!";


// Separating words into array of characters and apendding it into text box inside a span
let text_box = document.getElementsByClassName("text_area")[0];
let word_split = para.split(" ");
let letter_split = para.split("");
letter_split.forEach((ele) => {
  const span = document.createElement("span");
  span.classList.add("bgtrans");
  span.textContent = ele;
  text_box.appendChild(span);
});

// Getting all list of span into an array 
span_list = text_box.querySelectorAll("span");

//function to set time 
function settime(b) {
  time = parseInt(b);
  words=0;
}


//function to set words
function setword(b) {
  words = parseInt(b);
  time=0;
}



let timediv = document.querySelector(".container");
let buttons = timediv.querySelectorAll(".timebutton");
let wordbutton = timediv.querySelectorAll(".wordbutton");
let inputs = timediv.querySelectorAll("input");

inputs.forEach((ele) => {
  ele.value = 0;
});

inputs[0].addEventListener("input", () => {
  inputs[1].value = 0;
  removeclass(buttons);
  removeclass(wordbutton);
});
inputs[1].addEventListener("input", () => {
  inputs[0].value = 0;
  removeclass(buttons);
  removeclass(wordbutton);
});

function removeclass(arr) {
  arr.forEach((ele) => {
    if (ele.classList.length == 2) ele.classList.remove("selected");
  });
}

buttons.forEach((b) => {
  b.addEventListener("click", () => {
    time = b.textContent;
    removeclass(buttons);
    removeclass(wordbutton);
    b.classList.add("selected");
    settime(time);
  });
});

wordbutton.forEach((b) => {
  b.addEventListener("click", () => {
    words = b.textContent;
    removeclass(wordbutton);
    removeclass(buttons);
    b.classList.add("selected");
    setword(words);
  });
});

function retest(){
  document.getElementById("start_button").disabled=false;
  document.getElementsByClassName("start")[0].style.visibility="visible";
  document.getElementsByClassName("container")[0].style.visibility="visible";
  document.getElementsByClassName("test_box")[0].style.visibility = "hidden";
  document.getElementsByClassName("main_result_box")[0].style.visibility="hidden";

}


function showResult(time,words,speed,correct_words,accuracy){
  document.getElementsByClassName("start")[0].style.visibility="hidden";
  document.getElementsByClassName("test_box")[0].style.visibility = "hidden";
  document.getElementsByClassName("main_result_box")[0].style.visibility="visible";
  let result_span=document.querySelectorAll(".main_result_box span")
  result_span[0].innerText=`Time Taken: ${Math.floor(time)} s`;
  result_span[1].innerText=`Words Typed: ${Math.floor(words)}`;
  result_span[2].innerText=`Speed: ${Math.floor(speed)} WPM`;
  result_span[3].innerText=`Correct Words: ${Math.floor(correct_words)}`;
  result_span[4].innerText=`Errors: ${Math.floor(words-correct_words)}`;
  result_span[5].innerText=`Accuracy: ${Math.floor(accuracy)}%`;
}

function add_letter_logo(){
  document.getElementsByClassName("currtime")[0].innerHTML=`${0}/${words}`
  const video = document.querySelector('video');
  if (video) {
    const image = document.createElement('img');
    image.src = './A-Letter-PNG-Picture-2345049081.png'; // 
    image.classList.add("timer","bgtrans");
    image.style.height="50px";
    image.style.width="50px";
    image.style.marginLeft="5px";
    video.parentElement.replaceChild(image,video)
  }
}


function activeTestWords() {
  let time = 0;
  let currwords = 0;
  let errors = 0;
  let i = 0;
  
  add_letter_logo();

  let intervalID = setInterval(() => {
    time++;
    if(currwordswords==0){
      return;
    }

    document.getElementsByClassName(
      "gross_speed"
    )[0].innerHTML = `Gross: ${parseInt((currwords * 12) / time)}`;
    document.getElementsByClassName(
      "accuracy"
    )[0].innerHTML = `Accuracy: ${parseInt(
      ((currwords - errors) / currwords) * 100
    )}%`;
    document.getElementsByClassName(
      "net_speed"
    )[0].innerHTML = `Net: ${Math.floor(
      parseInt((currwords - errors) * 12) / time
    )}`;
    document.getElementsByClassName("error")[0].innerHTML = `Errors: ${errors}`;
    if (currwords == words) {
      clearInterval(intervalID);
    }
  }, 1000);

  document.addEventListener("keydown", function handleKeyDown(event) {
    if(currwords == words) {
      document.removeEventListener("keydown", handleKeyDown);
      showResult(time,words,((currwords - errors) / currwords) * 100,currwords-errors,((currwords - errors) / currwords) * 100);
    }
    if (event.key == "Shift" || event.key == "Casplock") return;
    if (event.key === "Backspace") {
      if (i == 0) return;
      currwords--;
      if (span_list[i - 1].classList.contains("incorrect")) {
        errors--;  
      }
      span_list[i-1].removeAttribute('class');
      span_list[i-1].classList.add("bgtrans");
      i--;
      document.getElementsByClassName(
        "currtime"
      )[0].innerHTML = `${currwords}/${words}`;
      return;
    }

    if (event.key == span_list[i].innerText) {
      currwords++;
      span_list[i].classList.add("correct");
      i++;
    } else if (event.key != span_list[i].innerText) {
      errors++;
      currwords++;  
      if(span_list[i].innerText==' '){
        span_list[i].classList.add("incorrectSpace");
      }
      else{
        span_list[i].classList.add("incorrect");
      }
      i++;
    }
    document.getElementsByClassName(
      "currtime"
    )[0].innerHTML = `${currwords}/${words}`;
  });
}

function activeTest() {
  let words = 0;
  let errors = 0;
  let i = 0;
  let temp = time;

  let intervalID = setInterval(() => {
    
    document.getElementsByClassName("currtime")[0].innerHTML = `${Math.floor(
      time / 60
    )}:${time % 60}`;
    if(words==0){
      time--;
      return;
    }
    document.getElementsByClassName(
      "gross_speed"
    )[0].innerHTML = `Gross: ${parseInt((words * 12) / (temp - time))}`;
    document.getElementsByClassName(
      "accuracy"
    )[0].innerHTML = `Accuracy: ${parseInt(((words - errors) / words) * 100)}%`;
    document.getElementsByClassName(
      "net_speed"
    )[0].innerHTML = `Net: ${Math.floor(
      parseInt((words - errors) * 12) / (temp - time)
    )}`;
    document.getElementsByClassName("error")[0].innerHTML = `Errors: ${errors}`;
    if (time == 0) {
      clearInterval(intervalID);
      document.removeEventListener("keydown", () => {});
    }
    time--;
  }, 1000);

  document.addEventListener("keydown", function handleKeyDown(event) {
    if(time == 0) {

      document.removeEventListener("keydown", handleKeyDown)
      showResult(temp,words,((words - errors) * 12) / (temp - time),words-errors,((words - errors) / words) * 100);
    }
    if (event.key == "Shift" || event.key == "Casplock") return;
    if (event.key === "Backspace") {
      if (i == 0) return;
      words--;
      if (span_list[i - 1].classList.contains("incorrect") || span_list[i - 1].classList.contains("incorrectSpace")) {
        errors--;  
      }
      span_list[i-1].removeAttribute('class');
      span_list[i-1].classList.add("bgtrans");
      i--;
      return;
    }
    console.log(event.key == span_list[i].innerText);
    if (event.key == span_list[i].innerText) {
      words++;
      span_list[i].classList.add("correct");
      i++;
    } else if (event.key != span_list[i].innerText) {
      errors++;
      words++;
      if(span_list[i].innerText==' '){
        span_list[i].classList.add("incorrectSpace");
      }
      else{
        span_list[i].classList.add("incorrect");
      }
      i++;
    }
  });
}

function showtestpage(button) {
  if (time == 0 && words == 0) {
    alert("Please Select a Valid Time or Words");
    return;
  }
  button.disabled = true;
  button.style.visibility="hidden";
  if (inputs[0].value != 0) {
    settime(inputs[0].value);
  }
  if (inputs[1].value != 0) {
    setword(inputs[1].value);
    button.disabled = true;
    document.getElementsByClassName("container")[0].style.visibility = "hidden";
    document.getElementsByClassName("test_box")[0].style.visibility = "visible";
    activeTestWords();
    return;
  }
  document.getElementsByClassName("container")[0].style.visibility = "hidden";
  document.getElementsByClassName("test_box")[0].style.visibility = "visible";
  if(words!=0){
    activeTestWords();
    return;
  }
  activeTest();
}
