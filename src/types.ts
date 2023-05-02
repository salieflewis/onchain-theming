export type Hex = `0x${string}`;

export type ThemingConfig = {
  theme: {
    color: {
      background: string;
      text: string;
      accent: string;
      accentText: string;
      border: string;
    };
    font: {
      heading: {
        fontFamily: string;
        fontSize: string;
        lineHeight: string;
      };
      body: {
        fontFamily: string;
        fontSize: string;
        lineHeight: string;
      };
      caption: {
        fontFamily: string;
        fontSize: string;
        lineHeight: string;
      };
    };
  };
};
