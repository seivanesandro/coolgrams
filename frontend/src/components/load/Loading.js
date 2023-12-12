import styled, {keyframes} from 'styled-components';

const spinner = keyframes`
to{
    transform: rotate(360deg); 
  }
`;

const Loading = styled.div`
    width: 5rem;
    height: 5rem;
    border: 5px ${({ border }) => border};


    border-radius: 50px;
    border-top-color: transparent;
    animation: ${spinner} ${({speedborder})=> speedborder}s linear infinite;
    z-index: 100;
`; 

Loading.defaultProps = {
    border: 'solid #0095b6',
    speedborder: '2'
};

export default Loading;