import React, { useState } from 'react';
import { Modal, Input, Button } from '@design-library/components';
import { typography, useSemanticColors, spacing, borderRadius } from '@design-library/tokens';
import { icons } from '@design-library/icons';

/**
 * Modal component for connecting bank API integration
 *
 * Features:
 * - Two-state modal (initial connection form → success confirmation)
 * - Theme-aware background colors (primary200 → green success)
 * - Secure API key input with success state indication
 * - Right-aligned Continue button in success state
 *
 * @example
 * ```tsx
 * <ConnectBankAPIModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   onConnect={() => handleAPIConnection()}
 * />
 * ```
 */
interface ConnectBankAPIModalProps {
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Callback fired when modal should be closed */
  onClose: () => void;
  /** Callback fired when API connection is successful */
  onConnect: () => void;
}

export const ConnectBankAPIModal: React.FC<ConnectBankAPIModalProps> = ({
  isOpen,
  onClose,
  onConnect
}) => {
  const colors = useSemanticColors();
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleClose = () => {
    onClose();
    // Reset state when modal closes
    setTimeout(() => {
      setIsConnected(false);
      setApiKey('');
    }, 300);
  };

  const handleConnect = () => {
    if (apiKey.trim()) {
      setIsConnected(true);
      // Call the parent's onConnect callback immediately
      onConnect();
    }
  };

  /**
   * Reusable style objects for modal content
   */
  const descriptionStyles: React.CSSProperties = {
    ...typography.styles.bodyM,
    color: colors.blackAndWhite.black600,
    margin: 0,
    lineHeight: '1.4',
    textAlign: 'center',
  };

  const buttonContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: isConnected ? 'flex-end' : 'space-between',
    gap: '12px',
    marginTop: '24px',
    marginBottom: '16px',
  };


  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="custom"
      width="500px"
      showCloseButton={true}
      title={isConnected ? "" : "Connect Bank API"}
      showBackdrop={true}
      backdropColor="white"
      backdropOpacity={0.8}
    >
      <div>
        {/* Success Icon - shown only when connected */}
        {isConnected && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: colors.analytics.green500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <icons.medium.check color={colors.blackAndWhite.black900} />
            </div>
          </div>
        )}

        {/* Description */}
        {!isConnected && (
          <p style={descriptionStyles}>
            Enter your bank's API key to establish a secure connection for automated trust account management and real-time transaction processing.
          </p>
        )}

        {/* Success Message */}
        {isConnected && (
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <p style={{
              ...typography.styles.subheadingL,
              color: colors.blackAndWhite.black900,
              margin: '0 0 8px 0',
            }}>
              Your account is now connected
            </p>
            <p style={{
              ...typography.styles.subheadingL,
              color: colors.blackAndWhite.black500,
              margin: 0,
            }}>
              You can safely close this window
            </p>
          </div>
        )}

        {/* API Key Input Container */}
        <div style={{
          backgroundColor: isConnected ? '#EEFFED' : colors.theme.primary200,
          padding: '20px',
          borderRadius: borderRadius[8],
          marginTop: '30px',
        }}>
            <Input
              label="API Key"
              placeholder="Enter your bank's API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
              state={isConnected ? 'success' : 'default'}
              helperText={isConnected ?
                "API connected" :
                "Your API key is encrypted and stored securely. It will not be shared with third parties."
              }
            />

        </div>

        {/* Buttons */}
        <div style={buttonContainerStyles}>
          {!isConnected && (
            <Button
              variant="primary"
              color="white"
              onClick={handleClose}
              showIcon={false}
            >
              Cancel
            </Button>
          )}
          <Button
            variant="primary"
            color="black"
            onClick={isConnected ? handleClose : handleConnect}
            disabled={!isConnected && !apiKey.trim()}
            showIcon={false}
          >
            {isConnected ? "Continue" : "Connect"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};