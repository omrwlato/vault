import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { useConnectWallet } from '../../../home/redux/hooks';
import { useFetchApys, useFetchBalances, useFetchVaultsData } from '../../redux/hooks';
import { byDecimals } from 'features/helpers/bignumber';
import { formatTvl } from 'features/helpers/format';
import HomeLink from './HomeLink/HomeLink';
import PoolActions from '../PoolActions/PoolActions';
import PoolTitle from '../PoolSummary/PoolTitle/PoolTitle';
import LabeledStat from '../PoolSummary/LabeledStat/LabeledStat';
import styles from './styles';
import { Helmet } from 'react-helmet';
import { usePageMeta } from '../../../common/getPageMeta';
import ApyStats from '../PoolSummary/ApyStats/ApyStats';
import PoolPaused from '../PoolSummary/PoolPaused/PoolPaused';
import { CakeV2Banner } from './Banners/CakeV2Banner/CakeV2Banner';
import { launchpools } from '../../../helpers/getNetworkData';
import {
  useLaunchpoolSubscriptions,
  useLaunchpoolUpdates,
  usePoolApr,
} from '../../../stake/redux/hooks';
import { PoolBoosts } from '../PoolSummary/PoolBoosts/PoolBoosts';
import { getRetireReason } from '../PoolSummary/RetireReason/RetireReason';

const FETCH_INTERVAL_MS = 30 * 1000;

const useStyles = makeStyles(styles);

const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(8);
};

const PoolDetails = ({ vaultId }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  const { pools, fetchVaultsData, fetchVaultsDataDone } = useFetchVaultsData();
  const { tokens, fetchBalances, fetchBalancesDone } = useFetchBalances();
  const { apys, fetchApys, fetchApysDone } = useFetchApys();
  const pool = pools.find(p => p.id === vaultId);
  const { getPageMeta } = usePageMeta();
  const { subscribe } = useLaunchpoolSubscriptions();
  const activeLaunchpools = useSelector(state => state.vault.vaultLaunchpools[pool.id]);
  const launchpoolId = useSelector(state => state.vault.vaultLaunchpool[pool.id]);
  const launchpool = launchpoolId ? launchpools[launchpoolId] : null;
  const launchpoolApr = usePoolApr(launchpoolId);
  const multipleLaunchpools = activeLaunchpools.length > 1;
  const [depositMenu, setDepositMenu] = useState(true);

  useEffect(() => {
    const unsubscribes = activeLaunchpools.map(launchpoolId =>
      subscribe(launchpoolId, {
        poolApr: true,
        poolFinish: true,
      })
    );

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [subscribe, activeLaunchpools]);

  useLaunchpoolUpdates();

  useEffect(() => {
    const fetch = () => {
      if (address && web3) {
        fetchBalances({ address, web3, tokens });
      }
      fetchVaultsData({ address, web3, pools });
      fetchApys();
    };
    fetch();

    const id = setInterval(fetch, FETCH_INTERVAL_MS);
    return () => clearInterval(id);

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3, fetchBalances, fetchVaultsData]);

  const vaultStateTitle = useMemo(() => {
    let state =
      pool.status === 'eol'
        ? t(getRetireReason(pool.retireReason))
        : pool.depositsPaused
          ? t('Vault-DepositsPausedTitle')
          : null;

    if (launchpool) {
      state = t('Stake-BoostedBy', { name: launchpool.name });
    }

    if (pool.experimental) {
      state = t('Vault-Experimental');
    }

    return state === null ? (
      ''
    ) : (
      <PoolPaused
        message={t(state)}
        isBoosted={!!launchpool}
        isExperimental={!!pool.experimental}
      />
    );
  }, [pool, launchpool, t]);

  const balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
  const sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);
  const apy = apys[pool.id] || { totalApy: 0 };

  const balanceUsd =
    balanceSingle > 0 && fetchVaultsDataDone ? formatTvl(balanceSingle, pool.oraclePrice) : '';
  const deposited = byDecimals(
    sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
    pool.tokenDecimals
  );
  const depositedUsd =
    deposited > 0 && fetchVaultsDataDone ? formatTvl(deposited, pool.oraclePrice, false) : '';

  if (!pool) {
    return (
      <>
        <HomeLink />
        <div className={classes.container}>
          <div className={classes.error}>Vault {vaultId} not found</div>
        </div>
      </>
    );
  }

  /// UI
  return (
    <>
      <Helmet>
        <title>
          {getPageMeta('Vault-Meta-Title', {
            vaultName: pool.name,
            vaultDescription: pool.tokenDescription,
          })}
        </title>
        <meta
          property="og:title"
          content={getPageMeta('Vault-Meta-Title', {
            vaultName: pool.name,
            vaultDescription: pool.tokenDescription,
          })}
        />
      </Helmet>
      <HomeLink />
      {vaultId === 'cake-cakev2' ? <CakeV2Banner /> : ''}
      <div
        style={{
          backgroundColor: 'rgb(255, 255, 255)', //${(props) => props.theme.color.grey[800]};
          backdropFilter: 'blur(10px) !important',
          boxShadow: '10px 22px 33px 0px rgba(0, 0, 0, 0.9) !important',
          overflow: 'hidden !important',
          borderRadius: '15px',
          color: '#000 !important',
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
        }}
      >
        <Grid
          container
          alignItems="center"
          style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', }}
        >
          {vaultStateTitle}
          <Grid item xs={12}>
            <PoolTitle
              name={pool.name}
              logo={pool.logo}
              poolId={pool.id}
              description={t('Vault-Description', { vault: pool.tokenDescription })}
              launchpool={launchpool}
              addLiquidityUrl={pool.addLiquidityUrl}
              removeLiquidityUrl={pool.removeLiquidityUrl}
              buyTokenUrl={pool.buyTokenUrl}
              assets={pool.assets}
              multipleLaunchpools={multipleLaunchpools}
            />
          </Grid>
          <Grid container style={{ marginTop: '20px' }}>

            <Grid container justifyContent="center" xs={4}>
              <LabeledStat
                value={formatDecimals(deposited)}
                subvalue={depositedUsd}
                label={t('Vault-Deposited')}
                isLoading={!fetchBalancesDone}
              />
            </Grid>
            <Grid item xs={4}>
              <ApyStats
                apy={apy}
                launchpoolApr={launchpoolApr}
                isLoading={!fetchApysDone}
                fromDetails
              />
            </Grid>
            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
              <LabeledStat
                value={formatTvl(pool.tvl, pool.oraclePrice)}
                label={t('Vault-TVL')}
                isLoading={!fetchVaultsDataDone}
              />
            </Grid>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        {pool.tokenDescriptionUrl && pool.tokenDescriptionUrl !== '#' && (
          <section className={classes.description}>
            <p>
              Link:{' '}
              <a target="_blank" rel="noopener noreferrer" href={pool.tokenDescriptionUrl}>
                {pool.tokenDescriptionUrl}
              </a>
            </p>
          </section>
        )}
        <Divider variant="middle" />
        <Grid item style={{ justifyContent: "space-around", display: 'flex', margin: '10px' }}>
          <Grid >
            <Button
              style={{ textDecoration: 'none', color: '#2596be', padding: '0px' }}
              onClick={() => setDepositMenu(true)}
            >
              <h3 style={{ color: 'black' }}>Deposit</h3>
            </Button>
            {depositMenu ? (
              <hr
                style={{
                  color: '#D3D3D3',
                  backgroundColor: '#D3D3D3',
                  height: 1,
                }}
              />
            ) : <></>}
          </Grid>

          <Grid>
            <Button
              style={{ textDecoration: 'none', color: '#2596be', padding: '0px' }}
              onClick={() => setDepositMenu(false)}
            >
              <h3 style={{ color: 'black' }}>Withdraw</h3>
            </Button>

            {!depositMenu ? (
              <hr
                style={{
                  color: '#D3D3D3',
                  backgroundColor: '#D3D3D3',
                  height: 1,
                }}
              />
            ) : <></>}
          </Grid>
        </Grid>
        <PoolActions depositMenu={depositMenu} pool={pool} balanceSingle={balanceSingle} sharesBalance={sharesBalance} />
      </div>
    </>
  );
};

export default PoolDetails;
