import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AutoColumn } from '../Column';
import Title from '../Title';
import { BasicLink } from '../Link';
import { useMedia } from 'react-use';
import { transparentize } from 'polished';
import { TYPE } from '../../Theme';
import { withRouter } from 'react-router-dom';
import { TrendingUp, List, PieChart, Disc, ChevronUp, ChevronDown } from 'react-feather'; // Import icons
import Link from '../Link'; // Removed ButtonLink import
import { useSessionStart } from '../../contexts/Application';
import menu from '../../assets/menu.svg';
import twitterLogo from '../../assets/x.png';
import telegramLogo from '../../assets/t.png';
import websiteLogo from '../../assets/w.png';
import chart from '../../assets/chart.png';
import tools from '../../assets/tools.png';
import listings from '../../assets/listings.png';
import lock from '../../assets/lock.png';
import scan from '../../assets/scan.png';
import send from '../../assets/send.png';
import farm from '../../assets/farm.png';  
import LP from '../../assets/LP.png';
import swap from '../../assets/swap.png';  
import token from '../../assets/token.png'; 
import search from '../../assets/search.png';
import ov from '../../assets/ov.png';
import pair from '../../assets/pair.png';


const Wrapper = styled.div`
  height: ${({ isMobile }) => (isMobile ? 'initial' : '100vh')};
  background-color: ${({ theme }) => transparentize(0.4, theme.bg1)};
  color: ${({ theme }) => theme.text1};
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  position: sticky;
  top: 0px;
  z-index: 10000;
  box-sizing: border-box;
  background: linear-gradient(297deg, #7e6ee8 0.68%, #000000 100.48%);
  color: ${({ theme }) => theme.bg2};

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    position: relative;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
`;

const Option = styled.div`
  font-weight: 400;
  font-size: 16px;
  opacity: ${({ activeText }) => (activeText ? 1 : 0.6)};
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  margin-bottom: .6rem; /* Adjusted margin bottom */
  :hover {
    opacity: 1;
  }
`;

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
  font-size: 0.825rem;
  font-weight: 500;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
  a {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.white};
  }
`;

const Polling = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  bottom: 0;
  padding: 1rem;
  color: white;
  opacity: 0.4;
  transition: opacity 0.25s ease;
  :hover {
    opacity: 1;
  }
`;

const PollingDot = styled.div`
  width: 8px;
  height: 8px;
  min-height: 8px;
  min-width: 8px;
  margin-right: 0.5rem;
  margin-top: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.green1};
`;

const MenuMobileButton = styled.span`
  display: inline-block;
  padding: 15px;
  margin-right: 5px;
  cursor: pointer;
  background: url(${menu}) no-repeat center center;
`;

const MenuMobileWrapper = styled.div`
  display: block;
  position: absolute;
  right: 15px;
  top: 100%;
  padding: 10px 30px 20px;
  background: #000;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  display: ${props => (props.hide ? 'none' : 'block')};
`;

const NetworkLabel = styled.div`
  margin: 0px;
  width: fit-content;
  background-color: #000000;
  color: #8d77df;
  font-weight: 500;
  border-radius: 12px;
  padding: 8px 12px;
`;


function MenuContent({ history, toggleMenu }) {
  const [showChartsMenu, setShowChartsMenu] = useState(false);
  const [showDEXMenu, setShowDEXMenu] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false); // New state for Tools menu
  const [showListingsMenu, setShowListingsMenu] = useState(false); // New state for Listings menu

  const toggleChartsMenu = (e) => {
    e.stopPropagation();
    setShowChartsMenu(!showChartsMenu);
    setShowDEXMenu(false); // Close DEX submenu when opening Charts submenu
    setShowToolsMenu(false); // Close Tools submenu when opening Charts submenu
    setShowListingsMenu(false); // Close Listings submenu when opening Charts submenu
  };

  const toggleDEXMenu = (e) => {
    e.stopPropagation();
    setShowDEXMenu(!showDEXMenu);
    setShowChartsMenu(false); // Close Charts submenu when opening DEX submenu
    setShowToolsMenu(false); // Close Tools submenu when opening DEX submenu
    setShowListingsMenu(false); // Close Listings submenu when opening DEX submenu
  };

  const toggleToolsMenu = (e) => {
    e.stopPropagation();
    setShowToolsMenu(!showToolsMenu);
    setShowChartsMenu(false); // Close Charts submenu when opening Tools submenu
    setShowDEXMenu(false); // Close DEX submenu when opening Tools submenu
    setShowListingsMenu(false); // Close Listings submenu when opening Tools submenu
  };

  const toggleListingsMenu = (e) => {
    e.stopPropagation();
    setShowListingsMenu(!showListingsMenu);
    setShowChartsMenu(false); // Close Charts submenu when opening Listings submenu
    setShowDEXMenu(false); // Close DEX submenu when opening Listings submenu
    setShowToolsMenu(false); // Close Tools submenu when opening Listings submenu
  };

  return (
    <>
      <AutoColumn gap=".25rem" style={{ marginTop: '.25rem' }}>
        {/* DEX option */}
        <Option onClick={toggleDEXMenu}>
          <img src={websiteLogo} alt="DEX" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> DEX
          {showDEXMenu ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Option>
        {/* DEX submenu */}
        {showDEXMenu && (
          <AutoColumn style={{ paddingLeft: '1rem' }}>
            <BasicLink to="/swap">
              <Option
                activeText={history.location.pathname === '/swap'}
                onClick={toggleMenu ? () => toggleMenu(false) : null}
                style={{ marginTop: '0.1rem' }}
              >
                <img src={swap} alt="Swap" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Swap
              </Option>
            </BasicLink>
            <BasicLink to="/liquidity">
              <Option
                activeText={history.location.pathname === '/liquidity'}
                onClick={toggleMenu ? () => toggleMenu(false) : null}
              >
                <img src={LP} alt="Liquidity" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Liquidity
              </Option>
            </BasicLink>
            <BasicLink to="/farms">
              <Option
                activeText={history.location.pathname === '/farms'}
                onClick={toggleMenu ? () => toggleMenu(false) : null}
              >
                <img src={farm} alt="Farms" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Farms
              </Option>
            </BasicLink>
          </AutoColumn>
        )}
        {/* Charts option */}
        <Option onClick={toggleChartsMenu}>
          <img src={chart} alt="Charts" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Charts
          {showChartsMenu ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Option>
        {/* Charts submenu */}
        {showChartsMenu && (
          <AutoColumn style={{ paddingLeft: '1rem' }}>
            <BasicLink to="/overview">
              <Option
                activeText={history.location.pathname === '/overview'}
                onClick={toggleMenu ? () => toggleMenu(false) : null}
                style={{ marginTop: '0.1rem' }} // Add margin top to create space
              >
                <img src={ov} alt="Overview" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Overview
              </Option>
            </BasicLink>
            <BasicLink to="/accounts">
              <Option
                activeText={
                  history.location.pathname.split('/')[1] === 'accounts' ||
                  history.location.pathname.split('/')[1] === 'account'
                }
                onClick={toggleMenu ? () => toggleMenu(false) : null}
              >
                <img src={search} alt="Accounts" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Accounts
              </Option>
            </BasicLink>
            <BasicLink to="/tokens">
              <Option
                activeText={
                  history.location.pathname.split('/')[1] === 'tokens' ||
                  history.location.pathname.split('/')[1] === 'token'
                }
                onClick={toggleMenu ? () => toggleMenu(false) : null}
              >
                <img src={token} alt="Tokens" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Tokens
              </Option>
            </BasicLink>
            <BasicLink to="/pairs">
              <Option
                activeText={
                  history.location.pathname.split('/')[1] === 'pairs' ||
                  history.location.pathname.split('/')[1] === 'pair'
                }
                onClick={toggleMenu ? () => toggleMenu(false) : null}
              >
                <img src={pair} alt="Pairs" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Pairs
              </Option>
            </BasicLink>
          </AutoColumn>
        )}
        {/* Tools option */}
        <Option onClick={toggleToolsMenu}>
          <img src={tools} alt="Tools" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Tools
          {showToolsMenu ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Option>
        {/* Tools submenu */}
        {showToolsMenu && (
          <AutoColumn style={{ paddingLeft: '1rem' }}>
            <BasicLink to="/lp-locker">
              <Option
                activeText={history.location.pathname === '/lp-locker'}
                onClick={toggleMenu ? () => toggleMenu(false) : null}
                style={{ marginTop: '0.1rem' }}
              >
                <img src={lock} alt="LP Locker" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> LP Locker
              </Option>
            </BasicLink>
            <BasicLink to="/multisender">
              <Option
                activeText={history.location.pathname === '/multisender'}
                onClick={toggleMenu ? () => toggleMenu(false) : null}
              >
                <img src={send} alt="Multisender" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Multisender
              </Option>
            </BasicLink>
            <BasicLink to="/scanner">
              <Option
                activeText={history.location.pathname === '/scanner'}
                onClick={toggleMenu ? () => toggleMenu(false) : null}
              >
                <img src={scan} alt="Scanner" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Scanner
              </Option>
            </BasicLink>
          </AutoColumn>
        )}
        {/* Listings option */}
        <Option onClick={toggleListingsMenu}>
          <img src={listings} alt="Listings" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Listings
          {showListingsMenu ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Option>
        {/* Listings submenu */}
        {showListingsMenu && (
          <AutoColumn style={{ paddingLeft: '1rem' }}>
            <BasicLink to="/cmc">
              <Option
                activeText={history.location.pathname === '/cmc'}
                onClick={toggleMenu ? () => toggleMenu(false) : null}
                style={{ marginTop: '0.1rem' }}
              >
                <img src={websiteLogo} alt="CMC" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> CMC
              </Option>
            </BasicLink>
            <BasicLink to="/coingecko">
              <Option
                activeText={history.location.pathname === '/coingecko'}
                onClick={toggleMenu ? () => toggleMenu(false) : null}
              >
                <img src={websiteLogo} alt="Coingecko" style={{ marginRight: '.5rem', width: '20px', height: '20px' }} /> Coingecko
              </Option>
            </BasicLink>
          </AutoColumn>
        )}
      </AutoColumn>
    </>
  );
}



function SideNav({ history }) {
  const below1080 = useMedia('(max-width: 1080px)');
  const below1180 = useMedia('(max-width: 1180px)');
  const seconds = useSessionStart();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  function toggleMobileMenu(status) {
    setShowMobileMenu(status);
  }

  // refs to detect clicks outside modal
  const menuMobileButtonRef = useRef();
  const MenuMobileWrapperRef = useRef();

  const handleClick = e => {
    if (
      !(MenuMobileWrapperRef.current && MenuMobileWrapperRef.current.contains(e.target)) &&
      !(menuMobileButtonRef.current && menuMobileButtonRef.current.contains(e.target))
    ) {
      toggleMobileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Wrapper isMobile={below1080}>
      {!below1080 ? (
        <DesktopWrapper>
          <AutoColumn gap="1rem" style={{ marginLeft: '.75rem', marginTop: '1.5rem' }}>
            <Title />
            <NetworkLabel>{'Mainnetz Mainnet'}</NetworkLabel>
            {!below1080 && <MenuContent history={history} />}
          </AutoColumn>
          <AutoColumn gap="0.5rem" style={{ marginLeft: '.75rem', marginBottom: '4rem' }}>
            <HeaderText>
              <Link href="https://twitter.com/ZodiacSwapDEX" target="_blank">
                <img src={twitterLogo} alt="Twitter" width="24" height="24" /> {/* Twitter logo */}
              </Link>
              <Link href="https://t.me/ZodiacSwapDEX" target="_blank">
                <img src={telegramLogo} alt="Telegram" width="24" height="24" /> {/* Telegram logo */}
              </Link>
              <Link href="https://zodiacswap.com/" target="_blank">
                <img src={websiteLogo} alt="Website" width="24" height="24" /> {/* Website logo */}
              </Link>
            </HeaderText>
          </AutoColumn>
          {!below1180 && (
            <Polling style={{ marginLeft: '.5rem' }}>
              <PollingDot />
              <a href="/" style={{ color: 'white' }}>
                <TYPE.small color={'white'}>
                  Updated {!!seconds ? seconds + 's' : '-'} ago <br />
                </TYPE.small>
              </a>
            </Polling>
          )}
        </DesktopWrapper>
      ) : (
        <MobileWrapper>
          <Title />
          <HeaderText>
            <Link href="https://twitter.com/ZodiacSwapDEX" target="_blank">
              <img src={twitterLogo} alt="Twitter" width="24" height="24" /> {/* Twitter logo */}
            </Link>
            <Link href="https://t.me/ZodiacSwapDEX" target="_blank">
              <img src={telegramLogo} alt="Telegram" width="24" height="24" /> {/* Telegram logo */}
            </Link>
            <Link href="https://zodiacswap.com/" target="_blank">
              <img src={websiteLogo} alt="Website" width="24" height="24" /> {/* Website logo */}
            </Link>
          </HeaderText>
          <MenuMobileButton
            onClick={() => {
              if (!showMobileMenu) toggleMobileMenu(true);
            }}
            ref={menuMobileButtonRef}
          />
          <MenuMobileWrapper hide={!showMobileMenu} ref={MenuMobileWrapperRef}>
            <AutoColumn gap=".25rem">
              <MenuContent history={history} toggleMenu={toggleMobileMenu} />
            </AutoColumn>
          </MenuMobileWrapper>
        </MobileWrapper>
      )}
    </Wrapper>
  );
}

export default withRouter(SideNav);
