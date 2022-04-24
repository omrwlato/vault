import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import ContentLoader from 'react-content-loader';

const Loader = props => {
  const theme = useTheme();

  return (
    <ContentLoader
      width={120}
      height={28}
      viewBox="0 0 120 28"
      backgroundColor='#fcb037'
      foregroundColor= '#e638c7'
      {...props}
    >

      <rect x="0" y="0" width="120" height="28" />
    </ContentLoader>
  );
};

export default Loader;
