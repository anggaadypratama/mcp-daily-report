import z from "zod";

export const ProjectIdSchema = z
  .union([z.string(), z.number()])
  .describe("ID project");
export const BranchSchema = z.string().describe("Nama branch");

export const GitlabSchema = {
  projectId: ProjectIdSchema,
};

export const GitlabSchemaWithBranch = {
  projectId: ProjectIdSchema,
  branch: BranchSchema,
};
