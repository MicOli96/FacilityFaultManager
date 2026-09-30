export const categories = ["El", "VVS", "Ventilation", "Lås", "Övrigt"] as const;
export type Category = (typeof categories)[number];