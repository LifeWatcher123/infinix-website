import React from "react";

import Link from "next/link";
import { withRouter } from "next/router";

// TODO Reimplement collapse behaviour
export const NavBar = withRouter((props) => {
    const navBarRef = props.refProps;

    return (
        <div
            className={props.className}
            id={props.containerId}
            data-bs-toggle="false"
            data-bs-scroll={props.scrollProp == "true" ? "true" : "false"}
            data-bs-backdrop={props.backdropProp == "false" ? "false" : "true"}
            ref={navBarRef}
        >
            <nav
                id={"innernav-" + props.containerId}
                className="app-navbar navbar navbar-expand-lg navbar-dark"
            >
                <div className="container-fluid">
                    <a className="navbar-brand fw-bolder" href="#">
                        INFINIX
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#" + props.containerId + "content"}
                        aria-controls={props.containerId + "content"}
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id={props.containerId + "content"}
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link href="/#top" passHref >
                                    <a className="nav-link">Home</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/#featured" smooth passHref >
                                    <a className="nav-link">Featured Collections</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/collections" passHref>
                                    <a className="nav-link">Collections</a>
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-primary text-bold" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
});