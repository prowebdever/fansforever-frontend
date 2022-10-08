import { useEffect, useCallback, Fragment, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useDarkMode, Theme } from 'hooks/useDarkMode';
import { setWalletConnectedAsync } from 'actions/walletActions';

import GlobalStyle from 'components/common/globalStyles';
import themeObj from 'theme';
import { RootState } from 'store';

import Layout from 'components/layout/Layout';
import ConnectWalletModal from 'components/ConnectWalletModal';
import SelectWalletModal from 'components/SelectWallet';
import CreateProgressModal from 'components/createProgressModal';
import AnimatedSphere from 'components/AnimatedSphere';
import FollowModal from 'components/profile/FollowModal'
// Eagerly loaded Container Components
import LandingPage from 'containers/LandingPage';
import ComingSoon from 'components/ComingSoon';
import OwnerChatModal from 'components/OwerChatModal';

// Lazily loaded Container Components.
// const NewLandingPage = lazy(() => import('containers/NewLandingPage'));
const ProfilePage = lazy(() => import('containers/ProfilePage'));
const AuctionPage = lazy(() => import('containers/AuctionPage'));
const CreateProfile = lazy(() => import('containers/CreateProfile'));
const CreateNFT = lazy(() => import('containers/CreateNFT'));
const CreateAuction = lazy(() => import('containers/CreateAuction'));
const UpdateProfile = lazy(() => import('containers/UpdateProfile'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useDarkMode();

  const { isWalletConnected } = useSelector((state: RootState) => state.wallet);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setTimeout(() => {
      if (
        localStorage.getItem('isWalletConnected') &&
        window?.tronWeb?.defaultAddress?.base58 ===
          localStorage.getItem('accountAddress')
      ) {
        dispatch(setWalletConnectedAsync());
      }
    }, 500);
  }, [dispatch]);

  const handleTronLinkMessages = useCallback(
    (e) => {
      if (e.data.message && e.data.message.action === 'setAccount') {
        if (
          isWalletConnected &&
          user?.profile?.userCyptoAddress !== e.data.message.data.address
        ) {
          setTimeout(() => {
            dispatch(setWalletConnectedAsync());
          }, 100);
        }
      }
    },
    [dispatch, isWalletConnected, user?.profile?.userCyptoAddress]
  );

  useEffect(() => {
    window.addEventListener('message', handleTronLinkMessages);

    return () => window.removeEventListener('message', handleTronLinkMessages);
  }, [handleTronLinkMessages]);

  return (
    <Fragment>
      <GlobalStyle />
      <ThemeProvider
        theme={theme === Theme.Light ? themeObj.light : themeObj.dark}
      >
        <Suspense fallback={<AnimatedSphere />}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Layout toggleTheme={toggleTheme}>
                <Switch>
                  <Route path="/" exact component={LandingPage} />
                  {/* <Route path="/" exact component={NewLandingPage} /> */}
                  <Route
                    path="/profile/create"
                    exact
                    component={CreateProfile}
                  />
                  <Route
                    path="/profile/:handle/edit"
                    exact
                    component={UpdateProfile}
                  />
                  <Route
                    path="/profile/:handle"
                    exact
                    component={ProfilePage}
                  />
                  <Route
                    path="/auction/create/:tokenId"
                    exact
                    component={CreateAuction}
                  />
                  <Route
                    path="/auction/:auctionId"
                    exact
                    component={AuctionPage}
                  />
                  <Route path="/nft/create" exact component={CreateNFT} />
                  <Route path="*" component={ComingSoon} />
                </Switch>
              </Layout>
              <SelectWalletModal />
              <FollowModal />
              <CreateProgressModal />
              <OwnerChatModal />
            </Router>
          </QueryClientProvider>
        </Suspense>
        <ConnectWalletModal />
        <ToastContainer />
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
