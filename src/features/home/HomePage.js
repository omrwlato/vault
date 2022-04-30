import React, {useState} from 'react';
import { Box, Button, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import Pools from 'features/vault/components/Pools/Pools';


export default function HomePage() {
  const [onPresentModal] = useModal(
    <Modal>
      <Box p={4}>
        <h2>Welcome to</h2>
        <h2 style={{ color: '#ff4794' }}>FROYO Farms</h2>
        <p>A yield optimization protocol built with the health of your favorite protocol in mind.</p>
        <p>
          Deposit your liquidity-pairs into our vaults to automatically compound your rewards.
          Our vaults run an optimized strategy to ........
        </p>
      </Box>
    </Modal>,
  );
  return (
    <>
    <Grid container spacing={3}>
      <Grid
        container 
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{marginTop:'35px'}}
      >
        <Grid item xs={12} sm={8}>
          <Box p={4} justifyContent="center" alignItems="center">
            <Typography variant="h3" fontWeight="bold" align="center" style={{ color: '#000'}}>
              A Yield Optimizer Built to Make a Difference!
            </Typography>
          </Box>
          <Box style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Button
                disabled={false}
                variant="contained"
                onClick={onPresentModal}
              >
                Read More
              </Button>
            </Box>
        </Grid>
      </Grid>
    </Grid>
      <Pools fromPage="home" />
    </>
  );
}
