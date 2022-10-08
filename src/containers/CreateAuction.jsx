import { useState, useMemo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import TronGrid from 'trongrid/dist/trongrid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';

import FlexColumnWrapper from '../components/common/FlexColumnWrapper';
import FlexRowWrapper from '../components/common/FlexRowWrapper';
import Container from '../components/layout/Container';
import PageTitle from 'components/common/PageTitle';
import FormTextField from '../components/form-fields/FormTextField';
import InstantSalePriceFormField from '../components/form-fields/InstantSalePriceFormField';
import Spinner from '../components/Spinner';
import { setWalletConnectedAsync } from '../actions/walletActions';

import config from 'config';

import tronLogoWhite from '../assets/logos/tron_logo.svg';
import { Trc20SelectFormField } from '../components/form-fields/Trc20SelectFormField';
import DateTimeFormField from '../components/form-fields/DateTimeFormField';

const CreateAuctionWrapper = styled.div`
  min-height: calc(100vh - 50px);
  width: 100%;

  padding-top: 84px;
  padding-bottom: 108px;

  & > ${Container} > ${FlexColumnWrapper} {
    width: 100%;

    &:first-of-type {
      & > ${FlexRowWrapper} {
        margin-top: 0;
      }
      padding-bottom: 50px;
      margin-bottom: 50px;
      border-bottom: 1px solid #b2cbc7;
    }

    & > ${FlexRowWrapper} {
      margin-top: 56px;
      justify-content: space-around;
      align-items: flex-start;
      flex-flow: row nowrap;

      form {
        width: 50%;

        @media screen and (max-width: 991.99px) {
          width: 60%;
        }
        @media screen and (max-width: 767.99px) {
          width: 70%;
        }
        @media screen and (max-width: 575.99px) {
          width: 85%;
        }
      }

      .auction-form {
        width: 100%;

        ${Spinner} {
          width: 30px;
          height: 30px;
        }
      }

      button {
        width: 451px;
        height: 47px;

        @media screen and (max-width: 575.99px) {
          width: 90%;
        }

        background: #ff3465;
        border-radius: 5px;
        outline: none;
        border: none;
        cursor: pointer;

        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 22px;
        text-transform: uppercase;
        color: #ffffff;
        margin: 40px auto 0 auto;

        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;

        &:disabled {
          cursor: not-allowed;
        }

        ${Spinner} {
          width: 30px;
          height: 30px;
        }

        img {
          position: absolute;
          left: 40px;
        }
      }
    }
  }
`;

const CreateAuction = () => {
  const [isFetchingNftDetails, setIsFetchingNftDetals] = useState(true);
  const [nftDetails, setNftDetails] = useState(null);
  const [hasInstantSaleEnabled, setHasInstantSaleEnabled] = useState(true);
  const [isApprovingNFT, setIsApprovingNFT] = useState(false);
  const [isNftApproved, setIsNftApproved] = useState(false);
  const [isCreatingAuction, setIsCreatingAuction] = useState(false);

  const { isWalletConnected } = useSelector((state) => state.wallet);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const history = useHistory();
  const { tokenId } = useParams();

  useEffect(() => {
    if (+tokenId >= 0) {
      fetch(`${config.apiBaseUrl}/nft/details/${tokenId}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userCryptoAddress: user?.profile?.userCryptoAddress,
          userContractAddress:
            user?.profile?.userContractAddress ??
            config.justFanCollectionContractAddress,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result && result?.length) {
            setNftDetails(result[0]);
          } else {
            throw new Error('NFT Details not found!');
          }
        })
        .then(() => {
          setIsFetchingNftDetals(false);
        })
        .catch((error) => {
          console.log(error);
          setIsFetchingNftDetals(false);
          history.replace(`/profile/${user?.profile?.userAccountHandle}`);
        });
    } else {
      history.replace(`/profile/${user?.profile?.userAccountHandle}`);
    }
  }, [history, user, tokenId]);

  const initialValues = useMemo(
    () => ({
      uuid: uuidv4(),
      startPrice: '',
      startTime: Math.floor(new Date().getTime() + 5 * 60 * 1000),
      endTime: Math.floor(new Date().getTime() + 10 * 60 * 1000),
      instantSalePrice: '',
      trc20TokenAddress: '',
    }),
    []
  );

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      uuid: Yup.string().uuid().required(),
      startPrice: Yup.string().required(),
      startTime: Yup.string()
        .required()
        .test('is-in-future', 'Auction should start in the future', (value) => {
          return +value > Math.floor(new Date() / 1000);
        }),
      instantSalePrice: hasInstantSaleEnabled
        ? Yup.string().required()
        : Yup.string().optional(),
      trc20TokenAddress: Yup.string().required(),
    });
  }, [hasInstantSaleEnabled]);

  const handleApproveNft = useCallback(async () => {
    try {
      const latestAuctionContractAddress = config.masterAuctionContractAddress;

      if (window.tronWeb && window.tronWeb.ready) {
        setIsApprovingNFT(true);
        const contractInstance = await window.tronWeb
          .contract()
          .at(config.justFanCollectionContractAddress);
        const approveTransactionId = await contractInstance
          .approve(latestAuctionContractAddress, tokenId)
          .send({
            feeLimit: 100_000_000,
            callValue: 0,
            shouldPollResponse: false,
          });
        const tronGrid = new TronGrid(window.tronWeb);
        do {
          var events = await tronGrid.transaction.getEvents(
            approveTransactionId
          );
          if (events?.data?.length) {
            const response = await fetch(`${config.apiBaseUrl}/nft`, {
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                userContractAddress: config.justFanCollectionContractAddress,
                userWalletAddress: user?.profile?.userCryptoAddress,
                nftIpfsHash: nftDetails?.nftIpfsHash,
                mintTransactionId: nftDetails?.mintTransactionId,
                tokenId: tokenId,
                approvedTransactionId: approveTransactionId,
                approvedEventResult: events?.data?.[0] || {},
              }),
            });
            const ok = response.ok;
            const result = await response.json();
            if (ok && result) {
              setIsNftApproved(true);
              setIsApprovingNFT(false);
            }
          } 
        }while(events?.data?.length === 0)
      } else {
        alert('Connect your wallet');
        setIsApprovingNFT(false);
      }
    } catch (error) {
      console.log(error);
      setIsApprovingNFT(false);
    }
  }, [nftDetails, tokenId, user?.profile]);

  const handleCreateAuction = useCallback(
    async (values) => {
      try {
        const latestAuctionContractAddress =
          config.masterAuctionContractAddress;

        if (isWalletConnected && window.tronWeb && window.tronWeb.ready) {
          setIsCreatingAuction(true);
          const contractInstance = await window.tronWeb
            .contract()
            .at(latestAuctionContractAddress);
          const createAuctionTransactionId = await contractInstance
            .createAuction(
              nftDetails.userContractAddress,
              nftDetails.mintEventResult.result.tokenId,
              values.trc20TokenAddress === 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb'
                ? new BigNumber(values.startPrice)
                    .multipliedBy('1e+6')
                    .toFixed()
                : new BigNumber(values.startPrice)
                    .multipliedBy('1e+6')
                    .toFixed(),
              Math.floor(values.startTime / 1000),
              Math.floor((values.endTime - values.startTime) / 1000),
              values.trc20TokenAddress === 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb'
                ? new BigNumber(values.instantSalePrice || 0)
                    .multipliedBy('1e+6')
                    .toFixed()
                : new BigNumber(values.instantSalePrice || 0)
                    .multipliedBy('1e+6')
                    .toFixed(),
              values.trc20TokenAddress
            )
            .send({
              feeLimit: 100_000_000,
              callValue: 0,
              shouldPollResponse: false,
            });

          const tronGrid = new TronGrid(window.tronWeb);
          let events={};
          let response = {};
          do{
              events = await tronGrid.transaction.getEvents(
                createAuctionTransactionId
              );
              if (events && events.data && events.data.length) {
                response = await fetch(`${config.apiBaseUrl}/auction`, {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    nftDetails,
                    startPrice: values.startPrice,
                    startTime: Math.floor(values.startTime / 1000),
                    duration: Math.floor(
                      (values.endTime - values.startTime) / 1000
                    ),
                    instantSalePrice: values.instantSalePrice || 0,
                    auctionTransactionId: createAuctionTransactionId,
                    auctionEventResult: events?.data?.[0] || {},
                    trc20TokenAddress: values.trc20TokenAddress,
                  }),
                });
            }
            }while(events?.data?.length===0)
            const ok = response.ok;
            const result = await response.json();
            if (ok && result) {
                // const jsutfancontractInstance = await justFanCollectionContractInstance();
                // await setApprovalForAll({contractInstance:jsutfancontractInstance,creatoraddress: window?.tronWeb?.defaultAddress?.base58 })
                history.replace(`/auction/${events?.data?.[0].result?._index}`);
                setIsCreatingAuction(false);
            }else {
              alert("failed creating Auction")
              setIsCreatingAuction(false);
            }
        } else {
          alert('Connect your wallet');
        }
      } catch (error) {
        console.log(error);
        setIsCreatingAuction(false);
      }
    },
    [isWalletConnected, nftDetails, history]
  );

  if (isFetchingNftDetails) {
    return (
      <CreateAuctionWrapper style={{ display: 'grid', placeItems: 'center' }}>
        <Spinner />
      </CreateAuctionWrapper>
    );
  }

  return (
    <CreateAuctionWrapper>
      <Container>
        <FlexColumnWrapper>
          <PageTitle>1. Approve Token for Auction</PageTitle>
          <FlexRowWrapper>
            {isWalletConnected ? (
              <button
                onClick={handleApproveNft}
                disabled={nftDetails?.isApprovedForAuction || isNftApproved || isApprovingNFT}
              >
                {isApprovingNFT ? (
                  <>
                    <Spinner />
                    &nbsp;&nbsp;
                    <>Approving NFT...</>
                  </>
                ) : nftDetails?.isApprovedForAuction || isNftApproved ? (
                  'NFT Approved !'
                ) : (
                  'Approve NFT'
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => dispatch(setWalletConnectedAsync())}
              >
                <img src={tronLogoWhite} alt="" />
                Connect your Wallet
              </button>
            )}
          </FlexRowWrapper>
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          <PageTitle>2. Create an Auction</PageTitle>
          <FlexRowWrapper>
            <Formik
              key={initialValues.uuid}
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnBlur={true}
              validateOnMount={false}
              validateOnChange={true}
              onSubmit={handleCreateAuction}
              enableReinitialize={true}
            >
              {({ values, setFieldError }) => (
                <Form>
                  <div className="auction-form">
                    <Trc20SelectFormField
                      name="trc20TokenAddress"
                      placeholder="Auction Currency"
                      label="Auction Currency"
                      options={config.trc20TokenOptions}
                    />
                    <FormTextField
                      name="startPrice"
                      placeholder="Starting Price of the NFT"
                      label={`Start Price - ${
                        config.trc20TokenOptions[
                          config.trc20TokenOptions
                            .map((option) => option.value)
                            .indexOf(values.trc20TokenAddress)
                        ]?.label || ''
                      }`}
                      style={{ marginTop: 38 }}
                    />
                    <DateTimeFormField
                      name="startTime"
                      placeholder="Starting Time of the Auction"
                      label={`Auction Start Time [GMT${
                        new Date().toString().split('GMT')[1]
                      }]`}
                      initialValue={initialValues.startTime}
                    />
                    <DateTimeFormField
                      name="endTime"
                      placeholder="Ending Time of the Auction"
                      label={`Auction End Time [GMT${
                        new Date().toString().split('GMT')[1]
                      }]`}
                      initialValue={initialValues.endTime}
                      validate={() => {
                        if (+values.startTime >= +values.endTime) {
                          setFieldError(
                            'endTime',
                            'Ends before auction starts'
                          );
                        }
                      }}
                    />
                    <InstantSalePriceFormField
                      name="instantSalePrice"
                      placeholder="Sell at this price"
                      label={`Instant Sale Price - ${
                        config.trc20TokenOptions[
                          config.trc20TokenOptions
                            .map((option) => option.value)
                            .indexOf(values.trc20TokenAddress)
                        ]?.label || ''
                      }`}
                      style={{ marginTop: 38 }}
                      isToggleOn={hasInstantSaleEnabled}
                      setIsToggleOn={setHasInstantSaleEnabled}
                    />
                    <FlexRowWrapper>
                      {isWalletConnected ? (
                        <button
                          type="submit"
                          disabled={
                            (!nftDetails?.isApprovedForAuction &&
                              !isNftApproved) ||
                            isCreatingAuction
                          }
                        >
                          {isCreatingAuction ? (
                            <>
                              <Spinner />
                              &nbsp;&nbsp;
                              <>Creating Auction...</>
                            </>
                          ) : (
                            <>Create Auction</>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => dispatch(setWalletConnectedAsync())}
                        >
                          <img src={tronLogoWhite} alt="" />
                          Connect your Wallet
                        </button>
                      )}
                    </FlexRowWrapper>
                  </div>
                </Form>
              )}
            </Formik>
          </FlexRowWrapper>
        </FlexColumnWrapper>
      </Container>
    </CreateAuctionWrapper>
  );
};

export default CreateAuction;
