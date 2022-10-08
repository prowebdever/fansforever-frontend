import { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Prompt } from 'react-router-dom';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
import Container from 'components/layout/Container';
import PageTitle from 'components/common/PageTitle';
import PageSubtitle from 'components/common/PageSubtitle';
import FormTextField from 'components/form-fields/FormTextField';
import RoyaltiesFormField from 'components/form-fields/RoyaltiesFormField';
import FormDropzoneField from 'components/form-fields/FormDropzoneField';

import config from 'config';

import Spinner from 'components/Spinner';
import FormTextAreaField from 'components/form-fields/FormTextAreaField';
// import { addJSONToIpfs } from 'apis/addJSONtoIPFS';
// import { justFanCollectionContractInstance } from 'contract-interactions/instances/justFanCollectionContractInstance';
// import { getTotalSupply } from 'contract-interactions/getTotalSupply';
// import { mintNFT } from 'contract-interactions/mintNft';
// import { createNft } from 'apis/createNft';
import { RootState } from 'store';
import NFTPreviewCard from 'components/nft-card/NFTPreviewCard';
import { showSelectWalletModal } from 'actions/walletActions';

const CreateNFTWrapper = styled.div`
  min-height: calc(100vh - 50px);
  width: 100%;

  padding-top: 84px;
  padding-bottom: 108px;

  & > ${Container} > ${FlexColumnWrapper} {
    width: 100%;

    & > ${FlexRowWrapper} {
      margin-top: 56px;
      justify-content: space-around;
      align-items: flex-start;
      flex-flow: row wrap;

      @media screen and (max-width: 900px) {
        margin-top: 0;
      }

      form {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;
        flex-flow: row wrap;
      }

      .nft-form {
        width: 50%;
        margin-top: 22px;
        order: 1;

        @media screen and (max-width: 900px) {
          order: 2;
          width: 80%;
        }

        .heading {
          font-family: Clash Grotesk;
          font-style: normal;
          font-weight: bold;
          font-size: 32px;
          line-height: 39px;
          color: ${({ theme }) => theme.textColors.tertiary};
          margin-top: 32px;
          margin-bottom: 32px;
          text-transform: uppercase;
        }

        button {
          width: 451px;
          height: 47px;

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

          img {
            position: absolute;
            left: 40px;
          }
        }
      }

      .vertical-divider {
        width: 0px;
        height: 488px;
        border: 1px solid #b2cbc7;
        order: 2;

        @media screen and (max-width: 900px) {
          display: none;
        }
      }

      .preview-section {
        order: 3;
        width: 40%;
        margin-top: 22px;

        @media screen and (max-width: 900px) {
          order: 1;
          width: auto;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`;

const initialValues = {
  uuid: uuidv4(),
  assetIpfsHash: '',
  name: '',
  description: '',
  contractAddress: '',
  royalties: '',
};

const validationSchema = Yup.object().shape({
  uuid: Yup.string().uuid().required(),
  assetIpfsHash: Yup.string().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  contractAddress: Yup.string().required(),
  royalties: Yup.string().oneOf(['5', '10', '20']).required(),
});

const CreateNFT = () => {
  const { isminting } = useSelector(
    (state: RootState) => state.wallet
  );
  const [asset, setAsset] = useState<File>();
  const [isGeneratingAssetIpfsHash, setIsGeneratingAssetIpfsHash] =
    useState(false);
  const [assetIpfsResult, setAssetIpfsResult] = useState<{
    ipfsHash: string;
    previewUrl: string;
  }>();

  const { isWalletConnected } = useSelector((state: RootState) => state.wallet);
  const user = useSelector((state: RootState) => state.user);
  const initialNftValues = useMemo(
    () => ({
      ...initialValues,
      contractAddress:
        user?.profile?.userContractAddress ||
        config.justFanCollectionContractAddress,
    }),
    [user]
  );
  const dispatch = useDispatch();

  const handleSign = useCallback(
    async (values: {
      contractAddress: string;
      uuid: string;
      assetIpfsHash: string;
      name: string;
      description: string;
      royalties: string;
    }
    ) =>{
      let _mintdata = {
        details: values,
        assetIpfsResult: assetIpfsResult,
        asset: asset 
      }
      if(!isWalletConnected) {
        alert("Please connect to your wallet!")
        return;
      }
      dispatch(showSelectWalletModal(_mintdata))
    }
    ,[asset,assetIpfsResult ,dispatch, isWalletConnected]
  );
  return (
    <CreateNFTWrapper>
      <Container>
        <FlexColumnWrapper>
          <PageTitle>Create Single Collectible</PageTitle>
          <PageSubtitle>
            This is how your NFT will appear in listings
          </PageSubtitle>
          <FlexRowWrapper>
            <Formik
              key={initialNftValues.uuid}
              initialValues={initialNftValues}
              validationSchema={validationSchema}
              validateOnBlur={true}
              validateOnMount={false}
              validateOnChange={true}
              onSubmit={console.log()}
              enableReinitialize={true}
            >
              {({ values, handleSubmit }) => (
                <Form>
                  <div className="nft-form">
                    <FormDropzoneField
                      name="assetIpfsHash"
                      multiple={false}
                      accept="image/jpeg, image/png, image/gif, video/mp4"
                      maxSize={60 * 1024 * 1024}
                      disabled={false}
                      onLoading={setIsGeneratingAssetIpfsHash}
                      onFile={setAsset}
                      onResult={setAssetIpfsResult}
                    />
                    <h1 className="heading">Details</h1>
                    <FormTextField
                      name="name"
                      placeholder="Example: Best NFT Ever"
                      label="Name"
                      style={{ marginTop: 38 }}
                    />
                    <FormTextAreaField
                      name="description"
                      placeholder="Describe your work"
                      label="Description"
                    />
                    <RoyaltiesFormField
                      name="royalties"
                      placeholder="Get a % everytime it's sold"
                      label="Royalties"
                      royaltyAmounts={[5, 10, 20]}
                    />
                    <FlexRowWrapper>
                      <button
                        type="button"
                        disabled={
                          !isWalletConnected || isminting 
                        }
                        onClick={() => handleSign(values)}
                      >
                        {isminting ? (
                          <Spinner style={{ width: 30, height: 30 }} />
                        ) : (
                          'CREATE NFT'
                        )}
                      </button>
                    </FlexRowWrapper>
                  </div>
                  <div className="vertical-divider" />
                  <div className="preview-section">
                    <NFTPreviewCard
                      key={assetIpfsResult?.previewUrl}
                      title={values.name}
                      isLoading={isGeneratingAssetIpfsHash}
                      previewUrl={assetIpfsResult?.previewUrl || ''}
                      assetMimetype={asset?.type || ''}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </FlexRowWrapper>
        </FlexColumnWrapper>
      </Container>
      <Prompt when={isminting} message="Are you sure you want to leave?" />
    </CreateNFTWrapper>
  );
};

export default CreateNFT;
