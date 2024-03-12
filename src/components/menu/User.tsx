import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const User = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end gap-1">
          <p className="font-bold">
            {session?.user.firstName} {session?.user.lastName}
          </p>
          <p className="italic text-slate-500">{session?.user.email}</p>
        </div>
        <Avatar>
          <AvatarImage src="/img/avatar.jpg" />
          <AvatarFallback>123</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default User;
