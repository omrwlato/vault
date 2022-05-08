import React, { useCallback, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import { networkSettings, networkSetup } from 'common/networkSetup';
import { getNetworkAppUrl, getNetworkFriendlyName } from 'features/helpers/getNetworkData';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(styles);
const targetNetworkId = window.REACT_APP_NETWORK_ID;

export function NetworkConnectNotice({
  web3,
  address,
  networkId,
  connectWallet,
  disconnectWallet,
}) {
  const [networkSetupError, setNetworkSetupError] = useState(null);
  const { t } = useTranslation();
  const haveConnection = !!web3;
  const haveAddress = !!address;
  const isCorrectNetwork = networkId === targetNetworkId;
  const isSupportedNetwork = networkId && networkId in networkSettings;
  const targetNetworkFriendlyName = getNetworkFriendlyName();
  const classes = useStyles();
  let notice = null;

  const targetNetworkSetup = useCallback(() => {
    setNetworkSetupError(null);

    networkSetup(targetNetworkId)
      .then(() => {
        setNetworkSetupError(null);
      })
      .catch(e => {
        if (typeof e === 'object' && typeof e.message === 'string') {
          setNetworkSetupError(e.message);
        } else if (typeof e === 'string') {
          setNetworkSetupError(e);
        } else {
          setNetworkSetupError(t('Network-UnknownError'));
        }
      });
  }, [setNetworkSetupError, t]);

  const networkRedirect = url => {
    window.location.assign(url);
    window.location.reload();
  };

  const supportedNetwork = useMemo(() => {
    return isSupportedNetwork
      ? {
          id: networkId,
          url: getNetworkAppUrl(networkId),
          name: getNetworkFriendlyName(networkId),
        }
      : null;
  }, [isSupportedNetwork, networkId]);

  if (!haveConnection) {
    notice = (
      <Grid container >
        <Grid
          container
          item
          spacing={3}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
        >
          <Typography style={{ color: 'black' }} align='center' variant='h6'>
            {t('Network-ConnectionRequired', { network: targetNetworkFriendlyName })}
          </Typography>

        </Grid>
        <Grid
          container
          item
          spacing={3}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
        >
          <Button onClick={connectWallet} className={classes.button}>
            <div className={classes.buttonText}> {t('Network-ConnectWallet')}</div>
          </Button>
        </Grid>
      </Grid>
    );
  } else if (!isCorrectNetwork) {
    notice = (
      <Grid container >
        <Grid
          container
          item
          spacing={3}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
        >
          <Typography style={{ color: 'black' }} variant="h6" align='center'>
            {t('Network-Supports', { network: targetNetworkFriendlyName })}{' '}
            {isSupportedNetwork
              ? t('Network-ConnectedTo', { network: supportedNetwork.name })
              : t('Network-ConnectedUnsupported')}
          </Typography>

        </Grid>

        <Grid
          container
          item
          spacing={3}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
        >
          <Button onClick={targetNetworkSetup} className={classes.button}>
            <div className={classes.buttonText}>{t('Network-SwitchToNetwork', { network: targetNetworkFriendlyName })}</div>

          </Button>
          {isSupportedNetwork ? (
            <Button
              onClick={() => networkRedirect(supportedNetwork.url)}
              className={classes.button}
            >
              <div className={classes.buttonText}>{t('Network-GoToApp', { network: supportedNetwork.name })}</div>

            </Button>
          ) : null}
          <Button onClick={disconnectWallet} className={classes.button}>
            <div className={classes.buttonText}>{t('Network-DisconnectWallet')}</div>

          </Button>

        </Grid>

        <Grid
          container
          item
          spacing={3}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
        >
          <Typography style={{ color: 'black' }} align='center' variant='h6'>
            {t('Network-SwitchNote')}
          </Typography>
          {networkSetupError ? <div className={classes.error}>
            <Typography align='center' variant='h6'>
              {networkSetupError}
            </Typography>
          </div> : ''}
        </Grid>
      </Grid>
    );
  } else if (!haveAddress) {
    notice = (
      <Grid container >
        <Grid
          container
          item
          spacing={3}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
        >
          <Typography style={{ color: 'black' }} align='center' variant='h6'>
            {t('Network-ConnectedTo', { network: targetNetworkFriendlyName })}
          </Typography>

        </Grid>
        <Grid
          container
          item
          spacing={3}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
        >
          <Typography style={{ color: 'black' }} align='center' variant='h6'>
            {t('Network-NoWalletAddress')}
          </Typography></Grid>
      </Grid>
    );
  }

  return notice ? <div className={classes.notice}>{notice}</div> : null;
}
