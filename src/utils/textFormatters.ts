interface RichTextChild {
  type: string;
  text: string;
}

interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

export const processRichText = (richText: RichTextBlock[]): string => {
  if (!Array.isArray(richText)) return '';
  
  return richText
    .map(block => {
      if (block.type === 'paragraph') {
        const text = block.children
          .map((child) => child.text)
          .join('')
          .trim();

        if (text === '–' || text === '') return text;

        if (text.startsWith('–')) {
          return `<li>${text.substring(1).trim()}</li>`;
        }
        
        return `<p class="mb-2">${text}</p>`;
      }
      return '';
    })
    .join('\n');
};
