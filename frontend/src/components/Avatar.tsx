import { cn } from '../lib/utils'

interface AvatarProps {
  letter: string
}
const Avatar = ({ letter}: AvatarProps) => {
  return (
    <div className={cn(
      `rounded-full bg-slate-300 flex justify-center items-center size-8`)}>
      <div className="text-xl font-medium">{letter.toUpperCase()}</div>
    </div>
  );
};

export default Avatar;
