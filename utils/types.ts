import { Analysis, User } from "@prisma/client";

export interface JournalEntry {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  analysis: Analysis;
  pinned: Boolean;
  archived: Boolean;
}
