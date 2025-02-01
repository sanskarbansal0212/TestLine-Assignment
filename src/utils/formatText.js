export const formatBoldText = (text) => {
    if (!text) return '';
    
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };
  
  // Comprehensive markdown formatting
  export const formatMarkdown = (text) => {
    if (!text) return '';
    
    return text
      .replace(/5\s*[′']\s*(?:[𝐴𝐴𝐴𝑇]|\s*A\s*A\s*A\s*T\s*)\s*3\s*[′']\s*5\s*[′']\s*AAAT3\s*[′']/g, "5' AAAT 3'")
      .replace(/3\s*[′']\s*(?:[𝑇𝑇𝑇𝐴]|\s*T\s*T\s*T\s*A\s*)\s*5\s*[′']\s*3\s*[′']\s*TTTA5\s*[′']/g, "3' TTTA 5'")
      .replace(/5\s*[′']\s*(?:[𝐴𝐴𝐴𝑈]|\s*A\s*A\s*A\s*U\s*)\s*3\s*[′']\s*5\s*[′']\s*AAAU3\s*[′']/g, "5' AAAU 3'")
      // Multi-line DNA sequence like:
      // 5 '\n … A\n A\n A\n T\n … 3\n '  =>  5' AAAT 3'
      .replace(/5\s*[\n ]*['′]\s*[\n ]*[𝐴]+\s*[𝐴]+\s*[𝐴]+\s*[𝑇]+\s*[\n ]*3\s*[\n ]*['′]\s*5['′]\s*AAAT\s*3['′]/g, "5' AAAT 3'")
      // Cleanup scattered sequences
      .replace(/(\d)\s*[′']\s*([ATCGU])\s*([ATCGU])\s*([ATCGU])\s*([ATCGU])\s*(\d)\s*[′']/g, "$1' $2$3$4$5 $6'")
      // Format section headers
      .replace(/(Given DNA Sequence|Transcription Rules|DNA Template Strand|mRNA Sequence|Final Answer):/g, '<strong>$1:</strong><br/>')
      // Format base pairing rules with colors
      .replace(/([ATCGU])\s+pairs\s+with\s+([ATCGU])/g, '<span class="text-blue-600">$1</span> pairs with <span class="text-green-600">$2</span>')
      // Standard markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\* /gm, '• ')
      // Clean up spacing and line breaks
      .replace(/\r\n/g, '\n')
      .replace(/\n{2,}/g, '<br/><br/>')
      .replace(/\n/g, '<br/>')
      // Final cleanup of any remaining scattered prime symbols
      .replace(/\s*[′']\s*/g, "'")
      .trim();
  };
  
  // Helper function to format DNA/RNA sequences
  export const formatSequence = (sequence) => {
    if (!sequence) return '';
    return sequence
      .replace(/\s+/g, '')
      .replace(/(\d['′])([ATCGU])/, '$1 $2')
      .replace(/([ATCGU])(\d['′])/, '$1 $2')
      .replace(/[′']/g, "'");
  };