import z from "zod";

export const EmailSchema = {
  to: z.string().email().describe("Alamat email penerima"),
  subject: z.string().describe("Judul email"),
  text: z.string().describe("Isi pesan email"),
};

export const GetEmailsSchema = {
  mailbox: z.enum(["INBOX", "Sent"]).default("INBOX").describe("Folder email yang ingin dibaca"),
  limit: z.number().default(10).describe("Jumlah email yang ingin diambil"),
};
