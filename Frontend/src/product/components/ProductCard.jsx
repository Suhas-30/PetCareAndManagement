export default function ProductCard({ product, onSelect }) {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group cursor-pointer rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* image */}
      <div className="overflow-hidden">
        <img
          src={`http://localhost:8080${product.imageUrl}`}
          alt={product.name}
          className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">{product.category}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-semibold text-[#2FB7B2]">
            ₹ {product.price}
          </span>

          <span className="text-xs bg-[#F7F9FB] px-2 py-1 rounded-full text-gray-600">
            {product.stock} left
          </span>
        </div>
      </div>
    </div>
  );
}