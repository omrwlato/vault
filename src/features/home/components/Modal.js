import React, { useRef, useEffect, useCallback, createContext } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
//import { MdClose } from 'react-icons/md';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items:center;
  z-index:1;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: fixed;
  z-index: 10;
  border-radius: 10px;
  display: flex;
  justify-content: flex;
  align-items:flex;
`;


const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

// const CloseModalButton = styled(MdClose)`
//   cursor: pointer;
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   width: 32px;
//   height: 32px;
//   padding: 0;
//   z-index: 10;
// `;

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <h2>Welcome to</h2>
                <h2 style={{ color: '#ff4794' }}>FROYO Farms</h2>
                <p>A yield optimization protocol built with the health of your favorite protocol in mind.</p>
                <p align="center">
                  Deposit your liquidity-pairs into our vaults to automatically compound your rewards.
                  Our vaults run an optimized strategy that initiates a buy back and burn of any
                  specified token using the native token. The burning mechanism automatically results in every protocol
                  listed to become deflationary with with the help of the investors!
                </p>
              </ModalContent>
              {/* <CloseModalButton
                    aria-label='Close modal'
                    onClick={() => setShowModal(prev => !prev)}
                /> */}
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};