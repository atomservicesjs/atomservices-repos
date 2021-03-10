export const Indexer = {
  ofNextImport: (content: string) => {
    let index = content.lastIndexOf("import ");
    const substr = content.slice(index);
    index += substr.indexOf("\n") + 1;

    return index;
  },
};
