export type TemplateType = {
  [key: string]: {
    template_src: string;
    template_pre_src: string;
    font: string;
    text_cnt: number;
    text_attr: [number, number, number, number, number, string, number, number][];
    bg_color: string;
    bg_text_color: string;
  };
};
