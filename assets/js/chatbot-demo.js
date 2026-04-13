// =============================================================================
// GSKIFLIX SUPPORT CHATBOT — Client-side logic
// =============================================================================
// Handles multi-turn conversation with the /api/chat endpoint,
// message rendering, suggestion chips, and conversation management.
// =============================================================================

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // DOM references
  // -------------------------------------------------------------------------

  const messagesContainer = document.getElementById('chatbot-messages');
  const inputField = document.getElementById('chatbot-input');
  const sendButton = document.getElementById('chatbot-send');
  const restartButton = document.getElementById('chatbot-restart');
  const suggestionsContainer = document.getElementById('chatbot-suggestions');
  const suggestionChips = document.querySelectorAll('.chatbot-demo__chip');

  // Bail out if we're not on the chatbot page
  if (!messagesContainer || !inputField || !sendButton) return;

  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------

  let conversationHistory = [];
  let isWaiting = false;

  // -------------------------------------------------------------------------
  // Initialize — show welcome message
  // -------------------------------------------------------------------------

  addBotMessage("Hey there! I'm Gski, your GskiFlix support assistant. What can I help you with today?");

  // -------------------------------------------------------------------------
  // Event listeners
  // -------------------------------------------------------------------------

  sendButton.addEventListener('click', handleSend);

  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // Auto-resize textarea as user types
  inputField.addEventListener('input', () => {
    inputField.style.height = 'auto';
    inputField.style.height = Math.min(inputField.scrollHeight, 120) + 'px';
  });

  restartButton.addEventListener('click', () => {
    conversationHistory = [];
    messagesContainer.innerHTML = '';
    suggestionsContainer.style.display = '';
    inputField.value = '';
    inputField.style.height = 'auto';
    addBotMessage("Hey there! I'm Gski, your GskiFlix support assistant. What can I help you with today?");
    inputField.focus();
  });

  suggestionChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const message = chip.getAttribute('data-message');
      if (message && !isWaiting) {
        inputField.value = message;
        handleSend();
      }
    });
  });

  // -------------------------------------------------------------------------
  // Send message
  // -------------------------------------------------------------------------

  async function handleSend() {
    const text = inputField.value.trim();
    if (!text || isWaiting) return;

    // Hide suggestions after first message
    suggestionsContainer.style.display = 'none';

    // Add user message to UI and history
    addUserMessage(text);
    conversationHistory.push({ role: 'user', content: text });

    // Clear input
    inputField.value = '';
    inputField.style.height = 'auto';

    // Show typing indicator
    isWaiting = true;
    sendButton.disabled = true;
    const typingEl = addTypingIndicator();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      const data = await response.json();

      // Remove typing indicator
      typingEl.remove();

      if (!response.ok) {
        addBotMessage(data.error || 'Something went wrong. Try sending your message again.');
        return;
      }

      const reply = data.reply;
      conversationHistory.push({ role: 'assistant', content: reply });
      addBotMessage(reply);
    } catch (err) {
      typingEl.remove();
      addBotMessage("I'm having trouble connecting right now. Check your connection and try again.");
    } finally {
      isWaiting = false;
      sendButton.disabled = false;
      inputField.focus();
    }
  }

  // -------------------------------------------------------------------------
  // Message rendering
  // -------------------------------------------------------------------------

  function addUserMessage(text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'chatbot-demo__message chatbot-demo__message--user';
    wrapper.setAttribute('role', 'listitem');

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-demo__bubble chatbot-demo__bubble--user';
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    messagesContainer.appendChild(wrapper);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'chatbot-demo__message chatbot-demo__message--bot';
    wrapper.setAttribute('role', 'listitem');

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-demo__bubble chatbot-demo__bubble--bot';
    bubble.innerHTML = formatMessage(text);

    wrapper.appendChild(bubble);
    messagesContainer.appendChild(wrapper);
    scrollToBottom();
  }

  function addTypingIndicator() {
    const wrapper = document.createElement('div');
    wrapper.className = 'chatbot-demo__message chatbot-demo__message--bot chatbot-demo__typing';

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-demo__bubble chatbot-demo__bubble--bot';
    bubble.innerHTML = '<span class="chatbot-demo__dot"></span><span class="chatbot-demo__dot"></span><span class="chatbot-demo__dot"></span>';

    wrapper.appendChild(bubble);
    messagesContainer.appendChild(wrapper);
    scrollToBottom();
    return wrapper;
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // -------------------------------------------------------------------------
  // Text formatting — convert markdown-like patterns to HTML
  // -------------------------------------------------------------------------

  function formatMessage(text) {
    let safe = escapeHtml(text);
    // Bold
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    safe = safe.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Line breaks (double newline = paragraph break, single = <br>)
    safe = safe.replace(/\n\n/g, '</p><p>');
    safe = safe.replace(/\n/g, '<br>');
    // Wrap in paragraph
    safe = '<p>' + safe + '</p>';
    // Numbered lists: detect lines starting with "1. ", "2. ", etc.
    safe = safe.replace(/<p>(\d+\.\s)/g, '<p class="chatbot-demo__list-item">$1');
    return safe;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
