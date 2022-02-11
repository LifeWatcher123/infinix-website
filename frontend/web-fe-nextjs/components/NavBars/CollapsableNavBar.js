import React from "react";
import { NavBar } from "./NavBar";

export const CollapsableNavBar = (props) => {
    var customStyle =
        "offcanvas offcanvas-top bg-dark text-dark w-100 fixed-top offcanvas-navbar";
    return (
        <NavBar
            className={customStyle}
            containerId={props.containerId}
            refProps={props.refProps}
            loading={props.loading}
            scrollProp="true"
            backdropProp="false"
        />
    );
};