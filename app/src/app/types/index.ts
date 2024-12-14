export type PostTypes = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
}

export type FormSubmitValueTypes = {
  title: string;
  content: string;
}