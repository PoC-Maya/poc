import { getOrders } from './action'

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Pedidos</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Conteúdo</th>
            <th className="border p-2">Criado em</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{JSON.stringify(order.content)}</td>
              <td className="p-2">{new Date(order.created_at).toLocaleString()}</td>
              <td className="p-2">
                <a href={`/orders/edit/${order.id}`} className="text-blue-500 mr-2">Editar</a>
                <form action="/orders/action.js" method="POST" className="inline">
                  <input type="hidden" name="id" value={order.id} />
                  <button type="submit" className="text-red-500">Excluir</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
