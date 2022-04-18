const styles = theme => ({
  button: {
    padding: '4px 8px',
    backgroundColor: '#c59289',
    textTransform: 'none',
    margin: '10px 10px 0 0',
    background: 'linear-gradient(45deg, #fcb037, #e638c7, #31bcfd)',
  },
  parentgrid: {
    padding: '16px',
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
