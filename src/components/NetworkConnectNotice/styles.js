const styles = theme => ({
  notice: {
    backgroundColor: 'rgb(255, 255, 255)', //${(props) => props.theme.color.grey[800]};
    backdropFilter: 'blur(10px) !important',
    boxShadow: '10px 22px 33px 0px rgba(0, 0, 0, 0.9) !important',
    overflow: 'hidden !important',
    borderRadius: '15px',
    color: '#000 !important',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    '& > :last-child': {
      marginBottom: 0,
    },
  },
  message: {
    marginBottom: 15,
  },
  actions: {
    margin: '-10px -10px 15px 0',
  },
  button: {
    padding: '4px 8px',
    backgroundColor: '#fff',
    textTransform: 'none',
    margin: '10px 10px 0 0',
  },
  note: {
    marginBottom: 15,
    fontStyle: 'Bold',
  },
  error: {
    color: 'red',
  },
});

export default styles;
