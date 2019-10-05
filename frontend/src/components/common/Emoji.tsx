import React, { FC, HTMLAttributes } from 'react';

// Emoji component prop types
interface EmojiProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string; // Aria-label for the emoji (optional)
  symbol: string; // Emoji symbol (required)
}

/**
 * Wraps an emoji in an a11y-friendly span.
 */
const Emoji: FC<EmojiProps> = ({ label, symbol, ...rest }: EmojiProps) => {
  return (
    <span
      aria-hidden={label !== undefined ? undefined : 'true'}
      aria-label={label}
      role="img"
      {...rest}
    >
      {symbol}
    </span>
  );
};

export default Emoji;
