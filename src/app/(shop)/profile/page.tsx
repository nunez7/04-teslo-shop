import { auth } from "@/auth.config";
import { Title } from "@/components";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function PerfilPage() {

    const session = await auth();

    if (!session?.user) {
        //redirect("/auth/login?returnTo=/perfil");
        redirect("/");
    }

    return (
        <>
            <Title title="Perfil de usuario" />
            <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
                <div className="card w-96 mx-auto bg-white shadow-md hover:shadow">
                    <Image className="w-36 mx-auto rounded-full -mt-5 border-8 border-white" 
                    width={200}
                    height={200}
                    src="https://avatars.githubusercontent.com/u/67946056?v=4" alt="" />
                        <div className="text-center mt-2 text-3xl font-medium">{session.user.name}</div>
                        <div className="text-center mt-2 font-light text-sm">Rol: {session.user.role}</div>
                        <div className="text-center mt-2 font-light text-sm">Email: {session.user.email}</div>
                        <div className="px-6 text-center mt-2 font-light text-sm">
                            <p>
                                {JSON.stringify(session.user, null, 2)}
                            </p>
                        </div>
                </div>
            </div>
        </>
    );
}