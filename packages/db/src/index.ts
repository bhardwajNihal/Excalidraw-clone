// exporting our prisma client to be reused across different apps

import { PrismaClient } from "@prisma/client";

export const prismaClient:PrismaClient = new PrismaClient()         //we are explicitly annotating the type (PrismaClient). TypeScript now knows exactly what prismaClient is and doesn’t try to infer it.