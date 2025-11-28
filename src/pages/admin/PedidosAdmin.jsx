import React, { useEffect, useState, useRef } from "react";
import styled, {css} from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: var(--form-bg);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: background-color 0.4s;

  h1 {
    text-align: center;
    margin-bottom: 25px;
    color: var(--text-color);
  }
`;

const Message = styled.p`
  text-align: center;
  font-weight: bold;
  padding: 20px;
  color: var(--text-color);
`;

const ClientesResumen = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
`;

const ClienteCard = styled.div`
  background-color: var(--btn-submit-bg);
  color: var(--btn-submit-text);
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ClienteHeader = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: var(--text-color);
`;

const PedidosLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PedidoCard = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: var(--bg-body);
  border: 1px solid var(--input-border);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: background-color 0.4s, border-color 0.4s;

  p {
    margin: 6px 0;
    color: var(--text-color);
  }

  ul {
    margin: 10px 0;
    padding-left: 20px;
    color: var(--text-color);
  }

  li {
    margin-bottom: 4px;
  }
`;

const PedidoTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const PedidoLeft = styled.div`
  flex: 1;
`;

const PedidoRight = styled.div`
  flex: 1;
`;
const TopActions = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;
const PedidoFooterLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-weight: bold;
  color: var(--text-color);
`;
const ButtonBase = css`
  border: none;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
  padding: 1rem 2rem;
  border-radius: 0.8rem;
  margin: 0.5rem 0;
  align-self: flex-start;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;


const BotonVerde = styled.button`
  ${ButtonBase}
  background-color: #71b100;

  &:hover {
    background-color: #619800;
  }
`;

const BotonAmarillo = styled.button`
  ${ButtonBase}
  background-color: #c77808;

  &:hover {
    background-color: #a86106;
  }
`;


const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const clienteRefs = useRef({});

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch(
          "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users"
        );
        if (!res.ok) throw new Error("Error al obtener pedidos");

        const usuarios = await res.json();

        const pedidosExtraidos = usuarios.flatMap((u) =>
          (u.pedidos || []).map((pedido) => ({
            ...pedido,
            cliente: u.nombre,
            email: u.email,
          }))
        );

        setPedidos(pedidosExtraidos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const clientesMap = pedidos.reduce((acc, pedido) => {
    if (!acc[pedido.cliente]) acc[pedido.cliente] = [];
    acc[pedido.cliente].push(pedido);
    return acc;
  }, {});

  Object.keys(clientesMap).forEach((nombre) => {
    if (!clienteRefs.current[nombre]) {
      clienteRefs.current[nombre] = React.createRef();
    }
  });

  const scrollToCliente = (nombre) => {
    clienteRefs.current[nombre]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (loading) return <Message>🔄 Cargando pedidos...</Message>;
  if (error) return <Message>❌ Error: {error}</Message>;

  return (
    <Container>
      <TopActions>
        
        <BotonAmarillo type="button" onClick={() => window.history.back()}>
          Volver
        </BotonAmarillo>
      </TopActions>

      <h1>Pedidos de Clientes</h1>
      <ClientesResumen>
        {Object.keys(clientesMap).map((nombre) => (
          <ClienteCard key={nombre} onClick={() => scrollToCliente(nombre)}>
            {nombre} ({clientesMap[nombre].length})
          </ClienteCard>
        ))}
      </ClientesResumen>
      <PedidosLista>
        {Object.entries(clientesMap).map(([nombre, pedidos]) => (
          <div key={nombre} ref={clienteRefs.current[nombre]}>
            <ClienteHeader>{nombre}</ClienteHeader>
            {pedidos.map((pedido, index) => (
              <PedidoCard key={index}>
                <PedidoTop>
                  <PedidoLeft>
                    <p>
                      <strong>Cliente:</strong> {pedido.cliente}
                    </p>
                    <p>
                      <strong>Email:</strong> {pedido.email}
                    </p>
                  </PedidoLeft>
                  <PedidoRight>
                    <p>
                      <strong>Factura:</strong> {pedido.factura}
                    </p>
                    <p>
                      <strong>Fecha:</strong> {pedido.fecha}
                    </p>
                  </PedidoRight>
                </PedidoTop>

                <div>
                  <ul>
                    {pedido.productos.map((prod, i) => (
                      <li key={i}>
                        {prod.nombre} – Modelo: {prod.imagen.split(".")[0]} –
                        Talle: {prod.talle} – Cantidad: {prod.cantidad} – ${" "}
                        {prod.precio.toLocaleString("es-AR")}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Total:</strong> $
                    {pedido.total.toLocaleString("es-AR")}
                  </p>
                  <p>
                    <strong>Estado:</strong> {pedido.estado}
                  </p>
                </div>
              </PedidoCard>
            ))}
          </div>
        ))}
      </PedidosLista>
    </Container>
  );
};

export default PedidosAdmin;
