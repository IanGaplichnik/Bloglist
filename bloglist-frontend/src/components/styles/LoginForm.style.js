import styled from 'styled-components'

export const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const StyledFormWrapper = styled.div`
  border: 1px solid #ccc; /* Set the border style, color, and width */
  border-radius: 16px;
  padding: 20px; /* Add some padding for better appearance */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`

export const StyledLoginForm = styled.form`
  font-family: 'Poppins', sans-serif;
  h2 {
    font-weight: bold;
  }

  p {
    font-weight: 400;
    color: gray;
  }
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 50px;
  width: 500px; /* Set this to your convenience */
  height: 280px; /* Set this to your convenience */
`
export const StyledInput = styled.input`
  font-family: 'Poppins', sans-serif;
  padding-left: 48px; // Adjust padding to accommodate the image
  background: ${(props) => `url(${props.background}) no-repeat 22px center`};
  background-color: #f0edff;
  border: 1px solid #f0edff;
  background-size: 16px; /* Adjust the size of the image */
  border-radius: 16px;
  width: 364px;
  height: 52px;
  margin-bottom: 18px;
`
export const StyledLoginButton = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 12;
  color: #ffffff;
  height: 52px;
  width: 124px;
  margin-top: 12px;
  border-radius: 16px;
  border: 0;
  background-image: linear-gradient(to right, #9181f4, #5038ed);
`
