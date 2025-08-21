import { prisma } from "@/lib/prisma";
import BookForm from "./ui/BookForm";

export const metadata = { title: "Boek schoonmaker" };

export default async function Page() {
    const cities = await prisma.city.findMany({ orderBy: { name: "asc" } });
    return <BookForm cities={cities} />;
}
