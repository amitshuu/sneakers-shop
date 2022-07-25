import React, { useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import styled from 'styled-components';

const Stars = ({ stars, condition, getUserRates, createReview, userRates }) => {
  const onClick = (index) => {
    getUserRates(index);
  };

  useEffect(() => {
    if (userRates > 0) {
      createReview();
    }
  }, [createReview, userRates]);

  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <Star
        condition={condition}
        onClick={() => condition && onClick(index)}
        key={index}
      >
        {stars > number ? (
          <StarIcon />
        ) : stars > index ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </Star>
    );
  });

  return (
    <StarWrapper>
      {tempStars}
      <span style={{ color: 'var(--clr-gray-2)', marginLeft: '10px' }}>
        {stars?.toFixed(1)}
      </span>
    </StarWrapper>
  );
};

export default Stars;

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #ffb900;
  .single-star {
    &:hover {
      color: red;
    }
  }
`;

const Star = styled.span`
  &:hover {
    color: ${(props) => (props.condition ? '#d1a837' : '#ffb900')};
  }
`;

/* width: ${(props) => (props.historyPage ? '60%' : '40%')}; */
