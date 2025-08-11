export function extractTextFromRichText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';

  function extractFromNode(node: any): string {
    if (!node) return '';

    if (typeof node.text === 'string') {
      return node.text;
    }

    if (Array.isArray(node.children)) {
      return node.children.map(extractFromNode).join('');
    }

    return '';
  }

  let texto = '';

  blocks.forEach(block => {
    if (block.type === 'ol') {
      // Lista ordenada, cada li con texto en children
      if (Array.isArray(block.children)) {
        block.children.forEach((liNode: any, index: number) => {
          const liText = extractFromNode(liNode);
          texto += `${index + 1}. ${liText}\n`;
        });
      }
    } else {
      // Otros bloques: solo texto plano de children
      texto += extractFromNode(block) + '\n\n';
    }
  });

  return texto.trim();
}
