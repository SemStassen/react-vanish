import { useEffect, useState } from "react";

interface VanishProps {
  targetDate: Date;
  fadeDuration?: number;
  fadeChildren?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function Vanish({
  targetDate,
  fadeDuration = 30,
  fadeChildren = false,
  children,
  className,
}: VanishProps) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const calculateOpacity = () => {
      const now = new Date();

      // Reset opacity if target date is in the future
      if (targetDate > now) {
        setOpacity(1);
        return;
      }

      const daysPassed = Math.floor(
        (now.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      const newOpacity = Math.max(0, 1 - daysPassed / fadeDuration);
      setOpacity(newOpacity);
    };

    calculateOpacity();
  }, [targetDate, fadeDuration]);

  useEffect(() => {
    if (!fadeChildren) {
      document.body.style.opacity = opacity.toString();

      // Cleanup for when component unmounts
      return () => {
        document.body.style.opacity = "1";
      };
    }
  }, [opacity, fadeChildren]);

  return (
    <div className={className} style={{ opacity: fadeChildren ? opacity : 1 }}>
      {children}
    </div>
  );
}

export type { VanishProps };
export default Vanish;
