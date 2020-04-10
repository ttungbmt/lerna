import React, {memo} from 'react'

function LayoutBlank({children}) {
    return (
        <div>
            {children}
        </div>
    )
}

export default memo(LayoutBlank)