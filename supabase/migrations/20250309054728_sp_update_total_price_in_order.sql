CREATE OR REPLACE FUNCTION update_total_price() 
RETURNS VOID AS $$
BEGIN
    UPDATE orders
    SET content = jsonb_set(
        content, 
        '{totalPrice}', 
        ( (content->>'totalPrice')::numeric * 1.20 )::text::jsonb
    )
    WHERE content ? 'totalPrice';  -- Verifica se existe a chave 'totalPrice' no JSON
END;
$$ LANGUAGE plpgsql;