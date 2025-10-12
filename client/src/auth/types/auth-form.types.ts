export type FieldType = {
  name: string;
  label: string;
  type?: string;
};

export type LinkType = {
  text: string;
  onClick: () => void;
};