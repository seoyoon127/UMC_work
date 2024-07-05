import styled from 'styled-components';

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.3); /* 테두리 색상 */
  border-radius: 50%;
  border-top-color: #000; /* 회전하는 부분의 색상 */
  animation: spin 1s linear infinite; /* 스핀 애니메이션 */

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;

