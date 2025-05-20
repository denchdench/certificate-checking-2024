const searchBtn = document.getElementById('searchBtn');
const indexInput = document.getElementById('indexInput');
const resultDiv = document.getElementById('result');
const feedbackSection = document.getElementById('feedbackSection');
const feedbackText = document.getElementById('feedbackText');
const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
const feedbackMsg = document.getElementById('feedbackMsg');

let currentStudent = null;

searchBtn.addEventListener('click', () => {
  const indexNumber = indexInput.value.trim().toUpperCase();
  if (!indexNumber) {
    alert('Please enter an index number.');
    return;
  }

  fetch('students.json')
    .then(response => response.json())
    .then(data => {
      const student = data.find(s => s.indexNumber === indexNumber);
      if (student) {
        currentStudent = student;
        resultDiv.textContent = `Index Number: ${student.indexNumber}
Surname: ${student.surname}
First Name: ${student.firstname}
Other Names: ${student.othernames}
Program: ${student.program}`;

        feedbackSection.classList.remove('hidden');
        feedbackText.value = '';
        feedbackMsg.textContent = '';
      } else {
        currentStudent = null;
        resultDiv.textContent = 'No student found with that index number.';
        feedbackSection.classList.add('hidden');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error loading student data.');
    });
});

submitFeedbackBtn.addEventListener('click', () => {
  const feedback = feedbackText.value.trim();
  if (!feedback) {
    alert('Please enter your feedback.');
    return;
  }

  // Here, you would normally send the feedback to a backend server or API.
  // For this demo, just show a thank you message and clear input.

  console.log('Feedback submitted for', currentStudent.indexNumber, ':', feedback);
  feedbackMsg.textContent = 'Thank you for your feedback!';
  feedbackText.value = '';
});
