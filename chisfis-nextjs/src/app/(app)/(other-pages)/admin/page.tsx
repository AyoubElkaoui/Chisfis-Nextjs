import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const metadata = { title: "Admin – Boekingsaanvragen" };

async function getData() {
    return prisma.bookingRequest.findMany({
        include: { city: true, cleaner: true },
        orderBy: { createdAt: "desc" },
        take: 200,
    });
}

// ---- SERVER ACTIONS ----
export async function updateStatusAction(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    const status = String(formData.get("status")) as "PENDING"|"CONTACTED"|"CONFIRMED"|"DECLINED";
    if (!id || !status) return;
    await prisma.bookingRequest.update({ where: { id }, data: { status } });
    revalidatePath("/admin"); // refresh pagina
}

export default async function Page() {
    const rows = await getData();

    return (
        <div className="container py-10">
            <h1 className="text-2xl font-semibold mb-6">Boekingsaanvragen</h1>

            <div className="overflow-x-auto rounded-2xl border">
                <table className="min-w-full text-sm">
                    <thead className="bg-neutral-50 dark:bg-neutral-900">
                    <tr className="text-left">
                        <th className="p-3">Binnen</th>
                        <th className="p-3">Naam</th>
                        <th className="p-3">Telefoon</th>
                        <th className="p-3">Stad</th>
                        <th className="p-3">Voorkeursdatum</th>
                        <th className="p-3">Cleaner</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actie</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((r) => (
                        <tr key={r.id} className="border-t">
                            <td className="p-3">{r.createdAt.toISOString().slice(0,10)}</td>
                            <td className="p-3">{r.fullName}</td>
                            <td className="p-3">{r.phoneE164}</td>
                            <td className="p-3">{r.city.name}</td>
                            <td className="p-3">{r.preferredDate.toISOString().slice(0,10)}</td>
                            <td className="p-3">{r.cleaner?.name ?? "-"}</td>
                            <td className="p-3">{r.status}</td>
                            <td className="p-3">
                                <div className="flex flex-wrap gap-2">
                                    {(["PENDING","CONTACTED","CONFIRMED","DECLINED"] as const).map(s => (
                                        <form key={s} action={updateStatusAction}>
                                            <input type="hidden" name="id" value={r.id} />
                                            <input type="hidden" name="status" value={s} />
                                            <button
                                                className={"nc-Button px-3 py-1 rounded-xl border text-xs " + (r.status===s ? "opacity-50" : "")}
                                                disabled={r.status===s}
                                            >
                                                {s}
                                            </button>
                                        </form>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {!rows.length && (
                        <tr><td className="p-6 text-center text-neutral-500" colSpan={8}>Nog geen aanvragen.</td></tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
