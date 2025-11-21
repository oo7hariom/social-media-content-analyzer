export const analyzeText = (text) => {
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      wordCount: 0,
      charCount: 0,
      hasHashtag: false,
      hasLink: false,
      hasQuestion: false,
      suggestions: [],
      hashtags: [],
      links: []
    };
  }

  const words = trimmed.split(/\s+/);
  const wordCount = words.length;
  const charCount = trimmed.length;

  // collect hashtags
  const hashtags = [];
  const hashtagRegex = /#(\w+)/g;
  let match;
  while ((match = hashtagRegex.exec(trimmed)) !== null) {
    hashtags.push(`#${match[1]}`);
  }

  // collect links
  const links = [];
  const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(trimmed)) !== null) {
    links.push(linkMatch[0]);
  }

  const hasHashtag = hashtags.length > 0;
  const hasLink = links.length > 0;
  const hasQuestion = /\?/.test(trimmed);
  const hasEmoji = /[\u{1F300}-\u{1FAFF}]/u.test(trimmed);

  const suggestions = [];

  if (wordCount < 10) {
    suggestions.push(
      "Your content is quite short. Consider adding more context to increase engagement."
    );
  } else if (wordCount > 60) {
    suggestions.push(
      "Your content is long. Try making it more concise for better readability on social media."
    );
  } else {
    suggestions.push(
      "Content length looks good. Keep it clear and focused on one main idea."
    );
  }

  if (!hasHashtag) {
    suggestions.push(
      "Add 1–3 relevant hashtags to improve discoverability. Example: #technology #learning."
    );
  }

  if (!hasLink) {
    suggestions.push(
      "Include a helpful link if you want users to learn more or take action."
    );
  }

  if (!hasQuestion) {
    suggestions.push(
      "Ask a simple question to invite replies and increase comments."
    );
  }

  if (!hasEmoji) {
    suggestions.push(
      "A few emojis can make the post more friendly, but keep them limited and relevant."
    );
  }

  suggestions.push(
    "End the post with a clear call to action, like 'Share your thoughts below' or 'Tag a friend who needs this'."
  );

  return {
    wordCount,
    charCount,
    hasHashtag,
    hasLink,
    hasQuestion,
    suggestions,
    hashtags,
    links
  };
};
