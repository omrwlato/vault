const styles = theme => ({
  container: {
    paddingTop: '0px',
  },
  tvl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '32px',
    letterSpacing: '0',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
  },
  titleLoader: {
    marginLeft: '0px',
  },
  subtitle: {
    letterSpacing: '0',
    lineHeight: '8px',
    [theme.breakpoints.down('xs')]: {
      lineHeight: '16px',
    },
    color: '#000',
    marginTop: '0',
  },
  text: {
    fontSize: '24px',
    letterSpacing: '0',
    lineHeight: '32px',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
  },
  infinityIcon: {
    marginBottom: '-6px',
    paddingRight: '5px',
  },
});

export default styles;
