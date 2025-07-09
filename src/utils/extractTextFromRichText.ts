export function extractTextFromRichText(richText: any[]): string {
  if (!Array.isArray(richText)) return '';

  const extract = (node: any): string => {
    if (!node) return '';
    let text = '';

    if (Array.isArray(node)) {
      text += node.map(extract).join(' ');
    } else if (typeof node === 'object') {
      if (node.text) text += node.text;
      if (node.children) text += ' ' + extract(node.children);
    }

    return text.trim();
  };

  return extract(richText).replace(/\s+/g, ' ').trim();
}
