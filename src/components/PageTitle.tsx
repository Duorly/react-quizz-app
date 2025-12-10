import React from "react";

type Variant = "small" | "medium" | "large";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
};

const sizeClassMap: Record<Variant, string> = {
  small:
    "text-3xl leading-7 sm:text-4xl sm:leading-9 md:text-5xl md:leading-[2.5rem] lg:text-6xl lg:leading-[3rem] xl:text-[140px] xl:leading-[70px]",
  medium:
    "text-4xl leading-8 sm:text-5xl sm:leading-10 md:text-6xl md:leading-[3rem] lg:text-7xl lg:leading-[3.5rem] xl:text-[140px] xl:leading-[70px]",
  large:
    "text-5xl leading-[0.8] sm:text-6xl sm:leading-[0.8] md:text-7xl md:leading-[0.9] lg:text-8xl lg:leading-[1] xl:text-[130px] xl:leading-[0.8]",
};

const PageTitle: React.FC<Props> = ({ children, className = "", variant = "medium" }) => {
  const sizeClasses = sizeClassMap[variant];

  return (
    <h1 style={{ fontFamily: "'Jomhuria', cursive" }} className={`text-white drop-shadow-xl text-center ${sizeClasses} ${className}`.trim()}>
      {children}
    </h1>
  );
};

export default PageTitle;
