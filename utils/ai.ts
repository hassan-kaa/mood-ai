import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { StructuredOutputParser } from "langchain/output_parsers";
import { Document } from "langchain/document";
import z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    summary: z.string().describe("quick summary of the entire entry."),
    subject: z.string().describe("the subject of the entry."),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)."
      ),
    color: z
      .string()
      .describe(
        "a hexadecimal color code representing the mood of the entry (i.e.  green and blue representing happiness, yellow and near white colors are for sort of neutral emotions . red and dark colors are for bad days , the colors should be gradually different relatively to how the strong the emotions are ) the color should be hexadecimal like this #fefefe."
      ),
  })
);

const get_prompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      "Analyse the following journal entry. Follow the instructions and format our response to match the foramtted instructions, no matter what! \n {format_instructions} \n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });
  const input = await prompt.format({
    entry: content,
  });
  return input;
};
export const analyse = async (content: string) => {
  const input = await get_prompt(content);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.call(input);
  //   console.log("prompt", input);
  //   console.log("\nresult", result);
  try {
    const output = parser.parse(result);
    return output;
  } catch (err) {
    console.log(err);
  }
};

// export const qa = async (question, entries) => {
//   const docs = entries.map(
//     (entry) =>
//       new Document({
//         pageContent: entry.content,
//         metadata: { source: entry.id, date: entry.createdAt },
//       })
//   );
//   const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
//   const chain = loadQARefineChain(model);
//   const embeddings = new OpenAIEmbeddings();
//   const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
//   const relevantDocs = await store.similaritySearch(question);
//   const res = await chain.call({
//     input_documents: relevantDocs,
//     question,
//   });

//   return res.output_text;
// };
