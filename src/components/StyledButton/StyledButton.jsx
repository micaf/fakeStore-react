import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: '#D32F2F',
    '&:hover': {
      backgroundColor: '#F72424',
    },
  }));

const StyledButton = ({text, onClick, disabled}) => {
    return(
        <ColorButton onClick={onClick} variant="contained" sx={{ marginBottom: 4, borderRadius: '12px' }} disabled={disabled}>{text}</ColorButton>
    )
}

export default StyledButton;