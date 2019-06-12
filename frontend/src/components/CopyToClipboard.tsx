import React from 'react';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import copy from 'clipboard-copy';

/**
 * CopyToClipBoard children prop types
 */
interface ChildProps {
  // clipboard-copy function type
  copy: (content: string) => void;
}

/**
 * CopyToClipboard component prop types
 */
interface CopyToClipboardProps {
  // Props passed to Tooltip component
  TooltipProps?: Partial<TooltipProps>;

  // ReactElement child component
  children: (props: ChildProps) => React.ReactElement;
}

/**
 * Clipboard copy functional component
 */
const CopyToClipboard = ({
  TooltipProps,
  children
}: CopyToClipboardProps): React.ReactElement => {
  const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

  const onCopy = (content: string): void => {
    copy(content);
    setShowTooltip(true);
  };

  const handleOnTooltipClose = (): void => {
    setShowTooltip(false);
  };

  return (
    <Tooltip
      open={showTooltip}
      title={'Copied to clipboard!'}
      leaveDelay={1500}
      onClose={handleOnTooltipClose}
      {...(TooltipProps || {})}
    >
      {children({ copy: onCopy }) as React.ReactElement}
    </Tooltip>
  );
};

export default React.memo(CopyToClipboard);
