import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { colors, typography, spacing, borderRadius, shadows } from './index';
import { icons } from '../icons/index';

// Token display components
const ColorSwatch: React.FC<{ color: string; name: string; description?: string }> = ({ 
  color, 
  name, 
  description 
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px' }}>
    <div 
      style={{ 
        width: '80px', 
        height: '80px', 
        backgroundColor: color,
        borderRadius: '8px',
        border: color === '#ffffff' ? '1px solid #e0e0e0' : 'none',
        marginBottom: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} 
    />
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>{name}</div>
      <div style={{ fontSize: '10px', color: '#666', fontFamily: 'monospace' }}>{color}</div>
      {description && <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>{description}</div>}
    </div>
  </div>
);

const TypographyExample: React.FC<{ 
  style: React.CSSProperties; 
  name: string; 
  text: string;
}> = ({ style, name, text }) => (
  <div style={{ marginBottom: '24px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', fontFamily: 'monospace' }}>
      {name}
    </div>
    <div style={style}>{text}</div>
  </div>
);

const SpacingExample: React.FC<{ size: string; name: string }> = ({ size, name }) => (
  <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
    <div style={{ width: '100px', fontSize: '12px', fontFamily: 'monospace' }}>{name}</div>
    <div 
      style={{ 
        width: size, 
        height: '24px', 
        backgroundColor: '#3b82f6', 
        marginRight: '16px',
        borderRadius: '4px'
      }} 
    />
    <div style={{ fontSize: '12px', color: '#666' }}>{size}</div>
  </div>
);

const BorderRadiusExample: React.FC<{ radius: string; name: string }> = ({ radius, name }) => (
  <div style={{ margin: '16px', textAlign: 'center' }}>
    <div 
      style={{ 
        width: '80px', 
        height: '80px', 
        backgroundColor: '#f3f4f6',
        border: '2px solid #e5e7eb',
        borderRadius: radius,
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        color: '#666'
      }}
    >
      {name}
    </div>
    <div style={{ fontSize: '10px', fontFamily: 'monospace' }}>{radius}</div>
  </div>
);

const ShadowExample: React.FC<{ shadow: string; name: string }> = ({ shadow, name }) => (
  <div style={{ margin: '16px', textAlign: 'center' }}>
    <div 
      style={{ 
        width: '80px', 
        height: '80px', 
        backgroundColor: 'white',
        boxShadow: shadow,
        borderRadius: '8px',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        color: '#666'
      }}
    >
      {name}
    </div>
  </div>
);

const IconExample: React.FC<{ 
  IconComponent: React.ComponentType<any>; 
  name: string; 
  size: string;
}> = ({ IconComponent, name, size }) => {
  // Status icons should use their default colors, all others use black
  const isStatusIcon = name === 'Warning' || name === 'Error' || name === 'Success';
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      margin: '16px',
      padding: '16px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      minWidth: '120px'
    }}>
      <div style={{ 
        marginBottom: '8px',
        padding: '8px',
        backgroundColor: '#f9fafb',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isStatusIcon ? (
          <IconComponent />
        ) : (
          <IconComponent color="#17211B" />
        )}
      </div>
      <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', textAlign: 'center' }}>
        {name}
      </div>
      <div style={{ fontSize: '10px', color: '#666', textAlign: 'center' }}>
        {size}
      </div>
    </div>
  );
};

// Helper function to convert typography styles for React
const convertTypographyStyle = (style: any) => ({
  ...style,
  fontFamily: Array.isArray(style.fontFamily) ? style.fontFamily.join(', ') : style.fontFamily
});

// Main showcase component
const DesignTokensShowcase: React.FC = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Colors Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#1f2937' }}>Colors</h2>
        
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Black & White</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
          <ColorSwatch color={colors.blackAndWhite.white} name="White" />
          <ColorSwatch color={colors.blackAndWhite.black100} name="Black 100" />
          <ColorSwatch color={colors.blackAndWhite.black300} name="Black 300" />
          <ColorSwatch color={colors.blackAndWhite.black500} name="Black 500" />
          <ColorSwatch color={colors.blackAndWhite.black700} name="Black 700" />
          <ColorSwatch color={colors.blackAndWhite.black800} name="Black 800" />
          <ColorSwatch color={colors.blackAndWhite.black900} name="Black 900" />
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Status Colors</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
          <ColorSwatch color={colors.error.darkBorders} name="Error Dark" description="Borders" />
          <ColorSwatch color={colors.error.textAndStrokes} name="Error Main" description="Text & Strokes" />
          <ColorSwatch color={colors.error.fill} name="Error Fill" />
          <ColorSwatch color={colors.error.fillLight} name="Error Light" description="Backgrounds" />
          
          <ColorSwatch color={colors.warning.dark} name="Warning Dark" description="Text & Strokes" />
          <ColorSwatch color={colors.warning.textAndStrokes} name="Warning Main" description="Text & Strokes" />
          <ColorSwatch color={colors.warning.fillLight} name="Warning Light" description="Backgrounds" />
          
          <ColorSwatch color={colors.success.textAndStrokes} name="Success Main" description="Text & Strokes" />
          <ColorSwatch color={colors.success.fill} name="Success Fill" />
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Reports</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
          <ColorSwatch color={colors.reports.blue900} name="Blue 900" />
          <ColorSwatch color={colors.reports.blue800} name="Blue 800" />
          <ColorSwatch color={colors.reports.blue600} name="Blue 600" />
          <ColorSwatch color={colors.reports.blue500} name="Blue 500" />
          <ColorSwatch color={colors.reports.blue450} name="Blue 450" />
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Marketplace</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
          <ColorSwatch color={colors.marketplace.violet900} name="Violet 900" />
          <ColorSwatch color={colors.marketplace.violet800} name="Violet 800" />
          <ColorSwatch color={colors.marketplace.violet600} name="Violet 600" />
          <ColorSwatch color={colors.marketplace.violet500} name="Violet 500" />
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Analytics</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
          <ColorSwatch color={colors.analytics.green900} name="Green 900" />
          <ColorSwatch color={colors.analytics.green800} name="Green 800" />
          <ColorSwatch color={colors.analytics.green600} name="Green 600" />
          <ColorSwatch color={colors.analytics.green500} name="Green 500" />
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Theme Colors</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>
          The main brand colors (700), strokes (400), hover (300), and background (200) are managed through the Theme System to adapt automatically across products.
        </p>
      </section>

      {/* Typography Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#1f2937' }}>Typography</h2>
        
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151', marginTop: '32px' }}>Headlines/Title</h3>
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.headlineH1)}
          name="Headline H1 - Bradford LL Regular"
          text="Perfect for primary titles"
        />
        
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.headlineH2)}
          name="Headline H2 - Bradford LL Medium"
          text="Perfect for primary titles"
        />
        
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151', marginTop: '32px' }}>Subtitles</h3>
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.subheadingL)}
          name="Subheading L - Bradford LL Medium"
          text="Perfect for primary title"
        />
        
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.subheadingM)}
          name="Subheading M - Söhne Kräftig"
          text="Perfect for primary title"
        />
        
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151', marginTop: '32px' }}>Body</h3>
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.bodyL)}
          name="Body L - Söhne Kräftig"
          text="Perfect for secondary text."
        />
        
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.bodyM)}
          name="Body M - Söhne Kräftig"
          text="Perfect for secondary text."
        />
        
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.bodyS)}
          name="Body S - Söhne Kräftig"
          text="Perfect for secondary text."
        />
        
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151', marginTop: '32px' }}>Navigation</h3>
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.navM)}
          name="Nav M - Söhne Mono Kräftig"
          text="PERFECT FOR HEADER TEXT"
        />
        
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.navS)}
          name="Nav S - Söhne Mono Kräftig"
          text="PERFECT FOR HEADER TEXT"
        />
        
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151', marginTop: '32px' }}>Caption</h3>
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.captionM)}
          name="Caption M - Bradford LL Bold Italic"
          text="Perfect for captions"
        />
        
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.captionS)}
          name="Caption S - Bradford LL Bold Italic"
          text="Perfect for captions"
        />
        
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151', marginTop: '32px' }}>Data</h3>
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.dataXXL)}
          name="Data XXL - Söhne Buch"
          text="$34,168"
        />
        
        <TypographyExample 
          style={convertTypographyStyle(typography.styles.dataXS)}
          name="Data XS - Söhne Kräftig"
          text="Perfect for totals"
        />
      </section>

      {/* Spacing Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#1f2937' }}>Spacing</h2>
        <SpacingExample size={spacing[1]} name="1" />
        <SpacingExample size={spacing[2]} name="2" />
        <SpacingExample size={spacing[3]} name="3" />
        <SpacingExample size={spacing[4]} name="4" />
        <SpacingExample size={spacing[6]} name="6" />
        <SpacingExample size={spacing[8]} name="8" />
        <SpacingExample size={spacing[12]} name="12" />
        <SpacingExample size={spacing[16]} name="16" />
      </section>

      {/* Border Radius Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#1f2937' }}>Border Radius</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <BorderRadiusExample radius={borderRadius[0]} name="0" />
          <BorderRadiusExample radius={borderRadius[4]} name="4" />
          <BorderRadiusExample radius={borderRadius[8]} name="8" />
          <BorderRadiusExample radius={borderRadius[12]} name="12" />
          <BorderRadiusExample radius={borderRadius[16]} name="16" />
          <BorderRadiusExample radius={borderRadius[24]} name="24" />
          <BorderRadiusExample radius={borderRadius.absolute} name="Absolute" />
        </div>
      </section>

      {/* Shadows Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#1f2937' }}>Shadows</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#f9fafb', padding: '24px', borderRadius: '8px' }}>
          <ShadowExample shadow={shadows.small} name="Small" />
          <ShadowExample shadow={shadows.base} name="Base" />
          <ShadowExample shadow={shadows.medium} name="Medium" />
          <ShadowExample shadow={shadows.large} name="Large" />
          <ShadowExample shadow={shadows.extraLarge} name="Extra Large" />
        </div>
      </section>

      {/* Icons Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#1f2937' }}>Icons</h2>
        
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Extra Small Icons (8x8px)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
          <IconExample 
            IconComponent={icons.extraSmall.chevronDown} 
            name="Chevron Down" 
            size="8x8px" 
          />
          <IconExample 
            IconComponent={icons.extraSmall.chevronRight} 
            name="Chevron Right" 
            size="8x8px" 
          />
          <IconExample 
            IconComponent={icons.extraSmall.plus} 
            name="Plus" 
            size="8x8px" 
          />
          <IconExample 
            IconComponent={icons.extraSmall.x} 
            name="X (Style 1)" 
            size="8x8px" 
          />
          <IconExample 
            IconComponent={icons.extraSmall.xStyle2} 
            name="X (Style 2)" 
            size="8x8px" 
          />
          <IconExample 
            IconComponent={icons.extraSmall.arrowLeft} 
            name="Arrow Left" 
            size="8x8px" 
          />
          <IconExample 
            IconComponent={icons.extraSmall.minus} 
            name="Minus" 
            size="8x8px" 
          />
          <IconExample 
            IconComponent={icons.extraSmall.search} 
            name="Search" 
            size="8x8px" 
          />
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Small Icons (12x12px)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
          <IconExample 
            IconComponent={icons.small.add} 
            name="Add" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.calendar} 
            name="Calendar" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.check} 
            name="Check" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.chevronBottom} 
            name="Chevron Bottom" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.chevronLeft} 
            name="Chevron Left" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.chevronRight} 
            name="Chevron Right" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.circledCheck} 
            name="Circled Check" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.circledX} 
            name="Circled X" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.close} 
            name="Close" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.document} 
            name="Document" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.download} 
            name="Download" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.edit} 
            name="Edit" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.empty} 
            name="Empty" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.eraser} 
            name="Eraser" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.expand} 
            name="Expand" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.externalLink} 
            name="External Link" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.graph} 
            name="Graph" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.less} 
            name="Less" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.lock} 
            name="Lock" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.open} 
            name="Open" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.play} 
            name="Play" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.plus} 
            name="Plus" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.reply} 
            name="Reply" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.s1ArrowDown} 
            name="S1 Arrow Down" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.s1ArrowRight} 
            name="S1 Arrow Right" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.s2ArrowRight} 
            name="S2 Arrow Right" 
            size="12x12px" 
          />
          <IconExample 
            IconComponent={icons.small.trash} 
            name="Trash" 
            size="12x12px" 
          />
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Medium Icons (22x22px)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '32px' }}>
          <IconExample 
            IconComponent={icons.medium.add} 
            name="Add" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.attach} 
            name="Attach" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.bellV2} 
            name="Bell V2" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.bell} 
            name="Bell" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.book} 
            name="Book" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.calendar} 
            name="Calendar" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.car} 
            name="Car" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.chat} 
            name="Chat" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.check1} 
            name="Check 1" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.check} 
            name="Check" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.chevronDown} 
            name="Chevron Down" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.clock} 
            name="Clock" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.close} 
            name="Close" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.cloud} 
            name="Cloud" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.copy} 
            name="Copy" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.document} 
            name="Document" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.download2} 
            name="Download 2" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.download} 
            name="Download" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.email} 
            name="Email" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.expand} 
            name="Expand" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.exposure} 
            name="Exposure" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.folder} 
            name="Folder" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.graphArrow} 
            name="Graph Arrow" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.graph} 
            name="Graph" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.help2} 
            name="Help 2" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.help} 
            name="Help" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.home} 
            name="Home" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.inbox} 
            name="Inbox" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.limits} 
            name="Limits" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.list} 
            name="List" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.lock} 
            name="Lock" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.pencil} 
            name="Pencil" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.pieChart} 
            name="Pie Chart" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.pin} 
            name="Pin" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.portfolio} 
            name="Portfolio" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.printer} 
            name="Printer" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.reload} 
            name="Reload" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.replace} 
            name="Replace" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s2ArrowDown} 
            name="S2 Arrow Down" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s1ArrowRight} 
            name="S1 Arrow Right" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s1ArrowUp} 
            name="S1 Arrow Up" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s2ArrowDown} 
            name="S2 Arrow Down" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s2ArrowLeft} 
            name="S2 Arrow Left" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s2ArrowRight} 
            name="S2 Arrow Right" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s2ArrowUp} 
            name="S2 Arrow Up" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s3ArrowDown} 
            name="S3 Arrow Down" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s3ArrowLeft} 
            name="S3 Arrow Left" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s3ArrowRight} 
            name="S3 Arrow Right" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.s3ArrowUp} 
            name="S3 Arrow Up" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.send} 
            name="Send" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.smallArrowRight} 
            name="Small Arrow Right" 
            size="22x22px" 
          />
          <IconExample 
            IconComponent={icons.medium.trash} 
            name="Trash" 
            size="22x22px" 
          />
          <IconExample
            IconComponent={icons.medium.unlock}
            name="Unlock"
            size="22x22px"
          />
          <IconExample
            IconComponent={icons.medium.settings}
            name="Settings"
            size="22x22px"
          />
        </div>

        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Table Icons (24x24px)</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>
          These icons are specifically designed for use in table headers
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <IconExample 
            IconComponent={icons.table.ammount} 
            name="Amount" 
            size="24x24px" 
          />
          <IconExample 
            IconComponent={icons.table.arrange} 
            name="Arrange" 
            size="24x24px" 
          />
          <IconExample 
            IconComponent={icons.table.calendar} 
            name="Calendar" 
            size="24x24px" 
          />
          <IconExample 
            IconComponent={icons.table.document} 
            name="Document" 
            size="24x24px" 
          />
          <IconExample 
            IconComponent={icons.table.file} 
            name="File" 
            size="24x24px" 
          />
          <IconExample 
            IconComponent={icons.table.status} 
            name="Status" 
            size="24x24px" 
          />
          <IconExample 
            IconComponent={icons.table.text} 
            name="Text" 
            size="24x24px" 
          />
          <IconExample 
            IconComponent={icons.table.warning} 
            name="Warning" 
            size="24x24px" 
          />
          <IconExample
            IconComponent={icons.table.tick}
            name="Tick"
            size="24x24px"
          />
          <IconExample
            IconComponent={icons.table.statusCheck}
            name="Status Check"
            size="17x17px"
          />
          <IconExample
            IconComponent={icons.table.statusAlert}
            name="Status Alert"
            size="17x17px"
          />
          <IconExample
            IconComponent={icons.table.statusError}
            name="Status Error"
            size="17x17px"
          />
          <IconExample
            IconComponent={icons.table.statusProgress}
            name="Status Progress"
            size="17x17px"
          />
          <IconExample
            IconComponent={icons.table.statusAdd}
            name="Status Add"
            size="17x17px"
          />
        </div>
      </section>

      {/* Status Icons */}
      <section style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Status Icons (18x18px)</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>
          Visual indicators for different states with pre-defined colors
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <IconExample 
            IconComponent={icons.medium.statusWarning} 
            name="Warning" 
            size="18x18px" 
          />
          <IconExample 
            IconComponent={icons.medium.statusError} 
            name="Error" 
            size="18x18px" 
          />
          <IconExample 
            IconComponent={icons.medium.statusSuccess} 
            name="Success" 
            size="18x18px" 
          />
        </div>
      </section>
      
      {/* Logo Icons */}
      <section style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Logo Icons</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>
          Brand and navigation logos with pre-defined colors
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <IconExample
            IconComponent={icons.logos.korra}
            name="Korra"
            size="60x20px"
          />
          <IconExample
            IconComponent={icons.logos.k}
            name="K (Compact)"
            size="20x20px"
          />
          <IconExample
            IconComponent={icons.logos.marketplace}
            name="Marketplace"
            size="14x14px"
          />
          <IconExample
            IconComponent={icons.logos.reports}
            name="Reports"
            size="14x14px"
          />
          <IconExample
            IconComponent={icons.logos.analytics}
            name="Analytics"
            size="14x14px"
          />
          <IconExample
            IconComponent={icons.logos.contracts}
            name="Contracts"
            size="14x14px"
          />
        </div>
      </section>

      {/* Card Icons */}
      <section style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#374151' }}>Card Icons (15x18px)</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>
          Icons designed to be used beside card titles with pre-defined colors
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <IconExample
            IconComponent={icons.cards.check}
            name="Cards Check"
            size="15x18px"
          />
          <IconExample
            IconComponent={icons.cards.graph}
            name="Cards Graph"
            size="15x19px"
          />
          <IconExample
            IconComponent={icons.cards.text}
            name="Cards Text"
            size="15x18px"
          />
        </div>
      </section>

    </div>
  );
};

const meta: Meta<typeof DesignTokensShowcase> = {
  title: 'Design System/Design Tokens',
  component: DesignTokensShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete showcase of all design tokens including colors, typography, spacing, border radius, and shadows from the Ledger Design Library.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTokens: Story = {};