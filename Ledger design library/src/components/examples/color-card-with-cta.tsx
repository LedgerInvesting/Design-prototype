import {
  ColorCard,
  ColorCardContent,
  ColorCardCtaButton,
  ColorCardCtaContainer,
  ColorCardCtaFooter,
  ColorCardHeader,
  ColorCardHeaderTitle,
  ColorCardPatternLines,
} from "@/components/brand/color-card";

export function ColorCardWithCta() {
  return (
    <div className="flex items-center justify-center p-6">
      <ColorCard className="w-full max-w-lg">
        <ColorCardPatternLines />
        <ColorCardHeader>
          <ColorCardHeaderTitle>Policy Group</ColorCardHeaderTitle>
          <ColorCardCtaContainer>
            <ColorCardCtaButton>Get Started</ColorCardCtaButton>
            <ColorCardCtaFooter>
              Free for 14 days, no credit card required
            </ColorCardCtaFooter>
          </ColorCardCtaContainer>
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
