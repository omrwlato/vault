const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: props => (props.align ? props.align : 'center'),
    justifyContent: 'center',
  },
  stat: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    letterSpacing: 0,
    position: 'relative',
  },
  substat: {
    fontSize: '16px',
    fontWeight: '400',
    color: theme.palette.text.secondary,
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: '-20px',
  },
  tvlFormat: {
    marginLeft: '20px',
    marginTop: '20px',
  },
  label: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    letterSpacing: 0,
  },
  boosted: {
    color: '#2a9e46',
    position: 'absolute',
    top: '-20px',
    left: 0,
    right: 0,
  },
  crossed: {
    textDecoration: 'line-through',
  },
});

export default styles;
