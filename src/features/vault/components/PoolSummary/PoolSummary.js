import React, { useCallback, useMemo } from 'react';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';
import { formatTvl } from 'features/helpers/format';
import { byDecimals } from 'features/helpers/bignumber';
import styles from './styles';
import PoolPaused from './PoolPaused/PoolPaused';
import PoolTitle from './PoolTitle/PoolTitle';
import LabeledStat from './LabeledStat/LabeledStat';
import ApyStats from './ApyStats/ApyStats';
import { usePoolApr } from '../../../stake/redux/subscription';
import { PoolBoosts } from './PoolBoosts/PoolBoosts';
import { getRetireReason } from './RetireReason/RetireReason';

const useStyles = makeStyles(styles);

const PoolSummary = ({
  pool,
  launchpool,
  toggleCard,
  balanceSingle,
  sharesBalance,
  apy,
  fetchBalancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
  multipleLaunchpools = false,
}) => {
  const { chain } = useParams();
  const { t } = useTranslation();
  const classes = useStyles();

  const launchpoolApr = usePoolApr(launchpool ? launchpool.id : null);
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

  const balanceUsd =
    balanceSingle > 0 && fetchVaultsDataDone ? formatTvl(balanceSingle, pool.oraclePrice) : '';
  const deposited = byDecimals(
    sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
    pool.tokenDecimals
  );
  const depositedUsd =
    deposited > 0 && fetchVaultsDataDone ? formatTvl(deposited, pool.oraclePrice) : '';
  const onSummaryClick = useCallback(
    e => {
      if (!e.target || !e.target.classList.contains('tooltip-toggle')) {
        toggleCard();
      }
    },
    [toggleCard]
  );

  return (
    // <AccordionSummary
    //   className={
    //     pool.status === 'eol'
    //       ? classes.detailsRetired
    //       : pool.depositsPaused
    //       ? classes.detailsPaused
    //       : classes.details
    //   }
    //   style={{ justifyContent: 'space-between' }}
    //   onClick={onSummaryClick}
    // >
    <>
      <Grid container xs={12} className={classes.parentgrid}>
        {vaultStateTitle}
        <PoolBoosts poolName={pool.name} earnedTokenAddress={pool.earnedTokenAddress} />
        <Grid item xs={12} style={{ margin: '10px 0' }}>
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
          <hr
            style={{
              color: '#D3D3D3',
              backgroundColor: '#D3D3D3',
              height: 1,
              marginTop: '10px',
            }}
          />
        </Grid>

        <ApyStats
          apy={apy}
          launchpoolApr={launchpoolApr}
          isLoading={!fetchApysDone}
          poolId={pool.id}
          showVault
          fromHomePage
        />
        <LabeledStat
          value={formatTvl(pool.tvl, pool.oraclePrice)}
          label={t('Vault-TVL')}
          isLoading={!fetchVaultsDataDone}
          fromHomePage
          style={{ marginTop: '20px', marginBottom: '10px' }}
        />
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button className={classes.button}>
            <a
              style={{
                color: 'white',
              }}
              href={pool.buyTokenUrl}
            >
              <strong>BUY</strong>
            </a>
          </Button>
          <Button className={classes.button}>
            <a
              style={{
                color: 'white',
              }}
              href={pool.addLiquidityUrl}
            >
              <strong>CREATE LP</strong>
            </a>
          </Button>
          <Button className={classes.button}>
            <Link
              style={{
                color: 'white',
              }}
              to={`/${chain}/vault/${pool.id}`}
            >
              <strong>VIEW</strong>
            </Link>
          </Button>
        </Grid>
      </Grid>
    </>
    // </AccordionSummary>
  );
};

const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(3);
};

export default PoolSummary;
