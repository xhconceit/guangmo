import {
  BrainIcon as PhosphorBrainIcon,
  CirclesFourIcon as PhosphorCirclesFourIcon,
  type Icon as PhosphorIcon,
  type IconProps,
} from "@phosphor-icons/react";

type OpticalScale = {
  regular: number;
  fill?: number;
};

// Keep optical corrections here so every caller uses the same artwork proportions.
function calibrateIcon(Source: PhosphorIcon, scale: OpticalScale) {
  return function CalibratedIcon({
    weight = "regular",
    style,
    ...props
  }: IconProps) {
    const ratio =
      weight === "fill" ? (scale.fill ?? scale.regular) : scale.regular;

    return (
      <Source {...props} weight={weight} style={{ ...style, scale: ratio }} />
    );
  };
}

export const CirclesFourIcon = calibrateIcon(PhosphorCirclesFourIcon, {
  regular: 1.18,
});

export const BrainIcon = calibrateIcon(PhosphorBrainIcon, {
  regular: 0.9,
  fill: 0.95,
});

export {
  ArrowUpIcon,
  ChatCircleIcon,
  ClockCounterClockwiseIcon,
  CompassIcon,
  CheckCircleIcon,
  DotsThreeIcon,
  LinkIcon,
  MoonIcon,
  PlusCircleIcon,
  SunIcon,
} from "@phosphor-icons/react";
