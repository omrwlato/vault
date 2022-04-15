const styles = theme => ({
  container: {
    marginBottom: '24px',
    backgroundColor: 'rgb(255, 255, 255) !important', //${(props) => props.theme.color.grey[800]};
    backdropFilter: 'blur(20px) !important',
    overflow: 'hidden !important',
    borderRadius: '15px',
    color: '#000 !important',
    display: 'flex',
    flex: '1',
    flexDirection: 'row',
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
