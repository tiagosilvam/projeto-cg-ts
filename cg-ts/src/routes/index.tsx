import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom'
import { Home } from "../pages/Home"
import { Pixel } from "../pages/Pixel"
import { Reta } from '../pages/Reta'
import { Layout } from '../layout'
import { Circulo } from '../pages/Circulo'

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route path='/' element={<Home />} />
                    <Route path='pixel' element={<Pixel />} />
                    <Route path='reta' element={<Reta />} />
                    <Route path='circulo' element={<Circulo />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}