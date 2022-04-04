const styles = theme => ({
  container: {
    border: '1px solid ' + theme.palette.background.border,
    backgroundColor: 'red',
  },
  accordion: {
    width: '100%',
    backgroundColor: theme.palette.background.primary,
  },
  divider: {
    margin: '0 30px',
  },
});

export default styles;
