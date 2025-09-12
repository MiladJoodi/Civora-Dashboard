import React, { ReactNode, ReactElement, isValidElement, cloneElement } from "react"

export function toPersianNumber(input: ReactNode): ReactNode {
    if (input == null) return input;

    if (typeof input === "number" || typeof input === "string") {
        return String(input).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
    }

    if (Array.isArray(input)) {
        return input.map((v, i) => <React.Fragment key={i}>{toPersianNumber(v)}</React.Fragment>);
    }

    if (isValidElement(input)) {
        const element = input as ReactElement<any>;
        return cloneElement(element, element.props, toPersianNumber(element.props.children));
    }

    return input;
}
