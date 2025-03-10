-- Criando a trigger para garantir que o role seja 'guide'
CREATE OR REPLACE FUNCTION ensure_guide_role() 
RETURNS TRIGGER AS $$
BEGIN
  -- Verificar se o role no users é 'guide'
  IF (SELECT role FROM users WHERE id = NEW.id) != 'guide' THEN
    RAISE EXCEPTION 'O usuário não tem o role de guide!';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Associar a trigger com a tabela guides
CREATE TRIGGER check_role_before_insert
BEFORE INSERT ON guides
FOR EACH ROW EXECUTE FUNCTION ensure_guide_role();
