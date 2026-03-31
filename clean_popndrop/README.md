# 🍋 POP & DROP - Сайт сети натуральных лимонадов

Полнофункциональное приложение для сети кафе-лавок с натуральными лимонадами, встроенной системой управления меню, франшизой и отзывами.

## 🚀 Быстрый старт

### 1️⃣ Создать таблицы в Supabase

1. Откройте [https://app.supabase.com](https://app.supabase.com)
2. Выберите проект **luukovzdyaxilhhuwxou**
3. Перейдите в **SQL Editor**
4. Создайте новый query
5. **Скопируйте весь текст из файла `supabase_setup.sql`**
6. Нажмите **Run** (или Ctrl+Enter)

### 2️⃣ Запустить приложение

```bash
npm run dev
```

Приложение будет доступно на **http://localhost:3000**

### 3️⃣ Проверить работу

- Главная страница с избранными напитками
- http://localhost:3000/menu - полное меню всех напитков
- Напитки должны загружаться из Supabase

## 📁 Структура проекта

```
app/
  page.tsx              # Главная страница (HOME)
  menu/
    page.tsx           # Страница полного меню
  layout.tsx           # Root layout
  globals.css          # Глобальные стили

lib/
  supabase.ts          # Конфиг Supabase
  utils.ts             # Утилиты

components/            # Компоненты Next.js
  ui/                  # shadcn/ui компоненты

public/               # Статические файлы (старые HTML версия)
  menu.html           # HTML версия меню (для переноса)
  styles.css          # CSS стили (для переноса)

supabase_setup.sql    # SQL скрипты для создания всех таблиц
```

## 🗄️ Структура БД в Supabase

### 📊 Таблица `drinks` (Напитки)
```
- id: número (первичный ключ)
- name: текст (название)
- description: текст (описание)
- price: число (цена в рублях)
- color: текст (hex цвет напитка)
- category: текст (Классические, Ягодные, Экзотические, Сезонные)
- availability: boolean (есть ли в наличии)
```

### 🏢 Таблица `franchises` (Заявки на франшизу)
```
- id: число
- owner_name: текст
- email: email
- phone: телефон
- city: город
- address: адрес
- status: текст (pending, approved, rejected, active)
- investment: число
```

### ⭐ Таблица `reviews` (Отзывы)
```
- id: число
- author_name: текст
- rating: число (1-5)
- comment: текст
- approved: boolean
- city: текст
```

### 📦 Таблица `orders` (Заказы)
```
- id: число
- customer_name: текст
- customer_phone: телефон
- items: JSON (товары)
- total: число (сумма)
- status: текст (pending, completed)
- delivery_address: текст
```

## 🔧 Доступные команды

```bash
# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Запуск production сервера
npm start

# Проверка кода
npm run lint
```

## 🌐 Переменные окружения

Уже установлены в `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://luukovzdyaxilhhuwxou.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_zC9d1XXN765vWjJcX35u_g_1Qcux5xT
```

## 📖 Что работает

✅ Главная страница с описанием  
✅ Страница полного меню с фильтром по категориям  
✅ Загрузка напитков из Supabase  
✅ Красивый дизайн с современным UI  
✅ Полностью адаптивен (мобильный, планшет, ПК)  
✅ Встроенные таблицы для франшизы и отзывов  

## 🚧 Что нужно добавить

- [ ] Система заказов и корзина
- [ ] Страница франшизы с формой
- [ ] Страница отзывов
- [ ] Система авторизации админа
- [ ] Панель управления меню
- [ ] Интеграция с платежами
- [ ] API маршруты для обработки данных

## ⚡ Советы

1. **Для быстрого перезапуска с очисткой:**
   ```bash
   .\reset-and-run.ps1
   ```

2. **Напитки** загружаются автоматически из таблицы `drinks`

3. **Добавить новый напиток** - прямо в Supabase Dashboard:
   - SQL Editor → вставить INSERT запрос

4. **Изменить стили** - в `app/globals.css` или в компонентах

## 🎨 Цвета POP & DROP

- Основной красный: `#FF6363` или `#EF5350`
- Желтый: `#FFD700`, `#FFF59D`
- Оранжевый: `#FFCC80`, `#FFA726`
- Фиолетовый: `#7C63FF` (для ягодных)
- Зеленый: `#A5D6A7` (для экзотических)

## 📞 Контакты

- Телефон: +7 (999) 999-99-99
- Email: info@popndrop.ru

---

**Статус:** ✅ Готово к разработке и публикации

Успехов! 🚀

