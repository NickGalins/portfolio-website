// =============================================================================
// STYLE GUIDE EDITOR — Client-side logic
// =============================================================================
// Handles content type selection, API calls, and result rendering
// for the AI Style Guide Editor project page.
// =============================================================================

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // Example copy per content type (pre-populated so the demo works instantly)
  // -------------------------------------------------------------------------

  const EXAMPLES = {
    'error-message': `Error: An unexpected error has occurred while attempting to process your request. The system was unable to complete the operation you were trying to perform. Please contact your system administrator if the problem persists, or try again later. Error Code: 0x80070005.`,

    'ui-label': `Click Here To Submit Your Application
OK
Settings & Preferences
Log-In To Your Account
View The Status Of Your Request
Dont Forget To Save`,

    'help-documentation': `In order to create a new project, the user should first navigate to the Dashboard page. Once you are on the Dashboard page, there will be a button that says "New Project" that can be clicked. After clicking on the button, a dialog box will appear where the user needs to fill in the required information. Please make sure that all of the fields are filled in before the form is submitted. If there is a problem, an error will be displayed.`,
  };

  // -------------------------------------------------------------------------
  // DOM references
  // -------------------------------------------------------------------------

  const contentTypeSelect = document.getElementById('content-type-select');
  const copyInput = document.getElementById('copy-input');
  const charCount = document.getElementById('char-count');
  const checkBtn = document.getElementById('check-style-btn');
  const resultsSection = document.getElementById('results-section');
  const loadingSection = document.getElementById('loading-section');
  const errorSection = document.getElementById('error-section');
  const errorText = document.getElementById('error-text');
  const revisedCopy = document.getElementById('revised-copy');
  const changesBlock = document.getElementById('changes-block');
  const changesList = document.getElementById('changes-list');
  const summaryText = document.getElementById('summary-text');

  // Bail out if we're not on the style editor page
  if (!contentTypeSelect || !copyInput || !checkBtn) return;

  // -------------------------------------------------------------------------
  // Populate example text on load and content type change
  // -------------------------------------------------------------------------

  function loadExample() {
    const type = contentTypeSelect.value;
    copyInput.value = EXAMPLES[type] || '';
    updateCharCount();
  }

  function updateCharCount() {
    charCount.textContent = copyInput.value.length;
  }

  // Set initial example
  loadExample();

  contentTypeSelect.addEventListener('change', loadExample);
  copyInput.addEventListener('input', updateCharCount);

  // -------------------------------------------------------------------------
  // Submit handler
  // -------------------------------------------------------------------------

  checkBtn.addEventListener('click', async () => {
    const text = copyInput.value.trim();
    const contentType = contentTypeSelect.value;

    // Validate
    if (!text) {
      showError('Enter some copy to check.');
      return;
    }

    // Show loading, hide previous results
    resultsSection.style.display = 'none';
    errorSection.style.display = 'none';
    loadingSection.style.display = 'flex';
    checkBtn.disabled = true;
    checkBtn.textContent = 'Checking...';

    try {
      const response = await fetch('/api/style-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType, text }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.error || 'Something went wrong. Try again.');
        return;
      }

      renderResults(data);
    } catch (err) {
      showError('Could not connect to the style checker. Check your connection and try again.');
    } finally {
      loadingSection.style.display = 'none';
      checkBtn.disabled = false;
      checkBtn.textContent = 'Check style';
    }
  });

  // -------------------------------------------------------------------------
  // Render results
  // -------------------------------------------------------------------------

  function renderResults(data) {
    // Revised copy (parse basic markdown bold/italic)
    revisedCopy.innerHTML = formatMarkdown(data.revised || '');

    // Changes list
    changesList.innerHTML = '';
    if (data.changes && data.changes.length > 0) {
      changesBlock.style.display = 'block';
      data.changes.forEach((change, i) => {
        const card = document.createElement('div');
        card.className = 'style-editor__change-card';
        card.innerHTML = `
          <div class="style-editor__change-number">${i + 1}</div>
          <div class="style-editor__change-content">
            <div class="style-editor__change-diff">
              <div class="style-editor__change-before"><span class="style-editor__diff-label">Before:</span> ${escapeHtml(change.original)}</div>
              <div class="style-editor__change-after"><span class="style-editor__diff-label">After:</span> ${escapeHtml(change.revised)}</div>
            </div>
            <div class="style-editor__change-rule">${escapeHtml(change.rule)}</div>
            <div class="style-editor__change-explanation">${escapeHtml(change.explanation)}</div>
          </div>
        `;
        changesList.appendChild(card);
      });
    } else {
      changesBlock.style.display = 'none';
    }

    // Summary
    summaryText.textContent = data.summary || '';

    // Show results
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // -------------------------------------------------------------------------
  // Error display
  // -------------------------------------------------------------------------

  function showError(message) {
    loadingSection.style.display = 'none';
    resultsSection.style.display = 'none';
    errorSection.style.display = 'block';
    errorText.textContent = message;
    checkBtn.disabled = false;
    checkBtn.textContent = 'Check style';
  }

  // -------------------------------------------------------------------------
  // Utility
  // -------------------------------------------------------------------------

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatMarkdown(str) {
    // Escape HTML first, then convert markdown bold/italic to tags
    let safe = escapeHtml(str);
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Preserve line breaks
    safe = safe.replace(/\n/g, '<br>');
    return safe;
  }
})();
