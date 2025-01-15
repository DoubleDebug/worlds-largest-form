export const FORM_TYPES = ["textbox", "checkbox", "select", "slider"] as const;
export type FormType = (typeof FORM_TYPES)[number];
