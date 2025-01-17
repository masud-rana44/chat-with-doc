declare module "pptx-parser" {
  interface Slide {
    text: string;
  }

  function pptxParser(buffer: Buffer): Promise<Slide[]>;
  export default pptxParser;
}
