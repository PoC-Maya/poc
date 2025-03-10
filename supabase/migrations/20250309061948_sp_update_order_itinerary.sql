CREATE OR REPLACE FUNCTION add_json_property(order_id UUID, property_key TEXT, property_value JSONB)
RETURNS VOID AS $$
BEGIN
    UPDATE orders
    SET content = jsonb_set(content, ARRAY[property_key], property_value, true)
    WHERE id = order_id;
END;
$$ LANGUAGE plpgsql;
