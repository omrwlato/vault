import React, { useRef, useEffect, useCallback, createContext } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
//import { MdClose } from 'react-icons/md';

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 25%;
  right: auto;
  bottom: auto;
  overflow: auto;
  WebkitOverflowScrolling: 'touch';
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items:center;
  z-index:1;
`;

const ModalWrapper = styled.div`
    background-color: rgba(255, 255, 255, 1);
    backdrop-filter: blur(10px) !important;
    -webkit-box-shadow: 10px 22px 33px 0px rgba(0, 0, 0, 0.9) !important;
    -moz-box-shadow: 5px 22px 33px 0px rgba(0, 0, 0, 0.9) !important;
    box-shadow: 10px 22px 33px 0px rgba(0, 0, 0, 0.9) !important;
    overflow: hidden !important;
    z-index: 10;
    border-radius: 15px;
    color: #000 !important;

    
    flex-direction: column;
    display: flex;
    flex: 1;
    position: relative;
    width: 550px;
    height: 350px;
`;


const ModalContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 25px;
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
                <h1 
                style={{size:'27px', margin:'0px', marginTop:'15px'}}
                >
                Welcome to
                </h1>
                <h1 style={{ color: '#ff4794', size:'35px', margin:'0px' }}
                
                >
                FROYO Farms
                </h1>
                <p style={{color:'#000'}}>A yield optimization protocol built with the health of your favorite protocol in mind.</p>
                <p>
                  Deposit your liquidity-pairs to get started!.
                </p>
                <p style={{ marginTop:'15px'}}>
                  Our vaults run a strategy developed to maximize yield for investors as well as offer the native project a bonus. 
                  The vaults built-in burning mechanism results in every protocol listed to automatically become deflationary!
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