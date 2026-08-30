/**
 * Popper.js Modifier 类型扩展
 */
import type { Modifier } from '@popperjs/core';

export interface SameWidthModifierOptions {
  enabled?: boolean;
}

export type SameWidthModifier = Modifier<'sameWidth', SameWidthModifierOptions>;

declare module '@popperjs/core' {
  interface Modifiers {
    sameWidth?: SameWidthModifier;
    observeReferenceContent?: Modifier<'observeReferenceContent', Record<string, never>>;
    observeReferenceLocation?: Modifier<'observeReferenceLocation', Record<string, never>>;
  }
}

export type { Instance as PopperInstance, Options as PopperOptions } from '@popperjs/core';
