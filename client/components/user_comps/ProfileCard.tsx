import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { UserDTO } from "@/types/userType";

import { Mail } from "lucide-react";

const ProfileCard = ({ fullname, email }: UserDTO) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24 border">
        <AvatarImage src="" alt={fullname} />
        <AvatarFallback className="text-4xl">
          {fullname.toString().split("")[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="text-center space-y-1">
        <h1 className="text-xl font-semibold">{fullname}</h1>

        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {email}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
