/**
 * 浏览器实验性 API 类型声明
 */
interface EyeDropperOpenResult {
  sRGBHex: string;
}

interface EyeDropper {
  open(): Promise<EyeDropperOpenResult>;
}

interface Window {
  EyeDropper?: new () => EyeDropper;
}
