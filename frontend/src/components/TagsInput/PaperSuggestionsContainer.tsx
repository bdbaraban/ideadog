import React, { FC } from 'react';
import { RenderSuggestionsContainerParams } from 'react-autosuggest';

import Paper from '@material-ui/core/Paper';

/**
 * Autosuggest suggestions list container
 */
const PaperSuggestionsContainer: FC<RenderSuggestionsContainerParams> = ({
  containerProps,
  children
}: RenderSuggestionsContainerParams) => (
  <Paper square {...containerProps}>
    {children}
  </Paper>
);

export default PaperSuggestionsContainer;
