'use server'
import { PrismaClient } from "@prisma/client";

import { Form } from "@prisma/client";

export async function fetchFeedForms(feedId: number): Promise<Form[]> {
	const prisma = new PrismaClient()

	try {
		const forms: Form[] = await prisma.form.findMany({
			where: {
				feedId: feedId
			}
		})
		return forms
	} catch (err) {
		console.error(err)
		throw new Error(String(err))
	} finally {
		prisma.$disconnect()
	}
}
