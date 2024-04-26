function toggleAnswer(question) {
    var answer = question.nextElementSibling;
    if (answer.style.display === "block") {
        answer.style.display = "none";
        question.classList.remove('active-question');
                  answer.classList.remove('active-answer');
    } else {
        answer.style.display = "block";
        question.classList.add('active-question');
                  answer.classList.add('active-answer');
    }
  }