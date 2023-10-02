import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function AdminCursos() {
    let navigate = useNavigate();
    const location = useLocation();
    const username = location.state.usuario;

    return (
        <Fragment>

        </Fragment>
    );
}