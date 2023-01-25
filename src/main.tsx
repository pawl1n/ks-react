import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <SidebarProvider>
        <CartProvider>
            <QueryClientProvider client={client}>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>,
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </CartProvider>
    </SidebarProvider>
)
