
export interface VocabularyTerm {
  id: string;
  text: string;
  imageUrl: string;
  example: string;
}

export interface ContextItem {
  id: string;
  description: string;
  correctTermId: string;
  playaLocation: string;
}

export interface MatchState {
  [contextId: string]: string | null;
}
