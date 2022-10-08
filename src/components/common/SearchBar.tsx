// import SearchBar from 'material-ui-search-bar';
import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import useAuctionsListQuery from 'hooks/auction/useAuctionsListQuery';
import { NavLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import  InputAdornment  from "@mui/material/InputAdornment"
import SearchIcon from '@mui/icons-material/Search'
const useStyles = makeStyles((theme) => ({
  paper:{
    "&.MuiAutocomplete-paper": {
      background:'white',
      display:'block',
      position: 'static',
      padding: 0,
    }    
  },
  listbox: {
    "&.MuiAutocomplete-listbox": {
      "& :hover":{
        color: 'red'
      },
      paddingLeft: 20,
      wordWrap:'unset'
    }
  },
}));

const SearchForm = () =>{
  const auctionsList = useAuctionsListQuery();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  const classes = useStyles();
  return (
        <Autocomplete 
          open={open}
          classes={classes}
          disableClearable
          // disablePortal = {true}
          forcePopupIcon = {false}
          size = "small"
          fullWidth
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option:any, value:any) => option.auctionIndex === value.auctionIndex}
          getOptionLabel={(option:any) => option.nftDetails.assetName}
          options={auctionsList?.data?.data || []}
          loading={loading}
          renderOption = {(props, option) =>{
            console.log(option.auctionIndex)
            return (
              <li key = {option.auctionIndex} style={{wordWrap:'unset'}}>
                <NavLink to={"/auction/" + option.auctionIndex} style={{ backgroundColor:'transparent',textAlign:'left',textDecorationLine:'none', color:'inherit',lineHeight:2 }} >
                  <img src = {"https://ipfs.io/ipfs/" + option.nftDetails.assetIpfsHash} style={{width:25, height:25, marginRight: 20, borderRadius:20}} alt="nft" />
                  {option.nftDetails.assetName}
                </NavLink>
              </li>
            )
          }}
          renderInput={(params) => (
            <>
            <TextField style={{width: "15em", backgroundColor: 'transparent'}}
              {...params}
              // variant="standard"
              fullWidth
              placeholder="Search..."
              InputProps={{
                ...params.InputProps,
                startAdornment:(
                  <InputAdornment position="end">
                    <SearchIcon  style = {{color: 'rgba(0,0,0,0.2)', marginLeft: 2, marginRight: 2}}/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
            </>
          )}
        />
  )
}

export default SearchForm