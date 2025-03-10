-- Criar a tabela de reservas
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guide_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL,
  status TEXT CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED')) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Criar a Procedure para adicionar uma reserva
CREATE OR REPLACE FUNCTION create_booking(
  p_user_id UUID,
  p_guide_id UUID,
  p_date TIMESTAMPTZ
) RETURNS VOID AS $$
BEGIN
  INSERT INTO bookings (id, user_id, guide_id, date, status)
  VALUES (gen_random_uuid(), p_user_id, p_guide_id, p_date, 'PENDING');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
