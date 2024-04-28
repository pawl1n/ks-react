import { useState, useEffect } from "preact/hooks";
import { getMe } from "../api/userApi";
import type { User } from "shared/types/user";
import Cart from "./cart/Cart";
import { PaymentType, ShippingMethod } from "shared/types/order";
import type { OrderItemRequest, OrderRequest } from "shared/types/order";
import { useStore } from "@nanostores/preact";
import { removeAllCartItems, shoppingCart } from "../stores/cartStore";
import { create as createOrder } from "../api/ordersApi";

const CheckoutForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const $cartItems = useStore(shoppingCart);

  useEffect(() => {
    getMe().then((res) => {
      if (res.data) {
        setUser(res.data);
      }
    });
  }, []);

  const fullName = () => {
    const fname: string[] = [];
    if (user?.firstName) {
      fname.push(user?.firstName);
    }
    if (user?.middleName) {
      fname.push(user?.middleName);
    }
    if (user?.lastName) {
      fname.push(user?.lastName);
    }
    return fname.join(" ");
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    setErrorMessage("");

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);

    const items: OrderItemRequest[] = $cartItems.map((item) => {
      return {
        productItem: item.productItemId,
        quantity: item.quantity,
      };
    });

    const data: OrderRequest = {
      phoneNumber: formData.get("phoneNumber") as string,
      userEmail: formData.get("email") as string,
      address: formData.get("address") as string,
      customerFullName: formData.get("fullName") as string,
      paymentType: PaymentType.CASH,
      shippingMethod: ShippingMethod.PICKUP,
      items,
    };

    const result = await createOrder(data);

    if (!result.error) {
      removeAllCartItems();
    }
  };

  return (
    <div className="w-full">
      <form
        className="flex gap-12 flex-wrap justify-center md:flex-nowrap w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 sm:gap-5 w-full grow">
          <div className="flex flex-col gap-2 sm:gap-5">
            <h2 className="text-2xl font-bold">Контактна інформація</h2>

            <label htmlFor="email" className="flex flex-col">
              Email
              <input
                name="email"
                type="email"
                value={user?.email}
                required
                className="rounded"
              />
            </label>

            <label htmlFor="fullName" className="flex flex-col">
              ПІБ
              <input
                name="fullName"
                type="text"
                value={fullName()}
                required
                className="rounded"
              />
            </label>

            <label htmlFor="phoneNumber" className="flex flex-col">
              Номер телефону
              <input
                name="phoneNumber"
                type="text"
                value={user?.phoneNumber}
                required
                className="rounded"
              />
            </label>
          </div>

          <div className="p-2">
            <hr />
          </div>

          <div className="flex flex-col gap-2 sm:gap-5">
            <h2 className="text-2xl font-bold">Інформація для доставки</h2>

            <label htmlFor="address" className="flex flex-col">
              Адреса
              <input name="address" type="text" required className="rounded" />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:gap-5 w-full sm:max-w-1/2">
          <h2 className="text-2xl font-bold">Ваше замовлення</h2>
          <Cart />
          <button
            type="submit"
            className="bg-primary rounded text-white p-4 text-center w-full cursor-pointer"
          >
            Оформити замовлення
          </button>
        </div>
      </form>

      {errorMessage && (
        <div
          class="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
          role="alert"
        >
          <p class="font-bold">Помилка</p>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
