import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
};

const ActionCard = ({ title, description, icon: Icon, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-5 text-left transition hover:bg-muted"
    >
      <Icon className="h-6 w-6 text-primary" />
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </button>
  );
};

export default ActionCard;
