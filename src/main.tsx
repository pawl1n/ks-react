import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";

const client = new QueryClient();
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SidebarProvider>
    <CartProvider>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
          <ReactQueryDevtools />
        </Provider>
      </QueryClientProvider>
    </CartProvider>
  </SidebarProvider>
);
