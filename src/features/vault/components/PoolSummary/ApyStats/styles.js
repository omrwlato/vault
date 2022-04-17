const styles = theme => ({
  button: {
    border: '1px solid ' + theme.palette.background.border,
    padding: '4px 8px',
    backgroundColor: '#c59289',
    textTransform: 'none',
    margin: '10px 10px 0 0',
  },
  tooltip: {
    fontSize: 14,
  },
  label: {
    fontWeight: 'bold',
    paddingRight: '10px',
  },
  value: {
    fontWeight: 'normal',
    textAlign: 'right',
  },
});

export default styles;
