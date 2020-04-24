import styled from 'styled-components';
import { darken } from 'polished';

export const DeliveryOptionsContainer = styled.div`
  padding: 10px 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    color: #999;
    width: 100%;
    border: 0;
    border-bottom: 1px solid #eeeeee;
    padding: 8px 0;

    &:last-child {
      border: 0;
    }

    &:hover {
      background: ${darken(0.03, '#FFF')};
    }

    span {
      margin-left: 10px;
    }
  }
`;

export const NameInitials = styled.td`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: ${props => props.background};
    color: ${props => props.color};
    margin-right: 5px;
  }
`;

export const Avatar = styled.td`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    background: #eee;
  }
`;
