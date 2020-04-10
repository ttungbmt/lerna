import React, {memo} from 'react'
import styled from '@emotion/styled'
import {Badge as BaseBadge} from 'react-bootstrap'
import blue from '@material-ui/core/colors/blue';

const Wrapper = styled(BaseBadge)`
   background-color: #fafafa;
   font-size: 13px;
   padding: 8px;
   text-transform: uppercase;
   border-left: 2px solid ${blue[500]};
   border-top-left-radius: 0;
   border-bottom-left-radius: 0;
`

function Badge({children, ...props}) {
    return (
        <Wrapper {...props}>
            {children}
        </Wrapper>
    )
}

Badge.defaultProps = {

}

export default memo(Badge)

