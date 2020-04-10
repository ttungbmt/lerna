import React, { memo } from 'react'
import BaseBox from '@material-ui/core/Box';
import { set, isBoolean, assign, clone } from 'lodash-es'


/**
 * @render react
 * @name Box
 * Palette: color, bgcolor
 * Media: xs, sm, md
 * Border: border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderRadius
 * Display: component, display, overflow, textOverflow, visibility, whiteSpace
 * Flexbox: flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf
 * Position: position, zIndex, top, right, bottom, left
 * Size: width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing,
 * Spacing: m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py,
 * Typography: fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign,
 * @example
 * <Box>Accept</Tippy>
 */

function Box(props) {
    const {
        flex, row, column, inline, block, floatRight, floatLeft, wrap, grow, shrink, bold, regular, uppercase, relative, absolute,
        itemsCenter, contentCenter, contentBetween, selfCenter, justifyCenter, pv, ph, mv, mh,
        textXs, textSm, textBase, textLg, textXl, text2Xl, text3Xl, text4Xl, text5Xl, text6Xl,
        cursor, outline,
        style,
        children,
        ...outter
    } = props

    let inner = {
        style: clone(style)
    }

    setIf(inner, textXs, 'fontSize', '.75rem')
    setIf(inner, textSm, 'fontSize', '.875rem')
    setIf(inner, textBase, 'fontSize', '1rem')
    setIf(inner, textLg, 'fontSize', '1.125rem')
    setIf(inner, textXl, 'fontSize', '1.25rem')
    setIf(inner, text2Xl, 'fontSize', '1.5rem')
    setIf(inner, text3Xl, 'fontSize', '1.875rem')
    setIf(inner, text4Xl, 'fontSize', '2.25rem')
    setIf(inner, text5Xl, 'fontSize', '3rem')
    setIf(inner, text6Xl, 'fontSize', '4rem')
    setIf(inner, flex, 'display', 'flex')
    setIf(inner, itemsCenter, 'alignItems', 'center')
    setIf(inner, contentCenter, 'justifyContent', 'center')
    setIf(inner, contentBetween, 'justifyContent', 'space-between')
    setIf(inner, selfCenter, 'alignSelf', 'center')
    setIf(inner, justifyCenter, 'justifyContent', 'center')
    setIf(inner, inline, 'display', 'display')
    setIf(inner, block, 'display', 'block')
    setIf(inner, row, 'flexDirection', 'row')
    setIf(inner, column, 'flexDirection', 'column')
    setIf(inner, wrap, 'flexWrap', 'wrap')
    setIf(inner, shrink, 'flexShrink', isBoolean(shrink) ? 1 : shrink)
    setIf(inner, grow, 'flexGrow', isBoolean(grow) ? 1 : grow)
    setIf(inner, bold, 'fontWeight', 500)
    setIf(inner, uppercase, 'style.textTransform', 'uppercase')
    setIf(inner, regular, 'fontWeight', 'fontWeightRegular')
    setIf(inner, relative, 'position', 'relative')
    setIf(inner, absolute, 'position', 'absolute')
    setIf(inner, floatRight, 'style.float', 'right')
    setIf(inner, floatLeft, 'style.float', 'left')
    setIf(inner, cursor, 'style.cursor', 'pointer')
    setIf(inner, outline, 'style.outline', outline)
    setIf(inner, outline, 'style.outline', outline)


    assignIf(inner, pv, {pt: pv, pb: pv})
    assignIf(inner, mv, {mt: mv, mb: mv})
    assignIf(inner, ph, {pl: ph, pr: ph})
    assignIf(inner, mh, {ml: mh, mr: mh})

    return (
        <BaseBox {...inner} {...outter}>
            {children}
        </BaseBox>
    )
}

const setIf = (data, condition, path, value, defaultV) => {
    if (condition) {
        set(data, path, value)
    }
    // else {
    //     !isUndefined(defaultV) && set(data, path, defaultV)
    // }
}

const assignIf = (data, condition, value) => {
    if (condition) data = assign(data, value)
}


Box.defaultProps = {
    style: {},
    height: undefined,
    width: undefined,
}

export default memo(Box)