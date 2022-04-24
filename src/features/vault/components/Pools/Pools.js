import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

import TVLLoader from './TVLLoader/TVLLoader';
import { useConnectWallet } from 'features/home/redux/hooks';
import { useFetchBalances, useFetchVaultsData, useFetchApys } from '../../redux/hooks';
import VisiblePools from '../VisiblePools/VisiblePools';
import styles from './styles';
import { usePoolsTvl, useUserTvl } from '../../hooks/usePoolsTvl';
import { formatGlobalTvl } from 'features/helpers/format';
import { useFetchBifibuyback } from 'features/vault/redux/fetchBifiBuyback';
import { getNetworkFriendlyName } from '../../../helpers/getNetworkData';
import { Box, Button, CardContent, Grid, Paper, Typography } from '@material-ui/core';

const FETCH_INTERVAL_MS = 15 * 1000;

const useStyles = makeStyles(styles);

export default function Pools() {
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  const { pools, fetchVaultsData, fetchVaultsDataPending, fetchVaultsDataDone } =
    useFetchVaultsData();
  const { tokens, fetchBalances, fetchBalancesPending, fetchBalancesDone } = useFetchBalances();
  const { apys, fetchApys, fetchApysDone } = useFetchApys();
  const { bifibuyback, fetchBifibuyback, fetchBifibuybackDone } = useFetchBifibuyback();
  const { poolsTvl } = usePoolsTvl(pools);
  const { userTvl } = useUserTvl(pools, tokens);
  const classes = useStyles();
  const [poolSelected, setPoolSelected] = useState('ALL');
  const [newPoolsSelected, setNewPoolsSelected] = useState([]);
  const selectedPoolList = family => {
    const familyPools = pools.filter(pool => pool.family === family);
    return familyPools;
  };
  const onClickPool = e => {
    const { name } = e.currentTarget;
    const poolsToDisplay = selectedPoolList(name);
    setPoolSelected(name);
    setNewPoolsSelected(poolsToDisplay);
  };
  useEffect(() => {
    fetchApys();
    const id = setInterval(fetchApys, FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchApys]);

  useEffect(() => {
    fetchBifibuyback();
    const id = setInterval(fetchBifibuyback, FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchBifibuyback]);

  useEffect(() => {
    const fetch = () => {
      if (address && web3 && !fetchBalancesPending) {
        fetchBalances({ address, web3, tokens });
      }
      if (!fetchVaultsDataPending) {
        fetchVaultsData({ web3, pools });
      }
    };
    fetch();

    const id = setInterval(fetch, FETCH_INTERVAL_MS);
    return () => clearInterval(id);

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3, fetchBalances, fetchVaultsData]);

  // const chainNameLowercase = getNetworkFriendlyName().toLowerCase();
  // const chainBifibuyback =
  //   fetchBifibuybackDone && chainNameLowercase in bifibuyback
  //     ? bifibuyback[chainNameLowercase].buybackUsdAmount
  //     : undefined;

  const activePoolCount = pools.filter(pool => pool.status === 'active').length;

  return (
    <Grid container className={classes.container}>
      {/*       <Grid item xs={6}>
        {/* <h1 className={classes.title}>{t('Vault-Network')}</h1> */}
      {/* <NetworksToggle /> 
        {fetchVaultsDataDone && activePoolCount && (
          <>
            <h2 className={classes.title}> {`${activePoolCount} ${t('Vault-MainTitle')}`}</h2>
          </>
        )}
      </Grid> */}
      {/*       <Grid container justify="center">
        <div className={classes.tvl}>
          <span className={classes.title}>
            Total Value Locked{' '}
            {fetchVaultsDataDone && poolsTvl > 0 ? (
              formatGlobalTvl(poolsTvl)
            ) : (
              <TVLLoader className={classes.titleLoader} />
            )}
          </span> */}

      <Grid container justify="center">
        <Box
          mt={3}
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h3 style={{ color: '#000', fontSize: '1.17em' }}>Total Value Locked</h3>
          <span style={{ fontSize: '50px', marginBottom: '30px' }}>
            {fetchVaultsDataDone && poolsTvl > 0 ? (
              formatGlobalTvl(poolsTvl)
            ) : (
              <TVLLoader className={classes.titleLoader} />
            )}
          </span>
        </Box>
      </Grid>
      {/* {fetchBifibuybackDone && chainBifibuyback && (
            <span className={classes.text}>
              {t('Vault-BifiBuyback', { amount: formatGlobalTvl(chainBifibuyback) })}
            </span>
          )} */}

      {/*           <span className={classes.text}>
            {t('Vault-Deposited')}{' '}
            {fetchVaultsDataDone && fetchBalancesDone ? (
              formatGlobalTvl(userTvl)
            ) : (
              <TVLLoader className={classes.titleLoader} />
            )}
          </span> */}
      {/* 
          <h4 className={classes.subtitle} style={{ marginTop: '16px' }}>
            <AllInclusiveIcon className={classes.infinityIcon} />
            {t('Vault-AutocompoundingNote')}
          </h4> 
        </div> 
      </Grid> */}
      <Grid item xs={12}>
        <Button style={{ marginBottom: '10px ' }} name="ALL" onClick={onClickPool}>
          All
        </Button>
        <Button style={{ marginBottom: '10px ' }} name="SUNDAE" onClick={onClickPool}>
          <strong>SUNDAE</strong>
        </Button>
        <Button style={{ marginBottom: '10px ' }} name="ICECREAM" onClick={onClickPool}>
          <strong>ICECREAM</strong>
        </Button>
        <Button style={{ marginBottom: '10px ' }} name="GRAPE" onClick={onClickPool}>
          <strong>GRAPE</strong>
        </Button>
      </Grid>
      {poolSelected === 'ALL' ? (
        <VisiblePools
          pools={pools}
          apys={apys}
          tokens={tokens}
          fetchBalancesDone={fetchBalancesDone}
          fetchApysDone={fetchApysDone}
          fetchVaultsDataDone={fetchVaultsDataDone}
        />
      ) : (
        <VisiblePools
          pools={newPoolsSelected}
          apys={apys}
          tokens={tokens}
          fetchBalancesDone={fetchBalancesDone}
          fetchApysDone={fetchApysDone}
          fetchVaultsDataDone={fetchVaultsDataDone}
        />
      )}
    </Grid>
  );
}
