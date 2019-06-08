import React from 'react';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import copy from 'clipboard-copy';

interface ChildProps {
  copy: (content: string) => void;
}

interface CopyToClipboardProps {
  TooltipProps?: Partial<TooltipProps>;
  children: (props: ChildProps) => React.ReactElement;
}

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
      {...TooltipProps || {}}
    >
      {children({ copy: onCopy }) as React.ReactElement}
    </Tooltip>
  );
};

export default CopyToClipboard;
