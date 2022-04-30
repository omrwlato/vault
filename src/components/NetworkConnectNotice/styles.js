const styles = theme => ({
  notice: {
    padding: '30px',
    backgroundColor: 'rgb(255, 255, 255)', //${(props) => props.theme.color.grey[800]};
    backdropFilter: 'blur(10px) !important',
    boxShadow: '10px 22px 33px 0px rgba(0, 0, 0, 0.9) !important',
    overflow: 'hidden !important',
    borderRadius: '15px',
    color: '#000 !important',
    display: 'flex',
    flex: '1',
    marginTop: '30px',
    marginBottom:'30px',
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
    backgroundColor: '#e638c7',
    textTransform: 'none',
    margin: '10px',
    color: 'white',
    '&:hover': {
      color: '#e638c7 !important',
      border: '1px solid #e638c7',
      backgroundColor: 'white'
    },
  },
  buttonText: {
    fontWeight: '600',
    color: 'white',
    '&:hover': {
      color: '#e638c7 !important',
    },
  },
  note: {
    marginBottom: 15,
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
  },
});

export default styles;