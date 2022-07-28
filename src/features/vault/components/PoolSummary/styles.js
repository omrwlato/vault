const styles = theme => ({
  button: {
    padding: '4px 8px',
    backgroundColor: '#e638c7',
    textTransform: 'none',
    margin: '10px',
    border: '1px solid #e638c7',
    '&:hover': {
      color: '#e638c7 !important',
      backgroundColor: 'white'
    },
  },
  buttonLink: {
    color: 'white',
    '&:hover': {
      color: '#e638c7 !important',
    },

  },
  buttonText: {
    fontWeight: '600',
    '&:hover': {
      color: '#e638c7 !important',
    },
  },
  parentgrid: {
    padding: '30px',
    backgroundColor: 'rgb(255, 255, 255)', //${(props) => props.theme.color.grey[800]};
    backdropFilter: 'blur(10px) !important',
    boxShadow: '10px 22px 33px 0px rgba(0, 0, 0, 0.9) !important',
    overflow: 'hidden !important',
    borderRadius: '15px',
    color: '#000 !important',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    '&:hover': {},
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.primary,
  },
  detailsPaused: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.paused,
  },
  detailsRetired: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.retired,
  },
  mobilePadding: {
    paddingTop: '20px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    [theme.breakpoints.up('sm')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    [theme.breakpoints.up('md')]: {
      flexBasis: '37%',
      maxWidth: '37%',
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: '30%',
      maxWidth: '30%',
    },
  },
  itemBalances: {
    [theme.breakpoints.up('sm')]: {
      flexBasis: '25%',
      maxWidth: '25%',
    },
    [theme.breakpoints.up('md')]: {
      flexBasis: '15%',
      maxWidth: '15%',
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: '18%',
      maxWidth: '18%',
    },
  },
  itemStats: {
    [theme.breakpoints.up('md')]: {
      flexBasis: '11%',
      maxWidth: '11%',
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: '11.33%',
      maxWidth: '11.33%',
    },
  },
  itemInner: {
    textAlign: 'center',
  },
});

export default styles;
