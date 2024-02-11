import { memo } from 'react';
import styled from 'styled-components';

const ErrorLabel = styled.div`
	font-size: 14px;
	line-height: 20px;
	color: ${({ theme }) => theme.colors.error.e5};
	&:first-letter {
		text-transform: capitalize;
	}
`;
export default memo(ErrorLabel);
