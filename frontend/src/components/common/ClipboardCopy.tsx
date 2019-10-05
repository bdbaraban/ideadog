import React, { FC, ReactElement, useState } from 'react';

import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import copy from 'clipboard-copy';

// ClipboardCopy children prop types
interface ChildProps {
  copy: (content: string) => void; // clipboard-copy function type
}

// ClipboardCopy component prop types
interface CopyToClipboardProps {
  TooltipProps?: Partial<TooltipProps>; // Props passed to Tooltip component
  children: (props: ChildProps) => ReactElement; // ReactElement child component
}

/**
 * Clipboard copy functional component
 */
const ClipboardCopy: FC<CopyToClipboardProps> = ({
  TooltipProps,
  children
}: CopyToClipboardProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

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
      {children({ copy: onCopy }) as ReactElement}
    </Tooltip>
  );
};

export default ClipboardCopy;
