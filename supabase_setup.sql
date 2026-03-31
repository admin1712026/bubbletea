-- ========================================
--  POP & DROP - SQL SETUP SCRIPT
-- ========================================

-- ========================================
-- TABLE: drinks (Напитки)
-- ========================================
CREATE TABLE IF NOT EXISTS drinks (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC NOT NULL,
  color TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Классические',
  availability BOOLEAN DEFAULT true
);

-- Insert drinks data
INSERT INTO drinks (name, description, price, color, category) VALUES
  -- Классические лимонады
  ('Классический лимон', 'Свежий лимон, вода и сахар', 240, '#FFD700', 'Классические'),
  ('Лимон-лайм', 'Микс кислых цитрусов', 280, '#FFF59D', 'Классические'),
  ('Апельсин', 'Сладкий апельсиновый напиток', 260, '#FFCC80', 'Классические'),

  -- Ягодные
  ('Клубника', 'Натуральная клубника и лимон', 440, '#FF6363', 'Ягодные'),
  ('Вишня-гранат', 'Глубокий вкус вишни и граната', 440, '#FFB74D', 'Ягодные'),
  ('Малина', 'Свежая малина с лимоном', 380, '#FF8A80', 'Ягодные'),
  ('Черника', 'Ароматная черника и мята', 420, '#7C63FF', 'Ягодные'),

  -- Экзотические
  ('Манго-маракуйя', 'Тропическое сочетание фруктов', 520, '#FFA726', 'Экзотические'),
  ('Кокос-ананас', 'Летний напиток с кокосовым молоком', 480, '#FFF9C4', 'Экзотические'),
  ('Гуава', 'Экзотический вкус гуавы', 500, '#A5D6A7', 'Экзотические'),

  -- Сезонные
  ('Весна - Черемуха', 'Ранневесенний специальный рецепт', 450, '#E1BEE7', 'Сезонные'),
  ('Лето - Дыня', 'Сладкая дыня с мятой', 480, '#B2DFDB', 'Сезонные'),
  ('Осень - Груша', 'Мягкая груша с корицей', 460, '#D7CCC8', 'Сезонные'),
  ('Зима - Гранат', 'Праздничный гранат и специи', 520, '#FFCCBC', 'Сезонные')
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- TABLE: franchises (Франшизы)
-- ========================================
CREATE TABLE IF NOT EXISTS franchises (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now(),
  owner_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  city TEXT NOT NULL,
  address TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected, active
  investment NUMERIC,
  notes TEXT
);

-- ========================================
-- TABLE: reviews (Отзывы)
-- ========================================
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now(),
  author_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  approved BOOLEAN DEFAULT false,
  city TEXT
);

-- Insert sample reviews
INSERT INTO reviews (author_name, rating, comment, approved, city) VALUES
  ('Мария', 5, 'Обожаю POP & DROP! Самые вкусные лимонады в городе!', true, 'Москва'),
  ('Иван', 5, 'Отличный вкус и натуральные ингредиенты', true, 'Санкт-Петербург'),
  ('Анна', 4, 'Хорошие напитки, очень свежие', true, 'Казань'),
  ('Петр', 5, 'Лучший лимонад! Всегда покупаю здесь', true, 'Москва')
ON CONFLICT DO NOTHING;

-- ========================================
-- TABLE: orders (Заказы)
-- ========================================
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB,
  total NUMERIC,
  status TEXT DEFAULT 'pending', -- pending, completed, cancelled
  delivery_address TEXT,
  notes TEXT
);

-- Enable RLS
ALTER TABLE drinks ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchises ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Drinks - viewable by everyone
CREATE POLICY "Drinks are viewable by everyone" ON drinks
  FOR SELECT USING (true);

-- Franchises - viewable by all, insertable by anyone
CREATE POLICY "Franchises are viewable by everyone" ON franchises
  FOR SELECT USING (true);

CREATE POLICY "Anyone can submit franchise request" ON franchises
  FOR INSERT WITH CHECK (true);

-- Reviews - only approved visible
CREATE POLICY "Public reviews are viewable" ON reviews
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can submit review" ON reviews
  FOR INSERT WITH CHECK (true);

-- Orders - public insert
CREATE POLICY "Anyone can create order" ON orders
  FOR INSERT WITH CHECK (true);

