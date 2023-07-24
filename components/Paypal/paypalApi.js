import { API_URL } from '@env'
const createOrder = async ({ listItems, total }) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ listItems, total })
    }
    const res = await fetch(API_URL + 'payment/create-paypal-order', options).then(res => res.json())
    return res
}
const capturePayment = async (orderID) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID })
    }
    await fetch(API_URL + 'payment/capture-paypal-order', options)
}
export { createOrder, capturePayment }