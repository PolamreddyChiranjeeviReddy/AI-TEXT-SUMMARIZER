
// Select relevant HTML elements
const textArea = document.getElementById('text_to_summarize');
const submitButton = document.getElementById('submit-button');
const outputDiv = document.getElementById('summary');

// Disable the submit button initially
submitButton.disabled = true;

// Verify text length in the textarea
function verifyTextLength(e) {
  const textarea = e.target;

  // Check if the text length is between 200 and 100,000 characters
  if (textarea.value.length >= 200 && textarea.value.length <= 100000) {
    submitButton.disabled = false; // Enable the submit button
  } else {
    submitButton.disabled = true; // Disable the submit button
  }
}

// Submit the data for summarization
async function submitData() {
  // Add a loading state to the button
  submitButton.classList.add("submit-button--loading");

  // Get the text to summarize from the textarea
  const textToSummarize = textArea.value;

  try {
    // Make a POST request to the backend /summarize endpoint
    const response = await fetch('https://ai-text-summarizer-backend-bx50.onrender.com', {


      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text_to_summarize: textToSummarize }),
    });

    // Handle the response
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      outputDiv.innerHTML = `Summary:\n${data.summary}`;
    } else {
      outputDiv.innerHTML = `<p>Error: Unable to generate summary. Please try again later.</p>`;
    }
  } catch (error) {
    console.error('Error:', error);
    outputDiv.innerHTML = `<p>Error: Something went wrong. Please try again later.</p>`;
  } finally {
    // Remove the loading state from the button
    submitButton.classList.remove("submit-button--loading");
  }
}

// Attach event listeners
textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);




