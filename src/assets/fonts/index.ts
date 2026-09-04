export const appFonts = {
  cairo: {
    light: 'Cairo-Light',
    regular: 'Cairo-Regular',
    medium: 'Cairo-Medium',
    semiBold: 'Cairo-SemiBold',
    bold: 'Cairo-Bold',
  },

  elMessiri: {
    regular: 'ElMessiri-Regular',
    medium: 'ElMessiri-Medium',
    semiBold: 'ElMessiri-SemiBold',
    bold: 'ElMessiri-Bold',
  },
} as const;

export type FontValue =
  (typeof appFonts)[keyof typeof appFonts][keyof (typeof appFonts)[keyof typeof appFonts]];
