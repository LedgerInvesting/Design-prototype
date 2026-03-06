import {
  ColorCard,
  ColorCardContent,
  ColorCardHeader,
  ColorCardHeaderTitle,
  ColorCardPatternLines,
} from "@/components/brand/color-card";

export function ColorCardBasic() {
  return (
    <div className="flex items-center justify-center p-6">
      <ColorCard className="w-full max-w-lg">
        <ColorCardPatternLines />
        <ColorCardHeader>
          <ColorCardHeaderTitle>Policy Group</ColorCardHeaderTitle>
        </ColorCardHeader>
        <ColorCardContent className="p-6">
          <p className="text-sm">
            Content area for additional details and information.
          </p>
        </ColorCardContent>
      </ColorCard>
    </div>
  );
}
