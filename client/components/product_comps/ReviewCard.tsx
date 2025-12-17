import { Star } from "lucide-react";
import Image from "next/image";

interface ReviewCardDTO {
  name: string;
  content: string;
  avatarUrl: string;
  rating: number;
}

const ReviewCard = ({ name, content, avatarUrl, rating }: ReviewCardDTO) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>

      {/* Review */}
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        “{content}”
      </p>

      {/* Customer */}
      <div className="mt-4 flex items-center gap-3">
        {avatarUrl ? (
          <Image
            width={32}
            height={32}
            src={avatarUrl}
            alt={name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
            {name?.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">Verified Buyer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
