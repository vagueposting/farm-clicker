export interface Pronoun {
  e: string;
  ir: string;
  is: string;
  irself: string;
  plural: boolean;
}

export type Gender = "male" | "female";

export type HumanGenders = Gender & "nonbinary";
