import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function NamePage() {

    const session = await auth();

    if (!session?.user) {
        //redirect("/auth/login?returnTo=/perfil");
        redirect("/");
    }

    return (
        <div>
            <Title title="Perfil de usuario" />
            <pre>
                {
                    JSON.stringify(session.user, null, 2)
                }
            </pre>
        </div>
    );
}