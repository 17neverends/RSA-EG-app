import { Route, Routes } from "react-router-dom";
import { nav } from "./navigation";
import React from 'react';

export const RenderRoutes = () => {        
        return (
             <Routes>
             { nav.map((r, i) => {
                return <Route key={i} path={r.path} element={r.element}/>
             })}
             </Routes>
        )
   }
   