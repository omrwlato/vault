import React, {useState} from 'react';
import styled from 'styled-components';
import { Modal } from './components/Modal';
import { Box, Button, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import Pools from 'features/vault/components/Pools/Pools';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

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
                onClick={openModal}
              >
                Read More
              </Button>
              <Modal showModal={showModal} setShowModal={setShowModal} />
           </Box>
        </Grid>
      </Grid>
    </Grid>
      <Pools fromPage="home" />
    </>
  );
}
