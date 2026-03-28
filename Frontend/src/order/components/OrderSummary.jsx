export default function OrderSummary({ items }) {
  const totalMRP = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = 0;
  const platformFee = 0;

  const totalAmount = totalMRP + tax + platformFee;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">

      <h3 className="font-semibold text-gray-800 mb-4 tracking-wide">
        ORDER SUMMARY
      </h3>

      <div className="space-y-3 text-sm">

        <div className="flex justify-between text-gray-600">
          <span>Total Items</span>
          <span>
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Total MRP</span>
          <span>₹ {totalMRP}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>₹ {tax}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Platform Fee</span>
          <span>₹ {platformFee}</span>
        </div>

        <hr className="my-2 border-gray-100" />

        <div className="flex justify-between font-semibold text-base text-gray-800">
          <span>Total Amount</span>
          <span>₹ {totalAmount}</span>
        </div>

      </div>
    </div>
  );
}